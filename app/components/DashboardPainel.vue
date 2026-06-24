<script setup lang="ts">
import { ref, computed } from 'vue'

const isDark = useState<boolean>('isDark')

const props = defineProps<{
  contacts: any[]
  pending: boolean
  availableTags: any[]
}>()

const emit = defineEmits<{
  (e: 'edit', contact: any): void
  (e: 'delete', contact: any): void
  (e: 'delete-multiple', ids: string[]): void
  (e: 'message', contact: any): void
}>()

// ── Date pagination ─────────────────────────────────────────
const currentDateIndex = ref(0)

const uniqueDates = computed(() => {
  const dates = [...new Set(props.contacts.map((c: any) => c.lastContact))].filter(Boolean)
  return (dates as string[]).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
})

const activeDate = computed(() => uniqueDates.value[currentDateIndex.value] || null)

const filteredContacts = computed(() => {
  if (!activeDate.value) return []
  return props.contacts.filter((c: any) => c.lastContact === activeDate.value && c.status !== 'morto')
})

// Todos os leads mortos (todas as datas, juntos)
const deadContacts = computed(() =>
  props.contacts.filter((c: any) => c.status === 'morto')
    .sort((a: any, b: any) => new Date(b.lastContact || '').getTime() - new Date(a.lastContact || '').getTime())
)

const deadSectionOpen = ref(false)

// ── Follow-up tracker ────────────────────────────────────────
const daysSinceApp = (dateStr: string): number => {
  if (!dateStr) return 999
  return Math.floor((Date.now() - new Date(dateStr + 'T12:00:00').getTime()) / 86_400_000)
}

const urgentFollowUps = computed(() =>
  props.contacts
    .filter((c: any) => !['fechado', 'morto'].includes(c.status))
    .map((c: any) => ({ ...c, _days: daysSinceApp(c.lastContact) }))
    .sort((a: any, b: any) => b._days - a._days)
    .slice(0, 8)
)

const followUpSectionOpen = ref(true)

const followUpBadgeStyle = (days: number) => {
  if (isDark.value) {
    if (days <= 3)  return 'background:#064e3b;color:#a7f3d0'
    if (days <= 7)  return 'background:#78350f;color:#fde68a'
    if (days <= 14) return 'background:#7c2d12;color:#ffedd5'
    return                 'background:#7f1d1d;color:#fecaca'
  } else {
    if (days <= 3)  return 'background:#d1fae5;color:#065f46'
    if (days <= 7)  return 'background:#fef3c7;color:#92400e'
    if (days <= 14) return 'background:#ffedd5;color:#9a3412'
    return                 'background:#fee2e2;color:#b91c1c'
  }
}

const followUpDot = (days: number) => {
  if (days <= 3)  return '🟢'
  if (days <= 7)  return '🟡'
  if (days <= 14) return '🟠'
  return                 '🔴'
}

const getFollowUpCardStyle = (days: number) => {
  if (isDark.value) {
    if (days > 7)  return 'background:#450a0a;border-color:#7f1d1d'
    if (days > 3)  return 'background:#7c2d12;border-color:#9a3412'
    return                'background:#064e3b;border-color:#065f46'
  } else {
    if (days > 7)  return 'background:#fff7ed;border-color:#fed7aa'
    if (days > 3)  return 'background:#fffbeb;border-color:#fde68a'
    return                'background:#f0fdf4;border-color:#bbf7d0'
  }
}

const summary = computed(() => {
  const current = filteredContacts.value
  return {
    total:       current.length,
    activeCount: current.filter((c: any) => ['fechado', 'quente', 'em_negociacao'].includes(c.status)).length,
    activeValue: current.reduce((sum: number, c: any) => sum + (Number(c.value) || 0), 0),
  }
})

const prevDate = () => { if (currentDateIndex.value < uniqueDates.value.length - 1) currentDateIndex.value++ }
const nextDate = () => { if (currentDateIndex.value > 0) currentDateIndex.value-- }

const formatDateLabel = (dateStr: string) => {
  if (!dateStr) return 'Sem Data'
  return new Date(dateStr).toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<template>
  <div>
    <DashboardStats :summary="summary" :pending="pending" />

    <!-- ── Follow-up Urgente ── -->
    <div v-if="!pending && urgentFollowUps.length > 0" class="mb-4">
      <button
        @click="followUpSectionOpen = !followUpSectionOpen"
        class="w-full flex items-center justify-between px-5 py-3 rounded-xl border transition-all duration-200 mb-2"
        :style="followUpSectionOpen
          ? (isDark ? 'background:linear-gradient(135deg,#1f2937,#111827);border-color:#374151' : 'background:linear-gradient(135deg,#1e293b,#0f172a);border-color:#334155')
          : (isDark ? 'background:rgba(124,45,18,0.2);border-color:rgba(234,88,12,0.3)' : 'background:#fff7ed;border-color:#fed7aa')"
      >
        <div class="flex items-center gap-3">
          <span class="text-lg">🔔</span>
          <span
            :class="['text-sm font-bold uppercase tracking-wide', followUpSectionOpen ? 'text-orange-400' : 'text-orange-700 dark:text-orange-300']"
          >
            Follow-up Urgente
          </span>
          <span
            :class="['text-xs font-bold px-2 py-0.5 rounded-full', followUpSectionOpen ? 'bg-orange-950 text-orange-400' : 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300']"
          >
            {{ urgentFollowUps.filter((c: any) => c._days > 3).length }} precisam de atenção
          </span>
        </div>
        <svg
          class="w-4 h-4 transition-transform duration-300"
          :style="followUpSectionOpen ? 'color:#fb923c;transform:rotate(180deg)' : (isDark ? 'color:#fdba74' : 'color:#c2410c')"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <div v-show="followUpSectionOpen" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          v-for="contact in urgentFollowUps"
          :key="contact.id"
          @click="emit('edit', contact)"
          class="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          :style="getFollowUpCardStyle(contact._days)"
        >
          <!-- Avatar -->
          <div class="h-9 w-9 flex-shrink-0 rounded-full overflow-hidden">
            <img
              v-if="contact.instagram"
              :src="`/api/instagram-avatar?username=${contact.instagram.replace('@','')}`"
              class="h-full w-full object-cover"
              :onerror="`this.style.display='none';this.nextElementSibling.style.display='flex'`"
            />
            <div
              class="h-full w-full rounded-full flex items-center justify-center text-white text-xs font-bold"
              style="background:linear-gradient(135deg,#6366f1,#60a5fa)"
            >
              {{ (contact.name || '?').replace('@','').charAt(0).toUpperCase() }}
            </div>
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <p class="text-xs font-semibold text-gray-800 dark:text-gray-100 truncate">{{ contact.name }}</p>
            <p class="text-[10px] text-gray-500 dark:text-gray-400 capitalize">{{ contact.status.replace('_', ' ') }}</p>
          </div>

          <!-- Days badge -->
          <span
            class="text-[11px] font-black px-2 py-0.5 rounded-full shrink-0"
            :style="followUpBadgeStyle(contact._days)"
          >
            {{ followUpDot(contact._days) }} {{ contact._days === 0 ? 'Hoje' : `${contact._days}d` }}
          </span>
        </div>
      </div>
    </div>

    <!-- Date Pagination -->
    <div class="flex items-center justify-between mb-4 bg-white/60 dark:bg-gray-900/60 p-4 rounded-xl shadow-sm border border-white/40 dark:border-gray-800/40 backdrop-blur-md transition-colors duration-300">
      <h2 class="text-lg font-semibold text-crm-900 dark:text-white">Leads por Data</h2>
      <div v-if="uniqueDates.length > 0" class="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-1 border border-gray-100 dark:border-gray-700 shadow-inner">
        <button @click="prevDate" :disabled="currentDateIndex >= uniqueDates.length - 1" class="p-2 rounded-md hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all">
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div class="flex flex-col items-center min-w-[150px]">
          <span class="text-sm font-bold text-crm-800 dark:text-gray-100 capitalize">{{ formatDateLabel(activeDate) }}</span>
          <span class="text-xs text-gray-500 dark:text-gray-400">{{ filteredContacts.length }} contatos</span>
        </div>
        <button @click="nextDate" :disabled="currentDateIndex <= 0" class="p-2 rounded-md hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all">
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
      <div v-else class="text-sm text-gray-500 dark:text-gray-400">Nenhuma data encontrada</div>
    </div>

    <CrmTable
      :contacts="filteredContacts"
      :pending="pending"
      :availableTags="availableTags"
      @edit="emit('edit', $event)"
      @delete="emit('delete', $event)"
      @delete-multiple="emit('delete-multiple', $event)"
      @message="emit('message', $event)"
    />

    <!-- ── Seção Leads Mortos ── -->
    <div v-if="!pending && deadContacts.length > 0" class="mt-6">
      <!-- Cabeçalho colapsável -->
      <button
        @click="deadSectionOpen = !deadSectionOpen"
        class="w-full flex items-center justify-between px-5 py-3 rounded-xl border transition-all duration-200 group"
        :style="deadSectionOpen
          ? (isDark ? 'background:#1f2937;border-color:#374151' : 'background:#1e293b;border-color:#334155')
          : (isDark ? 'background:rgba(69,10,10,0.2);border-color:rgba(127,29,29,0.3)' : 'background:#fff1f2;border-color:#fecaca')"
      >
        <div class="flex items-center gap-3">
          <span class="text-lg">💀</span>
          <span
            :class="['text-sm font-bold uppercase tracking-wide', deadSectionOpen ? 'text-red-400' : 'text-red-700 dark:text-red-300']"
          >
            Leads Mortos
          </span>
          <span
            :class="['text-xs font-bold px-2 py-0.5 rounded-full', deadSectionOpen ? 'bg-red-950 text-red-400' : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300']"
          >
            {{ deadContacts.length }}
          </span>
        </div>
        <svg
          class="w-4 h-4 transition-transform duration-300"
          :style="deadSectionOpen ? 'color:#f87171;transform:rotate(180deg)' : (isDark ? 'color:#fca5a5' : 'color:#b91c1c')"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <!-- Tabela de mortos -->
      <div
        v-show="deadSectionOpen"
        class="mt-2 overflow-hidden rounded-xl border border-red-200 dark:border-red-900/40 transition-colors duration-300"
        :style="isDark ? 'background:rgba(69,10,10,0.1)' : 'background:rgba(254,242,242,0.5)'"
      >
        <table class="min-w-full divide-y divide-red-100 dark:divide-red-900/20">
          <thead :style="isDark ? 'background:rgba(69,10,10,0.3)' : 'background:rgba(254,226,226,0.6)'">
            <tr>
              <th scope="col" :class="['px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', isDark ? 'text-red-300' : 'text-red-700']">Lead</th>
              <th scope="col" :class="['px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', isDark ? 'text-red-300' : 'text-red-700']">Data</th>
              <th scope="col" :class="['px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', isDark ? 'text-red-300' : 'text-red-700']">Notas</th>
              <th scope="col" :class="['px-6 py-3 text-right text-xs font-medium uppercase tracking-wider', isDark ? 'text-red-300' : 'text-red-700']">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-red-50 dark:divide-red-950/30">
            <tr
              v-for="contact in deadContacts"
              :key="contact.id"
              class="group transition-colors duration-150 cursor-pointer hover:bg-red-100/50 dark:hover:bg-red-950/20"
              @click="emit('edit', contact)"
            >
              <td class="px-6 py-3">
                <div class="flex items-center gap-3">
                  <div class="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">
                    {{ (contact.name || '?').replace('@','').charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <p class="text-sm font-medium text-red-900 dark:text-red-300">{{ contact.name }}</p>
                    <div class="flex items-center gap-2 mt-0.5">
                      <a v-if="contact.instagram" :href="`https://instagram.com/${contact.instagram.replace('@','')}`" target="_blank" @click.stop class="text-xs text-rose-700 dark:text-rose-400">@{{ contact.instagram.replace('@','') }}</a>
                      <a v-if="contact.whatsapp" :href="`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`" target="_blank" @click.stop class="text-xs text-green-700 dark:text-green-400">WhatsApp</a>
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-3 text-xs text-gray-400 dark:text-gray-500">
                {{ contact.lastContact ? new Date(contact.lastContact + 'T12:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }) : '-' }}
              </td>
              <td class="px-6 py-3 text-xs max-w-[200px] truncate text-gray-400 dark:text-gray-500" :title="contact.notes">
                {{ contact.notes || 'Sem anotações' }}
              </td>
              <td class="px-6 py-3 text-right">
                <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click.stop="emit('edit', contact)" class="p-1 rounded hover:bg-red-100 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400" title="Editar">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                  </button>
                  <button @click.stop="emit('delete', contact)" class="p-1 rounded hover:bg-red-200 dark:hover:bg-red-950/60 text-red-800 dark:text-red-300" title="Excluir">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
