<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// ── Props ─────────────────────────────────────────────────────
const props = defineProps({
  contact: { type: Object as () => any, default: null },
  mode:    { type: String as () => 'page' | 'popup', default: 'page' },
})

const emit = defineEmits(['close'])

// ── Dark mode detection ───────────────────────────────────────
const isDark = ref(false)

// ── State ─────────────────────────────────────────────────────
const templates  = ref<any[]>([])
const loading    = ref(true)
const saving     = ref(false)
const copiedId   = ref<string | null>(null)
const editTarget = ref<any | null>(null)

const showForm    = ref(false)
const formTitle   = ref('')
const formBody    = ref('')
const formChannel = ref<'whatsapp' | 'instagram' | 'ambos'>('ambos')

// ── Channel config ────────────────────────────────────────────
const CHANNELS = [
  { value: 'whatsapp',  label: 'WhatsApp',  color: '#22c55e', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' },
  { value: 'instagram', label: 'Instagram', color: '#ec4899', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
  { value: 'ambos',     label: 'Ambos',     color: '#6366f1', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
]

const channelMap = Object.fromEntries(CHANNELS.map(c => [c.value, c]))

// ── Variable interpolation ────────────────────────────────────
const interpolate = (text: string, contact: any): string => {
  if (!contact) return text
  return text
    .replace(/\{\{nome\}\}/g,      contact.name      || '')
    .replace(/\{\{instagram\}\}/g, (contact.instagram || '').replace('@', ''))
    .replace(/\{\{empresa\}\}/g,   contact.company   || contact.name || '')
    .replace(/\{\{status\}\}/g,    contact.status    || '')
    .replace(/\{\{whatsapp\}\}/g,  contact.whatsapp  || '')
}

const preview = (tpl: any) => props.contact ? interpolate(tpl.body, props.contact) : tpl.body

// ── Copy to clipboard ─────────────────────────────────────────
const copyTemplate = async (tpl: any) => {
  const text = preview(tpl)
  try {
    await navigator.clipboard.writeText(text)
    copiedId.value = tpl.id
    setTimeout(() => { copiedId.value = null }, 2000)
  } catch {
    const el = document.createElement('textarea')
    el.value = text
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    copiedId.value = tpl.id
    setTimeout(() => { copiedId.value = null }, 2000)
  }
}

// ── CRUD ──────────────────────────────────────────────────────
const fetchTemplates = async () => {
  loading.value = true
  try {
    const res: any = await $fetch('/api/message-templates')
    templates.value = res.templates || []
  } finally {
    loading.value = false
  }
}

const openNewForm = () => {
  editTarget.value  = null
  formTitle.value   = ''
  formBody.value    = ''
  formChannel.value = 'ambos'
  showForm.value    = true
}

const openEditForm = (tpl: any) => {
  editTarget.value  = tpl
  formTitle.value   = tpl.title
  formBody.value    = tpl.body
  formChannel.value = tpl.channel
  showForm.value    = true
}

const saveForm = async () => {
  if (!formTitle.value.trim() || !formBody.value.trim()) return
  saving.value = true
  try {
    if (editTarget.value) {
      const res: any = await $fetch('/api/message-templates', {
        method: 'PUT',
        body: { id: editTarget.value.id, title: formTitle.value, body: formBody.value, channel: formChannel.value },
      })
      const idx = templates.value.findIndex(t => t.id === editTarget.value.id)
      if (idx !== -1) templates.value[idx] = res.template
    } else {
      const res: any = await $fetch('/api/message-templates', {
        method: 'POST',
        body: { title: formTitle.value, body: formBody.value, channel: formChannel.value },
      })
      templates.value.push(res.template)
    }
    showForm.value = false
  } finally {
    saving.value = false
  }
}

const deleteTemplate = async (tpl: any) => {
  if (!confirm(`Remover template "${tpl.title}"?`)) return
  await $fetch('/api/message-templates', { method: 'DELETE', body: { id: tpl.id } })
  templates.value = templates.value.filter(t => t.id !== tpl.id)
}

// Highlight {{variables}} — dark-mode aware
const highlightVars = (text: string) => {
  const style = isDark.value
    ? 'background:#3b0764;color:#c4b5fd;border-radius:4px;padding:0 3px;font-weight:600'
    : 'background:#ede9fe;color:#6d28d9;border-radius:4px;padding:0 3px;font-weight:600'
  return text.replace(/(\{\{[^}]+\}\})/g, `<span style="${style}">$1</span>`)
}

onMounted(() => {
  fetchTemplates()
  isDark.value = document.documentElement.classList.contains('dark')
  const observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})
</script>

<template>

  <!-- ── Full page mode ── -->
  <div v-if="mode === 'page'" class="max-w-4xl mx-auto">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-crm-900 dark:text-white">💬 Templates de Mensagem</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Use
          <code class="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-1 rounded text-xs">{{nome}}</code>
          <code class="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-1 rounded text-xs">{{instagram}}</code>
          <code class="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-1 rounded text-xs">{{empresa}}</code>
          <code class="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-1 rounded text-xs">{{status}}</code>
          para inserir dados do lead automaticamente.
        </p>
      </div>
      <button @click="openNewForm" class="btn-primary flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        Novo Template
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="i in 4" :key="i" class="animate-pulse bg-white dark:bg-gray-800 rounded-2xl h-40 border border-gray-100 dark:border-gray-700"></div>
    </div>

    <!-- Template cards -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="tpl in templates"
        :key="tpl.id"
        class="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-200 p-5 flex flex-col gap-3"
      >
        <!-- Card header -->
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-2 flex-1 min-w-0">
            <!-- Channel icon -->
            <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" :style="{ background: channelMap[tpl.channel]?.color + '20' }">
              <svg class="w-4 h-4" :style="{ color: channelMap[tpl.channel]?.color }" fill="currentColor" viewBox="0 0 24 24">
                <path :d="channelMap[tpl.channel]?.icon" />
              </svg>
            </div>
            <h3 class="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">{{ tpl.title }}</h3>
          </div>
          <!-- Actions -->
          <div class="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <button @click="openEditForm(tpl)" class="p-1.5 text-gray-400 hover:text-crm-accent hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Editar">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            </button>
            <button @click="deleteTemplate(tpl)" class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Remover">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </div>

        <!-- Body preview with variable highlights -->
        <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1" v-html="highlightVars(tpl.body)"></p>

        <!-- Channel badge + Copy -->
        <div class="flex items-center justify-between pt-1 border-t border-gray-50 dark:border-gray-700/50">
          <span
            class="text-[10px] font-bold px-2 py-0.5 rounded-full"
            :style="{ background: channelMap[tpl.channel]?.color + '20', color: channelMap[tpl.channel]?.color }"
          >{{ channelMap[tpl.channel]?.label }}</span>

          <button
            @click="copyTemplate(tpl)"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200"
            :class="copiedId === tpl.id
              ? 'bg-green-500 text-white'
              : 'bg-crm-900 dark:bg-gray-700 text-white hover:bg-crm-accent dark:hover:bg-crm-accent'"
          >
            <svg v-if="copiedId !== tpl.id" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
            <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            {{ copiedId === tpl.id ? 'Copiado!' : 'Copiar' }}
          </button>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="templates.length === 0" class="col-span-2 text-center py-16 text-gray-400 dark:text-gray-500">
        <p class="text-4xl mb-3">💬</p>
        <p class="font-semibold">Nenhum template criado ainda</p>
        <p class="text-sm mt-1">Clique em "Novo Template" para começar</p>
      </div>
    </div>

    <!-- ── Form modal ── -->
    <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-crm-900/60 dark:bg-black/70 backdrop-blur-sm" @click.self="showForm = false">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg animate-fade-in-up border border-gray-100 dark:border-gray-700/50">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/60 rounded-t-2xl">
          <h3 class="font-bold text-crm-900 dark:text-white">{{ editTarget ? 'Editar Template' : 'Novo Template' }}</h3>
          <button @click="showForm = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="p-6 flex flex-col gap-4">

          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título</label>
            <input v-model="formTitle" type="text" placeholder="Ex: 👋 Primeiro contato" class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" />
          </div>

          <!-- Channel -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Canal</label>
            <div class="flex gap-2">
              <button
                v-for="ch in CHANNELS"
                :key="ch.value"
                @click="formChannel = ch.value as any"
                class="flex-1 py-2 px-3 rounded-lg text-xs font-bold border-2 transition-all"
                :style="formChannel === ch.value
                  ? `border-color:${ch.color};background:${ch.color}20;color:${ch.color}`
                  : isDark ? 'border-color:#374151;color:#9ca3af' : 'border-color:#e5e7eb;color:#6b7280'"
              >{{ ch.label }}</button>
            </div>
          </div>

          <!-- Body -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mensagem
              <span class="ml-2 text-[10px] font-normal text-gray-400 dark:text-gray-500">Use {{nome}}, {{instagram}}, {{empresa}}, {{status}}</span>
            </label>
            <textarea v-model="formBody" rows="6" placeholder="Olá {{nome}}! Vi o perfil de vocês (@{{instagram}})..." class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none text-sm resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"></textarea>
          </div>
        </div>
        <div class="px-6 py-4 border-t border-gray-100 dark:border-gray-700/50 flex justify-end gap-3 bg-gray-50/50 dark:bg-gray-800/60 rounded-b-2xl">
          <button @click="showForm = false" class="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">Cancelar</button>
          <button @click="saveForm" :disabled="saving" class="btn-primary">{{ saving ? 'Salvando...' : 'Salvar' }}</button>
        </div>
      </div>
    </div>

  </div>

  <!-- ── Popup mode (from table row) ── -->
  <div v-else class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-crm-900/60 dark:bg-black/70 backdrop-blur-sm" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up max-h-[80vh] flex flex-col border border-gray-100 dark:border-gray-700/50">
      <!-- Header -->
      <div class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between shrink-0 bg-gray-50/50 dark:bg-gray-800/60 rounded-t-2xl">
        <div>
          <h3 class="font-bold text-crm-900 dark:text-white text-sm">💬 Copiar mensagem para</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{{ contact?.name }}</p>
        </div>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Template list -->
      <div class="overflow-y-auto flex-1 p-3 flex flex-col gap-2">
        <div v-if="loading" class="py-8 text-center text-gray-400 dark:text-gray-500 text-sm">Carregando...</div>
        <button
          v-for="tpl in templates"
          :key="tpl.id"
          @click="copyTemplate(tpl)"
          class="w-full text-left px-4 py-3 rounded-xl border transition-all duration-150 flex items-start gap-3 group"
          :class="copiedId === tpl.id
            ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20'
            : 'border-gray-100 dark:border-gray-700 hover:border-crm-accent/40 hover:bg-blue-50/30 dark:hover:bg-blue-900/10'"
        >
          <!-- Channel icon -->
          <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" :style="{ background: channelMap[tpl.channel]?.color + '20' }">
            <svg class="w-4 h-4" :style="{ color: channelMap[tpl.channel]?.color }" fill="currentColor" viewBox="0 0 24 24">
              <path :d="channelMap[tpl.channel]?.icon" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-gray-800 dark:text-gray-100">{{ tpl.title }}</p>
            <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">{{ preview(tpl).slice(0, 80) }}...</p>
          </div>
          <!-- Copy indicator -->
          <div class="shrink-0 self-center">
            <span v-if="copiedId === tpl.id" class="text-green-500 text-xs font-bold">✓ Copiado!</span>
            <svg v-else class="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-crm-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          </div>
        </button>
      </div>
    </div>
  </div>

</template>
