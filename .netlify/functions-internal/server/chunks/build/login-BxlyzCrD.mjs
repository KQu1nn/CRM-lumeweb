import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderDynamicModel } from 'vue/server-renderer';
import { u as useSupabaseClient, _ as _imports_0 } from './useSupabaseClient-D994WXKg.mjs';
import { f as useState } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@supabase/ssr';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    const isDark = useState("isDark", () => false);
    const isLoginMode = ref(true);
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const loading = ref(false);
    const showPassword = ref(false);
    const alertMessage = ref("");
    const alertType = ref("error");
    const isFormValid = computed(() => {
      if (!email.value || !password.value) return false;
      if (password.value.length < 6) return false;
      if (!isLoginMode.value && password.value !== confirmPassword.value) return false;
      return true;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center p-4 md:p-6 bg-gradient-to-tr from-crm-50 via-white to-blue-50 dark:from-gray-950 dark:via-crm-900 dark:to-slate-900 transition-colors duration-300 relative overflow-hidden font-sans" }, _attrs))}><div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div><div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/10 dark:bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div><button class="absolute top-6 right-6 p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 shadow-sm text-gray-500 hover:text-crm-900 dark:text-gray-400 dark:hover:text-white transition-colors" title="Alternar Tema">`);
      if (unref(isDark)) {
        _push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-11.314l.707.707m11.314 11.314l.707.707M12 5a7 7 0 100 14 7 7 0 000-14z"></path></svg>`);
      } else {
        _push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`);
      }
      _push(`</button><div class="w-full max-w-[450px] relative z-10"><div class="text-center mb-8"><div class="inline-flex items-center justify-center p-3 rounded-2xl bg-white dark:bg-gray-850 shadow-md border border-gray-100 dark:border-gray-800/50 mb-3 transition-colors"><img${ssrRenderAttr("src", _imports_0)} alt="Lume Web Icon" class="w-10 h-10 object-contain"></div><h1 class="text-3xl font-extrabold tracking-tight text-crm-900 dark:text-white"> CRM Lume Web </h1><p class="text-sm text-gray-500 dark:text-crm-400 mt-1.5 transition-colors"> Acesse a central de inteligência do seu negócio </p></div><div class="glass-panel p-8 backdrop-blur-md bg-white/90 dark:bg-crm-900/80 border border-white/60 dark:border-crm-800/40 shadow-xl rounded-3xl transition-all duration-300"><div class="flex p-1 bg-crm-50 dark:bg-crm-950/60 rounded-xl mb-6 border border-gray-100/50 dark:border-gray-800/20"><button class="${ssrRenderClass([
        "flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
        isLoginMode.value ? "bg-white dark:bg-crm-800 text-crm-900 dark:text-white shadow-sm" : "text-gray-500 dark:text-crm-400 hover:text-crm-700 dark:hover:text-crm-200"
      ])}"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}> Entrar </button><button class="${ssrRenderClass([
        "flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
        !isLoginMode.value ? "bg-white dark:bg-crm-800 text-crm-900 dark:text-white shadow-sm" : "text-gray-500 dark:text-crm-400 hover:text-crm-700 dark:hover:text-crm-200"
      ])}"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}> Registrar-se </button></div>`);
      if (alertMessage.value) {
        _push(`<div class="${ssrRenderClass([
          "p-4 rounded-xl flex items-start gap-3 border text-sm mb-6",
          alertType.value === "success" ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/40 text-green-800 dark:text-green-300" : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/40 text-red-800 dark:text-red-300"
        ])}"><span class="text-base shrink-0">${ssrInterpolate(alertType.value === "success" ? "✅" : "⚠️")}</span><div class="flex-1"><p class="font-medium">${ssrInterpolate(alertMessage.value)}</p></div><button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="space-y-5"><div><label for="email" class="block text-xs font-bold text-crm-500 dark:text-crm-400 uppercase tracking-wider mb-2"> E-mail corporativo </label><div class="relative"><div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-crm-500"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206"></path></svg></div><input id="email"${ssrRenderAttr("value", email.value)} type="email" required autocomplete="email" placeholder="nome@empresa.com" class="block w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700/60 rounded-xl bg-white dark:bg-crm-950/40 text-crm-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-crm-accent/20 focus:border-crm-accent transition-all duration-200"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}></div></div><div><div class="flex justify-between items-center mb-2"><label for="password" class="block text-xs font-bold text-crm-500 dark:text-crm-400 uppercase tracking-wider"> Senha de acesso </label></div><div class="relative"><div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-crm-500"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></div><input id="password"${ssrRenderDynamicModel(showPassword.value ? "text" : "password", password.value, null)}${ssrRenderAttr("type", showPassword.value ? "text" : "password")} required autocomplete="current-password" placeholder="Mínimo de 6 caracteres" class="block w-full pl-11 pr-11 py-3 border border-gray-200 dark:border-gray-700/60 rounded-xl bg-white dark:bg-crm-950/40 text-crm-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-crm-accent/20 focus:border-crm-accent transition-all duration-200"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}><button type="button" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-crm-900 dark:hover:text-white transition-colors" tabindex="-1">`);
      if (showPassword.value) {
        _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>`);
      } else {
        _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`);
      }
      _push(`</button></div></div>`);
      if (!isLoginMode.value) {
        _push(`<div class="transition-all duration-200"><label for="confirmPassword" class="block text-xs font-bold text-crm-500 dark:text-crm-400 uppercase tracking-wider mb-2"> Confirme a senha </label><div class="relative"><div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-crm-500"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg></div><input id="confirmPassword"${ssrRenderAttr("value", confirmPassword.value)} type="password" required placeholder="Repita a mesma senha" class="block w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700/60 rounded-xl bg-white dark:bg-crm-950/40 text-crm-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-crm-accent/20 focus:border-crm-accent transition-all duration-200"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(!isFormValid.value || loading.value) ? " disabled" : ""} class="w-full btn-primary bg-crm-accent hover:bg-crm-accentHover disabled:opacity-40 disabled:hover:bg-crm-accent disabled:active:scale-100 py-3 text-base shadow-md font-bold rounded-xl flex items-center justify-center transition-all duration-200 text-white cursor-pointer">`);
      if (loading.value) {
        _push(`<span class="flex items-center gap-2"><svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Processando... </span>`);
      } else {
        _push(`<span>${ssrInterpolate(isLoginMode.value ? "Entrar no CRM" : "Criar minha conta")}</span>`);
      }
      _push(`</button></form><p class="text-[11px] text-center text-gray-400 dark:text-crm-500 mt-6 transition-colors leading-relaxed"> Ao prosseguir, você concorda com os termos de serviço e privacidade do CRM Lume Web. </p></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-BxlyzCrD.mjs.map
