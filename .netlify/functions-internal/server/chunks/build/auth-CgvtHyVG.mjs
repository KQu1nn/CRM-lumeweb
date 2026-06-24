import { g as defineNuxtRouteMiddleware, d as useSupabaseUser, n as navigateTo } from './server.mjs';
import 'vue';
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
import 'vue/server-renderer';

const auth = defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();
  if (!user.value) {
    return navigateTo("/login");
  }
});

export { auth as default };
//# sourceMappingURL=auth-CgvtHyVG.mjs.map
