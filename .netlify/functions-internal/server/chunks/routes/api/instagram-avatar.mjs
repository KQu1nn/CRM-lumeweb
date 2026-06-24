import { d as defineEventHandler, a as getQuery, c as createError, s as sendRedirect } from '../../_/nitro.mjs';
import { existsSync, writeFileSync, readFileSync, mkdirSync } from 'node:fs';
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
const memCache = loadCache();
const RETRY_AFTER = 6 * 60 * 60 * 1e3;
async function fetchInstagramPicUrl(username) {
  var _a, _b, _c, _d, _e, _f;
  try {
    const res = await fetch(
      `https://i.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          "x-ig-app-id": "936619743392459",
          "Accept": "*/*",
          "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8",
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
async function downloadAvatar(imgUrl, username) {
  try {
    const res = await fetch(imgUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Referer": "https://www.instagram.com/"
      }
    });
    if (!res.ok) return null;
    const buffer = Buffer.from(await res.arrayBuffer());
    const filename = `${username}.jpg`;
    writeFileSync(join(AVATAR_DIR, filename), buffer);
    return `/avatars/${filename}`;
  } catch {
    return null;
  }
}
const instagramAvatar = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const raw = query.username;
  const username = (Array.isArray(raw) ? raw[0] : raw != null ? raw : "").replace("@", "").trim().toLowerCase();
  if (!username) {
    throw createError({ statusCode: 400, statusMessage: "Missing username" });
  }
  const cached = memCache[username];
  if (cached) {
    if (cached.file && existsSync(resolve(process.cwd(), "public" + cached.file))) {
      return sendRedirect(event, cached.file, 302);
    }
    if (!cached.file && Date.now() - cached.ts < RETRY_AFTER) {
      throw createError({ statusCode: 404, statusMessage: "Avatar not found" });
    }
  }
  const picUrl = await fetchInstagramPicUrl(username);
  if (!picUrl) {
    memCache[username] = { file: null, ts: Date.now() };
    saveCache(memCache);
    throw createError({ statusCode: 404, statusMessage: "Avatar not found" });
  }
  const localPath = await downloadAvatar(picUrl, username);
  if (!localPath) {
    memCache[username] = { file: null, ts: Date.now() };
    saveCache(memCache);
    throw createError({ statusCode: 404, statusMessage: "Download failed" });
  }
  memCache[username] = { file: localPath, ts: Date.now() };
  saveCache(memCache);
  return sendRedirect(event, localPath, 302);
});

export { instagramAvatar as default };
//# sourceMappingURL=instagram-avatar.mjs.map
