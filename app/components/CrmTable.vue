<script setup lang="ts">
import { computed, ref, onMounted, type PropType } from 'vue'

const avatarErrors = ref<Record<string, boolean>>({})

const getAvatarSrc = (contact: any) => {
  if (!contact.instagram || avatarErrors.value[contact.id]) return null
  const username = contact.instagram.replace('@', '').trim()
  if (!username) return null
  return `/api/instagram-avatar?username=${encodeURIComponent(username)}`
}

const onAvatarError = (contactId: string) => {
  avatarErrors.value[contactId] = true
}

const props = defineProps({
  contacts: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  pending: {
    type: Boolean,
    default: false
  },
  availableTags: {
    type: Array as PropType<any[]>,
    default: () => []
  },
})

const emit = defineEmits(['edit', 'delete', 'delete-multiple', 'message'])

const selectedIds = ref<string[]>([])
const toggleSelection = (id: string) => {
  const index = selectedIds.value.indexOf(id)
  if (index === -1) selectedIds.value.push(id)
  else selectedIds.value.splice(index, 1)
}
const toggleAll = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  if (checked) {
    selectedIds.value = filteredDisplayContacts.value.map(c => c.id)
  } else {
    selectedIds.value = []
  }
}
const isAllSelected = computed(() => {
  return filteredDisplayContacts.value.length > 0 && selectedIds.value.length === filteredDisplayContacts.value.length
})

const deleteSelected = () => {
  if (selectedIds.value.length === 0) return
  emit('delete-multiple', [...selectedIds.value])
  selectedIds.value = []
}

const statusFilter  = ref<string | null>(null)
const activeTagFilter = ref<string | null>(null)
const dateFilterIndex = ref<number | null>(null)

const toggleTagFilter = (tagId: string) => {
  activeTagFilter.value = activeTagFilter.value === tagId ? null : tagId
}

const uniqueDates = computed(() => {
  const dates = [...new Set(props.contacts.map((c: any) => c.lastContact))].filter(Boolean)
  return (dates as string[]).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
})

const activeDate = computed(() => {
  if (dateFilterIndex.value === null) return null
  return uniqueDates.value[dateFilterIndex.value] || null
})

const prevDate = () => {
  if (dateFilterIndex.value !== null && dateFilterIndex.value < uniqueDates.value.length - 1) {
    dateFilterIndex.value++
  }
}
const nextDate = () => {
  if (dateFilterIndex.value !== null && dateFilterIndex.value > 0) {
    dateFilterIndex.value--
  }
}

const formatPipelineDate = (dateStr: string | null) => {
  if (!dateStr) return 'Todos'
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })
}

const filteredDisplayContacts = computed(() => {
  let list = props.contacts
  if (statusFilter.value) list = list.filter(c => c.status === statusFilter.value)
  if (activeTagFilter.value) list = list.filter(c => (c.tags || []).includes(activeTagFilter.value))
  if (activeDate.value) list = list.filter(c => c.lastContact === activeDate.value)
  return list
})

// Tag lookup map
const tagMap = computed(() => {
  const m: Record<string, any> = {}
  props.availableTags.forEach((t: any) => { m[t.id] = t })
  return m
})

const counts = computed(() => {
  const result: Record<string, number> = {
    todos: props.contacts.length,
    pendente: 0,
    contatado: 0,
    em_negociacao: 0,
    quente: 0,
    fechado: 0,
    morto: 0
  }
  props.contacts.forEach((c: any) => {
    if (result[c.status] !== undefined) {
      result[c.status]++
    }
  })
  return result
})

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value || 0)
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const getStatusClass = (status: string) => {
  const map: Record<string, string> = {
    'pendente':      'bg-gray-100 text-gray-800 dark:bg-gray-700/60 dark:text-gray-200',
    'contatado':     'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    'em_negociacao': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
    'quente':        'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
    'fechado':       'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
    'morto':         'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
  }
  return map[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700/60 dark:text-gray-200'
}

const formatStatus = (status: string) => {
  const map: Record<string, string> = {
    'pendente':      'Pendente',
    'contatado':     'Contatado',
    'em_negociacao': 'Em Neg.',
    'quente':        'Quente',
    'fechado':       'Fechado',
    'morto':         '💀 Morto'
  }
  return map[status] || status
}

const getPriorityClass = (priority: string) => {
  const map: Record<string, string> = {
    'baixa': 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800',
    'media': 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800',
    'alta': 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800'
  }
  return map[priority] || map['media']
}

// ── Follow-up helpers ───────────────────────────────────────────
const daysSince = (dateStr: string): number => {
  if (!dateStr) return 999
  const d = new Date(dateStr + 'T12:00:00')
  return Math.floor((Date.now() - d.getTime()) / 86_400_000)
}

const isDark = ref(false)

const followUpInfo = (contact: any) => {
  if (['fechado', 'morto'].includes(contact.status)) {
    return { label: 'Encerrado', style: isDark.value ? 'background:#1f2937;color:#94a3b8' : 'background:#f1f5f9;color:#94a3b8', dot: '' }
  }
  const days = daysSince(contact.lastContact)
  if (isDark.value) {
    if (days <= 3)  return { label: days === 0 ? 'Hoje' : `${days}d`, style: 'background:#064e3b;color:#a7f3d0', dot: '🟢' }
    if (days <= 7)  return { label: `${days}d`, style: 'background:#78350f;color:#fde68a', dot: '🟡' }
    if (days <= 14) return { label: `${days}d`, style: 'background:#7c2d12;color:#ffedd5', dot: '🟠' }
    return                 { label: `${days}d`, style: 'background:#7f1d1d;color:#fecaca', dot: '🔴' }
  } else {
    if (days <= 3)  return { label: days === 0 ? 'Hoje' : `${days}d`, style: 'background:#d1fae5;color:#065f46', dot: '🟢' }
    if (days <= 7)  return { label: `${days}d`, style: 'background:#fef3c7;color:#92400e', dot: '🟡' }
    if (days <= 14) return { label: `${days}d`, style: 'background:#ffedd5;color:#9a3412', dot: '🟠' }
    return                 { label: `${days}d`, style: 'background:#fee2e2;color:#b91c1c', dot: '🔴' }
  }
}

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
  const observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})
</script>

<template>
  <div class="glass-panel overflow-hidden transition-all duration-300">

    <!-- Filter bar -->
    <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 flex flex-wrap justify-between items-center bg-white/50 dark:bg-gray-800/50 gap-4">
      <div class="flex flex-col gap-2 flex-1 min-w-0">
        <div class="flex items-center gap-4">
          <h3 class="text-lg font-semibold text-crm-900 dark:text-white">Leads &amp; Contatos</h3>

          <!-- Status filter tabs -->
          <div class="hidden md:flex items-center p-1 bg-gray-100/80 dark:bg-gray-700/60 rounded-lg shadow-inner flex-wrap gap-0.5">
            <button @click="statusFilter = null"            :class="['px-3 py-1.5 text-xs font-semibold rounded-md transition-all', statusFilter === null           ? 'bg-white dark:bg-gray-600 shadow-sm text-crm-900 dark:text-white'    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200']">Todos <span class="ml-1 opacity-60">({{ counts.todos }})</span></button>
            <button @click="statusFilter = 'pendente'"      :class="['px-3 py-1.5 text-xs font-semibold rounded-md transition-all', statusFilter === 'pendente'       ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-800 dark:text-gray-100'   : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200']">Pendentes <span class="ml-1 opacity-60">({{ counts.pendente }})</span></button>
            <button @click="statusFilter = 'contatado'"     :class="['px-3 py-1.5 text-xs font-semibold rounded-md transition-all', statusFilter === 'contatado'      ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-800 dark:text-blue-300'   : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200']">Contatados <span class="ml-1 opacity-60">({{ counts.contatado }})</span></button>
            <button @click="statusFilter = 'em_negociacao'" :class="['px-3 py-1.5 text-xs font-semibold rounded-md transition-all', statusFilter === 'em_negociacao'  ? 'bg-white dark:bg-gray-600 shadow-sm text-yellow-800 dark:text-yellow-300' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200']">Em Negociação <span class="ml-1 opacity-60">({{ counts.em_negociacao }})</span></button>
            <button @click="statusFilter = 'quente'"        :class="['px-3 py-1.5 text-xs font-semibold rounded-md transition-all', statusFilter === 'quente'         ? 'bg-white dark:bg-gray-600 shadow-sm text-orange-800 dark:text-orange-300' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200']">Quentes <span class="ml-1 opacity-60">({{ counts.quente }})</span></button>
            <button @click="statusFilter = 'fechado'"       :class="['px-3 py-1.5 text-xs font-semibold rounded-md transition-all', statusFilter === 'fechado'        ? 'bg-white dark:bg-gray-600 shadow-sm text-green-800 dark:text-green-300'  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200']">Fechados <span class="ml-1 opacity-60">({{ counts.fechado }})</span></button>
            <button @click="statusFilter = 'morto'"         :class="['px-3 py-1.5 text-xs font-semibold rounded-md transition-all', statusFilter === 'morto'          ? 'bg-white dark:bg-gray-600 shadow-sm text-red-700 dark:text-red-300'    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200']">💀 Mortos <span class="ml-1 opacity-60">({{ counts.morto }})</span></button>
          </div>
        </div>

        <!-- Tag filter chips -->
        <div v-if="availableTags.length > 0" class="flex flex-wrap items-center gap-1.5">
          <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mr-1">Tags:</span>
          <button
            v-for="tag in availableTags"
            :key="tag.id"
            @click="toggleTagFilter(tag.id)"
            class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white transition-all"
            :style="{ background: tag.color, opacity: activeTagFilter === tag.id ? '1' : '0.45', outline: activeTagFilter === tag.id ? `2px solid ${tag.color}` : 'none', outlineOffset: '2px' }"
          >
            {{ tag.name }}
            <svg v-if="activeTagFilter === tag.id" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
          </button>
        </div>
      </div>
      <div class="flex items-center gap-2 flex-wrap justify-end">
        
        <!-- Date Selector -->
        <div v-if="uniqueDates.length > 0" class="flex items-center gap-1 rounded-lg px-1 py-1 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
          <button @click="dateFilterIndex = null" :class="['text-[11px] font-bold px-3 py-1.5 rounded-full transition-all duration-200 hover:opacity-80', dateFilterIndex === null ? 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300']">Todos</button>
          
          <div class="flex items-center" :style="dateFilterIndex === null ? 'opacity:0.4;pointer-events:none' : ''">
            <button @click="prevDate" :disabled="dateFilterIndex === null || dateFilterIndex >= uniqueDates.length - 1" class="p-1 rounded-md hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm disabled:opacity-30 transition-all">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <div class="flex flex-col items-center min-w-[90px] px-1 cursor-pointer" @click="dateFilterIndex = dateFilterIndex === null ? 0 : dateFilterIndex">
              <span class="text-xs font-bold text-crm-800 dark:text-gray-100 capitalize">{{ formatPipelineDate(activeDate) }}</span>
            </div>
            <button @click="nextDate" :disabled="dateFilterIndex === null || dateFilterIndex <= 0" class="p-1 rounded-md hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm disabled:opacity-30 transition-all">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        <button v-if="selectedIds.length > 0" @click="deleteSelected" class="btn-primary bg-red-600 hover:bg-red-700 text-xs py-1.5 px-3 whitespace-nowrap">Apagar {{ selectedIds.length }} Selecionados</button>
        <button class="btn-primary text-xs py-1.5 px-3">Exportar</button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-100 dark:divide-gray-700/50">
        <thead class="bg-gray-50/50 dark:bg-gray-800/60">
          <tr>
            <th scope="col" class="px-6 py-3 text-left w-12">
              <input type="checkbox" class="w-4 h-4 text-crm-accent border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800" :checked="isAllSelected" @change="toggleAll" />
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-crm-500 dark:text-gray-400 uppercase tracking-wider">Lead</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-crm-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-crm-500 dark:text-gray-400 uppercase tracking-wider">Prioridade</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-crm-500 dark:text-gray-400 uppercase tracking-wider">Valor / Deal</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-crm-500 dark:text-gray-400 uppercase tracking-wider">Contatos Rápidos</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-crm-500 dark:text-gray-400 uppercase tracking-wider">
              <span class="flex items-center gap-1">🔔 Follow-up</span>
            </th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-crm-500 dark:text-gray-400 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody class="bg-white/40 dark:bg-gray-800/30 divide-y divide-gray-50 dark:divide-gray-700/30">
          <tr v-if="pending" v-for="i in 5" :key="'skeleton-'+i" class="animate-pulse">
            <td class="px-6 py-4 whitespace-nowrap"></td>
            <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div></td>
            <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div></td>
            <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div></td>
            <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div></td>
            <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8"></div></td>
            <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div></td>
            <td class="px-6 py-4 whitespace-nowrap text-right"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 ml-auto"></div></td>
          </tr>

          <template v-else>
            <tr
              v-for="contact in filteredDisplayContacts"
              :key="contact.id"
              class="hover:bg-blue-50/40 dark:hover:bg-blue-900/10 transition-colors duration-150 group cursor-pointer"
              @click="$emit('edit', contact)"
            >
              <td class="px-6 py-4 whitespace-nowrap" @click.stop>
                <input type="checkbox" class="w-4 h-4 text-crm-accent border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 cursor-pointer" :checked="selectedIds.includes(contact.id)" @change="toggleSelection(contact.id)" />
              </td>
              <!-- Lead name + avatar -->
              <td class="px-6 py-4">
                <div class="flex items-center min-w-0">
                  <div class="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden shadow-sm relative">
                    <img
                      v-if="getAvatarSrc(contact)"
                      :src="getAvatarSrc(contact)"
                      :alt="contact.name"
                      class="h-full w-full object-cover"
                      @error="onAvatarError(contact.id)"
                    />
                    <div
                      v-else
                      class="h-full w-full bg-gradient-to-tr from-crm-accent to-blue-300 flex items-center justify-center text-white font-bold"
                    >
                      {{ (contact.name || '?').replace('@', '').charAt(0).toUpperCase() }}
                    </div>
                  </div>
                  <div class="ml-4 min-w-0 flex-1">
                    <div class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[200px] md:max-w-[300px]" :title="contact.name">{{ contact.name }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px] md:max-w-[300px]" :title="contact.notes">{{ contact.notes || 'Sem anotações...' }}</div>
                    <!-- Tags on row -->
                    <div v-if="contact.tags && contact.tags.length > 0" class="flex flex-wrap gap-1 mt-1">
                      <span
                        v-for="tid in contact.tags"
                        :key="tid"
                        v-if="tagMap[tid]"
                        class="inline-flex items-center px-1.5 py-0 rounded-full text-[10px] font-bold text-white"
                        :style="{ background: tagMap[tid].color }"
                      >
                        {{ tagMap[tid].name }}
                      </span>
                    </div>
                  </div>
                </div>
              </td>

              <!-- Status -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['status-badge', getStatusClass(contact.status)]">
                  {{ formatStatus(contact.status) }}
                </span>
              </td>

              <!-- Priority -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['px-2 py-1 text-[10px] font-bold uppercase rounded border', getPriorityClass(contact.priority)]">
                  {{ contact.priority || 'media' }}
                </span>
              </td>

              <!-- Value -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 font-medium">
                {{ formatCurrency(contact.value) }}
              </td>

              <!-- Quick contacts -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <a v-if="contact.whatsapp" :href="`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`" target="_blank" @click.stop class="text-green-500 hover:text-green-600" title="WhatsApp">
                    <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>
                  <a v-if="contact.instagram" :href="`https://instagram.com/${contact.instagram.replace('@', '')}`" target="_blank" @click.stop class="flex items-center gap-1.5 text-pink-500 hover:text-pink-600 group/ig" title="Abrir Instagram">
                    <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    <span class="text-xs font-medium truncate max-w-[110px] underline-offset-2 group-hover/ig:underline">@{{ contact.instagram.replace('@', '') }}</span>
                  </a>
                  <a v-if="contact.email" :href="`mailto:${contact.email}`" target="_blank" @click.stop class="text-blue-500 hover:text-blue-600" title="Email">
                    <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </a>
                  <a v-if="contact.googleMaps" :href="contact.googleMaps" target="_blank" @click.stop class="text-red-500 hover:text-red-600" title="Google Maps">
                    <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </a>
                  <span v-if="!contact.whatsapp && !contact.instagram && !contact.email && !contact.googleMaps" class="text-gray-400 dark:text-gray-600 text-xs">-</span>
                </div>
              </td>

              <!-- Follow-up -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex flex-col gap-0.5">
                  <span
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold w-fit"
                    :style="followUpInfo(contact).style"
                  >
                    {{ followUpInfo(contact).dot }} {{ followUpInfo(contact).label }}
                  </span>
                  <span class="text-[10px] text-gray-400 dark:text-gray-500 pl-1">
                    {{ contact.lastContact ? new Date(contact.lastContact + 'T12:00:00').toLocaleDateString('pt-BR', { day:'numeric', month:'short' }) : '-' }}
                  </span>
                </div>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    @click.stop="$emit('message', contact)"
                    class="text-violet-400 hover:text-violet-600 dark:hover:text-violet-400 p-1 rounded hover:bg-violet-50 dark:hover:bg-violet-900/20"
                    title="Copiar mensagem"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                    </svg>
                  </button>
                  <button @click.stop="$emit('edit', contact)" class="text-crm-400 hover:text-crm-accent p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  </button>
                  <button @click.stop="$emit('delete', contact)" class="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </td>
            </tr>
          </template>

          <tr v-if="!pending && filteredDisplayContacts.length === 0">
            <td colspan="8" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
              Nenhum lead encontrado com esse filtro.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
