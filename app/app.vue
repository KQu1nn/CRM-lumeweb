<script setup lang="ts">
import { onMounted } from 'vue'

// Define o estado compartilhado do tema (Dark Mode)
const isDark = useState('isDark', () => false)

onMounted(() => {
  // Restaura a preferência de tema do usuário ao carregar a página
  if (localStorage.getItem('crm-dark') === '1') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }
})
</script>

<template>
  <div :class="isDark ? 'dark' : ''" class="h-full w-full">
    <NuxtPage />
  </div>
</template>
