import { defineComponent, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { d as useSupabaseUser, n as navigateTo } from './server.mjs';
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
  __name: "confirm",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useSupabaseUser();
    watch(user, (newUser) => {
      if (newUser) {
        return navigateTo("/");
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center min-h-screen bg-crm-50 dark:bg-gray-950 font-sans transition-colors duration-300" }, _attrs))}><div class="glass-panel p-8 text-center max-w-sm w-full mx-4 flex flex-col items-center gap-4"><svg class="animate-spin h-10 w-10 text-crm-accent" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg><h2 class="text-xl font-bold text-crm-900 dark:text-white mt-2">Confirmando Acesso</h2><p class="text-sm text-gray-500 dark:text-crm-400">Aguarde um momento enquanto processamos sua autenticação...</p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/confirm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=confirm-B8HDzfJ5.mjs.map
