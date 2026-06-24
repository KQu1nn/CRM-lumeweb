<script setup lang="ts">
const supabaseUser = useSupabaseUser()
const supabase = useSupabaseClient()
const isDark = useState<boolean>('isDark')

defineProps<{
  currentPage: 'painel' | 'analise' | 'contatos' | 'templates' | 'kanban' | 'relatorio'
  contactsCount: number
  pending: boolean
}>()

const emit = defineEmits<{
  (e: 'update:currentPage', page: 'painel' | 'analise' | 'contatos' | 'templates' | 'kanban' | 'relatorio'): void
  (e: 'toggle-dark'): void
}>()

const selectPage = (page: 'painel' | 'analise' | 'contatos' | 'templates' | 'kanban' | 'relatorio') => {
  emit('update:currentPage', page)
}

const toggleDark = () => {
  emit('toggle-dark')
}

const logout = async () => {
  if (confirm('Tem certeza que deseja sair do CRM?')) {
    try {
      await supabase.auth.signOut()
      navigateTo('/login')
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }
}
</script>

<template>
  <!-- ── Sidebar ──────────────────────────────────────── -->
  <aside class="w-64 bg-white dark:bg-crm-900 border-r border-gray-100 dark:border-crm-800 text-crm-900 dark:text-white flex flex-col hidden md:flex transition-colors duration-300">
    <!-- Logo -->
    <div class="p-6 border-b border-gray-100 dark:border-crm-800">
      <div class="flex items-center gap-3">
        <img src="/login-icon.png" alt="Lume Web Icon" class="w-8 h-8 object-contain" />
        <span class="text-xl font-bold tracking-tight">CRM Lume Web</span>
      </div>
    </div>

    <!-- Nav -->
    <nav class="flex-1 p-4 space-y-1">
      <!-- Painel -->
      <button
        @click="selectPage('painel')"
        :class="[
          'w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left',
          currentPage === 'painel'
            ? 'bg-crm-50 text-crm-900 dark:bg-crm-800 dark:text-white'
            : 'text-gray-500 hover:text-crm-900 hover:bg-gray-50 dark:text-crm-400 dark:hover:text-white dark:hover:bg-crm-800/50'
        ]"
      >
        <svg class="w-5 h-5 shrink-0" :class="currentPage === 'painel' ? 'text-crm-accent' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
        Painel
      </button>

      <!-- Kanban Board -->
      <button
        @click="selectPage('kanban')"
        :class="[
          'w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left',
          currentPage === 'kanban'
            ? 'bg-crm-50 text-crm-900 dark:bg-crm-800 dark:text-white'
            : 'text-gray-500 hover:text-crm-900 hover:bg-gray-50 dark:text-crm-400 dark:hover:text-white dark:hover:bg-crm-800/50'
        ]"
      >
        <svg class="w-5 h-5 shrink-0" :class="currentPage === 'kanban' ? 'text-crm-accent' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
        Kanban Board
      </button>

      <!-- Aproveitamento do Dia -->
      <button
        @click="selectPage('relatorio')"
        :class="[
          'w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left',
          currentPage === 'relatorio'
            ? 'bg-crm-50 text-crm-900 dark:bg-crm-800 dark:text-white'
            : 'text-gray-500 hover:text-crm-900 hover:bg-gray-50 dark:text-crm-400 dark:hover:text-white dark:hover:bg-crm-800/50'
        ]"
      >
        <svg class="w-5 h-5 shrink-0" :class="currentPage === 'relatorio' ? 'text-crm-accent' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
        Aproveitamento do Dia
      </button>

      <!-- Análise de Leads -->
      <button
        @click="selectPage('analise')"
        :class="[
          'w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left',
          currentPage === 'analise'
            ? 'bg-crm-50 text-crm-900 dark:bg-crm-800 dark:text-white'
            : 'text-gray-500 hover:text-crm-900 hover:bg-gray-50 dark:text-crm-400 dark:hover:text-white dark:hover:bg-crm-800/50'
        ]"
      >
        <svg class="w-5 h-5 shrink-0" :class="currentPage === 'analise' ? 'text-crm-accent' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
        Análise de Leads
        <span class="ml-auto text-[10px] font-bold bg-crm-accent/20 text-crm-accent px-1.5 py-0.5 rounded-full">NEW</span>
      </button>

      <!-- Todos os Contatos -->
      <button
        @click="selectPage('contatos')"
        :class="[
          'w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left',
          currentPage === 'contatos'
            ? 'bg-crm-50 text-crm-900 dark:bg-crm-800 dark:text-white'
            : 'text-gray-500 hover:text-crm-900 hover:bg-gray-50 dark:text-crm-400 dark:hover:text-white dark:hover:bg-crm-800/50'
        ]"
      >
        <svg class="w-5 h-5 shrink-0" :class="currentPage === 'contatos' ? 'text-crm-accent' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
        Todos os Contatos
        <span v-if="!pending" class="ml-auto text-[10px] font-semibold bg-gray-100 text-gray-500 dark:bg-crm-800 dark:text-crm-400 px-1.5 py-0.5 rounded-full">{{ contactsCount }}</span>
      </button>

      <!-- Templates de Mensagem -->
      <button
        @click="selectPage('templates')"
        :class="[
          'w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left',
          currentPage === 'templates'
            ? 'bg-crm-50 text-crm-900 dark:bg-crm-800 dark:text-white'
            : 'text-gray-500 hover:text-crm-900 hover:bg-gray-50 dark:text-crm-400 dark:hover:text-white dark:hover:bg-crm-800/50'
        ]"
      >
        <svg class="w-5 h-5 shrink-0" :class="currentPage === 'templates' ? 'text-crm-accent' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
        </svg>
        Templates
      </button>
    </nav>

    <!-- Dark mode toggle in sidebar -->
    <div class="px-4 py-2 border-t border-gray-100 dark:border-crm-800">
      <button @click="toggleDark" class="w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium text-gray-500 hover:text-crm-900 hover:bg-gray-50 dark:text-crm-400 dark:hover:text-white dark:hover:bg-crm-800/50 transition-all">
        <span class="flex items-center gap-3">
          <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-11.314l.707.707m11.314 11.314l.707.707M12 5a7 7 0 100 14 7 7 0 000-14z"/></svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
          {{ isDark ? 'Modo Escuro' : 'Modo Claro' }}
        </span>
      </button>
    </div>

    <!-- User footer with Logout -->
    <div class="p-4 border-t border-gray-100 dark:border-crm-800 flex items-center justify-between gap-2">
      <div class="flex items-center gap-3 px-2 py-1 min-w-0">
        <div class="w-8 h-8 rounded-full bg-crm-100 text-crm-600 dark:bg-crm-700 flex items-center justify-center text-xs font-bold dark:text-crm-300 transition-colors shrink-0">
          {{ supabaseUser?.email?.charAt(0).toUpperCase() || 'U' }}
        </div>
        <div class="min-w-0">
          <p class="text-sm font-medium truncate" :title="supabaseUser?.email || 'Usuário'">
            {{ supabaseUser?.email?.split('@')[0] || 'Usuário' }}
          </p>
          <p class="text-xs text-gray-500 dark:text-crm-400 transition-colors">Administrador</p>
        </div>
      </div>
      <button
        @click="logout"
        class="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-crm-800/50 shrink-0"
        title="Sair"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
        </svg>
      </button>
    </div>
  </aside>
</template>
