<script setup lang="ts">
defineProps({
  summary: {
    type: Object as PropType<{ total: number, activeValue: number, activeCount: number }>,
    default: () => ({ total: 0, activeValue: 0, activeCount: 0 })
  },
  pending: {
    type: Boolean,
    default: false
  }
})

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

    <!-- Total de Contatos -->
    <div class="glass-panel p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
      <div class="absolute -right-6 -top-6 w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
      <dt class="text-sm font-medium text-crm-500 dark:text-gray-400 truncate relative z-10">Total de Contatos</dt>
      <dd class="mt-2 text-3xl font-semibold text-crm-900 dark:text-white relative z-10">
        <span v-if="pending" class="animate-pulse bg-gray-200 dark:bg-gray-700 text-transparent rounded">000</span>
        <span v-else>{{ summary.total }}</span>
      </dd>
    </div>

    <!-- Valor em Negociação -->
    <div class="glass-panel p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
      <div class="absolute -right-6 -top-6 w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
      <dt class="text-sm font-medium text-crm-500 dark:text-gray-400 truncate relative z-10">Valor em Negociação</dt>
      <dd class="mt-2 text-3xl font-semibold text-crm-900 dark:text-white relative z-10">
        <span v-if="pending" class="animate-pulse bg-gray-200 dark:bg-gray-700 text-transparent rounded">$00,000</span>
        <span v-else>{{ formatCurrency(summary.activeValue) }}</span>
      </dd>
    </div>

    <!-- Clientes Ativos -->
    <div class="glass-panel p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
      <div class="absolute -right-6 -top-6 w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
      <dt class="text-sm font-medium text-crm-500 dark:text-gray-400 truncate relative z-10">Clientes Ativos</dt>
      <dd class="mt-2 text-3xl font-semibold text-crm-900 dark:text-white relative z-10 flex items-baseline gap-2">
        <span v-if="pending" class="animate-pulse bg-gray-200 dark:bg-gray-700 text-transparent rounded">00</span>
        <span v-else>{{ summary.activeCount }}</span>
        <span class="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full" v-if="!pending">
          +12%
        </span>
      </dd>
    </div>

  </div>
</template>
