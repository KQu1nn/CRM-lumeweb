<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  contacts:      { type: Array as () => any[], default: () => [] },
  availableTags: { type: Array as () => any[], default: () => [] },
})

const emit = defineEmits(['update-status', 'edit'])

// ── Columns config ────────────────────────────────────────────
const COLUMNS = [
  { id: 'pendente',      label: 'Pendente',       emoji: '⏳', color: '#64748b', bg: 'bg-slate-100   dark:bg-slate-800/60',  border: 'border-slate-300  dark:border-slate-600' },
  { id: 'contatado',     label: 'Contatado',      emoji: '📞', color: '#3b82f6', bg: 'bg-blue-50    dark:bg-blue-900/30',   border: 'border-blue-200   dark:border-blue-700'  },
  { id: 'em_negociacao', label: 'Em Negociação',  emoji: '🤝', color: '#eab308', bg: 'bg-yellow-50  dark:bg-yellow-900/30', border: 'border-yellow-200 dark:border-yellow-700'},
  { id: 'quente',        label: 'Quente',         emoji: '🔥', color: '#f97316', bg: 'bg-orange-50  dark:bg-orange-900/30', border: 'border-orange-200 dark:border-orange-700'},
  { id: 'fechado',       label: 'Fechado',        emoji: '🏆', color: '#22c55e', bg: 'bg-green-50   dark:bg-green-900/30',  border: 'border-green-200  dark:border-green-700' },
]

// ── Per-column contacts ───────────────────────────────────────
const contactsByStatus = computed(() => {
  const map: Record<string, any[]> = {}
  COLUMNS.forEach(col => { map[col.id] = [] })
  props.contacts
    .filter((c: any) => c.status !== 'morto')
    .forEach((c: any) => {
      if (map[c.status]) map[c.status].push(c)
    })
  return map
})

// ── Tag lookup ────────────────────────────────────────────────
const tagMap = computed(() => {
  const m: Record<string, any> = {}
  props.availableTags.forEach((t: any) => { m[t.id] = t })
  return m
})

// ── Drag and drop state ───────────────────────────────────────
const draggingContact = ref<any>(null)
const draggingOver    = ref<string | null>(null)   // column id

const onDragStart = (contact: any, event: DragEvent) => {
  draggingContact.value = contact
  event.dataTransfer!.effectAllowed = 'move'
  // Add dragging class after a microtask so it doesn't disappear the element
  setTimeout(() => {
    const el = (event.target as HTMLElement)
    el.classList.add('dragging')
  }, 0)
}

const onDragEnd = (event: DragEvent) => {
  ;(event.target as HTMLElement).classList.remove('dragging')
  draggingContact.value = null
  draggingOver.value    = null
}

const onDragOver = (colId: string, event: DragEvent) => {
  event.preventDefault()
  event.dataTransfer!.dropEffect = 'move'
  draggingOver.value = colId
}

const onDragLeave = () => {
  draggingOver.value = null
}

const onDrop = async (colId: string, event: DragEvent) => {
  event.preventDefault()
  draggingOver.value = null

  const contact = draggingContact.value
  if (!contact || contact.status === colId) return

  // Optimistic update
  contact.status = colId
  emit('update-status', { contact, newStatus: colId })
}

// ── Follow-up badge ───────────────────────────────────────────
const daysSince = (dateStr: string): number => {
  if (!dateStr) return 999
  return Math.floor((Date.now() - new Date(dateStr + 'T12:00:00').getTime()) / 86_400_000)
}

const followUpStyle = (days: number) => {
  if (days <= 3)  return 'background:#d1fae5;color:#065f46'
  if (days <= 7)  return 'background:#fef3c7;color:#92400e'
  if (days <= 14) return 'background:#ffedd5;color:#9a3412'
  return                 'background:#fee2e2;color:#b91c1c'
}
const followUpDot = (days: number) => days <= 3 ? '🟢' : days <= 7 ? '🟡' : days <= 14 ? '🟠' : '🔴'
</script>

<template>
  <div class="w-full">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-crm-900 dark:text-white">🗂️ Kanban Board</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Arraste os cards para mover leads entre etapas</p>
      </div>
      <div class="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg px-3 py-2">
        <span>{{ contacts.filter((c: any) => c.status !== 'morto').length }} leads ativos</span>
      </div>
    </div>

    <!-- Board -->
    <div class="flex gap-4 overflow-x-auto pb-4 items-start">
      <div
        v-for="col in COLUMNS"
        :key="col.id"
        class="flex-shrink-0 w-64"
      >
        <!-- Column header -->
        <div
          class="flex items-center justify-between mb-3 px-3 py-2 rounded-xl border-l-4"
          :style="{ borderLeftColor: col.color }"
          :class="['bg-white/70 dark:bg-gray-800/70 border border-gray-100 dark:border-gray-700']"
        >
          <div class="flex items-center gap-2">
            <span class="text-base">{{ col.emoji }}</span>
            <span class="text-sm font-bold dark:text-white">{{ col.label }}</span>
          </div>
          <span
            class="text-xs font-black px-2 py-0.5 rounded-full text-white"
            :style="{ background: col.color }"
          >{{ contactsByStatus[col.id]?.length || 0 }}</span>
        </div>

        <!-- Drop zone -->
        <div
          :class="[
            'kanban-col border-2 border-dashed transition-all duration-200',
            col.bg,
            col.border,
            draggingOver === col.id ? 'drag-over' : '',
          ]"
          @dragover="onDragOver(col.id, $event)"
          @dragleave="onDragLeave"
          @drop="onDrop(col.id, $event)"
        >
          <!-- Cards -->
          <div
            v-for="contact in contactsByStatus[col.id]"
            :key="contact.id"
            class="kanban-card group"
            draggable="true"
            @dragstart="onDragStart(contact, $event)"
            @dragend="onDragEnd($event)"
            @click="emit('edit', contact)"
          >
            <!-- Card top: avatar + name + follow-up -->
            <div class="flex items-start gap-2 mb-2">
              <!-- Avatar -->
              <div class="h-8 w-8 shrink-0 rounded-full overflow-hidden">
                <img
                  v-if="contact.instagram"
                  :src="`/api/instagram-avatar?username=${contact.instagram.replace('@','')}`"
                  class="h-full w-full object-cover"
                  :onerror="`this.style.display='none';this.nextElementSibling.style.display='flex'`"
                />
                <div
                  class="h-full w-full rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                  style="background: linear-gradient(135deg, #6366f1, #60a5fa)"
                >
                  {{ (contact.name || '?').replace('@', '').charAt(0).toUpperCase() }}
                </div>
              </div>

              <!-- Name + Instagram -->
              <div class="flex-1 min-w-0">
                <p class="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate leading-tight">
                  {{ contact.name }}
                </p>
                <p v-if="contact.instagram" class="text-[10px] text-pink-500 truncate leading-tight">
                  @{{ contact.instagram.replace('@', '') }}
                </p>
              </div>

              <!-- Follow-up badge -->
              <span
                v-if="contact.lastContact"
                class="text-[10px] font-black px-1.5 py-0.5 rounded-full shrink-0"
                :style="followUpStyle(daysSince(contact.lastContact))"
              >
                {{ followUpDot(daysSince(contact.lastContact)) }}
                {{ daysSince(contact.lastContact) === 0 ? 'Hoje' : `${daysSince(contact.lastContact)}d` }}
              </span>
            </div>

            <!-- Notes snippet -->
            <p v-if="contact.notes" class="text-[10px] text-gray-400 dark:text-gray-500 leading-relaxed line-clamp-2 mb-2">
              {{ contact.notes }}
            </p>

            <!-- Tags -->
            <div v-if="contact.tags && contact.tags.length > 0" class="flex flex-wrap gap-1 mb-2">
              <span
                v-for="tid in contact.tags"
                :key="tid"
                v-if="tagMap[tid]"
                class="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white"
                :style="{ background: tagMap[tid].color }"
              >{{ tagMap[tid].name }}</span>
            </div>

            <!-- Card footer: priority + quick actions -->
            <div class="flex items-center justify-between mt-1 pt-1.5 border-t border-gray-50 dark:border-gray-700">
              <span
                class="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border"
                :class="{
                  'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-700':   contact.priority === 'alta',
                  'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700': contact.priority === 'media',
                  'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-700': contact.priority === 'baixa',
                }"
              >{{ contact.priority || 'media' }}</span>

              <div class="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <a
                  v-if="contact.whatsapp"
                  :href="`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`"
                  target="_blank"
                  @click.stop
                  class="text-green-500 hover:text-green-600"
                  title="WhatsApp"
                >
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a
                  v-if="contact.instagram"
                  :href="`https://instagram.com/${contact.instagram.replace('@', '')}`"
                  target="_blank"
                  @click.stop
                  class="text-pink-500 hover:text-pink-600"
                  title="Instagram"
                >
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Empty column placeholder -->
          <div
            v-if="contactsByStatus[col.id]?.length === 0"
            class="flex flex-col items-center justify-center py-10 text-gray-300 dark:text-gray-600 text-center"
          >
            <span class="text-3xl mb-2 opacity-50">{{ col.emoji }}</span>
            <p class="text-[11px]">Solte um lead aqui</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
