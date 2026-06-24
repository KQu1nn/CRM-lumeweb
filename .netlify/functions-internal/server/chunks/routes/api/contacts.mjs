import { d as defineEventHandler, r as readBody, c as createError } from '../../_/nitro.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@supabase/ssr';
import 'node:crypto';

const contacts = defineEventHandler(async (event) => {
  try {
    const dataPath = resolve(process.cwd(), "server/data/crm.json");
    const rawData = readFileSync(dataPath, "utf-8");
    const data = JSON.parse(rawData);
    if (event.method === "POST") {
      const body = await readBody(event);
      const input = body.leads || "";
      let parsedJson = null;
      try {
        parsedJson = JSON.parse(input);
      } catch (e) {
      }
      let newContacts = [];
      if (Array.isArray(parsedJson)) {
        newContacts = parsedJson.map((item) => {
          const id = data.contacts.length > 0 ? Math.max(...data.contacts.map((c) => c.id)) + 1 : 1;
          return {
            id: id + Math.random(),
            name: item.name || item.instagram || "JSON Lead",
            email: item.email || "",
            whatsapp: item.whatsapp || "",
            instagram: item.instagram || "",
            googleMaps: item.googleMaps || "",
            company: item.company || "Importado",
            status: item.status || "pendente",
            value: item.value || 0,
            lastContact: item.lastContact || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            priority: item.priority || "media",
            hasWebsite: item.hasWebsite || false,
            notes: item.notes || ""
          };
        });
      } else {
        const handles = input.split(/[\n,]+/).map((h) => h.trim()).filter((h) => h.startsWith("@"));
        newContacts = handles.map((handle) => {
          const id = data.contacts.length > 0 ? Math.max(...data.contacts.map((c) => c.id)) + 1 : 1;
          return {
            id: id + Math.random(),
            // Ensuring unique IDs temporarily
            name: handle,
            email: `${handle.replace("@", "")}@instagram.com`,
            whatsapp: "",
            instagram: handle,
            googleMaps: "",
            company: "Instagram Lead",
            status: "pendente",
            value: 0,
            lastContact: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            priority: "media",
            hasWebsite: false,
            notes: ""
          };
        });
      }
      newContacts.forEach((c, index) => {
        c.id = data.contacts.length > 0 ? Math.max(...data.contacts.map((contact) => contact.id)) + 1 + index : index + 1;
      });
      data.contacts.push(...newContacts);
      writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
    } else if (event.method === "PUT") {
      const body = await readBody(event);
      const updatedContact = body.contact;
      if (updatedContact && updatedContact.id) {
        const index = data.contacts.findIndex((c) => c.id === updatedContact.id);
        if (index !== -1) {
          data.contacts[index] = { ...data.contacts[index], ...updatedContact };
          writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
        }
      }
    } else if (event.method === "DELETE") {
      const body = await readBody(event);
      const contactId = body.id;
      const contactIds = body.ids;
      if (contactIds && Array.isArray(contactIds)) {
        data.contacts = data.contacts.filter((c) => !contactIds.includes(c.id));
        writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
      } else if (contactId) {
        data.contacts = data.contacts.filter((c) => c.id !== contactId);
        writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
      }
    }
    return new Promise((resolve2) => {
      setTimeout(() => {
        resolve2({
          status: "success",
          data: data.contacts,
          summary: {
            total: data.contacts.length,
            activeValue: data.contacts.filter((c) => c.status === "active").reduce((acc, curr) => acc + curr.value, 0),
            activeCount: data.contacts.filter((c) => c.status === "active").length
          }
        });
      }, 300);
    });
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to process CRM data"
    });
  }
});

export { contacts as default };
//# sourceMappingURL=contacts.mjs.map
