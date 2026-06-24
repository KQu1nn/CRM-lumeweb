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
const readData = () => JSON.parse(readFileSync(dataPath(), "utf-8"));
const writeData = (d) => writeFileSync(dataPath(), JSON.stringify(d, null, 2), "utf-8");
const tags = defineEventHandler(async (event) => {
  const data = readData();
  if (!data.tags) data.tags = [];
  if (event.method === "GET") {
    return { tags: data.tags };
  }
  if (event.method === "POST") {
    const body = await readBody(event);
    const name = (body.name || "").trim();
    const color = body.color || "#6366f1";
    if (!name) throw createError({ statusCode: 400, statusMessage: "Tag name required" });
    if (data.tags.find((t) => t.name.toLowerCase() === name.toLowerCase())) {
      throw createError({ statusCode: 409, statusMessage: "Tag already exists" });
    }
    const newTag = {
      id: Date.now().toString(),
      name,
      color
    };
    data.tags.push(newTag);
    writeData(data);
    return { tag: newTag };
  }
  if (event.method === "PUT") {
    const body = await readBody(event);
    const idx = data.tags.findIndex((t) => t.id === body.id);
    if (idx === -1) throw createError({ statusCode: 404, statusMessage: "Tag not found" });
    data.tags[idx] = { ...data.tags[idx], ...body };
    writeData(data);
    return { tag: data.tags[idx] };
  }
  if (event.method === "DELETE") {
    const body = await readBody(event);
    const id = body.id;
    data.tags = data.tags.filter((t) => t.id !== id);
    data.contacts = data.contacts.map((c) => ({
      ...c,
      tags: (c.tags || []).filter((tid) => tid !== id)
    }));
    writeData(data);
    return { ok: true };
  }
  throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
});

export { tags as default };
//# sourceMappingURL=tags.mjs.map
