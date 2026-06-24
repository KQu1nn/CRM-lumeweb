<script setup lang="ts">
import { ref, computed, onMounted, type PropType } from 'vue'

const props = defineProps({
  contacts: {
    type: Array as PropType<any[]>,
    default: () => []
  }
})

// ── Dark mode detection ───────────────────────────────────────
const isDark = ref(false)
onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
  const observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

// ── Date navigation (Funil) ───────────────────────────────────
const pipelineDateIndex = ref(0)

const pipelineDates = computed(() => {
  const dates = [...new Set(props.contacts.map((c: any) => c.lastContact))].filter(Boolean)
  return (dates as string[]).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
})

const activePipelineDate = computed(() => pipelineDates.value[pipelineDateIndex.value] || null)

const showAllDates = ref(false)

const pipelineContacts = computed(() => {
  if (showAllDates.value || !activePipelineDate.value) return props.contacts
  return props.contacts.filter((c: any) => c.lastContact === activePipelineDate.value)
})

const prevPipelineDate = () => {
  if (pipelineDateIndex.value < pipelineDates.value.length - 1) pipelineDateIndex.value++
}
const nextPipelineDate = () => {
  if (pipelineDateIndex.value > 0) pipelineDateIndex.value--
}

const formatPipelineDate = (dateStr: string | null) => {
  if (!dateStr) return 'Todos'
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })
}

// ── Closability score (0-100) ─────────────────────────────────
const scoreContact = (c: any): number => {
  const statusScore: Record<string, number> = {
    fechado: 100, quente: 82, em_negociacao: 65,
    contatado: 35, pendente: 18, morto: 0
  }
  const priorityBonus: Record<string, number> = { alta: 15, media: 7, baixa: 0 }
  const base     = statusScore[c.status] ?? 18
  const priority = priorityBonus[c.priority] ?? 7
  const channels = (c.whatsapp ? 5 : 0) + (c.instagram ? 3 : 0) + (c.email ? 3 : 0)
  const value    = c.value > 0 ? 5 : 0
  return Math.min(100, base + priority + channels + value)
}

const scoredContacts = computed(() =>
  props.contacts
    .map(c => ({ ...c, _score: scoreContact(c) }))
    .sort((a, b) => b._score - a._score)
)

const hotLeads = computed(() =>
  scoredContacts.value.filter(c => c.status !== 'fechado' && c.status !== 'morto').slice(0, 5)
)

const coldLeads = computed(() =>
  props.contacts
    .filter(c => c.status === 'morto' || (c.status === 'pendente' && c.priority === 'baixa'))
    .map(c => ({ ...c, _score: scoreContact(c) }))
    .sort((a, b) => a._score - b._score)
    .slice(0, 5)
)

// ── Status counts (filtered by active pipeline date) ─────────
const statusCounts = computed(() => {
  const map: Record<string, number> = {
    fechado: 0, quente: 0, em_negociacao: 0, contatado: 0, pendente: 0, morto: 0
  }
  pipelineContacts.value.forEach((c: any) => { if (map[c.status] !== undefined) map[c.status]++ })
  return map
})

const total = computed(() => pipelineContacts.value.length || 1)

// ── KPI aggregates ────────────────────────────────────────────
const pipelineValue = computed(() =>
  props.contacts.filter(c => ['quente', 'em_negociacao'].includes(c.status))
    .reduce((s, c) => s + (Number(c.value) || 0), 0)
)
const conversionRate = computed(() =>
  props.contacts.length ? Math.round((statusCounts.value.fechado / props.contacts.length) * 100) : 0
)
const avgScore = computed(() =>
  props.contacts.length
    ? Math.round(props.contacts.reduce((s, c) => s + scoreContact(c), 0) / props.contacts.length)
    : 0
)
const withContact = computed(() =>
  props.contacts.filter(c => c.whatsapp || c.instagram || c.email).length
)

const priorityCounts = computed(() => ({
  alta:  props.contacts.filter(c => c.priority === 'alta').length,
  media: props.contacts.filter(c => c.priority === 'media').length,
  baixa: props.contacts.filter(c => c.priority === 'baixa').length,
}))

const fmt = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v)

// ── Style helpers ─────────────────────────────────────────────
const scoreTextColor = (s: number) => {
  if (s >= 75) return '#059669'
  if (s >= 50) return '#d97706'
  if (s >= 25) return '#f97316'
  return '#ef4444'
}
const scoreBarBg = (s: number) => {
  if (s >= 75) return '#10b981'
  if (s >= 50) return '#f59e0b'
  if (s >= 25) return '#fb923c'
  return '#f87171'
}

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
  pendente: 'Pendente', contatado: 'Contatado', em_negociacao: 'Em Neg.',
  quente: 'Quente', fechado: 'Fechado', morto: '💀 Morto'
}

// Pipeline stages
const pipeline = [
  { key: 'pendente',      label: 'Pendente',       bar: '#9ca3af', text: '#4b5563' },
  { key: 'contatado',     label: 'Contatado',      bar: '#60a5fa', text: '#1d4ed8' },
  { key: 'em_negociacao', label: 'Em Negociação',  bar: '#fbbf24', text: '#92400e' },
  { key: 'quente',        label: '🔥 Quente',      bar: '#fb923c', text: '#9a3412' },
  { key: 'fechado',       label: '✅ Fechado',     bar: '#34d399', text: '#065f46' },
  { key: 'morto',         label: '💀 Morto',       bar: '#f87171', text: '#b91c1c' },
]

const priorities = [
  { key: 'alta',  label: '🔴 Alta',   bar: '#f87171' },
  { key: 'media', label: '🔵 Média',  bar: '#60a5fa' },
  { key: 'baixa', label: '🟢 Baixa',  bar: '#34d399' },
]
</script>

<template>
  <div class="space-y-6 mb-8">

    <!-- ── KPI Cards ── -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">

      <div class="glass-panel p-5 flex flex-col gap-1 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
        <div class="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-40 group-hover:scale-150 transition-transform duration-700 bg-violet-200 dark:bg-violet-900/40"></div>
        <p class="text-xs font-semibold text-crm-500 dark:text-gray-400 uppercase tracking-wide relative z-10">Score Médio</p>
        <p class="text-3xl font-bold relative z-10" :style="{ color: scoreTextColor(avgScore) }">
          {{ avgScore }}<span class="text-base font-normal text-gray-400 dark:text-gray-500">/100</span>
        </p>
        <p class="text-xs text-gray-400 dark:text-gray-500 relative z-10">potencial da carteira</p>
      </div>

      <div class="glass-panel p-5 flex flex-col gap-1 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
        <div class="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-40 group-hover:scale-150 transition-transform duration-700 bg-green-200 dark:bg-green-900/40"></div>
        <p class="text-xs font-semibold text-crm-500 dark:text-gray-400 uppercase tracking-wide relative z-10">Taxa de Fechamento</p>
        <p class="text-3xl font-bold relative z-10" style="color:#059669">{{ conversionRate }}%</p>
        <p class="text-xs text-gray-400 dark:text-gray-500 relative z-10">{{ statusCounts.fechado }} de {{ contacts.length }} leads</p>
      </div>

      <div class="glass-panel p-5 flex flex-col gap-1 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
        <div class="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-40 group-hover:scale-150 transition-transform duration-700 bg-yellow-200 dark:bg-yellow-900/40"></div>
        <p class="text-xs font-semibold text-crm-500 dark:text-gray-400 uppercase tracking-wide relative z-10">Pipeline Ativo</p>
        <p class="text-2xl font-bold relative z-10" style="color:#d97706">{{ fmt(pipelineValue) }}</p>
        <p class="text-xs text-gray-400 dark:text-gray-500 relative z-10">quentes + em negociação</p>
      </div>

      <div class="glass-panel p-5 flex flex-col gap-1 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
        <div class="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-40 group-hover:scale-150 transition-transform duration-700 bg-blue-200 dark:bg-blue-900/40"></div>
        <p class="text-xs font-semibold text-crm-500 dark:text-gray-400 uppercase tracking-wide relative z-10">Alcançáveis</p>
        <p class="text-3xl font-bold relative z-10" style="color:#2563eb">{{ withContact }}</p>
        <p class="text-xs text-gray-400 dark:text-gray-500 relative z-10">têm canal de contato</p>
      </div>

    </div>

    <!-- ── Pipeline Funnel ── -->
    <div class="glass-panel p-6">

      <!-- Header with date nav -->
      <div class="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h3 class="text-sm font-semibold text-crm-900 dark:text-white uppercase tracking-wide">Funil de Pipeline</h3>

        <div v-if="pipelineDates.length > 0" class="flex items-center gap-2">
          <!-- Todos button -->
          <button
            @click="showAllDates = !showAllDates"
            :class="['text-[11px] font-bold px-3 py-1.5 rounded-full transition-all duration-200 hover:opacity-80',
              showAllDates ? 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300']"
          >Todos</button>

          <!-- Date arrows -->
          <div
            class="flex items-center gap-1 rounded-lg px-1 py-1 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
            :style="showAllDates ? 'opacity:0.4;pointer-events:none' : ''"
          >
            <button
              @click="prevPipelineDate"
              :disabled="showAllDates || pipelineDateIndex >= pipelineDates.length - 1"
              class="p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm disabled:opacity-30 transition-all"
            >
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>

            <div class="flex flex-col items-center min-w-[110px] px-1">
              <span class="text-xs font-bold text-crm-800 dark:text-gray-100 capitalize">
                {{ formatPipelineDate(activePipelineDate) }}
              </span>
              <span class="text-[10px] text-gray-400 dark:text-gray-500">
                {{ pipelineContacts.length }} contatos
                · {{ pipelineDateIndex + 1 }}/{{ pipelineDates.length }}
              </span>
            </div>

            <button
              @click="nextPipelineDate"
              :disabled="showAllDates || pipelineDateIndex <= 0"
              class="p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm disabled:opacity-30 transition-all"
            >
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Funnel bars -->
      <div class="space-y-3">
        <div v-for="stage in pipeline" :key="stage.key" class="flex items-center gap-3">
          <span class="w-32 text-xs font-semibold text-right shrink-0" :style="{ color: stage.text }">{{ stage.label }}</span>
          <div class="flex-1 bg-gray-100 dark:bg-gray-700/60 rounded-full h-5 overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-700"
              :style="{ width: `${Math.max(statusCounts[stage.key] > 0 ? 2 : 0, (statusCounts[stage.key] / total) * 100)}%`, background: stage.bar }"
            ></div>
          </div>
          <span class="w-8 text-xs font-bold text-gray-700 dark:text-gray-300 text-right shrink-0">{{ statusCounts[stage.key] }}</span>
          <span class="w-10 text-xs text-gray-400 dark:text-gray-500 shrink-0">{{ Math.round((statusCounts[stage.key] / total) * 100) }}%</span>
        </div>
      </div>
    </div>

    <!-- ── Hot + Cold Leads ── -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <!-- Mais Favoráveis -->
      <div class="glass-panel p-6">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-xl">🔥</span>
          <h3 class="text-sm font-semibold text-crm-900 dark:text-white uppercase tracking-wide">Mais Favoráveis ao Fechamento</h3>
        </div>
        <p v-if="hotLeads.length === 0" class="text-gray-400 dark:text-gray-500 text-sm text-center py-4">Nenhum lead ativo encontrado.</p>
        <ul class="space-y-3">
          <li
            v-for="(lead, i) in hotLeads"
            :key="lead.id"
            class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
          >
            <span class="w-5 text-xs font-bold text-gray-400 dark:text-gray-500 text-center shrink-0">{{ i + 1 }}</span>
            <div class="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style="background:linear-gradient(135deg,#6366f1,#60a5fa)">
              {{ (lead.name || '?').replace('@','').charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{{ lead.name }}</p>
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full" :style="statusBadge[lead.status]">
                {{ statusLabel[lead.status] }}
              </span>
            </div>
            <div class="flex flex-col items-end gap-1 shrink-0">
              <span class="text-sm font-bold" :style="{ color: scoreTextColor(lead._score) }">{{ lead._score }}</span>
              <div class="w-16 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                <div class="h-full rounded-full" :style="{ width: `${lead._score}%`, background: scoreBarBg(lead._score) }"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Leads Frios / Mortos -->
      <div class="glass-panel p-6">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-xl">🧊</span>
          <h3 class="text-sm font-semibold text-crm-900 dark:text-white uppercase tracking-wide">Leads Frios / Sem Potencial</h3>
        </div>
        <p v-if="coldLeads.length === 0" class="text-gray-400 dark:text-gray-500 text-sm text-center py-4">Nenhum lead frio. 🎉</p>
        <ul class="space-y-3">
          <li
            v-for="lead in coldLeads"
            :key="lead.id"
            class="flex items-center gap-3 p-2 rounded-lg hover:bg-red-50/40 dark:hover:bg-red-950/20 transition-colors"
          >
            <div class="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 text-xs font-bold shrink-0">
              {{ (lead.name || '?').replace('@','').charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-500 dark:text-gray-400 truncate">{{ lead.name }}</p>
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full" :style="statusBadge[lead.status] ?? (isDark ? 'background:#1f2937;color:#9ca3af' : 'background:#f3f4f6;color:#6b7280')">
                {{ statusLabel[lead.status] ?? lead.status }}
              </span>
            </div>
            <div class="flex flex-col items-end gap-1 shrink-0">
              <span class="text-sm font-bold" style="color:#f87171">{{ lead._score }}</span>
              <div class="w-16 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                <div class="h-full rounded-full" :style="{ width: `${lead._score}%`, background: '#fca5a5' }"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>

    </div>

    <!-- ── Distribuição por Prioridade ── -->
    <div class="glass-panel p-6">
      <h3 class="text-sm font-semibold text-crm-900 dark:text-white uppercase tracking-wide mb-4">Distribuição por Prioridade</h3>
      <div class="flex items-end gap-6 h-28">
        <div v-for="p in priorities" :key="p.key" class="flex-1 flex flex-col items-center gap-1">
          <span class="text-xs font-bold text-gray-700 dark:text-gray-300">{{ priorityCounts[p.key] }}</span>
          <div
            class="w-full rounded-t-lg transition-all duration-700"
            :style="{
              height: `${Math.max(8, (priorityCounts[p.key] / total) * 88)}px`,
              background: p.bar
            }"
          ></div>
          <span class="text-[11px] text-gray-500 dark:text-gray-400 font-medium text-center">{{ p.label }}</span>
        </div>
      </div>
    </div>

  </div>
</template>
