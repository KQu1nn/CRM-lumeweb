<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

// Protege esta rota com o middleware auth
definePageMeta({
  middleware: ['auth']
})

const supabase = useSupabaseClient()
const supabaseUser = useSupabaseUser()

// Redireciona caso o estado do usuário mude para deslogado
watch(supabaseUser, (newUser) => {
  if (!newUser) {
    navigateTo('/login')
  }
})

// ── Dark Mode ─────────────────────────────────────────────────
const isDark = useState('isDark', () => false)

const toggleDark = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('crm-dark', '1')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('crm-dark', '0')
  }
}

// ── Navigation ──────────────────────────────────────────────
const currentPage = ref<'painel' | 'analise' | 'contatos' | 'templates' | 'kanban' | 'relatorio'>('painel')

const pageTitle: Record<string, string> = {
  painel:    'Painel',
  relatorio: 'Aproveitamento do Dia',
  analise:   'Análise de Leads',
  contatos:  'Todos os Contatos',
  templates: 'Templates de Mensagem',
  kanban:    'Kanban Board',
}

// ── Data ─────────────────────────────────────────────────────
const contacts = ref<any[]>([])
const pending  = ref(true)
const showImportModal = ref(false)

const fetchData = async () => {
  pending.value = true
  try {
    const response = await $fetch('/api/contacts')
    contacts.value = response.data
    // Populate avatar cache in the background after contacts load
    setTimeout(() => prefetchAvatars(contacts.value), 500)
  } catch (error) {
    console.error('Failed to load CRM data', error)
  } finally {
    pending.value = false
  }
}

// ── Avatar Pre-fetch (background, non-blocking) ───────────────
const prefetchAvatars = async (contactList: any[]) => {
  const usernames = contactList
    .filter((c: any) => c.instagram)
    .map((c: any) => c.instagram.replace('@', '').trim().toLowerCase())
  if (!usernames.length) return
  try {
    await $fetch('/api/avatar-prefetch', { method: 'POST', body: { usernames } })
  } catch {
    // Silent — avatar cache is best-effort
  }
}

const onLeadsImported = () => {
  showImportModal.value = false
  fetchData()
}

// ── Tags ─────────────────────────────────────────────────────
const availableTags = ref<any[]>([])

const fetchTags = async () => {
  try {
    const res: any = await $fetch('/api/tags')
    availableTags.value = res.tags || []
  } catch {
    availableTags.value = []
  }
}

// ── Edit / Delete ─────────────────────────────────────────────
const showEditModal   = ref(false)
const selectedContact = ref<any>(null)

const openEditModal = (contact: any) => {
  selectedContact.value = { ...contact }
  showEditModal.value = true
}

const onContactSaved = async () => {
  showEditModal.value = false
  if (selectedContact.value) {
    const idx = contacts.value.findIndex((c: any) => c.id === selectedContact.value.id)
    if (idx !== -1) {
      try {
        const response = await $fetch('/api/contacts')
        const updated = (response.data as any[]).find((c: any) => c.id === selectedContact.value.id)
        if (updated) contacts.value[idx] = updated
      } catch {}
    }
  }
  selectedContact.value = null
}

const deleteContact = async (contact: any) => {
  if (!confirm(`Tem certeza que deseja excluir ${contact.name}?`)) return
  try {
    await $fetch('/api/contacts', { method: 'DELETE', body: { id: contact.id } })
    const idx = contacts.value.findIndex((c: any) => c.id === contact.id)
    if (idx !== -1) contacts.value.splice(idx, 1)
  } catch (err) {
    console.error('Failed to delete contact', err)
  }
}

const deleteContacts = async (ids: string[]) => {
  if (!confirm(`Tem certeza que deseja excluir ${ids.length} lead(s) selecionado(s)?`)) return
  try {
    await $fetch('/api/contacts', { method: 'DELETE', body: { ids } })
    contacts.value = contacts.value.filter((c: any) => !ids.includes(c.id))
  } catch (err) {
    console.error('Failed to delete contacts', err)
  }
}

const showTemplatePopup  = ref(false)
const templateContact    = ref<any>(null)

const openTemplatePopup = (contact: any) => {
  templateContact.value = contact
  showTemplatePopup.value = true
}

// ── Kanban status update ───────────────────────────────────────────
const updateContactStatus = async ({ contact, newStatus }: { contact: any; newStatus: string }) => {
  try {
    await $fetch('/api/contacts', {
      method: 'PUT',
      body: { contact: { ...contact, status: newStatus } },
    })
    const idx = contacts.value.findIndex((c: any) => c.id === contact.id)
    if (idx !== -1) contacts.value[idx].status = newStatus
  } catch (err) {
    console.error('Failed to update status', err)
    // Revert optimistic update
    const idx = contacts.value.findIndex((c: any) => c.id === contact.id)
    if (idx !== -1) contacts.value[idx].status = contact._prevStatus
  }
}

onMounted(() => {
  // Restore dark mode preference
  if (localStorage.getItem('crm-dark') === '1') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
  fetchData()
  fetchTags()
})
</script>

<template>
  <div :class="isDark ? 'dark' : ''" class="h-full w-full">
    <div class="min-h-screen bg-crm-50 dark:bg-gray-950 font-sans transition-colors duration-300">
      <div class="flex h-screen overflow-hidden">

        <!-- ── Sidebar ──────────────────────────────────────── -->
        <DashboardSidebar
          v-model:currentPage="currentPage"
          :contactsCount="contacts.length"
          :pending="pending"
          @toggle-dark="toggleDark"
        />

        <!-- ── Main Content ──────────────────────────────────── -->
        <main class="flex-1 flex flex-col h-screen overflow-hidden">

          <!-- Header -->
          <DashboardHeader
            :title="pageTitle[currentPage]"
            @toggle-dark="toggleDark"
            @new-contact="showImportModal = true"
          />

          <!-- ── Scrollable Content ─────────────────────────── -->
          <div class="flex-1 overflow-y-auto p-8 dark:bg-gray-950 transition-colors duration-300">
            <div class="max-w-6xl mx-auto">

              <!-- ══ PAGE: PAINEL ══ -->
              <DashboardPainel
                v-if="currentPage === 'painel'"
                :contacts="contacts"
                :pending="pending"
                :availableTags="availableTags"
                @edit="openEditModal"
                @delete="deleteContact"
                @delete-multiple="deleteContacts"
                @message="openTemplatePopup"
              />

              <!-- ══ PAGE: KANBAN ══ -->
              <template v-else-if="currentPage === 'kanban'">
                <KanbanBoard
                  :contacts="contacts"
                  :availableTags="availableTags"
                  @update-status="updateContactStatus"
                  @edit="openEditModal"
                />
              </template>

              <!-- ══ PAGE: RELATÓRIO / APROVEITAMENTO DO DIA ══ -->
              <template v-else-if="currentPage === 'relatorio'">
                <DailyReport :contacts="contacts" />
              </template>

              <!-- ══ PAGE: ANÁLISE ══ -->
              <template v-else-if="currentPage === 'analise'">
                <div v-if="pending" class="flex items-center justify-center py-24 text-gray-400 dark:text-gray-500">
                  <svg class="animate-spin w-8 h-8 mr-3 text-crm-accent" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                  Carregando análise...
                </div>
                <LeadsDashboard v-else :contacts="contacts" />
              </template>

              <!-- ══ PAGE: CONTATOS ══ -->
              <template v-else-if="currentPage === 'contatos'">
                <CrmTable
                  :contacts="contacts"
                  :pending="pending"
                  :availableTags="availableTags"
                  @edit="openEditModal"
                  @delete="deleteContact"
                  @delete-multiple="deleteContacts"
                  @message="openTemplatePopup"
                />
              </template>

              <!-- ══ PAGE: TEMPLATES ══ -->
              <template v-else-if="currentPage === 'templates'">
                <MessageTemplates mode="page" />
              </template>

            </div>
          </div>
        </main>

      </div>

      <!-- ── Modals ── -->
      <ContactModal
        v-if="showEditModal && selectedContact"
        :contact="selectedContact"
        :availableTags="availableTags"
        @close="showEditModal = false"
        @save="onContactSaved"
        @tags-updated="fetchTags"
      />
      <ImportLeads
        v-if="showImportModal"
        @close="showImportModal = false"
        @imported="onLeadsImported"
      />
      <MessageTemplates
        v-if="showTemplatePopup && templateContact"
        mode="popup"
        :contact="templateContact"
        @close="showTemplatePopup = false"
      />
    </div>
  </div>
</template>
