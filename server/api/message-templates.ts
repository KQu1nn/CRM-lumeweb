/**
 * GET    /api/message-templates  → lista todos os templates
 * POST   /api/message-templates  → cria { title, body, channel }
 * PUT    /api/message-templates  → edita { id, title, body, channel }
 * DELETE /api/message-templates  → remove { id }
 *
 * channel: 'whatsapp' | 'instagram' | 'ambos'
 * body supports variables: {{nome}}, {{instagram}}, {{empresa}}, {{status}}
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const dataPath = () => resolve(process.cwd(), 'server/data/crm.json')
const read  = () => JSON.parse(readFileSync(dataPath(), 'utf-8'))
const write = (d: any) => writeFileSync(dataPath(), JSON.stringify(d, null, 2), 'utf-8')

const DEFAULT_TEMPLATES = [
  {
    id: 'tpl_1',
    title: '👋 Primeiro contato',
    channel: 'whatsapp',
    body: 'Olá {{nome}}! Tudo bem? Vi o perfil de vocês no Instagram (@{{instagram}}) e fiquei impressionado. Trabalho com criação de sites profissionais e acredito que posso ajudar {{empresa}} a crescer ainda mais online. Posso te mostrar algumas ideias?',
  },
  {
    id: 'tpl_2',
    title: '🔁 Follow-up gentil',
    channel: 'ambos',
    body: 'Oi {{nome}}, tudo bem? Passei para dar um oi e saber se você teve chance de pensar na nossa conversa. Fico à disposição para tirar qualquer dúvida! 😊',
  },
  {
    id: 'tpl_3',
    title: '🔥 Lead quente — proposta',
    channel: 'whatsapp',
    body: 'Olá {{nome}}! Preparei uma proposta personalizada para {{empresa}} com base no que conversamos. Quando tiver um minutinho, posso te enviar os detalhes? Tenho certeza que vai gostar! 🚀',
  },
  {
    id: 'tpl_4',
    title: '📸 Contato via Instagram',
    channel: 'instagram',
    body: 'Oi @{{instagram}}! Vi o perfil de vocês e adorei o trabalho! Tenho uma ideia que pode ajudar bastante o negócio. Posso te contar mais? 😊',
  },
  {
    id: 'tpl_5',
    title: '🎉 Fechamento / Boas-vindas',
    channel: 'whatsapp',
    body: 'Oi {{nome}}! Que ótima notícia — seja muito bem-vindo(a) como cliente da Lume Web! 🎉 Vou entrar em contato em breve para começarmos o projeto de {{empresa}}. Qualquer dúvida, estou por aqui!',
  },
]

export default defineEventHandler(async (event) => {
  const data = read()
  if (!data.messageTemplates) {
    data.messageTemplates = DEFAULT_TEMPLATES
    write(data)
  }

  if (event.method === 'GET') {
    return { templates: data.messageTemplates }
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    const tpl = {
      id:      `tpl_${Date.now()}`,
      title:   (body.title  || '').trim(),
      channel: body.channel || 'ambos',
      body:    (body.body   || '').trim(),
    }
    if (!tpl.title || !tpl.body) throw createError({ statusCode: 400, statusMessage: 'Title and body required' })
    data.messageTemplates.push(tpl)
    write(data)
    return { template: tpl }
  }

  if (event.method === 'PUT') {
    const body = await readBody(event)
    const idx = data.messageTemplates.findIndex((t: any) => t.id === body.id)
    if (idx === -1) throw createError({ statusCode: 404, statusMessage: 'Template not found' })
    data.messageTemplates[idx] = { ...data.messageTemplates[idx], ...body }
    write(data)
    return { template: data.messageTemplates[idx] }
  }

  if (event.method === 'DELETE') {
    const body = await readBody(event)
    data.messageTemplates = data.messageTemplates.filter((t: any) => t.id !== body.id)
    write(data)
    return { ok: true }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
})
