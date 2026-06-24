<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['imported', 'close'])
const textInput = ref('')
const loading = ref(false)

const importLeads = async () => {
  if (!textInput.value.trim()) return
  
  loading.value = true
  try {
    await $fetch('/api/contacts', {
      method: 'POST',
      body: { leads: textInput.value }
    })
    textInput.value = ''
    emit('imported')
  } catch (err) {
    console.error('Error importing leads', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-crm-900/50 backdrop-blur-sm">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in-up">
      <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h3 class="text-lg font-semibold text-crm-900">Importar Leads</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      
      <div class="p-6">
        <p class="text-sm text-gray-500 mb-4">
          Cole uma lista de arrobas (<code class="bg-gray-100 px-1 rounded">@usuario, ...</code>) OU cole um <strong>Array JSON</strong> completo para importar dados avançados.
        </p>
        
        <textarea 
          v-model="textInput"
          class="w-full h-40 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-crm-accent focus:border-crm-accent outline-none transition-all resize-none font-mono text-sm"
          placeholder="[ { &quot;name&quot;: &quot;Maria&quot;, &quot;whatsapp&quot;: &quot;+5511...&quot; } ]"
        ></textarea>
        
        <div class="mt-6 flex justify-end gap-3">
          <button @click="$emit('close')" class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">Cancelar</button>
          <button 
            @click="importLeads" 
            :disabled="loading || !textInput.trim()"
            class="btn-primary"
          >
            <span v-if="loading" class="flex items-center gap-2">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Importando...
            </span>
            <span v-else>Importar Leads</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
