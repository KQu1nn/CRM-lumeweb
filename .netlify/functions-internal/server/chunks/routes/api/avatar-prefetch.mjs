import { d as defineEventHandler, r as readBody, c as createError } from '../../_/nitro.mjs';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@supabase/ssr';
import 'node:crypto';

const DATA_DIR = resolve(process.cwd(), "server/data");
const CACHE_FILE = join(DATA_DIR, "avatar-cache.json");
const AVATAR_DIR = resolve(process.cwd(), "public/avatars");
if (!existsSync(AVATAR_DIR)) mkdirSync(AVATAR_DIR, { recursive: true });
const loadCache = () => {
  try {
    if (existsSync(CACHE_FILE)) return JSON.parse(readFileSync(CACHE_FILE, "utf-8"));
  } catch {
  }
  return {};
};
const saveCache = (c) => {
  try {
    writeFileSync(CACHE_FILE, JSON.stringify(c, null, 2), "utf-8");
  } catch {
  }
};
async function fetchPicUrl(username) {
  var _a, _b, _c, _d, _e, _f;
  try {
    const res = await fetch(
      `https://i.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          "x-ig-app-id": "936619743392459",
          "Accept": "*/*",
          "Accept-Language": "pt-BR,pt;q=0.9",
          "Referer": "https://www.instagram.com/",
          "Origin": "https://www.instagram.com"
        },
        redirect: "follow"
      }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return (_f = (_e = (_b = (_a = json == null ? void 0 : json.data) == null ? void 0 : _a.user) == null ? void 0 : _b.profile_pic_url_hd) != null ? _e : (_d = (_c = json == null ? void 0 : json.data) == null ? void 0 : _c.user) == null ? void 0 : _d.profile_pic_url) != null ? _f : null;
  } catch {
    return null;
  }
}
async function downloadImage(imgUrl, username) {
  try {
    const res = await fetch(imgUrl, {
      headers: { "User-Agent": "Mozilla/5.0", "Referer": "https://www.instagram.com/" }
    });
    if (!res.ok) return null;
    writeFileSync(join(AVATAR_DIR, `${username}.jpg`), Buffer.from(await res.arrayBuffer()));
    return `/avatars/${username}.jpg`;
  } catch {
    return null;
  }
}
const avatarPrefetch = defineEventHandler(async (event) => {
  var _a;
  const body = await readBody(event);
  const usernames = ((_a = body == null ? void 0 : body.usernames) != null ? _a : []).map((u) => u.replace("@", "").trim().toLowerCase()).filter(Boolean);
  if (!usernames.length) throw createError({ statusCode: 400, statusMessage: "No usernames" });
  const cache = loadCache();
  const results = { hit: 0, fetched: 0, failed: 0, skipped: 0 };
  const RETRY_AFTER = 6 * 60 * 60 * 1e3;
  for (const username of usernames) {
    const cached = cache[username];
    if ((cached == null ? void 0 : cached.file) && existsSync(resolve(process.cwd(), "public" + cached.file))) {
      results.hit++;
      continue;
    }
    if (cached && !cached.file && Date.now() - cached.ts < RETRY_AFTER) {
      results.skipped++;
      continue;
    }
    const picUrl = await fetchPicUrl(username);
    if (!picUrl) {
      cache[username] = { file: null, ts: Date.now() };
      results.failed++;
      await new Promise((r) => setTimeout(r, 600));
      continue;
    }
    const localPath = await downloadImage(picUrl, username);
    if (localPath) {
      cache[username] = { file: localPath, ts: Date.now() };
      results.fetched++;
    } else {
      cache[username] = { file: null, ts: Date.now() };
      results.failed++;
    }
    await new Promise((r) => setTimeout(r, 600));
  }
  saveCache(cache);
  return { ok: true, results, total: usernames.length };
});

export { avatarPrefetch as default };
//# sourceMappingURL=avatar-prefetch.mjs.map
