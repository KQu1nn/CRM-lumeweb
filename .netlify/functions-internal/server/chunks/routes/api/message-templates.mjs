import { d as defineEventHandler, r as readBody, c as createError } from '../../_/nitro.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@supabase/ssr';
import 'node:crypto';

const dataPath = () => resolve(process.cwd(), "server/data/crm.json");
const read = () => JSON.parse(readFileSync(dataPath(), "utf-8"));
const write = (d) => writeFileSync(dataPath(), JSON.stringify(d, null, 2), "utf-8");
const DEFAULT_TEMPLATES = [
  {
    id: "tpl_1",
    title: "\u{1F44B} Primeiro contato",
    channel: "whatsapp",
    body: "Ol\xE1 {{nome}}! Tudo bem? Vi o perfil de voc\xEAs no Instagram (@{{instagram}}) e fiquei impressionado. Trabalho com cria\xE7\xE3o de sites profissionais e acredito que posso ajudar {{empresa}} a crescer ainda mais online. Posso te mostrar algumas ideias?"
  },
  {
    id: "tpl_2",
    title: "\u{1F501} Follow-up gentil",
    channel: "ambos",
    body: "Oi {{nome}}, tudo bem? Passei para dar um oi e saber se voc\xEA teve chance de pensar na nossa conversa. Fico \xE0 disposi\xE7\xE3o para tirar qualquer d\xFAvida! \u{1F60A}"
  },
  {
    id: "tpl_3",
    title: "\u{1F525} Lead quente \u2014 proposta",
    channel: "whatsapp",
    body: "Ol\xE1 {{nome}}! Preparei uma proposta personalizada para {{empresa}} com base no que conversamos. Quando tiver um minutinho, posso te enviar os detalhes? Tenho certeza que vai gostar! \u{1F680}"
  },
  {
    id: "tpl_4",
    title: "\u{1F4F8} Contato via Instagram",
    channel: "instagram",
    body: "Oi @{{instagram}}! Vi o perfil de voc\xEAs e adorei o trabalho! Tenho uma ideia que pode ajudar bastante o neg\xF3cio. Posso te contar mais? \u{1F60A}"
  },
  {
    id: "tpl_5",
    title: "\u{1F389} Fechamento / Boas-vindas",
    channel: "whatsapp",
    body: "Oi {{nome}}! Que \xF3tima not\xEDcia \u2014 seja muito bem-vindo(a) como cliente da Lume Web! \u{1F389} Vou entrar em contato em breve para come\xE7armos o projeto de {{empresa}}. Qualquer d\xFAvida, estou por aqui!"
  }
];
const messageTemplates = defineEventHandler(async (event) => {
  const data = read();
  if (!data.messageTemplates) {
    data.messageTemplates = DEFAULT_TEMPLATES;
    write(data);
  }
  if (event.method === "GET") {
    return { templates: data.messageTemplates };
  }
  if (event.method === "POST") {
    const body = await readBody(event);
    const tpl = {
      id: `tpl_${Date.now()}`,
      title: (body.title || "").trim(),
      channel: body.channel || "ambos",
      body: (body.body || "").trim()
    };
    if (!tpl.title || !tpl.body) throw createError({ statusCode: 400, statusMessage: "Title and body required" });
    data.messageTemplates.push(tpl);
    write(data);
    return { template: tpl };
  }
  if (event.method === "PUT") {
    const body = await readBody(event);
    const idx = data.messageTemplates.findIndex((t) => t.id === body.id);
    if (idx === -1) throw createError({ statusCode: 404, statusMessage: "Template not found" });
    data.messageTemplates[idx] = { ...data.messageTemplates[idx], ...body };
    write(data);
    return { template: data.messageTemplates[idx] };
  }
  if (event.method === "DELETE") {
    const body = await readBody(event);
    data.messageTemplates = data.messageTemplates.filter((t) => t.id !== body.id);
    write(data);
    return { ok: true };
  }
  throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
});

export { messageTemplates as default };
//# sourceMappingURL=message-templates.mjs.map
