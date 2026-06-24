/**
 * Instagram Avatar API — Persistent Cache v2
 * ────────────────────────────────────────────
 * Uses i.instagram.com JSON API (no HTML scraping, much more reliable).
 * Downloads and stores images locally in public/avatars/.
 * Cache persists in server/data/avatar-cache.json across restarts.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, join } from 'node:path'

// ── Paths ─────────────────────────────────────────────────────
const DATA_DIR   = resolve(process.cwd(), 'server/data')
const CACHE_FILE = join(DATA_DIR, 'avatar-cache.json')
const AVATAR_DIR = resolve(process.cwd(), 'public/avatars')

if (!existsSync(AVATAR_DIR)) mkdirSync(AVATAR_DIR, { recursive: true })

// ── Persistent cache helpers ──────────────────────────────────
type CacheEntry = { file: string | null; ts: number }

const loadCache = (): Record<string, CacheEntry> => {
  try {
    if (existsSync(CACHE_FILE)) return JSON.parse(readFileSync(CACHE_FILE, 'utf-8'))
  } catch {}
  return {}
}
const saveCache = (c: Record<string, CacheEntry>) => {
  try { writeFileSync(CACHE_FILE, JSON.stringify(c, null, 2), 'utf-8') } catch {}
}

// In-memory layer (avoid reading JSON on every request)
const memCache: Record<string, CacheEntry> = loadCache()

// Re-try failed entries after 6 hours
const RETRY_AFTER = 6 * 60 * 60 * 1000

// ── Fetch profile pic URL via i.instagram.com JSON API ────────
async function fetchInstagramPicUrl(username: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://i.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'x-ig-app-id': '936619743392459',
          'Accept': '*/*',
          'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8',
          'Referer': 'https://www.instagram.com/',
          'Origin': 'https://www.instagram.com',
        },
        redirect: 'follow',
      }
    )
    if (!res.ok) return null

    const json: any = await res.json()
    return json?.data?.user?.profile_pic_url_hd
      ?? json?.data?.user?.profile_pic_url
      ?? null
  } catch {
    return null
  }
}

// ── Download image bytes and save locally ─────────────────────
async function downloadAvatar(imgUrl: string, username: string): Promise<string | null> {
  try {
    const res = await fetch(imgUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://www.instagram.com/',
      },
    })
    if (!res.ok) return null

    const buffer = Buffer.from(await res.arrayBuffer())
    const filename = `${username}.jpg`
    writeFileSync(join(AVATAR_DIR, filename), buffer)
    return `/avatars/${filename}`
  } catch {
    return null
  }
}

// ── Event handler ─────────────────────────────────────────────
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const raw   = query.username
  const username = (Array.isArray(raw) ? raw[0] : raw ?? '')
    .replace('@', '').trim().toLowerCase()

  if (!username) {
    throw createError({ statusCode: 400, statusMessage: 'Missing username' })
  }

  // 1. Check cache ──────────────────────────────────────────────
  const cached = memCache[username]
  if (cached) {
    // Image exists locally
    if (cached.file && existsSync(resolve(process.cwd(), 'public' + cached.file))) {
      return sendRedirect(event, cached.file, 302)
    }
    // Failed recently — don't retry yet
    if (!cached.file && Date.now() - cached.ts < RETRY_AFTER) {
      throw createError({ statusCode: 404, statusMessage: 'Avatar not found' })
    }
  }

  // 2. Fetch from Instagram JSON API ───────────────────────────
  const picUrl = await fetchInstagramPicUrl(username)

  if (!picUrl) {
    memCache[username] = { file: null, ts: Date.now() }
    saveCache(memCache)
    throw createError({ statusCode: 404, statusMessage: 'Avatar not found' })
  }

  // 3. Download and save locally ────────────────────────────────
  const localPath = await downloadAvatar(picUrl, username)

  if (!localPath) {
    memCache[username] = { file: null, ts: Date.now() }
    saveCache(memCache)
    throw createError({ statusCode: 404, statusMessage: 'Download failed' })
  }

  // 4. Persist cache ────────────────────────────────────────────
  memCache[username] = { file: localPath, ts: Date.now() }
  saveCache(memCache)

  return sendRedirect(event, localPath, 302)
})
