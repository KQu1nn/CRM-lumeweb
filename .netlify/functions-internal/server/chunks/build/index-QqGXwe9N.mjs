import { defineComponent, watch, ref, mergeProps, unref, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useSupabaseClient, _ as _imports_0$1 } from './useSupabaseClient-D994WXKg.mjs';
import { d as useSupabaseUser, n as navigateTo, f as useState } from './server.mjs';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'vue-router';
import '@supabase/ssr';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "DashboardSidebar",
  __ssrInlineRender: true,
  props: {
    currentPage: {},
    contactsCount: {},
    pending: { type: Boolean }
  },
  emits: ["update:currentPage", "toggle-dark"],
  setup(__props, { emit: __emit }) {
    const supabaseUser = useSupabaseUser();
    useSupabaseClient();
    const isDark = useState("isDark");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "w-64 bg-white dark:bg-crm-900 border-r border-gray-100 dark:border-crm-800 text-crm-900 dark:text-white flex flex-col hidden md:flex transition-colors duration-300" }, _attrs))}><div class="p-6 border-b border-gray-100 dark:border-crm-800"><div class="flex items-center gap-3"><img${ssrRenderAttr("src", _imports_0$1)} alt="Lume Web Icon" class="w-8 h-8 object-contain"><span class="text-xl font-bold tracking-tight">CRM Lume Web</span></div></div><nav class="flex-1 p-4 space-y-1"><button class="${ssrRenderClass([
        "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left",
        __props.currentPage === "painel" ? "bg-crm-50 text-crm-900 dark:bg-crm-800 dark:text-white" : "text-gray-500 hover:text-crm-900 hover:bg-gray-50 dark:text-crm-400 dark:hover:text-white dark:hover:bg-crm-800/50"
      ])}"><svg class="${ssrRenderClass([__props.currentPage === "painel" ? "text-crm-accent" : "", "w-5 h-5 shrink-0"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> Painel </button><button class="${ssrRenderClass([
        "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left",
        __props.currentPage === "kanban" ? "bg-crm-50 text-crm-900 dark:bg-crm-800 dark:text-white" : "text-gray-500 hover:text-crm-900 hover:bg-gray-50 dark:text-crm-400 dark:hover:text-white dark:hover:bg-crm-800/50"
      ])}"><svg class="${ssrRenderClass([__props.currentPage === "kanban" ? "text-crm-accent" : "", "w-5 h-5 shrink-0"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path></svg> Kanban Board </button><button class="${ssrRenderClass([
        "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left",
        __props.currentPage === "relatorio" ? "bg-crm-50 text-crm-900 dark:bg-crm-800 dark:text-white" : "text-gray-500 hover:text-crm-900 hover:bg-gray-50 dark:text-crm-400 dark:hover:text-white dark:hover:bg-crm-800/50"
      ])}"><svg class="${ssrRenderClass([__props.currentPage === "relatorio" ? "text-crm-accent" : "", "w-5 h-5 shrink-0"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg> Aproveitamento do Dia </button><button class="${ssrRenderClass([
        "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left",
        __props.currentPage === "analise" ? "bg-crm-50 text-crm-900 dark:bg-crm-800 dark:text-white" : "text-gray-500 hover:text-crm-900 hover:bg-gray-50 dark:text-crm-400 dark:hover:text-white dark:hover:bg-crm-800/50"
      ])}"><svg class="${ssrRenderClass([__props.currentPage === "analise" ? "text-crm-accent" : "", "w-5 h-5 shrink-0"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg> Análise de Leads <span class="ml-auto text-[10px] font-bold bg-crm-accent/20 text-crm-accent px-1.5 py-0.5 rounded-full">NEW</span></button><button class="${ssrRenderClass([
        "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left",
        __props.currentPage === "contatos" ? "bg-crm-50 text-crm-900 dark:bg-crm-800 dark:text-white" : "text-gray-500 hover:text-crm-900 hover:bg-gray-50 dark:text-crm-400 dark:hover:text-white dark:hover:bg-crm-800/50"
      ])}"><svg class="${ssrRenderClass([__props.currentPage === "contatos" ? "text-crm-accent" : "", "w-5 h-5 shrink-0"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> Todos os Contatos `);
      if (!__props.pending) {
        _push(`<span class="ml-auto text-[10px] font-semibold bg-gray-100 text-gray-500 dark:bg-crm-800 dark:text-crm-400 px-1.5 py-0.5 rounded-full">${ssrInterpolate(__props.contactsCount)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><button class="${ssrRenderClass([
        "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left",
        __props.currentPage === "templates" ? "bg-crm-50 text-crm-900 dark:bg-crm-800 dark:text-white" : "text-gray-500 hover:text-crm-900 hover:bg-gray-50 dark:text-crm-400 dark:hover:text-white dark:hover:bg-crm-800/50"
      ])}"><svg class="${ssrRenderClass([__props.currentPage === "templates" ? "text-crm-accent" : "", "w-5 h-5 shrink-0"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg> Templates </button></nav><div class="px-4 py-2 border-t border-gray-100 dark:border-crm-800"><button class="w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium text-gray-500 hover:text-crm-900 hover:bg-gray-50 dark:text-crm-400 dark:hover:text-white dark:hover:bg-crm-800/50 transition-all"><span class="flex items-center gap-3">`);
      if (unref(isDark)) {
        _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-11.314l.707.707m11.314 11.314l.707.707M12 5a7 7 0 100 14 7 7 0 000-14z"></path></svg>`);
      } else {
        _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`);
      }
      _push(` ${ssrInterpolate(unref(isDark) ? "Modo Escuro" : "Modo Claro")}</span></button></div><div class="p-4 border-t border-gray-100 dark:border-crm-800 flex items-center justify-between gap-2"><div class="flex items-center gap-3 px-2 py-1 min-w-0"><div class="w-8 h-8 rounded-full bg-crm-100 text-crm-600 dark:bg-crm-700 flex items-center justify-center text-xs font-bold dark:text-crm-300 transition-colors shrink-0">${ssrInterpolate(unref(supabaseUser)?.email?.charAt(0).toUpperCase() || "U")}</div><div class="min-w-0"><p class="text-sm font-medium truncate"${ssrRenderAttr("title", unref(supabaseUser)?.email || "Usuário")}>${ssrInterpolate(unref(supabaseUser)?.email?.split("@")[0] || "Usuário")}</p><p class="text-xs text-gray-500 dark:text-crm-400 transition-colors">Administrador</p></div></div><button class="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-crm-800/50 shrink-0" title="Sair"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg></button></div></aside>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DashboardSidebar.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_0$1 = Object.assign(_sfc_main$b, { __name: "DashboardSidebar" });
const _imports_0 = publicAssetsURL("/logo.png");
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "DashboardHeader",
  __ssrInlineRender: true,
  props: {
    title: {}
  },
  emits: ["toggle-dark", "new-contact"],
  setup(__props, { emit: __emit }) {
    const isDark = useState("isDark");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-8 py-5 flex items-center justify-between transition-colors duration-300" }, _attrs))}><div class="flex items-center gap-4"><img${ssrRenderAttr("src", _imports_0)} alt="Lume Web Logo" class="h-8 md:hidden"><h1 class="text-2xl font-bold text-crm-900 dark:text-white hidden md:block transition-all">${ssrInterpolate(__props.title)}</h1></div><div class="flex items-center gap-4"><button class="p-2 text-crm-400 hover:text-crm-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" title="Alternar Tema">`);
      if (unref(isDark)) {
        _push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-11.314l.707.707m11.314 11.314l.707.707M12 5a7 7 0 100 14 7 7 0 000-14z"></path></svg>`);
      } else {
        _push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`);
      }
      _push(`</button><button class="text-crm-400 hover:text-crm-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg></button><button class="btn-primary shadow-md"><svg class="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> Novo Contato </button></div></header>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DashboardHeader.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$a, { __name: "DashboardHeader" });
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "DashboardStats",
  __ssrInlineRender: true,
  props: {
    summary: {
      type: Object,
      default: () => ({ total: 0, activeValue: 0, activeCount: 0 })
    },
    pending: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" }, _attrs))}><div class="glass-panel p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"><div class="absolute -right-6 -top-6 w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div><dt class="text-sm font-medium text-crm-500 dark:text-gray-400 truncate relative z-10">Total de Contatos</dt><dd class="mt-2 text-3xl font-semibold text-crm-900 dark:text-white relative z-10">`);
      if (__props.pending) {
        _push(`<span class="animate-pulse bg-gray-200 dark:bg-gray-700 text-transparent rounded">000</span>`);
      } else {
        _push(`<span>${ssrInterpolate(__props.summary.total)}</span>`);
      }
      _push(`</dd></div><div class="glass-panel p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"><div class="absolute -right-6 -top-6 w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div><dt class="text-sm font-medium text-crm-500 dark:text-gray-400 truncate relative z-10">Valor em Negociação</dt><dd class="mt-2 text-3xl font-semibold text-crm-900 dark:text-white relative z-10">`);
      if (__props.pending) {
        _push(`<span class="animate-pulse bg-gray-200 dark:bg-gray-700 text-transparent rounded">$00,000</span>`);
      } else {
        _push(`<span>${ssrInterpolate(formatCurrency(__props.summary.activeValue))}</span>`);
      }
      _push(`</dd></div><div class="glass-panel p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"><div class="absolute -right-6 -top-6 w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div><dt class="text-sm font-medium text-crm-500 dark:text-gray-400 truncate relative z-10">Clientes Ativos</dt><dd class="mt-2 text-3xl font-semibold text-crm-900 dark:text-white relative z-10 flex items-baseline gap-2">`);
      if (__props.pending) {
        _push(`<span class="animate-pulse bg-gray-200 dark:bg-gray-700 text-transparent rounded">00</span>`);
      } else {
        _push(`<span>${ssrInterpolate(__props.summary.activeCount)}</span>`);
      }
      if (!__props.pending) {
        _push(`<span class="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full"> +12% </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</dd></div></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DashboardStats.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$9, { __name: "DashboardStats" });
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "CrmTable",
  __ssrInlineRender: true,
  props: {
    contacts: {
      type: Array,
      default: () => []
    },
    pending: {
      type: Boolean,
      default: false
    },
    availableTags: {
      type: Array,
      default: () => []
    }
  },
  emits: ["edit", "delete", "delete-multiple", "message"],
  setup(__props, { emit: __emit }) {
    const avatarErrors = ref({});
    const getAvatarSrc = (contact) => {
      if (!contact.instagram || avatarErrors.value[contact.id]) return null;
      const username = contact.instagram.replace("@", "").trim();
      if (!username) return null;
      return `/api/instagram-avatar?username=${encodeURIComponent(username)}`;
    };
    const props = __props;
    const selectedIds = ref([]);
    const isAllSelected = computed(() => {
      return filteredDisplayContacts.value.length > 0 && selectedIds.value.length === filteredDisplayContacts.value.length;
    });
    const statusFilter = ref(null);
    const activeTagFilter = ref(null);
    const dateFilterIndex = ref(null);
    const uniqueDates = computed(() => {
      const dates = [...new Set(props.contacts.map((c) => c.lastContact))].filter(Boolean);
      return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    });
    const activeDate = computed(() => {
      if (dateFilterIndex.value === null) return null;
      return uniqueDates.value[dateFilterIndex.value] || null;
    });
    const formatPipelineDate = (dateStr) => {
      if (!dateStr) return "Todos";
      const d = /* @__PURE__ */ new Date(dateStr + "T12:00:00");
      return d.toLocaleDateString("pt-BR", { weekday: "short", day: "numeric", month: "short" });
    };
    const filteredDisplayContacts = computed(() => {
      let list = props.contacts;
      if (statusFilter.value) list = list.filter((c) => c.status === statusFilter.value);
      if (activeTagFilter.value) list = list.filter((c) => (c.tags || []).includes(activeTagFilter.value));
      if (activeDate.value) list = list.filter((c) => c.lastContact === activeDate.value);
      return list;
    });
    const tagMap = computed(() => {
      const m = {};
      props.availableTags.forEach((t) => {
        m[t.id] = t;
      });
      return m;
    });
    const counts = computed(() => {
      const result = {
        todos: props.contacts.length,
        pendente: 0,
        contatado: 0,
        em_negociacao: 0,
        quente: 0,
        fechado: 0,
        morto: 0
      };
      props.contacts.forEach((c) => {
        if (result[c.status] !== void 0) {
          result[c.status]++;
        }
      });
      return result;
    });
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value || 0);
    };
    const getStatusClass = (status) => {
      const map = {
        "pendente": "bg-gray-100 text-gray-800 dark:bg-gray-700/60 dark:text-gray-200",
        "contatado": "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
        "em_negociacao": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
        "quente": "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
        "fechado": "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
        "morto": "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
      };
      return map[status] || "bg-gray-100 text-gray-800 dark:bg-gray-700/60 dark:text-gray-200";
    };
    const formatStatus = (status) => {
      const map = {
        "pendente": "Pendente",
        "contatado": "Contatado",
        "em_negociacao": "Em Neg.",
        "quente": "Quente",
        "fechado": "Fechado",
        "morto": "💀 Morto"
      };
      return map[status] || status;
    };
    const getPriorityClass = (priority) => {
      const map = {
        "baixa": "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800",
        "media": "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800",
        "alta": "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800"
      };
      return map[priority] || map["media"];
    };
    const daysSince = (dateStr) => {
      if (!dateStr) return 999;
      const d = /* @__PURE__ */ new Date(dateStr + "T12:00:00");
      return Math.floor((Date.now() - d.getTime()) / 864e5);
    };
    const isDark = ref(false);
    const followUpInfo = (contact) => {
      if (["fechado", "morto"].includes(contact.status)) {
        return { label: "Encerrado", style: isDark.value ? "background:#1f2937;color:#94a3b8" : "background:#f1f5f9;color:#94a3b8", dot: "" };
      }
      const days = daysSince(contact.lastContact);
      if (isDark.value) {
        if (days <= 3) return { label: days === 0 ? "Hoje" : `${days}d`, style: "background:#064e3b;color:#a7f3d0", dot: "🟢" };
        if (days <= 7) return { label: `${days}d`, style: "background:#78350f;color:#fde68a", dot: "🟡" };
        if (days <= 14) return { label: `${days}d`, style: "background:#7c2d12;color:#ffedd5", dot: "🟠" };
        return { label: `${days}d`, style: "background:#7f1d1d;color:#fecaca", dot: "🔴" };
      } else {
        if (days <= 3) return { label: days === 0 ? "Hoje" : `${days}d`, style: "background:#d1fae5;color:#065f46", dot: "🟢" };
        if (days <= 7) return { label: `${days}d`, style: "background:#fef3c7;color:#92400e", dot: "🟡" };
        if (days <= 14) return { label: `${days}d`, style: "background:#ffedd5;color:#9a3412", dot: "🟠" };
        return { label: `${days}d`, style: "background:#fee2e2;color:#b91c1c", dot: "🔴" };
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-panel overflow-hidden transition-all duration-300" }, _attrs))}><div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 flex flex-wrap justify-between items-center bg-white/50 dark:bg-gray-800/50 gap-4"><div class="flex flex-col gap-2 flex-1 min-w-0"><div class="flex items-center gap-4"><h3 class="text-lg font-semibold text-crm-900 dark:text-white">Leads &amp; Contatos</h3><div class="hidden md:flex items-center p-1 bg-gray-100/80 dark:bg-gray-700/60 rounded-lg shadow-inner flex-wrap gap-0.5"><button class="${ssrRenderClass(["px-3 py-1.5 text-xs font-semibold rounded-md transition-all", statusFilter.value === null ? "bg-white dark:bg-gray-600 shadow-sm text-crm-900 dark:text-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"])}">Todos <span class="ml-1 opacity-60">(${ssrInterpolate(counts.value.todos)})</span></button><button class="${ssrRenderClass(["px-3 py-1.5 text-xs font-semibold rounded-md transition-all", statusFilter.value === "pendente" ? "bg-white dark:bg-gray-600 shadow-sm text-gray-800 dark:text-gray-100" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"])}">Pendentes <span class="ml-1 opacity-60">(${ssrInterpolate(counts.value.pendente)})</span></button><button class="${ssrRenderClass(["px-3 py-1.5 text-xs font-semibold rounded-md transition-all", statusFilter.value === "contatado" ? "bg-white dark:bg-gray-600 shadow-sm text-blue-800 dark:text-blue-300" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"])}">Contatados <span class="ml-1 opacity-60">(${ssrInterpolate(counts.value.contatado)})</span></button><button class="${ssrRenderClass(["px-3 py-1.5 text-xs font-semibold rounded-md transition-all", statusFilter.value === "em_negociacao" ? "bg-white dark:bg-gray-600 shadow-sm text-yellow-800 dark:text-yellow-300" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"])}">Em Negociação <span class="ml-1 opacity-60">(${ssrInterpolate(counts.value.em_negociacao)})</span></button><button class="${ssrRenderClass(["px-3 py-1.5 text-xs font-semibold rounded-md transition-all", statusFilter.value === "quente" ? "bg-white dark:bg-gray-600 shadow-sm text-orange-800 dark:text-orange-300" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"])}">Quentes <span class="ml-1 opacity-60">(${ssrInterpolate(counts.value.quente)})</span></button><button class="${ssrRenderClass(["px-3 py-1.5 text-xs font-semibold rounded-md transition-all", statusFilter.value === "fechado" ? "bg-white dark:bg-gray-600 shadow-sm text-green-800 dark:text-green-300" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"])}">Fechados <span class="ml-1 opacity-60">(${ssrInterpolate(counts.value.fechado)})</span></button><button class="${ssrRenderClass(["px-3 py-1.5 text-xs font-semibold rounded-md transition-all", statusFilter.value === "morto" ? "bg-white dark:bg-gray-600 shadow-sm text-red-700 dark:text-red-300" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"])}">💀 Mortos <span class="ml-1 opacity-60">(${ssrInterpolate(counts.value.morto)})</span></button></div></div>`);
      if (__props.availableTags.length > 0) {
        _push(`<div class="flex flex-wrap items-center gap-1.5"><span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mr-1">Tags:</span><!--[-->`);
        ssrRenderList(__props.availableTags, (tag) => {
          _push(`<button class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white transition-all" style="${ssrRenderStyle({ background: tag.color, opacity: activeTagFilter.value === tag.id ? "1" : "0.45", outline: activeTagFilter.value === tag.id ? `2px solid ${tag.color}` : "none", outlineOffset: "2px" })}">${ssrInterpolate(tag.name)} `);
          if (activeTagFilter.value === tag.id) {
            _push(`<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center gap-2 flex-wrap justify-end">`);
      if (uniqueDates.value.length > 0) {
        _push(`<div class="flex items-center gap-1 rounded-lg px-1 py-1 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800"><button class="${ssrRenderClass(["text-[11px] font-bold px-3 py-1.5 rounded-full transition-all duration-200 hover:opacity-80", dateFilterIndex.value === null ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"])}">Todos</button><div class="flex items-center" style="${ssrRenderStyle(dateFilterIndex.value === null ? "opacity:0.4;pointer-events:none" : "")}"><button${ssrIncludeBooleanAttr(dateFilterIndex.value === null || dateFilterIndex.value >= uniqueDates.value.length - 1) ? " disabled" : ""} class="p-1 rounded-md hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm disabled:opacity-30 transition-all"><svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button><div class="flex flex-col items-center min-w-[90px] px-1 cursor-pointer"><span class="text-xs font-bold text-crm-800 dark:text-gray-100 capitalize">${ssrInterpolate(formatPipelineDate(activeDate.value))}</span></div><button${ssrIncludeBooleanAttr(dateFilterIndex.value === null || dateFilterIndex.value <= 0) ? " disabled" : ""} class="p-1 rounded-md hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm disabled:opacity-30 transition-all"><svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (selectedIds.value.length > 0) {
        _push(`<button class="btn-primary bg-red-600 hover:bg-red-700 text-xs py-1.5 px-3 whitespace-nowrap">Apagar ${ssrInterpolate(selectedIds.value.length)} Selecionados</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="btn-primary text-xs py-1.5 px-3">Exportar</button></div></div><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-100 dark:divide-gray-700/50"><thead class="bg-gray-50/50 dark:bg-gray-800/60"><tr><th scope="col" class="px-6 py-3 text-left w-12"><input type="checkbox" class="w-4 h-4 text-crm-accent border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"${ssrIncludeBooleanAttr(isAllSelected.value) ? " checked" : ""}></th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-crm-500 dark:text-gray-400 uppercase tracking-wider">Lead</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-crm-500 dark:text-gray-400 uppercase tracking-wider">Status</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-crm-500 dark:text-gray-400 uppercase tracking-wider">Prioridade</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-crm-500 dark:text-gray-400 uppercase tracking-wider">Valor / Deal</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-crm-500 dark:text-gray-400 uppercase tracking-wider">Contatos Rápidos</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-crm-500 dark:text-gray-400 uppercase tracking-wider"><span class="flex items-center gap-1">🔔 Follow-up</span></th><th scope="col" class="px-6 py-3 text-right text-xs font-medium text-crm-500 dark:text-gray-400 uppercase tracking-wider">Ações</th></tr></thead><tbody class="bg-white/40 dark:bg-gray-800/30 divide-y divide-gray-50 dark:divide-gray-700/30">`);
      if (__props.pending) {
        _push(`<!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<tr class="animate-pulse"><td class="px-6 py-4 whitespace-nowrap"></td><td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8"></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div></td><td class="px-6 py-4 whitespace-nowrap text-right"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 ml-auto"></div></td></tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(filteredDisplayContacts.value, (contact) => {
          _push(`<tr class="hover:bg-blue-50/40 dark:hover:bg-blue-900/10 transition-colors duration-150 group cursor-pointer"><td class="px-6 py-4 whitespace-nowrap"><input type="checkbox" class="w-4 h-4 text-crm-accent border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 cursor-pointer"${ssrIncludeBooleanAttr(selectedIds.value.includes(contact.id)) ? " checked" : ""}></td><td class="px-6 py-4"><div class="flex items-center min-w-0"><div class="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden shadow-sm relative">`);
          if (getAvatarSrc(contact)) {
            _push(`<img${ssrRenderAttr("src", getAvatarSrc(contact))}${ssrRenderAttr("alt", contact.name)} class="h-full w-full object-cover">`);
          } else {
            _push(`<div class="h-full w-full bg-gradient-to-tr from-crm-accent to-blue-300 flex items-center justify-center text-white font-bold">${ssrInterpolate((contact.name || "?").replace("@", "").charAt(0).toUpperCase())}</div>`);
          }
          _push(`</div><div class="ml-4 min-w-0 flex-1"><div class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[200px] md:max-w-[300px]"${ssrRenderAttr("title", contact.name)}>${ssrInterpolate(contact.name)}</div><div class="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px] md:max-w-[300px]"${ssrRenderAttr("title", contact.notes)}>${ssrInterpolate(contact.notes || "Sem anotações...")}</div>`);
          if (contact.tags && contact.tags.length > 0) {
            _push(`<div class="flex flex-wrap gap-1 mt-1">`);
            if (tagMap.value[_ctx.tid]) {
              _push(`<!--[-->`);
              ssrRenderList(contact.tags, (tid) => {
                _push(`<span class="inline-flex items-center px-1.5 py-0 rounded-full text-[10px] font-bold text-white" style="${ssrRenderStyle({ background: tagMap.value[tid].color })}">${ssrInterpolate(tagMap.value[tid].name)}</span>`);
              });
              _push(`<!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></td><td class="px-6 py-4 whitespace-nowrap"><span class="${ssrRenderClass(["status-badge", getStatusClass(contact.status)])}">${ssrInterpolate(formatStatus(contact.status))}</span></td><td class="px-6 py-4 whitespace-nowrap"><span class="${ssrRenderClass(["px-2 py-1 text-[10px] font-bold uppercase rounded border", getPriorityClass(contact.priority)])}">${ssrInterpolate(contact.priority || "media")}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 font-medium">${ssrInterpolate(formatCurrency(contact.value))}</td><td class="px-6 py-4 whitespace-nowrap"><div class="flex items-center gap-2">`);
          if (contact.whatsapp) {
            _push(`<a${ssrRenderAttr("href", `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`)} target="_blank" class="text-green-500 hover:text-green-600" title="WhatsApp"><svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg></a>`);
          } else {
            _push(`<!---->`);
          }
          if (contact.instagram) {
            _push(`<a${ssrRenderAttr("href", `https://instagram.com/${contact.instagram.replace("@", "")}`)} target="_blank" class="flex items-center gap-1.5 text-pink-500 hover:text-pink-600 group/ig" title="Abrir Instagram"><svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path></svg><span class="text-xs font-medium truncate max-w-[110px] underline-offset-2 group-hover/ig:underline">@${ssrInterpolate(contact.instagram.replace("@", ""))}</span></a>`);
          } else {
            _push(`<!---->`);
          }
          if (contact.email) {
            _push(`<a${ssrRenderAttr("href", `mailto:${contact.email}`)} target="_blank" class="text-blue-500 hover:text-blue-600" title="Email"><svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></a>`);
          } else {
            _push(`<!---->`);
          }
          if (contact.googleMaps) {
            _push(`<a${ssrRenderAttr("href", contact.googleMaps)} target="_blank" class="text-red-500 hover:text-red-600" title="Google Maps"><svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></a>`);
          } else {
            _push(`<!---->`);
          }
          if (!contact.whatsapp && !contact.instagram && !contact.email && !contact.googleMaps) {
            _push(`<span class="text-gray-400 dark:text-gray-600 text-xs">-</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></td><td class="px-6 py-4 whitespace-nowrap"><div class="flex flex-col gap-0.5"><span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold w-fit" style="${ssrRenderStyle(followUpInfo(contact).style)}">${ssrInterpolate(followUpInfo(contact).dot)} ${ssrInterpolate(followUpInfo(contact).label)}</span><span class="text-[10px] text-gray-400 dark:text-gray-500 pl-1">${ssrInterpolate(contact.lastContact ? (/* @__PURE__ */ new Date(contact.lastContact + "T12:00:00")).toLocaleDateString("pt-BR", { day: "numeric", month: "short" }) : "-")}</span></div></td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><div class="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity"><button class="text-violet-400 hover:text-violet-600 dark:hover:text-violet-400 p-1 rounded hover:bg-violet-50 dark:hover:bg-violet-900/20" title="Copiar mensagem"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg></button><button class="text-crm-400 hover:text-crm-accent p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button><button class="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></td></tr>`);
        });
        _push(`<!--]-->`);
      }
      if (!__props.pending && filteredDisplayContacts.value.length === 0) {
        _push(`<tr><td colspan="8" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400"> Nenhum lead encontrado com esse filtro. </td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CrmTable.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$8, { __name: "CrmTable" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "DashboardPainel",
  __ssrInlineRender: true,
  props: {
    contacts: {},
    pending: { type: Boolean },
    availableTags: {}
  },
  emits: ["edit", "delete", "delete-multiple", "message"],
  setup(__props, { emit: __emit }) {
    const isDark = useState("isDark");
    const props = __props;
    const emit = __emit;
    const currentDateIndex = ref(0);
    const uniqueDates = computed(() => {
      const dates = [...new Set(props.contacts.map((c) => c.lastContact))].filter(Boolean);
      return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    });
    const activeDate = computed(() => uniqueDates.value[currentDateIndex.value] || null);
    const filteredContacts = computed(() => {
      if (!activeDate.value) return [];
      return props.contacts.filter((c) => c.lastContact === activeDate.value && c.status !== "morto");
    });
    const deadContacts = computed(
      () => props.contacts.filter((c) => c.status === "morto").sort((a, b) => new Date(b.lastContact || "").getTime() - new Date(a.lastContact || "").getTime())
    );
    const deadSectionOpen = ref(false);
    const daysSinceApp = (dateStr) => {
      if (!dateStr) return 999;
      return Math.floor((Date.now() - (/* @__PURE__ */ new Date(dateStr + "T12:00:00")).getTime()) / 864e5);
    };
    const urgentFollowUps = computed(
      () => props.contacts.filter((c) => !["fechado", "morto"].includes(c.status)).map((c) => ({ ...c, _days: daysSinceApp(c.lastContact) })).sort((a, b) => b._days - a._days).slice(0, 8)
    );
    const followUpSectionOpen = ref(true);
    const followUpBadgeStyle = (days) => {
      if (isDark.value) {
        if (days <= 3) return "background:#064e3b;color:#a7f3d0";
        if (days <= 7) return "background:#78350f;color:#fde68a";
        if (days <= 14) return "background:#7c2d12;color:#ffedd5";
        return "background:#7f1d1d;color:#fecaca";
      } else {
        if (days <= 3) return "background:#d1fae5;color:#065f46";
        if (days <= 7) return "background:#fef3c7;color:#92400e";
        if (days <= 14) return "background:#ffedd5;color:#9a3412";
        return "background:#fee2e2;color:#b91c1c";
      }
    };
    const followUpDot = (days) => {
      if (days <= 3) return "🟢";
      if (days <= 7) return "🟡";
      if (days <= 14) return "🟠";
      return "🔴";
    };
    const getFollowUpCardStyle = (days) => {
      if (isDark.value) {
        if (days > 7) return "background:#450a0a;border-color:#7f1d1d";
        if (days > 3) return "background:#7c2d12;border-color:#9a3412";
        return "background:#064e3b;border-color:#065f46";
      } else {
        if (days > 7) return "background:#fff7ed;border-color:#fed7aa";
        if (days > 3) return "background:#fffbeb;border-color:#fde68a";
        return "background:#f0fdf4;border-color:#bbf7d0";
      }
    };
    const summary = computed(() => {
      const current = filteredContacts.value;
      return {
        total: current.length,
        activeCount: current.filter((c) => ["fechado", "quente", "em_negociacao"].includes(c.status)).length,
        activeValue: current.reduce((sum, c) => sum + (Number(c.value) || 0), 0)
      };
    });
    const formatDateLabel = (dateStr) => {
      if (!dateStr) return "Sem Data";
      return new Date(dateStr).toLocaleDateString("pt-BR", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DashboardStats = __nuxt_component_0;
      const _component_CrmTable = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_DashboardStats, {
        summary: summary.value,
        pending: __props.pending
      }, null, _parent));
      if (!__props.pending && urgentFollowUps.value.length > 0) {
        _push(`<div class="mb-4"><button class="w-full flex items-center justify-between px-5 py-3 rounded-xl border transition-all duration-200 mb-2" style="${ssrRenderStyle(followUpSectionOpen.value ? unref(isDark) ? "background:linear-gradient(135deg,#1f2937,#111827);border-color:#374151" : "background:linear-gradient(135deg,#1e293b,#0f172a);border-color:#334155" : unref(isDark) ? "background:rgba(124,45,18,0.2);border-color:rgba(234,88,12,0.3)" : "background:#fff7ed;border-color:#fed7aa")}"><div class="flex items-center gap-3"><span class="text-lg">🔔</span><span class="${ssrRenderClass(["text-sm font-bold uppercase tracking-wide", followUpSectionOpen.value ? "text-orange-400" : "text-orange-700 dark:text-orange-300"])}"> Follow-up Urgente </span><span class="${ssrRenderClass(["text-xs font-bold px-2 py-0.5 rounded-full", followUpSectionOpen.value ? "bg-orange-950 text-orange-400" : "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300"])}">${ssrInterpolate(urgentFollowUps.value.filter((c) => c._days > 3).length)} precisam de atenção </span></div><svg class="w-4 h-4 transition-transform duration-300" style="${ssrRenderStyle(followUpSectionOpen.value ? "color:#fb923c;transform:rotate(180deg)" : unref(isDark) ? "color:#fdba74" : "color:#c2410c")}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" style="${ssrRenderStyle(followUpSectionOpen.value ? null : { display: "none" })}"><!--[-->`);
        ssrRenderList(urgentFollowUps.value, (contact) => {
          _push(`<div class="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style="${ssrRenderStyle(getFollowUpCardStyle(contact._days))}"><div class="h-9 w-9 flex-shrink-0 rounded-full overflow-hidden">`);
          if (contact.instagram) {
            _push(`<img${ssrRenderAttr("src", `/api/instagram-avatar?username=${contact.instagram.replace("@", "")}`)} class="h-full w-full object-cover"${ssrRenderAttr("onerror", `this.style.display='none';this.nextElementSibling.style.display='flex'`)}>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="h-full w-full rounded-full flex items-center justify-center text-white text-xs font-bold" style="${ssrRenderStyle({ "background": "linear-gradient(135deg,#6366f1,#60a5fa)" })}">${ssrInterpolate((contact.name || "?").replace("@", "").charAt(0).toUpperCase())}</div></div><div class="flex-1 min-w-0"><p class="text-xs font-semibold text-gray-800 dark:text-gray-100 truncate">${ssrInterpolate(contact.name)}</p><p class="text-[10px] text-gray-500 dark:text-gray-400 capitalize">${ssrInterpolate(contact.status.replace("_", " "))}</p></div><span class="text-[11px] font-black px-2 py-0.5 rounded-full shrink-0" style="${ssrRenderStyle(followUpBadgeStyle(contact._days))}">${ssrInterpolate(followUpDot(contact._days))} ${ssrInterpolate(contact._days === 0 ? "Hoje" : `${contact._days}d`)}</span></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center justify-between mb-4 bg-white/60 dark:bg-gray-900/60 p-4 rounded-xl shadow-sm border border-white/40 dark:border-gray-800/40 backdrop-blur-md transition-colors duration-300"><h2 class="text-lg font-semibold text-crm-900 dark:text-white">Leads por Data</h2>`);
      if (uniqueDates.value.length > 0) {
        _push(`<div class="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-1 border border-gray-100 dark:border-gray-700 shadow-inner"><button${ssrIncludeBooleanAttr(currentDateIndex.value >= uniqueDates.value.length - 1) ? " disabled" : ""} class="p-2 rounded-md hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all"><svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button><div class="flex flex-col items-center min-w-[150px]"><span class="text-sm font-bold text-crm-800 dark:text-gray-100 capitalize">${ssrInterpolate(formatDateLabel(activeDate.value))}</span><span class="text-xs text-gray-500 dark:text-gray-400">${ssrInterpolate(filteredContacts.value.length)} contatos</span></div><button${ssrIncludeBooleanAttr(currentDateIndex.value <= 0) ? " disabled" : ""} class="p-2 rounded-md hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all"><svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div>`);
      } else {
        _push(`<div class="text-sm text-gray-500 dark:text-gray-400">Nenhuma data encontrada</div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_CrmTable, {
        contacts: filteredContacts.value,
        pending: __props.pending,
        availableTags: __props.availableTags,
        onEdit: ($event) => emit("edit", $event),
        onDelete: ($event) => emit("delete", $event),
        onDeleteMultiple: ($event) => emit("delete-multiple", $event),
        onMessage: ($event) => emit("message", $event)
      }, null, _parent));
      if (!__props.pending && deadContacts.value.length > 0) {
        _push(`<div class="mt-6"><button class="w-full flex items-center justify-between px-5 py-3 rounded-xl border transition-all duration-200 group" style="${ssrRenderStyle(deadSectionOpen.value ? unref(isDark) ? "background:#1f2937;border-color:#374151" : "background:#1e293b;border-color:#334155" : unref(isDark) ? "background:rgba(69,10,10,0.2);border-color:rgba(127,29,29,0.3)" : "background:#fff1f2;border-color:#fecaca")}"><div class="flex items-center gap-3"><span class="text-lg">💀</span><span class="${ssrRenderClass(["text-sm font-bold uppercase tracking-wide", deadSectionOpen.value ? "text-red-400" : "text-red-700 dark:text-red-300"])}"> Leads Mortos </span><span class="${ssrRenderClass(["text-xs font-bold px-2 py-0.5 rounded-full", deadSectionOpen.value ? "bg-red-950 text-red-400" : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"])}">${ssrInterpolate(deadContacts.value.length)}</span></div><svg class="w-4 h-4 transition-transform duration-300" style="${ssrRenderStyle(deadSectionOpen.value ? "color:#f87171;transform:rotate(180deg)" : unref(isDark) ? "color:#fca5a5" : "color:#b91c1c")}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div class="mt-2 overflow-hidden rounded-xl border border-red-200 dark:border-red-900/40 transition-colors duration-300" style="${ssrRenderStyle([
          unref(isDark) ? "background:rgba(69,10,10,0.1)" : "background:rgba(254,242,242,0.5)",
          deadSectionOpen.value ? null : { display: "none" }
        ])}"><table class="min-w-full divide-y divide-red-100 dark:divide-red-900/20"><thead style="${ssrRenderStyle(unref(isDark) ? "background:rgba(69,10,10,0.3)" : "background:rgba(254,226,226,0.6)")}"><tr><th scope="col" class="${ssrRenderClass(["px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", unref(isDark) ? "text-red-300" : "text-red-700"])}">Lead</th><th scope="col" class="${ssrRenderClass(["px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", unref(isDark) ? "text-red-300" : "text-red-700"])}">Data</th><th scope="col" class="${ssrRenderClass(["px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", unref(isDark) ? "text-red-300" : "text-red-700"])}">Notas</th><th scope="col" class="${ssrRenderClass(["px-6 py-3 text-right text-xs font-medium uppercase tracking-wider", unref(isDark) ? "text-red-300" : "text-red-700"])}">Ações</th></tr></thead><tbody class="divide-y divide-red-50 dark:divide-red-950/30"><!--[-->`);
        ssrRenderList(deadContacts.value, (contact) => {
          _push(`<tr class="group transition-colors duration-150 cursor-pointer hover:bg-red-100/50 dark:hover:bg-red-950/20"><td class="px-6 py-3"><div class="flex items-center gap-3"><div class="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">${ssrInterpolate((contact.name || "?").replace("@", "").charAt(0).toUpperCase())}</div><div><p class="text-sm font-medium text-red-900 dark:text-red-300">${ssrInterpolate(contact.name)}</p><div class="flex items-center gap-2 mt-0.5">`);
          if (contact.instagram) {
            _push(`<a${ssrRenderAttr("href", `https://instagram.com/${contact.instagram.replace("@", "")}`)} target="_blank" class="text-xs text-rose-700 dark:text-rose-400">@${ssrInterpolate(contact.instagram.replace("@", ""))}</a>`);
          } else {
            _push(`<!---->`);
          }
          if (contact.whatsapp) {
            _push(`<a${ssrRenderAttr("href", `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`)} target="_blank" class="text-xs text-green-700 dark:text-green-400">WhatsApp</a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div></td><td class="px-6 py-3 text-xs text-gray-400 dark:text-gray-500">${ssrInterpolate(contact.lastContact ? (/* @__PURE__ */ new Date(contact.lastContact + "T12:00:00")).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" }) : "-")}</td><td class="px-6 py-3 text-xs max-w-[200px] truncate text-gray-400 dark:text-gray-500"${ssrRenderAttr("title", contact.notes)}>${ssrInterpolate(contact.notes || "Sem anotações")}</td><td class="px-6 py-3 text-right"><div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"><button class="p-1 rounded hover:bg-red-100 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400" title="Editar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button><button class="p-1 rounded hover:bg-red-200 dark:hover:bg-red-950/60 text-red-800 dark:text-red-300" title="Excluir"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DashboardPainel.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$7, { __name: "DashboardPainel" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "KanbanBoard",
  __ssrInlineRender: true,
  props: {
    contacts: { type: Array, default: () => [] },
    availableTags: { type: Array, default: () => [] }
  },
  emits: ["update-status", "edit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const COLUMNS = [
      { id: "pendente", label: "Pendente", emoji: "⏳", color: "#64748b", bg: "bg-slate-100   dark:bg-slate-800/60", border: "border-slate-300  dark:border-slate-600" },
      { id: "contatado", label: "Contatado", emoji: "📞", color: "#3b82f6", bg: "bg-blue-50    dark:bg-blue-900/30", border: "border-blue-200   dark:border-blue-700" },
      { id: "em_negociacao", label: "Em Negociação", emoji: "🤝", color: "#eab308", bg: "bg-yellow-50  dark:bg-yellow-900/30", border: "border-yellow-200 dark:border-yellow-700" },
      { id: "quente", label: "Quente", emoji: "🔥", color: "#f97316", bg: "bg-orange-50  dark:bg-orange-900/30", border: "border-orange-200 dark:border-orange-700" },
      { id: "fechado", label: "Fechado", emoji: "🏆", color: "#22c55e", bg: "bg-green-50   dark:bg-green-900/30", border: "border-green-200  dark:border-green-700" }
    ];
    const contactsByStatus = computed(() => {
      const map = {};
      COLUMNS.forEach((col) => {
        map[col.id] = [];
      });
      props.contacts.filter((c) => c.status !== "morto").forEach((c) => {
        if (map[c.status]) map[c.status].push(c);
      });
      return map;
    });
    const tagMap = computed(() => {
      const m = {};
      props.availableTags.forEach((t) => {
        m[t.id] = t;
      });
      return m;
    });
    ref(null);
    const draggingOver = ref(null);
    const daysSince = (dateStr) => {
      if (!dateStr) return 999;
      return Math.floor((Date.now() - (/* @__PURE__ */ new Date(dateStr + "T12:00:00")).getTime()) / 864e5);
    };
    const followUpStyle = (days) => {
      if (days <= 3) return "background:#d1fae5;color:#065f46";
      if (days <= 7) return "background:#fef3c7;color:#92400e";
      if (days <= 14) return "background:#ffedd5;color:#9a3412";
      return "background:#fee2e2;color:#b91c1c";
    };
    const followUpDot = (days) => days <= 3 ? "🟢" : days <= 7 ? "🟡" : days <= 14 ? "🟠" : "🔴";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}><div class="flex items-center justify-between mb-6"><div><h2 class="text-2xl font-bold text-crm-900 dark:text-white">🗂️ Kanban Board</h2><p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Arraste os cards para mover leads entre etapas</p></div><div class="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg px-3 py-2"><span>${ssrInterpolate(__props.contacts.filter((c) => c.status !== "morto").length)} leads ativos</span></div></div><div class="flex gap-4 overflow-x-auto pb-4 items-start"><!--[-->`);
      ssrRenderList(COLUMNS, (col) => {
        _push(`<div class="flex-shrink-0 w-64"><div style="${ssrRenderStyle({ borderLeftColor: col.color })}" class="${ssrRenderClass([["bg-white/70 dark:bg-gray-800/70 border border-gray-100 dark:border-gray-700"], "flex items-center justify-between mb-3 px-3 py-2 rounded-xl border-l-4"])}"><div class="flex items-center gap-2"><span class="text-base">${ssrInterpolate(col.emoji)}</span><span class="text-sm font-bold dark:text-white">${ssrInterpolate(col.label)}</span></div><span class="text-xs font-black px-2 py-0.5 rounded-full text-white" style="${ssrRenderStyle({ background: col.color })}">${ssrInterpolate(contactsByStatus.value[col.id]?.length || 0)}</span></div><div class="${ssrRenderClass([
          "kanban-col border-2 border-dashed transition-all duration-200",
          col.bg,
          col.border,
          draggingOver.value === col.id ? "drag-over" : ""
        ])}"><!--[-->`);
        ssrRenderList(contactsByStatus.value[col.id], (contact) => {
          _push(`<div class="kanban-card group" draggable="true"><div class="flex items-start gap-2 mb-2"><div class="h-8 w-8 shrink-0 rounded-full overflow-hidden">`);
          if (contact.instagram) {
            _push(`<img${ssrRenderAttr("src", `/api/instagram-avatar?username=${contact.instagram.replace("@", "")}`)} class="h-full w-full object-cover"${ssrRenderAttr("onerror", `this.style.display='none';this.nextElementSibling.style.display='flex'`)}>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="h-full w-full rounded-full flex items-center justify-center text-white text-[10px] font-bold" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, #6366f1, #60a5fa)" })}">${ssrInterpolate((contact.name || "?").replace("@", "").charAt(0).toUpperCase())}</div></div><div class="flex-1 min-w-0"><p class="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate leading-tight">${ssrInterpolate(contact.name)}</p>`);
          if (contact.instagram) {
            _push(`<p class="text-[10px] text-pink-500 truncate leading-tight"> @${ssrInterpolate(contact.instagram.replace("@", ""))}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (contact.lastContact) {
            _push(`<span class="text-[10px] font-black px-1.5 py-0.5 rounded-full shrink-0" style="${ssrRenderStyle(followUpStyle(daysSince(contact.lastContact)))}">${ssrInterpolate(followUpDot(daysSince(contact.lastContact)))} ${ssrInterpolate(daysSince(contact.lastContact) === 0 ? "Hoje" : `${daysSince(contact.lastContact)}d`)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (contact.notes) {
            _push(`<p class="text-[10px] text-gray-400 dark:text-gray-500 leading-relaxed line-clamp-2 mb-2">${ssrInterpolate(contact.notes)}</p>`);
          } else {
            _push(`<!---->`);
          }
          if (contact.tags && contact.tags.length > 0) {
            _push(`<div class="flex flex-wrap gap-1 mb-2">`);
            if (tagMap.value[_ctx.tid]) {
              _push(`<!--[-->`);
              ssrRenderList(contact.tags, (tid) => {
                _push(`<span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white" style="${ssrRenderStyle({ background: tagMap.value[tid].color })}">${ssrInterpolate(tagMap.value[tid].name)}</span>`);
              });
              _push(`<!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex items-center justify-between mt-1 pt-1.5 border-t border-gray-50 dark:border-gray-700"><span class="${ssrRenderClass([{
            "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-700": contact.priority === "alta",
            "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700": contact.priority === "media",
            "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-700": contact.priority === "baixa"
          }, "text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border"])}">${ssrInterpolate(contact.priority || "media")}</span><div class="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">`);
          if (contact.whatsapp) {
            _push(`<a${ssrRenderAttr("href", `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`)} target="_blank" class="text-green-500 hover:text-green-600" title="WhatsApp"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg></a>`);
          } else {
            _push(`<!---->`);
          }
          if (contact.instagram) {
            _push(`<a${ssrRenderAttr("href", `https://instagram.com/${contact.instagram.replace("@", "")}`)} target="_blank" class="text-pink-500 hover:text-pink-600" title="Instagram"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path></svg></a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div>`);
        });
        _push(`<!--]-->`);
        if (contactsByStatus.value[col.id]?.length === 0) {
          _push(`<div class="flex flex-col items-center justify-center py-10 text-gray-300 dark:text-gray-600 text-center"><span class="text-3xl mb-2 opacity-50">${ssrInterpolate(col.emoji)}</span><p class="text-[11px]">Solte um lead aqui</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/KanbanBoard.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$6, { __name: "KanbanBoard" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "DailyReport",
  __ssrInlineRender: true,
  props: {
    contacts: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const isDark = ref(false);
    const uniqueDates = computed(() => {
      const dates = [...new Set(props.contacts.map((c) => c.lastContact))].filter(Boolean);
      return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    });
    const currentDateIndex = ref(0);
    const activeDate = computed(() => uniqueDates.value[currentDateIndex.value] || null);
    const formatDateLabel = (dateStr) => {
      if (!dateStr) return "Sem Data";
      return (/* @__PURE__ */ new Date(dateStr + "T12:00:00")).toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    };
    const dailyContacts = computed(() => {
      if (!activeDate.value) return [];
      return props.contacts.filter((c) => c.lastContact === activeDate.value);
    });
    const metrics = computed(() => {
      const all = dailyContacts.value;
      const total = all.length;
      let contatados = 0;
      let mortos = 0;
      let fechados = 0;
      let quentes_negociacao = 0;
      let pendentes = 0;
      all.forEach((c) => {
        if (c.status === "contatado") contatados++;
        else if (c.status === "morto") mortos++;
        else if (c.status === "fechado") fechados++;
        else if (c.status === "quente" || c.status === "em_negociacao") quentes_negociacao++;
        else if (c.status === "pendente") pendentes++;
      });
      const resolved = total - pendentes;
      const healthRate = resolved > 0 ? Math.round((resolved - mortos) / resolved * 100) : 0;
      return { total, contatados, mortos, fechados, quentes_negociacao, pendentes, healthRate };
    });
    const statusBadge = computed(() => isDark.value ? {
      pendente: "background:#1f2937;color:#d1d5db",
      contatado: "background:#1e3a5f;color:#93c5fd",
      em_negociacao: "background:#451a03;color:#fcd34d",
      quente: "background:#431407;color:#fb923c",
      fechado: "background:#064e3b;color:#6ee7b7",
      morto: "background:#450a0a;color:#fca5a5"
    } : {
      pendente: "background:#f3f4f6;color:#374151",
      contatado: "background:#dbeafe;color:#1d4ed8",
      em_negociacao: "background:#fef3c7;color:#92400e",
      quente: "background:#ffedd5;color:#9a3412",
      fechado: "background:#d1fae5;color:#065f46",
      morto: "background:#fee2e2;color:#b91c1c"
    });
    const statusLabel = {
      pendente: "Pendente",
      contatado: "Contatado",
      em_negociacao: "Em Negociação",
      quente: "Quente",
      fechado: "Fechado",
      morto: "Morto"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 mb-8" }, _attrs))}><div class="flex items-center justify-between bg-white/60 dark:bg-gray-900/60 p-5 rounded-2xl shadow-sm border border-white/40 dark:border-gray-800/40 backdrop-blur-md"><div><h2 class="text-xl font-bold text-crm-900 dark:text-white">Aproveitamento do Dia</h2><p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Resumo das atividades e conversões diárias.</p></div>`);
      if (uniqueDates.value.length > 0) {
        _push(`<div class="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-1 border border-gray-100 dark:border-gray-700 shadow-inner"><button${ssrIncludeBooleanAttr(currentDateIndex.value >= uniqueDates.value.length - 1) ? " disabled" : ""} class="p-2.5 rounded-lg hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all"><svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button><div class="flex flex-col items-center min-w-[200px] px-2"><span class="text-sm font-bold text-crm-800 dark:text-gray-100 capitalize">${ssrInterpolate(formatDateLabel(activeDate.value))}</span><span class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">${ssrInterpolate(metrics.value.total)} leads tocados</span></div><button${ssrIncludeBooleanAttr(currentDateIndex.value <= 0) ? " disabled" : ""} class="p-2.5 rounded-lg hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all"><svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (dailyContacts.value.length > 0) {
        _push(`<div class="grid grid-cols-2 md:grid-cols-5 gap-4"><div class="glass-panel p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"><div class="absolute -right-4 -top-4 w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div><p class="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider relative z-10">Total de Leads</p><p class="text-3xl font-black text-gray-800 dark:text-white mt-1 relative z-10">${ssrInterpolate(metrics.value.total)}</p></div><div class="glass-panel p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"><div class="absolute -right-4 -top-4 w-20 h-20 bg-blue-100 dark:bg-blue-900/40 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div><p class="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider relative z-10">Contatados / Enviados</p><p class="text-3xl font-black text-blue-700 dark:text-blue-300 mt-1 relative z-10">${ssrInterpolate(metrics.value.contatados)}</p></div><div class="glass-panel p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"><div class="absolute -right-4 -top-4 w-20 h-20 bg-red-100 dark:bg-red-900/40 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div><p class="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider relative z-10">Leads Mortos</p><p class="text-3xl font-black text-red-700 dark:text-red-300 mt-1 relative z-10">${ssrInterpolate(metrics.value.mortos)}</p></div><div class="glass-panel p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"><div class="absolute -right-4 -top-4 w-20 h-20 bg-orange-100 dark:bg-orange-900/40 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div><p class="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider relative z-10">Avançados (Quentes)</p><p class="text-3xl font-black text-orange-700 dark:text-orange-300 mt-1 relative z-10">${ssrInterpolate(metrics.value.quentes_negociacao)}</p></div><div class="glass-panel p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"><div class="absolute -right-4 -top-4 w-20 h-20 bg-emerald-100 dark:bg-emerald-900/40 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div><p class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider relative z-10">Fechados Hoje</p><p class="text-3xl font-black text-emerald-700 dark:text-emerald-300 mt-1 relative z-10">${ssrInterpolate(metrics.value.fechados)}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (dailyContacts.value.length > 0) {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-1 space-y-6"><div class="glass-panel p-6"><h3 class="text-sm font-bold text-crm-900 dark:text-white uppercase tracking-wide mb-5">Distribuição do Dia</h3><div class="space-y-4"><div class="flex items-center gap-3"><span class="w-24 text-[11px] font-bold text-gray-500 uppercase">Contatados</span><div class="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2"><div class="h-full bg-blue-500 rounded-full" style="${ssrRenderStyle({ width: `${metrics.value.contatados / metrics.value.total * 100}%` })}"></div></div><span class="w-8 text-right text-xs font-bold">${ssrInterpolate(metrics.value.contatados)}</span></div><div class="flex items-center gap-3"><span class="w-24 text-[11px] font-bold text-gray-500 uppercase">Avançados</span><div class="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2"><div class="h-full bg-orange-500 rounded-full" style="${ssrRenderStyle({ width: `${metrics.value.quentes_negociacao / metrics.value.total * 100}%` })}"></div></div><span class="w-8 text-right text-xs font-bold">${ssrInterpolate(metrics.value.quentes_negociacao)}</span></div><div class="flex items-center gap-3"><span class="w-24 text-[11px] font-bold text-gray-500 uppercase">Mortos</span><div class="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2"><div class="h-full bg-red-500 rounded-full" style="${ssrRenderStyle({ width: `${metrics.value.mortos / metrics.value.total * 100}%` })}"></div></div><span class="w-8 text-right text-xs font-bold">${ssrInterpolate(metrics.value.mortos)}</span></div><div class="flex items-center gap-3"><span class="w-24 text-[11px] font-bold text-gray-500 uppercase">Fechados</span><div class="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2"><div class="h-full bg-emerald-500 rounded-full" style="${ssrRenderStyle({ width: `${metrics.value.fechados / metrics.value.total * 100}%` })}"></div></div><span class="w-8 text-right text-xs font-bold">${ssrInterpolate(metrics.value.fechados)}</span></div></div><div class="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800"><p class="text-center text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Taxa de Aproveitamento</p><div class="flex justify-center items-baseline gap-1"><span class="${ssrRenderClass([metrics.value.healthRate > 50 ? "text-emerald-500" : "text-orange-500", "text-4xl font-black"])}">${ssrInterpolate(metrics.value.healthRate)}%</span><span class="text-sm font-medium text-gray-400">positivos</span></div></div></div></div><div class="lg:col-span-2 glass-panel p-0 overflow-hidden flex flex-col"><div class="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between"><h3 class="text-sm font-bold text-crm-900 dark:text-white uppercase tracking-wide">Leads do Dia</h3><span class="text-xs font-medium text-gray-500">${ssrInterpolate(dailyContacts.value.length)} registros</span></div><div class="overflow-y-auto max-h-[400px] p-2 space-y-1 bg-gray-50/50 dark:bg-gray-900/20"><!--[-->`);
        ssrRenderList(dailyContacts.value, (contact) => {
          _push(`<div class="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-sm transition-all"><div class="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style="${ssrRenderStyle({ "background": "linear-gradient(135deg,#6366f1,#60a5fa)" })}">${ssrInterpolate((contact.name || "?").replace("@", "").charAt(0).toUpperCase())}</div><div class="flex-1 min-w-0"><p class="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">${ssrInterpolate(contact.name)}</p><div class="flex items-center gap-2 mt-1"><span class="text-[10px] font-bold px-2 py-0.5 rounded-full" style="${ssrRenderStyle(statusBadge.value[contact.status])}">${ssrInterpolate(statusLabel[contact.status] || contact.status)}</span>`);
          if (contact.whatsapp) {
            _push(`<span class="text-[10px] text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded">WhatsApp</span>`);
          } else {
            _push(`<!---->`);
          }
          if (contact.instagram) {
            _push(`<span class="text-[10px] text-rose-600 dark:text-rose-400 font-medium bg-rose-50 dark:bg-rose-900/30 px-1.5 py-0.5 rounded">Instagram</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="text-right shrink-0"><p class="${ssrRenderClass([contact.value > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400 dark:text-gray-500", "text-xs font-bold"])}">${ssrInterpolate(contact.value > 0 ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(contact.value) : "-")}</p><p class="text-[10px] text-gray-500 mt-1 capitalize">${ssrInterpolate(contact.priority)}</p></div></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<div class="text-center py-20 bg-white/50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700"><p class="text-gray-500 dark:text-gray-400">Nenhum dado encontrado para a data selecionada ou não há registros.</p></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DailyReport.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$5, { __name: "DailyReport" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "LeadsDashboard",
  __ssrInlineRender: true,
  props: {
    contacts: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const isDark = ref(false);
    const pipelineDateIndex = ref(0);
    const pipelineDates = computed(() => {
      const dates = [...new Set(props.contacts.map((c) => c.lastContact))].filter(Boolean);
      return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    });
    const activePipelineDate = computed(() => pipelineDates.value[pipelineDateIndex.value] || null);
    const showAllDates = ref(false);
    const pipelineContacts = computed(() => {
      if (showAllDates.value || !activePipelineDate.value) return props.contacts;
      return props.contacts.filter((c) => c.lastContact === activePipelineDate.value);
    });
    const formatPipelineDate = (dateStr) => {
      if (!dateStr) return "Todos";
      const d = /* @__PURE__ */ new Date(dateStr + "T12:00:00");
      return d.toLocaleDateString("pt-BR", { weekday: "short", day: "numeric", month: "short" });
    };
    const scoreContact = (c) => {
      const statusScore = {
        fechado: 100,
        quente: 82,
        em_negociacao: 65,
        contatado: 35,
        pendente: 18,
        morto: 0
      };
      const priorityBonus = { alta: 15, media: 7, baixa: 0 };
      const base = statusScore[c.status] ?? 18;
      const priority = priorityBonus[c.priority] ?? 7;
      const channels = (c.whatsapp ? 5 : 0) + (c.instagram ? 3 : 0) + (c.email ? 3 : 0);
      const value = c.value > 0 ? 5 : 0;
      return Math.min(100, base + priority + channels + value);
    };
    const scoredContacts = computed(
      () => props.contacts.map((c) => ({ ...c, _score: scoreContact(c) })).sort((a, b) => b._score - a._score)
    );
    const hotLeads = computed(
      () => scoredContacts.value.filter((c) => c.status !== "fechado" && c.status !== "morto").slice(0, 5)
    );
    const coldLeads = computed(
      () => props.contacts.filter((c) => c.status === "morto" || c.status === "pendente" && c.priority === "baixa").map((c) => ({ ...c, _score: scoreContact(c) })).sort((a, b) => a._score - b._score).slice(0, 5)
    );
    const statusCounts = computed(() => {
      const map = {
        fechado: 0,
        quente: 0,
        em_negociacao: 0,
        contatado: 0,
        pendente: 0,
        morto: 0
      };
      pipelineContacts.value.forEach((c) => {
        if (map[c.status] !== void 0) map[c.status]++;
      });
      return map;
    });
    const total = computed(() => pipelineContacts.value.length || 1);
    const pipelineValue = computed(
      () => props.contacts.filter((c) => ["quente", "em_negociacao"].includes(c.status)).reduce((s, c) => s + (Number(c.value) || 0), 0)
    );
    const conversionRate = computed(
      () => props.contacts.length ? Math.round(statusCounts.value.fechado / props.contacts.length * 100) : 0
    );
    const avgScore = computed(
      () => props.contacts.length ? Math.round(props.contacts.reduce((s, c) => s + scoreContact(c), 0) / props.contacts.length) : 0
    );
    const withContact = computed(
      () => props.contacts.filter((c) => c.whatsapp || c.instagram || c.email).length
    );
    const priorityCounts = computed(() => ({
      alta: props.contacts.filter((c) => c.priority === "alta").length,
      media: props.contacts.filter((c) => c.priority === "media").length,
      baixa: props.contacts.filter((c) => c.priority === "baixa").length
    }));
    const fmt = (v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);
    const scoreTextColor = (s) => {
      if (s >= 75) return "#059669";
      if (s >= 50) return "#d97706";
      if (s >= 25) return "#f97316";
      return "#ef4444";
    };
    const scoreBarBg = (s) => {
      if (s >= 75) return "#10b981";
      if (s >= 50) return "#f59e0b";
      if (s >= 25) return "#fb923c";
      return "#f87171";
    };
    const statusBadge = computed(() => isDark.value ? {
      pendente: "background:#1f2937;color:#d1d5db",
      contatado: "background:#1e3a5f;color:#93c5fd",
      em_negociacao: "background:#451a03;color:#fcd34d",
      quente: "background:#431407;color:#fb923c",
      fechado: "background:#064e3b;color:#6ee7b7",
      morto: "background:#450a0a;color:#fca5a5"
    } : {
      pendente: "background:#f3f4f6;color:#374151",
      contatado: "background:#dbeafe;color:#1d4ed8",
      em_negociacao: "background:#fef3c7;color:#92400e",
      quente: "background:#ffedd5;color:#9a3412",
      fechado: "background:#d1fae5;color:#065f46",
      morto: "background:#fee2e2;color:#b91c1c"
    });
    const statusLabel = {
      pendente: "Pendente",
      contatado: "Contatado",
      em_negociacao: "Em Neg.",
      quente: "Quente",
      fechado: "Fechado",
      morto: "💀 Morto"
    };
    const pipeline = [
      { key: "pendente", label: "Pendente", bar: "#9ca3af", text: "#4b5563" },
      { key: "contatado", label: "Contatado", bar: "#60a5fa", text: "#1d4ed8" },
      { key: "em_negociacao", label: "Em Negociação", bar: "#fbbf24", text: "#92400e" },
      { key: "quente", label: "🔥 Quente", bar: "#fb923c", text: "#9a3412" },
      { key: "fechado", label: "✅ Fechado", bar: "#34d399", text: "#065f46" },
      { key: "morto", label: "💀 Morto", bar: "#f87171", text: "#b91c1c" }
    ];
    const priorities = [
      { key: "alta", label: "🔴 Alta", bar: "#f87171" },
      { key: "media", label: "🔵 Média", bar: "#60a5fa" },
      { key: "baixa", label: "🟢 Baixa", bar: "#34d399" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 mb-8" }, _attrs))}><div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="glass-panel p-5 flex flex-col gap-1 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"><div class="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-40 group-hover:scale-150 transition-transform duration-700 bg-violet-200 dark:bg-violet-900/40"></div><p class="text-xs font-semibold text-crm-500 dark:text-gray-400 uppercase tracking-wide relative z-10">Score Médio</p><p class="text-3xl font-bold relative z-10" style="${ssrRenderStyle({ color: scoreTextColor(avgScore.value) })}">${ssrInterpolate(avgScore.value)}<span class="text-base font-normal text-gray-400 dark:text-gray-500">/100</span></p><p class="text-xs text-gray-400 dark:text-gray-500 relative z-10">potencial da carteira</p></div><div class="glass-panel p-5 flex flex-col gap-1 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"><div class="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-40 group-hover:scale-150 transition-transform duration-700 bg-green-200 dark:bg-green-900/40"></div><p class="text-xs font-semibold text-crm-500 dark:text-gray-400 uppercase tracking-wide relative z-10">Taxa de Fechamento</p><p class="text-3xl font-bold relative z-10" style="${ssrRenderStyle({ "color": "#059669" })}">${ssrInterpolate(conversionRate.value)}%</p><p class="text-xs text-gray-400 dark:text-gray-500 relative z-10">${ssrInterpolate(statusCounts.value.fechado)} de ${ssrInterpolate(__props.contacts.length)} leads</p></div><div class="glass-panel p-5 flex flex-col gap-1 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"><div class="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-40 group-hover:scale-150 transition-transform duration-700 bg-yellow-200 dark:bg-yellow-900/40"></div><p class="text-xs font-semibold text-crm-500 dark:text-gray-400 uppercase tracking-wide relative z-10">Pipeline Ativo</p><p class="text-2xl font-bold relative z-10" style="${ssrRenderStyle({ "color": "#d97706" })}">${ssrInterpolate(fmt(pipelineValue.value))}</p><p class="text-xs text-gray-400 dark:text-gray-500 relative z-10">quentes + em negociação</p></div><div class="glass-panel p-5 flex flex-col gap-1 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"><div class="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-40 group-hover:scale-150 transition-transform duration-700 bg-blue-200 dark:bg-blue-900/40"></div><p class="text-xs font-semibold text-crm-500 dark:text-gray-400 uppercase tracking-wide relative z-10">Alcançáveis</p><p class="text-3xl font-bold relative z-10" style="${ssrRenderStyle({ "color": "#2563eb" })}">${ssrInterpolate(withContact.value)}</p><p class="text-xs text-gray-400 dark:text-gray-500 relative z-10">têm canal de contato</p></div></div><div class="glass-panel p-6"><div class="flex flex-wrap items-center justify-between gap-3 mb-5"><h3 class="text-sm font-semibold text-crm-900 dark:text-white uppercase tracking-wide">Funil de Pipeline</h3>`);
      if (pipelineDates.value.length > 0) {
        _push(`<div class="flex items-center gap-2"><button class="${ssrRenderClass([
          "text-[11px] font-bold px-3 py-1.5 rounded-full transition-all duration-200 hover:opacity-80",
          showAllDates.value ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        ])}">Todos</button><div class="flex items-center gap-1 rounded-lg px-1 py-1 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800" style="${ssrRenderStyle(showAllDates.value ? "opacity:0.4;pointer-events:none" : "")}"><button${ssrIncludeBooleanAttr(showAllDates.value || pipelineDateIndex.value >= pipelineDates.value.length - 1) ? " disabled" : ""} class="p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm disabled:opacity-30 transition-all"><svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button><div class="flex flex-col items-center min-w-[110px] px-1"><span class="text-xs font-bold text-crm-800 dark:text-gray-100 capitalize">${ssrInterpolate(formatPipelineDate(activePipelineDate.value))}</span><span class="text-[10px] text-gray-400 dark:text-gray-500">${ssrInterpolate(pipelineContacts.value.length)} contatos · ${ssrInterpolate(pipelineDateIndex.value + 1)}/${ssrInterpolate(pipelineDates.value.length)}</span></div><button${ssrIncludeBooleanAttr(showAllDates.value || pipelineDateIndex.value <= 0) ? " disabled" : ""} class="p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm disabled:opacity-30 transition-all"><svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-3"><!--[-->`);
      ssrRenderList(pipeline, (stage) => {
        _push(`<div class="flex items-center gap-3"><span class="w-32 text-xs font-semibold text-right shrink-0" style="${ssrRenderStyle({ color: stage.text })}">${ssrInterpolate(stage.label)}</span><div class="flex-1 bg-gray-100 dark:bg-gray-700/60 rounded-full h-5 overflow-hidden"><div class="h-full rounded-full transition-all duration-700" style="${ssrRenderStyle({ width: `${Math.max(statusCounts.value[stage.key] > 0 ? 2 : 0, statusCounts.value[stage.key] / total.value * 100)}%`, background: stage.bar })}"></div></div><span class="w-8 text-xs font-bold text-gray-700 dark:text-gray-300 text-right shrink-0">${ssrInterpolate(statusCounts.value[stage.key])}</span><span class="w-10 text-xs text-gray-400 dark:text-gray-500 shrink-0">${ssrInterpolate(Math.round(statusCounts.value[stage.key] / total.value * 100))}%</span></div>`);
      });
      _push(`<!--]--></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="glass-panel p-6"><div class="flex items-center gap-2 mb-4"><span class="text-xl">🔥</span><h3 class="text-sm font-semibold text-crm-900 dark:text-white uppercase tracking-wide">Mais Favoráveis ao Fechamento</h3></div>`);
      if (hotLeads.value.length === 0) {
        _push(`<p class="text-gray-400 dark:text-gray-500 text-sm text-center py-4">Nenhum lead ativo encontrado.</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<ul class="space-y-3"><!--[-->`);
      ssrRenderList(hotLeads.value, (lead, i) => {
        _push(`<li class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"><span class="w-5 text-xs font-bold text-gray-400 dark:text-gray-500 text-center shrink-0">${ssrInterpolate(i + 1)}</span><div class="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style="${ssrRenderStyle({ "background": "linear-gradient(135deg,#6366f1,#60a5fa)" })}">${ssrInterpolate((lead.name || "?").replace("@", "").charAt(0).toUpperCase())}</div><div class="flex-1 min-w-0"><p class="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">${ssrInterpolate(lead.name)}</p><span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style="${ssrRenderStyle(statusBadge.value[lead.status])}">${ssrInterpolate(statusLabel[lead.status])}</span></div><div class="flex flex-col items-end gap-1 shrink-0"><span class="text-sm font-bold" style="${ssrRenderStyle({ color: scoreTextColor(lead._score) })}">${ssrInterpolate(lead._score)}</span><div class="w-16 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5"><div class="h-full rounded-full" style="${ssrRenderStyle({ width: `${lead._score}%`, background: scoreBarBg(lead._score) })}"></div></div></div></li>`);
      });
      _push(`<!--]--></ul></div><div class="glass-panel p-6"><div class="flex items-center gap-2 mb-4"><span class="text-xl">🧊</span><h3 class="text-sm font-semibold text-crm-900 dark:text-white uppercase tracking-wide">Leads Frios / Sem Potencial</h3></div>`);
      if (coldLeads.value.length === 0) {
        _push(`<p class="text-gray-400 dark:text-gray-500 text-sm text-center py-4">Nenhum lead frio. 🎉</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<ul class="space-y-3"><!--[-->`);
      ssrRenderList(coldLeads.value, (lead) => {
        _push(`<li class="flex items-center gap-3 p-2 rounded-lg hover:bg-red-50/40 dark:hover:bg-red-950/20 transition-colors"><div class="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 text-xs font-bold shrink-0">${ssrInterpolate((lead.name || "?").replace("@", "").charAt(0).toUpperCase())}</div><div class="flex-1 min-w-0"><p class="text-sm font-semibold text-gray-500 dark:text-gray-400 truncate">${ssrInterpolate(lead.name)}</p><span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style="${ssrRenderStyle(statusBadge.value[lead.status] ?? (isDark.value ? "background:#1f2937;color:#9ca3af" : "background:#f3f4f6;color:#6b7280"))}">${ssrInterpolate(statusLabel[lead.status] ?? lead.status)}</span></div><div class="flex flex-col items-end gap-1 shrink-0"><span class="text-sm font-bold" style="${ssrRenderStyle({ "color": "#f87171" })}">${ssrInterpolate(lead._score)}</span><div class="w-16 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5"><div class="h-full rounded-full" style="${ssrRenderStyle({ width: `${lead._score}%`, background: "#fca5a5" })}"></div></div></div></li>`);
      });
      _push(`<!--]--></ul></div></div><div class="glass-panel p-6"><h3 class="text-sm font-semibold text-crm-900 dark:text-white uppercase tracking-wide mb-4">Distribuição por Prioridade</h3><div class="flex items-end gap-6 h-28"><!--[-->`);
      ssrRenderList(priorities, (p) => {
        _push(`<div class="flex-1 flex flex-col items-center gap-1"><span class="text-xs font-bold text-gray-700 dark:text-gray-300">${ssrInterpolate(priorityCounts.value[p.key])}</span><div class="w-full rounded-t-lg transition-all duration-700" style="${ssrRenderStyle({
          height: `${Math.max(8, priorityCounts.value[p.key] / total.value * 88)}px`,
          background: p.bar
        })}"></div><span class="text-[11px] text-gray-500 dark:text-gray-400 font-medium text-center">${ssrInterpolate(p.label)}</span></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LeadsDashboard.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$4, { __name: "LeadsDashboard" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "MessageTemplates",
  __ssrInlineRender: true,
  props: {
    contact: { type: Object, default: null },
    mode: { type: String, default: "page" }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isDark = ref(false);
    const templates = ref([]);
    const loading = ref(true);
    const saving = ref(false);
    const copiedId = ref(null);
    const editTarget = ref(null);
    const showForm = ref(false);
    const formTitle = ref("");
    const formBody = ref("");
    const formChannel = ref("ambos");
    const CHANNELS = [
      { value: "whatsapp", label: "WhatsApp", color: "#22c55e", icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
      { value: "instagram", label: "Instagram", color: "#ec4899", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
      { value: "ambos", label: "Ambos", color: "#6366f1", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }
    ];
    const channelMap = Object.fromEntries(CHANNELS.map((c) => [c.value, c]));
    const interpolate = (text, contact) => {
      if (!contact) return text;
      return text.replace(/\{\{nome\}\}/g, contact.name || "").replace(/\{\{instagram\}\}/g, (contact.instagram || "").replace("@", "")).replace(/\{\{empresa\}\}/g, contact.company || contact.name || "").replace(/\{\{status\}\}/g, contact.status || "").replace(/\{\{whatsapp\}\}/g, contact.whatsapp || "");
    };
    const preview = (tpl) => props.contact ? interpolate(tpl.body, props.contact) : tpl.body;
    const highlightVars = (text) => {
      const style = isDark.value ? "background:#3b0764;color:#c4b5fd;border-radius:4px;padding:0 3px;font-weight:600" : "background:#ede9fe;color:#6d28d9;border-radius:4px;padding:0 3px;font-weight:600";
      return text.replace(/(\{\{[^}]+\}\})/g, `<span style="${style}">$1</span>`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.mode === "page") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto" }, _attrs))}><div class="flex items-center justify-between mb-6"><div><h2 class="text-2xl font-bold text-crm-900 dark:text-white">💬 Templates de Mensagem</h2><p class="text-sm text-gray-500 dark:text-gray-400 mt-1"> Use <code class="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-1 rounded text-xs">${ssrInterpolate(_ctx.nome)}</code><code class="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-1 rounded text-xs">${ssrInterpolate(_ctx.instagram)}</code><code class="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-1 rounded text-xs">${ssrInterpolate(_ctx.empresa)}</code><code class="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-1 rounded text-xs">${ssrInterpolate(_ctx.status)}</code> para inserir dados do lead automaticamente. </p></div><button class="btn-primary flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> Novo Template </button></div>`);
        if (loading.value) {
          _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
          ssrRenderList(4, (i) => {
            _push(`<div class="animate-pulse bg-white dark:bg-gray-800 rounded-2xl h-40 border border-gray-100 dark:border-gray-700"></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
          ssrRenderList(templates.value, (tpl) => {
            _push(`<div class="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-200 p-5 flex flex-col gap-3"><div class="flex items-start justify-between gap-3"><div class="flex items-center gap-2 flex-1 min-w-0"><div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style="${ssrRenderStyle({ background: unref(channelMap)[tpl.channel]?.color + "20" })}"><svg class="w-4 h-4" style="${ssrRenderStyle({ color: unref(channelMap)[tpl.channel]?.color })}" fill="currentColor" viewBox="0 0 24 24"><path${ssrRenderAttr("d", unref(channelMap)[tpl.channel]?.icon)}></path></svg></div><h3 class="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">${ssrInterpolate(tpl.title)}</h3></div><div class="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"><button class="p-1.5 text-gray-400 hover:text-crm-accent hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Editar"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button><button class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Remover"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></div><p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1">${highlightVars(tpl.body) ?? ""}</p><div class="flex items-center justify-between pt-1 border-t border-gray-50 dark:border-gray-700/50"><span class="text-[10px] font-bold px-2 py-0.5 rounded-full" style="${ssrRenderStyle({ background: unref(channelMap)[tpl.channel]?.color + "20", color: unref(channelMap)[tpl.channel]?.color })}">${ssrInterpolate(unref(channelMap)[tpl.channel]?.label)}</span><button class="${ssrRenderClass([copiedId.value === tpl.id ? "bg-green-500 text-white" : "bg-crm-900 dark:bg-gray-700 text-white hover:bg-crm-accent dark:hover:bg-crm-accent", "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200"])}">`);
            if (copiedId.value !== tpl.id) {
              _push(`<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>`);
            } else {
              _push(`<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`);
            }
            _push(` ${ssrInterpolate(copiedId.value === tpl.id ? "Copiado!" : "Copiar")}</button></div></div>`);
          });
          _push(`<!--]-->`);
          if (templates.value.length === 0) {
            _push(`<div class="col-span-2 text-center py-16 text-gray-400 dark:text-gray-500"><p class="text-4xl mb-3">💬</p><p class="font-semibold">Nenhum template criado ainda</p><p class="text-sm mt-1">Clique em &quot;Novo Template&quot; para começar</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        }
        if (showForm.value) {
          _push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-crm-900/60 dark:bg-black/70 backdrop-blur-sm"><div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg animate-fade-in-up border border-gray-100 dark:border-gray-700/50"><div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/60 rounded-t-2xl"><h3 class="font-bold text-crm-900 dark:text-white">${ssrInterpolate(editTarget.value ? "Editar Template" : "Novo Template")}</h3><button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="p-6 flex flex-col gap-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título</label><input${ssrRenderAttr("value", formTitle.value)} type="text" placeholder="Ex: 👋 Primeiro contato" class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Canal</label><div class="flex gap-2"><!--[-->`);
          ssrRenderList(CHANNELS, (ch) => {
            _push(`<button class="flex-1 py-2 px-3 rounded-lg text-xs font-bold border-2 transition-all" style="${ssrRenderStyle(formChannel.value === ch.value ? `border-color:${ch.color};background:${ch.color}20;color:${ch.color}` : isDark.value ? "border-color:#374151;color:#9ca3af" : "border-color:#e5e7eb;color:#6b7280")}">${ssrInterpolate(ch.label)}</button>`);
          });
          _push(`<!--]--></div></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Mensagem <span class="ml-2 text-[10px] font-normal text-gray-400 dark:text-gray-500">Use ${ssrInterpolate(_ctx.nome)}, ${ssrInterpolate(_ctx.instagram)}, ${ssrInterpolate(_ctx.empresa)}, ${ssrInterpolate(_ctx.status)}</span></label><textarea rows="6" placeholder="Olá {{nome}}! Vi o perfil de vocês (@{{instagram}})..." class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none text-sm resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500">${ssrInterpolate(formBody.value)}</textarea></div></div><div class="px-6 py-4 border-t border-gray-100 dark:border-gray-700/50 flex justify-end gap-3 bg-gray-50/50 dark:bg-gray-800/60 rounded-b-2xl"><button class="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">Cancelar</button><button${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} class="btn-primary">${ssrInterpolate(saving.value ? "Salvando..." : "Salvar")}</button></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-crm-900/60 dark:bg-black/70 backdrop-blur-sm" }, _attrs))}><div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up max-h-[80vh] flex flex-col border border-gray-100 dark:border-gray-700/50"><div class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between shrink-0 bg-gray-50/50 dark:bg-gray-800/60 rounded-t-2xl"><div><h3 class="font-bold text-crm-900 dark:text-white text-sm">💬 Copiar mensagem para</h3><p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">${ssrInterpolate(__props.contact?.name)}</p></div><button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="overflow-y-auto flex-1 p-3 flex flex-col gap-2">`);
        if (loading.value) {
          _push(`<div class="py-8 text-center text-gray-400 dark:text-gray-500 text-sm">Carregando...</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(templates.value, (tpl) => {
          _push(`<button class="${ssrRenderClass([copiedId.value === tpl.id ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20" : "border-gray-100 dark:border-gray-700 hover:border-crm-accent/40 hover:bg-blue-50/30 dark:hover:bg-blue-900/10", "w-full text-left px-4 py-3 rounded-xl border transition-all duration-150 flex items-start gap-3 group"])}"><div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style="${ssrRenderStyle({ background: unref(channelMap)[tpl.channel]?.color + "20" })}"><svg class="w-4 h-4" style="${ssrRenderStyle({ color: unref(channelMap)[tpl.channel]?.color })}" fill="currentColor" viewBox="0 0 24 24"><path${ssrRenderAttr("d", unref(channelMap)[tpl.channel]?.icon)}></path></svg></div><div class="flex-1 min-w-0"><p class="text-xs font-bold text-gray-800 dark:text-gray-100">${ssrInterpolate(tpl.title)}</p><p class="text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">${ssrInterpolate(preview(tpl).slice(0, 80))}...</p></div><div class="shrink-0 self-center">`);
          if (copiedId.value === tpl.id) {
            _push(`<span class="text-green-500 text-xs font-bold">✓ Copiado!</span>`);
          } else {
            _push(`<svg class="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-crm-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>`);
          }
          _push(`</div></button>`);
        });
        _push(`<!--]--></div></div></div>`);
      }
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MessageTemplates.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_7 = Object.assign(_sfc_main$3, { __name: "MessageTemplates" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ContactModal",
  __ssrInlineRender: true,
  props: {
    contact: { type: Object, required: true },
    availableTags: { type: Array, default: () => [] }
  },
  emits: ["save", "close", "tags-updated"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const form = ref({ ...props.contact });
    const loading = ref(false);
    const showTagDropdown = ref(false);
    const newTagName = ref("");
    const newTagColor = ref("#6366f1");
    const tagLoading = ref(false);
    const tagError = ref("");
    const PRESET_COLORS = [
      "#6366f1",
      "#3b82f6",
      "#06b6d4",
      "#10b981",
      "#84cc16",
      "#eab308",
      "#f97316",
      "#ef4444",
      "#ec4899",
      "#8b5cf6",
      "#64748b",
      "#0f172a"
    ];
    const selectedTagIds = ref(Array.isArray(form.value.tags) ? [...form.value.tags] : []);
    const isTagSelected = (tagId) => selectedTagIds.value.includes(tagId);
    const tagById = computed(() => {
      const map = {};
      props.availableTags.forEach((t) => {
        map[t.id] = t;
      });
      return map;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-crm-900/60 dark:bg-black/70 backdrop-blur-sm overflow-y-auto" }, _attrs))}><div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl my-8 animate-fade-in-up border border-gray-100 dark:border-gray-700/50"><div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/60 rounded-t-2xl"><h3 class="text-lg font-semibold text-crm-900 dark:text-white">Editar Lead: ${ssrInterpolate(form.value.name)}</h3><button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6"><div class="col-span-1 md:col-span-2"><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome / Usuário</label><input${ssrRenderAttr("value", form.value.name)} type="text" class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-mail</label><input${ssrRenderAttr("value", form.value.email)} type="email" class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">WhatsApp</label><input${ssrRenderAttr("value", form.value.whatsapp)} type="text" placeholder="+5511999999999" class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instagram (@)</label><input${ssrRenderAttr("value", form.value.instagram)} type="text" class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Google Maps (URL)</label><input${ssrRenderAttr("value", form.value.googleMaps)} type="url" placeholder="https://maps.app.goo.gl/..." class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label><select class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"><option value="pendente"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "pendente") : ssrLooseEqual(form.value.status, "pendente")) ? " selected" : ""}>Pendente</option><option value="contatado"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "contatado") : ssrLooseEqual(form.value.status, "contatado")) ? " selected" : ""}>Contatado</option><option value="em_negociacao"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "em_negociacao") : ssrLooseEqual(form.value.status, "em_negociacao")) ? " selected" : ""}>Em Negociação</option><option value="quente"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "quente") : ssrLooseEqual(form.value.status, "quente")) ? " selected" : ""}>Quente</option><option value="fechado"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "fechado") : ssrLooseEqual(form.value.status, "fechado")) ? " selected" : ""}>Fechado</option><option value="morto"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "morto") : ssrLooseEqual(form.value.status, "morto")) ? " selected" : ""}>💀 Morto</option></select></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prioridade</label><select class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"><option value="baixa"${ssrIncludeBooleanAttr(Array.isArray(form.value.priority) ? ssrLooseContain(form.value.priority, "baixa") : ssrLooseEqual(form.value.priority, "baixa")) ? " selected" : ""}>Baixa</option><option value="media"${ssrIncludeBooleanAttr(Array.isArray(form.value.priority) ? ssrLooseContain(form.value.priority, "media") : ssrLooseEqual(form.value.priority, "media")) ? " selected" : ""}>Média</option><option value="alta"${ssrIncludeBooleanAttr(Array.isArray(form.value.priority) ? ssrLooseContain(form.value.priority, "alta") : ssrLooseEqual(form.value.priority, "alta")) ? " selected" : ""}>Alta</option></select></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Valor Recebido / Deal ($)</label><input${ssrRenderAttr("value", form.value.value)} type="number" min="0" class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data</label><input${ssrRenderAttr("value", form.value.lastContact)} type="date" class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"></div><div class="col-span-1 md:col-span-2 flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(form.value.hasWebsite) ? ssrLooseContain(form.value.hasWebsite, null) : form.value.hasWebsite) ? " checked" : ""} type="checkbox" id="hasWebsite" class="w-4 h-4 text-crm-accent border-gray-300 dark:border-gray-600 rounded focus:ring-crm-accent bg-white dark:bg-gray-800"><label for="hasWebsite" class="ml-2 block text-sm text-gray-900 dark:text-gray-200">Possui Site</label></div><div class="col-span-1 md:col-span-2"><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label><div class="flex flex-wrap gap-1.5 mb-2 min-h-[28px]">`);
      if (tagById.value[_ctx.tid]) {
        _push(`<!--[-->`);
        ssrRenderList(selectedTagIds.value, (tid) => {
          _push(`<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white" style="${ssrRenderStyle({ background: tagById.value[tid].color })}">${ssrInterpolate(tagById.value[tid].name)} <button class="ml-0.5 opacity-70 hover:opacity-100 leading-none text-white">×</button></span>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (selectedTagIds.value.length === 0) {
        _push(`<span class="text-xs text-gray-400 dark:text-gray-500 italic">Nenhuma tag selecionada</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative"><button type="button" class="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full text-left bg-white dark:bg-gray-800"><svg class="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg><span class="text-gray-500 dark:text-gray-400">Gerenciar tags...</span><svg class="${ssrRenderClass([showTagDropdown.value ? "rotate-180" : "", "w-4 h-4 text-gray-400 dark:text-gray-500 ml-auto transition-transform"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>`);
      if (showTagDropdown.value) {
        _push(`<div class="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-10 p-3"><p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">Tags disponíveis</p>`);
        if (__props.availableTags.length === 0) {
          _push(`<div class="text-xs text-gray-400 dark:text-gray-500 mb-3 italic">Nenhuma tag criada ainda.</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex flex-wrap gap-1.5 mb-3"><!--[-->`);
        ssrRenderList(__props.availableTags, (tag) => {
          _push(`<button type="button" class="group relative inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-white transition-all" style="${ssrRenderStyle({ background: tag.color, opacity: isTagSelected(tag.id) ? "1" : "0.5" })}">`);
          if (isTagSelected(tag.id)) {
            _push(`<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(` ${ssrInterpolate(tag.name)} <span class="ml-0.5 opacity-0 group-hover:opacity-100 text-white/80 hover:text-white cursor-pointer leading-none font-bold" title="Deletar tag">×</span></button>`);
        });
        _push(`<!--]--></div><div class="border-t border-gray-100 dark:border-gray-700 pt-3"><p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">Nova tag</p><div class="flex gap-2 items-center"><div class="flex gap-1 flex-wrap w-36 shrink-0"><!--[-->`);
        ssrRenderList(PRESET_COLORS, (c) => {
          _push(`<button type="button" class="w-5 h-5 rounded-full border-2 transition-all" style="${ssrRenderStyle({ background: c, borderColor: newTagColor.value === c ? "#fff" : "transparent" })}"></button>`);
        });
        _push(`<!--]--></div><input${ssrRenderAttr("value", newTagName.value)} type="text" placeholder="Ex: Odontologia" maxlength="24" class="flex-1 px-2 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-crm-accent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"><button type="button"${ssrIncludeBooleanAttr(!newTagName.value.trim() || tagLoading.value) ? " disabled" : ""} class="px-3 py-1.5 text-xs font-bold text-white rounded-lg disabled:opacity-40 transition-colors" style="${ssrRenderStyle({ background: newTagColor.value })}">${ssrInterpolate(tagLoading.value ? "..." : "Criar")}</button></div>`);
        if (tagError.value) {
          _push(`<p class="text-xs text-red-500 mt-1">${ssrInterpolate(tagError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="col-span-1 md:col-span-2"><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anotações / Observações</label><textarea rows="4" class="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-crm-accent outline-none resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500">${ssrInterpolate(form.value.notes)}</textarea></div></div><div class="px-6 py-4 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/60 rounded-b-2xl"><span class="text-xs text-gray-400 dark:text-gray-500 italic hidden sm:block">💡 Clique fora do modal para salvar</span><div class="flex gap-3"><button class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">Cancelar</button><button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="btn-primary">`);
      if (loading.value) {
        _push(`<span>Salvando...</span>`);
      } else {
        _push(`<span>Salvar Alterações</span>`);
      }
      _push(`</button></div></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ContactModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_8 = Object.assign(_sfc_main$2, { __name: "ContactModal" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ImportLeads",
  __ssrInlineRender: true,
  emits: ["imported", "close"],
  setup(__props, { emit: __emit }) {
    const textInput = ref("");
    const loading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-crm-900/50 backdrop-blur-sm" }, _attrs))} data-v-fb63f0dd><div class="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in-up" data-v-fb63f0dd><div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50" data-v-fb63f0dd><h3 class="text-lg font-semibold text-crm-900" data-v-fb63f0dd>Importar Leads</h3><button class="text-gray-400 hover:text-gray-600 transition-colors" data-v-fb63f0dd><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-fb63f0dd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-fb63f0dd></path></svg></button></div><div class="p-6" data-v-fb63f0dd><p class="text-sm text-gray-500 mb-4" data-v-fb63f0dd> Cole uma lista de arrobas (<code class="bg-gray-100 px-1 rounded" data-v-fb63f0dd>@usuario, ...</code>) OU cole um <strong data-v-fb63f0dd>Array JSON</strong> completo para importar dados avançados. </p><textarea class="w-full h-40 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-crm-accent focus:border-crm-accent outline-none transition-all resize-none font-mono text-sm" placeholder="[ { &quot;name&quot;: &quot;Maria&quot;, &quot;whatsapp&quot;: &quot;+5511...&quot; } ]" data-v-fb63f0dd>${ssrInterpolate(textInput.value)}</textarea><div class="mt-6 flex justify-end gap-3" data-v-fb63f0dd><button class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors" data-v-fb63f0dd>Cancelar</button><button${ssrIncludeBooleanAttr(loading.value || !textInput.value.trim()) ? " disabled" : ""} class="btn-primary" data-v-fb63f0dd>`);
      if (loading.value) {
        _push(`<span class="flex items-center gap-2" data-v-fb63f0dd><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-fb63f0dd><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-fb63f0dd></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-fb63f0dd></path></svg> Importando... </span>`);
      } else {
        _push(`<span data-v-fb63f0dd>Importar Leads</span>`);
      }
      _push(`</button></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ImportLeads.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_9 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-fb63f0dd"]]), { __name: "ImportLeads" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    const supabaseUser = useSupabaseUser();
    watch(supabaseUser, (newUser) => {
      if (!newUser) {
        navigateTo("/login");
      }
    });
    const isDark = useState("isDark", () => false);
    const toggleDark = () => {
      isDark.value = !isDark.value;
      if (isDark.value) {
        (void 0).documentElement.classList.add("dark");
        localStorage.setItem("crm-dark", "1");
      } else {
        (void 0).documentElement.classList.remove("dark");
        localStorage.setItem("crm-dark", "0");
      }
    };
    const currentPage = ref("painel");
    const pageTitle = {
      painel: "Painel",
      relatorio: "Aproveitamento do Dia",
      analise: "Análise de Leads",
      contatos: "Todos os Contatos",
      templates: "Templates de Mensagem",
      kanban: "Kanban Board"
    };
    const contacts = ref([]);
    const pending = ref(true);
    const showImportModal = ref(false);
    const fetchData = async () => {
      pending.value = true;
      try {
        const response = await $fetch("/api/contacts");
        contacts.value = response.data;
        setTimeout(() => prefetchAvatars(contacts.value), 500);
      } catch (error) {
        console.error("Failed to load CRM data", error);
      } finally {
        pending.value = false;
      }
    };
    const prefetchAvatars = async (contactList) => {
      const usernames = contactList.filter((c) => c.instagram).map((c) => c.instagram.replace("@", "").trim().toLowerCase());
      if (!usernames.length) return;
      try {
        await $fetch("/api/avatar-prefetch", { method: "POST", body: { usernames } });
      } catch {
      }
    };
    const onLeadsImported = () => {
      showImportModal.value = false;
      fetchData();
    };
    const availableTags = ref([]);
    const fetchTags = async () => {
      try {
        const res = await $fetch("/api/tags");
        availableTags.value = res.tags || [];
      } catch {
        availableTags.value = [];
      }
    };
    const showEditModal = ref(false);
    const selectedContact = ref(null);
    const openEditModal = (contact) => {
      selectedContact.value = { ...contact };
      showEditModal.value = true;
    };
    const onContactSaved = async () => {
      showEditModal.value = false;
      if (selectedContact.value) {
        const idx = contacts.value.findIndex((c) => c.id === selectedContact.value.id);
        if (idx !== -1) {
          try {
            const response = await $fetch("/api/contacts");
            const updated = response.data.find((c) => c.id === selectedContact.value.id);
            if (updated) contacts.value[idx] = updated;
          } catch {
          }
        }
      }
      selectedContact.value = null;
    };
    const deleteContact = async (contact) => {
      if (!confirm(`Tem certeza que deseja excluir ${contact.name}?`)) return;
      try {
        await $fetch("/api/contacts", { method: "DELETE", body: { id: contact.id } });
        const idx = contacts.value.findIndex((c) => c.id === contact.id);
        if (idx !== -1) contacts.value.splice(idx, 1);
      } catch (err) {
        console.error("Failed to delete contact", err);
      }
    };
    const deleteContacts = async (ids) => {
      if (!confirm(`Tem certeza que deseja excluir ${ids.length} lead(s) selecionado(s)?`)) return;
      try {
        await $fetch("/api/contacts", { method: "DELETE", body: { ids } });
        contacts.value = contacts.value.filter((c) => !ids.includes(c.id));
      } catch (err) {
        console.error("Failed to delete contacts", err);
      }
    };
    const showTemplatePopup = ref(false);
    const templateContact = ref(null);
    const openTemplatePopup = (contact) => {
      templateContact.value = contact;
      showTemplatePopup.value = true;
    };
    const updateContactStatus = async ({ contact, newStatus }) => {
      try {
        await $fetch("/api/contacts", {
          method: "PUT",
          body: { contact: { ...contact, status: newStatus } }
        });
        const idx = contacts.value.findIndex((c) => c.id === contact.id);
        if (idx !== -1) contacts.value[idx].status = newStatus;
      } catch (err) {
        console.error("Failed to update status", err);
        const idx = contacts.value.findIndex((c) => c.id === contact.id);
        if (idx !== -1) contacts.value[idx].status = contact._prevStatus;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DashboardSidebar = __nuxt_component_0$1;
      const _component_DashboardHeader = __nuxt_component_1;
      const _component_DashboardPainel = __nuxt_component_2;
      const _component_KanbanBoard = __nuxt_component_3;
      const _component_DailyReport = __nuxt_component_4;
      const _component_LeadsDashboard = __nuxt_component_5;
      const _component_CrmTable = __nuxt_component_6;
      const _component_MessageTemplates = __nuxt_component_7;
      const _component_ContactModal = __nuxt_component_8;
      const _component_ImportLeads = __nuxt_component_9;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [unref(isDark) ? "dark" : "", "h-full w-full"]
      }, _attrs))}><div class="min-h-screen bg-crm-50 dark:bg-gray-950 font-sans transition-colors duration-300"><div class="flex h-screen overflow-hidden">`);
      _push(ssrRenderComponent(_component_DashboardSidebar, {
        currentPage: currentPage.value,
        "onUpdate:currentPage": ($event) => currentPage.value = $event,
        contactsCount: contacts.value.length,
        pending: pending.value,
        onToggleDark: toggleDark
      }, null, _parent));
      _push(`<main class="flex-1 flex flex-col h-screen overflow-hidden">`);
      _push(ssrRenderComponent(_component_DashboardHeader, {
        title: pageTitle[currentPage.value],
        onToggleDark: toggleDark,
        onNewContact: ($event) => showImportModal.value = true
      }, null, _parent));
      _push(`<div class="flex-1 overflow-y-auto p-8 dark:bg-gray-950 transition-colors duration-300"><div class="max-w-6xl mx-auto">`);
      if (currentPage.value === "painel") {
        _push(ssrRenderComponent(_component_DashboardPainel, {
          contacts: contacts.value,
          pending: pending.value,
          availableTags: availableTags.value,
          onEdit: openEditModal,
          onDelete: deleteContact,
          onDeleteMultiple: deleteContacts,
          onMessage: openTemplatePopup
        }, null, _parent));
      } else if (currentPage.value === "kanban") {
        _push(ssrRenderComponent(_component_KanbanBoard, {
          contacts: contacts.value,
          availableTags: availableTags.value,
          onUpdateStatus: updateContactStatus,
          onEdit: openEditModal
        }, null, _parent));
      } else if (currentPage.value === "relatorio") {
        _push(ssrRenderComponent(_component_DailyReport, { contacts: contacts.value }, null, _parent));
      } else if (currentPage.value === "analise") {
        _push(`<!--[-->`);
        if (pending.value) {
          _push(`<div class="flex items-center justify-center py-24 text-gray-400 dark:text-gray-500"><svg class="animate-spin w-8 h-8 mr-3 text-crm-accent" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg> Carregando análise... </div>`);
        } else {
          _push(ssrRenderComponent(_component_LeadsDashboard, { contacts: contacts.value }, null, _parent));
        }
        _push(`<!--]-->`);
      } else if (currentPage.value === "contatos") {
        _push(ssrRenderComponent(_component_CrmTable, {
          contacts: contacts.value,
          pending: pending.value,
          availableTags: availableTags.value,
          onEdit: openEditModal,
          onDelete: deleteContact,
          onDeleteMultiple: deleteContacts,
          onMessage: openTemplatePopup
        }, null, _parent));
      } else if (currentPage.value === "templates") {
        _push(ssrRenderComponent(_component_MessageTemplates, { mode: "page" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></main></div>`);
      if (showEditModal.value && selectedContact.value) {
        _push(ssrRenderComponent(_component_ContactModal, {
          contact: selectedContact.value,
          availableTags: availableTags.value,
          onClose: ($event) => showEditModal.value = false,
          onSave: onContactSaved,
          onTagsUpdated: fetchTags
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showImportModal.value) {
        _push(ssrRenderComponent(_component_ImportLeads, {
          onClose: ($event) => showImportModal.value = false,
          onImported: onLeadsImported
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showTemplatePopup.value && templateContact.value) {
        _push(ssrRenderComponent(_component_MessageTemplates, {
          mode: "popup",
          contact: templateContact.value,
          onClose: ($event) => showTemplatePopup.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-QqGXwe9N.mjs.map
