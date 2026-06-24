<script setup lang="ts">
const user = useSupabaseUser()

// Se o usuário estiver logado após confirmação, redireciona para a raiz (dashboard)
watch(user, (newUser) => {
  if (newUser) {
    return navigateTo('/')
  }
}, { immediate: true })
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-crm-50 dark:bg-gray-950 font-sans transition-colors duration-300">
    <div class="glass-panel p-8 text-center max-w-sm w-full mx-4 flex flex-col items-center gap-4">
      <svg class="animate-spin h-10 w-10 text-crm-accent" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
      <h2 class="text-xl font-bold text-crm-900 dark:text-white mt-2">Confirmando Acesso</h2>
      <p class="text-sm text-gray-500 dark:text-crm-400">Aguarde um momento enquanto processamos sua autenticação...</p>
    </div>
  </div>
</template>
