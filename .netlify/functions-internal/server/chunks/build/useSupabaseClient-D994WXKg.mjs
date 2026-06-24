import { p as publicAssetsURL } from '../_/nitro.mjs';
import { a as useNuxtApp } from './server.mjs';

const _imports_0 = publicAssetsURL("/login-icon.png");
const useSupabaseClient = () => {
  return useNuxtApp().$supabase.client;
};

export { _imports_0 as _, useSupabaseClient as u };
//# sourceMappingURL=useSupabaseClient-D994WXKg.mjs.map
