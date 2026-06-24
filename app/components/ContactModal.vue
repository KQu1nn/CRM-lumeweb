<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  contact: { type: Object, required: true },
  availableTags: { type: Array as () => any[], default: () => [] },
})

const emit = defineEmits(['save', 'close', 'tags-updated'])

const form    = ref({ ...props.contact })
const loading = ref(false)

// ── Tags state ────────────────────────────────────────────────
const showTagDropdown  = ref(false)
const newTagName       = ref('')
const newTagColor      = ref('#6366f1')
const tagLoading       = ref(false)
const tagError         = ref('')

const PRESET_COLORS = [
  '#6366f1','#3b82f6','#06b6d4','#10b981','#84cc16',
  '#eab308','#f97316','#ef4444','#ec4899','#8b5cf6',
  '#64748b','#0f172a',
]

// IDs of tags assigned to this contact
const selectedTagIds = ref<string[]>(Array.isArray(form.value.tags) ? [...form.value.tags] : [])

const toggleTag = (tagId: string) => {
  const idx = selectedTagIds.value.indexOf(tagId)
  if (idx === -1) selectedTagIds.value.push(tagId)
  else selectedTagIds.value.splice(idx, 1)
}

const isTagSelected = (tagId: string) => selectedTagIds.value.includes(tagId)

const tagById = computed(() => {
  const map: Record<string, any> = {}
  props.availableTags.forEach((t: any) => { map[t.id] = t })
  return map
})

const createTag = async () => {
  const name = newTagName.value.trim()
  if (!name) return
  tagLoading.value = true
  tagError.value   = ''
  try {
    const res: any = await $fetch('/api/tags', {
      method: 'POST',
      body: { name, color: newTagColor.value },
    })
    emit('tags-updated')
    selectedTagIds.value.push(res.tag.id)
    newTagName.value  = ''
    newTagColor.value = '#6366f1'
  } catch (err: any) {
    tagError.value = err?.data?.statusMessage || 'Erro ao criar tag'
  } finally {
    tagLoading.value = false
  }
}

const deleteTag = async (tagId: string, event: Event) => {
  event.stopPropagation()
  if (!confirm('Remover esta tag de todos os leads?')) return
  await $fetch('/api/tags', { method: 'DELETE', body: { id: tagId } })
  selectedTagIds.value = selectedTagIds.value.filter(id => id !== tagId)
  emit('tags-updated')
}

// ── Save ──────────────────────────────────────────────────────
const saveContact = async () => {
  loading.value = true
  try {
    await $fetch('/api/contacts', {
      method: 'PUT',
      body: { contact: { ...form.value, tags: selectedTagIds.value } },
    })
    emit('save')
  } catch (err) {
    console.error('Error saving contact', err)
  } finally {
    loading.value = false
  }
}

// ── Init ──────────────────────────────────────────────────────
onMounted(() => {
  if (!form.value.priority)                         form.value.priority   = 'media'
  if (typeof form.value.hasWebsite === 'undefined') form.value.hasWebsite = false
  if (!form.value.notes)      form.value.notes      = ''
  if (!form.value.whatsapp)   form.value.whatsapp   = ''
  if (!form.value.instagram)  form.value.instagram  = ''
  if (!form.value.googleMaps) form.value.googleMaps = ''
})
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-crm-900/60 dark:bg-black/70 backdrop-blur-sm overflow-y-auto"
    @click.self="saveContact"
  >
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl my-8 animate-fade-in-up border border-gray-100 dark:border-gray-700/50">

      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/60 rounded-t-2xl">
        <h3 class="text-lg font-semibold text-crm-900 dark:text-white">Editar Lead: {{ form.name }}</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- Nome -->
        <div class="col-span-1 md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome / Usuário</label>
          <input v-model="form.name" type="text" class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-mail</label>
          <input v-model="form.email" type="email" class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" />
        </div>

        <!-- WhatsApp -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">WhatsApp</label>
          <input v-model="form.whatsapp" type="text" placeholder="+5511999999999" class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" />
        </div>

        <!-- Instagram -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instagram (@)</label>
          <input v-model="form.instagram" type="text" class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" />
        </div>

        <!-- Google Maps -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Google Maps (URL)</label>
          <input v-model="form.googleMaps" type="url" placeholder="https://maps.app.goo.gl/..." class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" />
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
          <select v-model="form.status" class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <option value="pendente">Pendente</option>
            <option value="contatado">Contatado</option>
            <option value="em_negociacao">Em Negociação</option>
            <option value="quente">Quente</option>
            <option value="fechado">Fechado</option>
            <option value="morto">💀 Morto</option>
          </select>
        </div>

        <!-- Prioridade -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prioridade</label>
          <select v-model="form.priority" class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <!-- Valor -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Valor Recebido / Deal ($)</label>
          <input v-model.number="form.value" type="number" min="0" class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
        </div>

        <!-- Data -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data</label>
          <input v-model="form.lastContact" type="date" class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
        </div>

        <!-- Has Website -->
        <div class="col-span-1 md:col-span-2 flex items-center">
          <input v-model="form.hasWebsite" type="checkbox" id="hasWebsite" class="w-4 h-4 text-crm-accent border-gray-300 dark:border-gray-600 rounded focus:ring-crm-accent bg-white dark:bg-gray-800" />
          <label for="hasWebsite" class="ml-2 block text-sm text-gray-900 dark:text-gray-200">Possui Site</label>
        </div>

        <!-- ── Tags ── -->
        <div class="col-span-1 md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>

          <!-- Selected tags preview -->
          <div class="flex flex-wrap gap-1.5 mb-2 min-h-[28px]">
            <span
              v-for="tid in selectedTagIds"
              :key="tid"
              v-if="tagById[tid]"
              class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white"
              :style="{ background: tagById[tid].color }"
            >
              {{ tagById[tid].name }}
              <button @click="toggleTag(tid)" class="ml-0.5 opacity-70 hover:opacity-100 leading-none text-white">&times;</button>
            </span>
            <span v-if="selectedTagIds.length === 0" class="text-xs text-gray-400 dark:text-gray-500 italic">Nenhuma tag selecionada</span>
          </div>

          <!-- Tag picker trigger -->
          <div class="relative">
            <button
              type="button"
              @click="showTagDropdown = !showTagDropdown"
              class="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full text-left bg-white dark:bg-gray-800"
            >
              <svg class="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
              </svg>
              <span class="text-gray-500 dark:text-gray-400">Gerenciar tags...</span>
              <svg class="w-4 h-4 text-gray-400 dark:text-gray-500 ml-auto transition-transform" :class="showTagDropdown ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Dropdown -->
            <div
              v-if="showTagDropdown"
              class="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-10 p-3"
            >
              <!-- Existing tags list -->
              <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">Tags disponíveis</p>
              <div v-if="availableTags.length === 0" class="text-xs text-gray-400 dark:text-gray-500 mb-3 italic">Nenhuma tag criada ainda.</div>
              <div class="flex flex-wrap gap-1.5 mb-3">
                <button
                  v-for="tag in availableTags"
                  :key="tag.id"
                  type="button"
                  @click="toggleTag(tag.id)"
                  class="group relative inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-white transition-all"
                  :style="{ background: tag.color, opacity: isTagSelected(tag.id) ? '1' : '0.5' }"
                >
                  <svg v-if="isTagSelected(tag.id)" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                  {{ tag.name }}
                  <span
                    @click="deleteTag(tag.id, $event)"
                    class="ml-0.5 opacity-0 group-hover:opacity-100 text-white/80 hover:text-white cursor-pointer leading-none font-bold"
                    title="Deletar tag"
                  >&times;</span>
                </button>
              </div>

              <!-- Create new tag -->
              <div class="border-t border-gray-100 dark:border-gray-700 pt-3">
                <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">Nova tag</p>
                <div class="flex gap-2 items-center">
                  <!-- Color swatches -->
                  <div class="flex gap-1 flex-wrap w-36 shrink-0">
                    <button
                      v-for="c in PRESET_COLORS"
                      :key="c"
                      type="button"
                      @click="newTagColor = c"
                      class="w-5 h-5 rounded-full border-2 transition-all"
                      :style="{ background: c, borderColor: newTagColor === c ? '#fff' : 'transparent' }"
                    />
                  </div>
                  <input
                    v-model="newTagName"
                    type="text"
                    placeholder="Ex: Odontologia"
                    maxlength="24"
                    class="flex-1 px-2 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-crm-accent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    @keydown.enter.prevent="createTag"
                  />
                  <button
                    type="button"
                    @click="createTag"
                    :disabled="!newTagName.trim() || tagLoading"
                    class="px-3 py-1.5 text-xs font-bold text-white rounded-lg disabled:opacity-40 transition-colors"
                    :style="{ background: newTagColor }"
                  >
                    {{ tagLoading ? '...' : 'Criar' }}
                  </button>
                </div>
                <p v-if="tagError" class="text-xs text-red-500 mt-1">{{ tagError }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Notas -->
        <div class="col-span-1 md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anotações / Observações</label>
          <textarea v-model="form.notes" rows="4" class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"></textarea>
        </div>

      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/60 rounded-b-2xl">
        <span class="text-xs text-gray-400 dark:text-gray-500 italic hidden sm:block">💡 Clique fora do modal para salvar</span>
        <div class="flex gap-3">
          <button @click="$emit('close')" class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">Cancelar</button>
          <button @click="saveContact" :disabled="loading" class="btn-primary">
            <span v-if="loading">Salvando...</span>
            <span v-else>Salvar Alterações</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
