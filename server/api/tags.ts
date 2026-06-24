/**
 * GET  /api/tags        → lista todas as tags
 * POST /api/tags        → cria nova tag { name, color }
 * PUT  /api/tags        → edita tag { id, name, color }
 * DELETE /api/tags      → remove tag { id }
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const dataPath = () => resolve(process.cwd(), 'server/data/crm.json')

const readData = () => JSON.parse(readFileSync(dataPath(), 'utf-8'))
const writeData = (d: any) => writeFileSync(dataPath(), JSON.stringify(d, null, 2), 'utf-8')

export default defineEventHandler(async (event) => {
  const data = readData()

  // Ensure tags registry exists
  if (!data.tags) data.tags = []

  if (event.method === 'GET') {
    return { tags: data.tags }
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    const name  = (body.name || '').trim()
    const color = body.color || '#6366f1'
    if (!name) throw createError({ statusCode: 400, statusMessage: 'Tag name required' })

    // Prevent duplicate names (case-insensitive)
    if (data.tags.find((t: any) => t.name.toLowerCase() === name.toLowerCase())) {
      throw createError({ statusCode: 409, statusMessage: 'Tag already exists' })
    }

    const newTag = {
      id:    Date.now().toString(),
      name,
      color,
    }
    data.tags.push(newTag)
    writeData(data)
    return { tag: newTag }
  }

  if (event.method === 'PUT') {
    const body = await readBody(event)
    const idx  = data.tags.findIndex((t: any) => t.id === body.id)
    if (idx === -1) throw createError({ statusCode: 404, statusMessage: 'Tag not found' })
    data.tags[idx] = { ...data.tags[idx], ...body }
    writeData(data)
    return { tag: data.tags[idx] }
  }

  if (event.method === 'DELETE') {
    const body = await readBody(event)
    const id   = body.id
    data.tags  = data.tags.filter((t: any) => t.id !== id)
    // Remove the tag from all contacts
    data.contacts = data.contacts.map((c: any) => ({
      ...c,
      tags: (c.tags || []).filter((tid: string) => tid !== id),
    }))
    writeData(data)
    return { ok: true }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
})
