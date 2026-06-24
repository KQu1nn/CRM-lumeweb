<script setup lang="ts">
import { ref, computed, type PropType, onMounted } from 'vue'

const props = defineProps({
  contacts: {
    type: Array as PropType<any[]>,
    default: () => []
  }
})

const isDark = ref(false)
onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
  const observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

// ── Date Navigation ───────────────────────────────────────────
const uniqueDates = computed(() => {
  const dates = [...new Set(props.contacts.map((c: any) => c.lastContact))].filter(Boolean)
  return (dates as string[]).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
})

const currentDateIndex = ref(0)
const activeDate = computed(() => uniqueDates.value[currentDateIndex.value] || null)

const prevDate = () => { if (currentDateIndex.value < uniqueDates.value.length - 1) currentDateIndex.value++ }
const nextDate = () => { if (currentDateIndex.value > 0) currentDateIndex.value-- }

const formatDateLabel = (dateStr: string | null) => {
  if (!dateStr) return 'Sem Data'
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

// ── Daily Data ────────────────────────────────────────────────
const dailyContacts = computed(() => {
  if (!activeDate.value) return []
  return props.contacts.filter((c: any) => c.lastContact === activeDate.value)
})

const metrics = computed(() => {
  const all = dailyContacts.value
  const total = all.length
  
  let contatados = 0
  let mortos = 0
  let fechados = 0
  let quentes_negociacao = 0
  let pendentes = 0

  all.forEach(c => {
    if (c.status === 'contatado') contatados++
    else if (c.status === 'morto') mortos++
    else if (c.status === 'fechado') fechados++
    else if (c.status === 'quente' || c.status === 'em_negociacao') quentes_negociacao++
    else if (c.status === 'pendente') pendentes++
  })

  // Conversion / Health = Non-dead / Total (excluding pendentes or just overall non-dead)
  const resolved = total - pendentes
  const healthRate = resolved > 0 ? Math.round(((resolved - mortos) / resolved) * 100) : 0

  return { total, contatados, mortos, fechados, quentes_negociacao, pendentes, healthRate }
})

const statusBadge = computed<Record<string, string>>(() => isDark.value ? {
  pendente:      'background:#1f2937;color:#d1d5db',
  contatado:     'background:#1e3a5f;color:#93c5fd',
  em_negociacao: 'background:#451a03;color:#fcd34d',
  quente:        'background:#431407;color:#fb923c',
  fechado:       'background:#064e3b;color:#6ee7b7',
  morto:         'background:#450a0a;color:#fca5a5',
} : {
  pendente:      'background:#f3f4f6;color:#374151',
  contatado:     'background:#dbeafe;color:#1d4ed8',
  em_negociacao: 'background:#fef3c7;color:#92400e',
  quente:        'background:#ffedd5;color:#9a3412',
  fechado:       'background:#d1fae5;color:#065f46',
  morto:         'background:#fee2e2;color:#b91c1c',
})

const statusLabel: Record<string, string> = {
  pendente: 'Pendente', contatado: 'Contatado', em_negociacao: 'Em Negociação',
  quente: 'Quente', fechado: 'Fechado', morto: 'Morto'
}
</script>

<template>
  <div class="space-y-6 mb-8">
    
    <!-- ── Date Selector ── -->
    <div class="flex items-center justify-between bg-white/60 dark:bg-gray-900/60 p-5 rounded-2xl shadow-sm border border-white/40 dark:border-gray-800/40 backdrop-blur-md">
      <div>
        <h2 class="text-xl font-bold text-crm-900 dark:text-white">Aproveitamento do Dia</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Resumo das atividades e conversões diárias.</p>
      </div>
      
      <div v-if="uniqueDates.length > 0" class="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-1 border border-gray-100 dark:border-gray-700 shadow-inner">
        <button @click="prevDate" :disabled="currentDateIndex >= uniqueDates.length - 1" class="p-2.5 rounded-lg hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all">
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div class="flex flex-col items-center min-w-[200px] px-2">
          <span class="text-sm font-bold text-crm-800 dark:text-gray-100 capitalize">{{ formatDateLabel(activeDate) }}</span>
          <span class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ metrics.total }} leads tocados</span>
        </div>
        <button @click="nextDate" :disabled="currentDateIndex <= 0" class="p-2.5 rounded-lg hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all">
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>

    <!-- ── KPI Cards ── -->
    <div v-if="dailyContacts.length > 0" class="grid grid-cols-2 md:grid-cols-5 gap-4">
      
      <!-- Total -->
      <div class="glass-panel p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
        <div class="absolute -right-4 -top-4 w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
        <p class="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider relative z-10">Total de Leads</p>
        <p class="text-3xl font-black text-gray-800 dark:text-white mt-1 relative z-10">{{ metrics.total }}</p>
      </div>

      <!-- Enviados/Contatados -->
      <div class="glass-panel p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
        <div class="absolute -right-4 -top-4 w-20 h-20 bg-blue-100 dark:bg-blue-900/40 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
        <p class="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider relative z-10">Contatados / Enviados</p>
        <p class="text-3xl font-black text-blue-700 dark:text-blue-300 mt-1 relative z-10">{{ metrics.contatados }}</p>
      </div>

      <!-- Mortos -->
      <div class="glass-panel p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
        <div class="absolute -right-4 -top-4 w-20 h-20 bg-red-100 dark:bg-red-900/40 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
        <p class="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider relative z-10">Leads Mortos</p>
        <p class="text-3xl font-black text-red-700 dark:text-red-300 mt-1 relative z-10">{{ metrics.mortos }}</p>
      </div>

      <!-- Quentes/Em Negociação -->
      <div class="glass-panel p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
        <div class="absolute -right-4 -top-4 w-20 h-20 bg-orange-100 dark:bg-orange-900/40 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
        <p class="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider relative z-10">Avançados (Quentes)</p>
        <p class="text-3xl font-black text-orange-700 dark:text-orange-300 mt-1 relative z-10">{{ metrics.quentes_negociacao }}</p>
      </div>

      <!-- Fechados -->
      <div class="glass-panel p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
        <div class="absolute -right-4 -top-4 w-20 h-20 bg-emerald-100 dark:bg-emerald-900/40 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
        <p class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider relative z-10">Fechados Hoje</p>
        <p class="text-3xl font-black text-emerald-700 dark:text-emerald-300 mt-1 relative z-10">{{ metrics.fechados }}</p>
      </div>

    </div>

    <!-- ── Breakdown Bar & Leads List ── -->
    <div v-if="dailyContacts.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Visual Breakdown -->
      <div class="lg:col-span-1 space-y-6">
        <div class="glass-panel p-6">
          <h3 class="text-sm font-bold text-crm-900 dark:text-white uppercase tracking-wide mb-5">Distribuição do Dia</h3>
          
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <span class="w-24 text-[11px] font-bold text-gray-500 uppercase">Contatados</span>
              <div class="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                <div class="h-full bg-blue-500 rounded-full" :style="{ width: `${(metrics.contatados / metrics.total) * 100}%` }"></div>
              </div>
              <span class="w-8 text-right text-xs font-bold">{{ metrics.contatados }}</span>
            </div>
            
            <div class="flex items-center gap-3">
              <span class="w-24 text-[11px] font-bold text-gray-500 uppercase">Avançados</span>
              <div class="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                <div class="h-full bg-orange-500 rounded-full" :style="{ width: `${(metrics.quentes_negociacao / metrics.total) * 100}%` }"></div>
              </div>
              <span class="w-8 text-right text-xs font-bold">{{ metrics.quentes_negociacao }}</span>
            </div>

            <div class="flex items-center gap-3">
              <span class="w-24 text-[11px] font-bold text-gray-500 uppercase">Mortos</span>
              <div class="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                <div class="h-full bg-red-500 rounded-full" :style="{ width: `${(metrics.mortos / metrics.total) * 100}%` }"></div>
              </div>
              <span class="w-8 text-right text-xs font-bold">{{ metrics.mortos }}</span>
            </div>

            <div class="flex items-center gap-3">
              <span class="w-24 text-[11px] font-bold text-gray-500 uppercase">Fechados</span>
              <div class="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                <div class="h-full bg-emerald-500 rounded-full" :style="{ width: `${(metrics.fechados / metrics.total) * 100}%` }"></div>
              </div>
              <span class="w-8 text-right text-xs font-bold">{{ metrics.fechados }}</span>
            </div>
          </div>
          
          <div class="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
            <p class="text-center text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Taxa de Aproveitamento</p>
            <div class="flex justify-center items-baseline gap-1">
              <span class="text-4xl font-black" :class="metrics.healthRate > 50 ? 'text-emerald-500' : 'text-orange-500'">{{ metrics.healthRate }}%</span>
              <span class="text-sm font-medium text-gray-400">positivos</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Leads List -->
      <div class="lg:col-span-2 glass-panel p-0 overflow-hidden flex flex-col">
        <div class="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h3 class="text-sm font-bold text-crm-900 dark:text-white uppercase tracking-wide">Leads do Dia</h3>
          <span class="text-xs font-medium text-gray-500">{{ dailyContacts.length }} registros</span>
        </div>
        
        <div class="overflow-y-auto max-h-[400px] p-2 space-y-1 bg-gray-50/50 dark:bg-gray-900/20">
          <div v-for="contact in dailyContacts" :key="contact.id" class="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-sm transition-all">
            <div class="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style="background:linear-gradient(135deg,#6366f1,#60a5fa)">
              {{ (contact.name || '?').replace('@','').charAt(0).toUpperCase() }}
            </div>
            
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">{{ contact.name }}</p>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full" :style="statusBadge[contact.status]">
                  {{ statusLabel[contact.status] || contact.status }}
                </span>
                <span v-if="contact.whatsapp" class="text-[10px] text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded">WhatsApp</span>
                <span v-if="contact.instagram" class="text-[10px] text-rose-600 dark:text-rose-400 font-medium bg-rose-50 dark:bg-rose-900/30 px-1.5 py-0.5 rounded">Instagram</span>
              </div>
            </div>
            
            <div class="text-right shrink-0">
              <p class="text-xs font-bold" :class="contact.value > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'">
                {{ contact.value > 0 ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(contact.value) : '-' }}
              </p>
              <p class="text-[10px] text-gray-500 mt-1 capitalize">{{ contact.priority }}</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>

    <div v-else class="text-center py-20 bg-white/50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
      <p class="text-gray-500 dark:text-gray-400">Nenhum dado encontrado para a data selecionada ou não há registros.</p>
    </div>

  </div>
</template>
