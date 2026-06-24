<script setup lang="ts">
const isDark = useState<boolean>('isDark')

defineProps<{
  title: string
}>()

const emit = defineEmits<{
  (e: 'toggle-dark'): void
  (e: 'new-contact'): void
}>()

const toggleDark = () => {
  emit('toggle-dark')
}

const openImportModal = () => {
  emit('new-contact')
}
</script>

<template>
  <!-- Header -->
  <header class="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-8 py-5 flex items-center justify-between transition-colors duration-300">
    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="Lume Web Logo" class="h-8 md:hidden" />
      <h1 class="text-2xl font-bold text-crm-900 dark:text-white hidden md:block transition-all">
        {{ title }}
      </h1>
    </div>
    <div class="flex items-center gap-4">
      <!-- Botão de Alternar Tema (Dark Mode) -->
      <button
        @click="toggleDark"
        class="p-2 text-crm-400 hover:text-crm-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        title="Alternar Tema"
      >
        <svg v-if="isDark" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-11.314l.707.707m11.314 11.314l.707.707M12 5a7 7 0 100 14 7 7 0 000-14z"/>
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
        </svg>
      </button>

      <button class="text-crm-400 hover:text-crm-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
      </button>
      <button @click="openImportModal" class="btn-primary shadow-md">
        <svg class="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
        Novo Contato
      </button>
    </div>
  </header>
</template>
