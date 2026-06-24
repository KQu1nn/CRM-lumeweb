import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

export default defineEventHandler(async (event) => {
  try {
    const dataPath = resolve(process.cwd(), 'server/data/crm.json')
    const rawData = readFileSync(dataPath, 'utf-8')
    const data = JSON.parse(rawData)

    if (event.method === 'POST') {
      const body = await readBody(event)
      const input = body.leads || ''
      
      let parsedJson = null
      try {
        parsedJson = JSON.parse(input)
      } catch(e) {
        // Not a JSON string
      }

      let newContacts: any[] = []

      if (Array.isArray(parsedJson)) {
        // Handle JSON array import
        newContacts = parsedJson.map((item: any) => {
          const id = data.contacts.length > 0 ? Math.max(...data.contacts.map((c: any) => c.id)) + 1 : 1
          return {
            id: id + Math.random(),
            name: item.name || item.instagram || 'JSON Lead',
            email: item.email || '',
            whatsapp: item.whatsapp || '',
            instagram: item.instagram || '',
            googleMaps: item.googleMaps || '',
            company: item.company || 'Importado',
            status: item.status || 'pendente',
            value: item.value || 0,
            lastContact: item.lastContact || new Date().toISOString().split('T')[0],
            priority: item.priority || 'media',
            hasWebsite: item.hasWebsite || false,
            notes: item.notes || ''
          }
        })
      } else {
        // Fallback to comma-separated handles
        const handles = input.split(/[\n,]+/).map((h: string) => h.trim()).filter((h: string) => h.startsWith('@'))
        newContacts = handles.map((handle: string) => {
          const id = data.contacts.length > 0 ? Math.max(...data.contacts.map((c: any) => c.id)) + 1 : 1
          return {
            id: id + Math.random(), // Ensuring unique IDs temporarily
            name: handle,
            email: `${handle.replace('@', '')}@instagram.com`,
            whatsapp: '',
            instagram: handle,
            googleMaps: '',
            company: 'Instagram Lead',
            status: 'pendente',
            value: 0,
            lastContact: new Date().toISOString().split('T')[0],
            priority: 'media',
            hasWebsite: false,
            notes: ''
          }
        })
      }

      // Clean up random IDs
      newContacts.forEach((c: any, index: number) => {
        c.id = data.contacts.length > 0 ? Math.max(...data.contacts.map((contact: any) => contact.id)) + 1 + index : index + 1
      })

      data.contacts.push(...newContacts)
      
      // Write back to JSON database
      writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8')
    } else if (event.method === 'PUT') {
      const body = await readBody(event)
      const updatedContact = body.contact
      if (updatedContact && updatedContact.id) {
        const index = data.contacts.findIndex((c: any) => c.id === updatedContact.id)
        if (index !== -1) {
          data.contacts[index] = { ...data.contacts[index], ...updatedContact }
          writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8')
        }
      }
    } else if (event.method === 'DELETE') {
      const body = await readBody(event)
      const contactId = body.id
      const contactIds = body.ids
      if (contactIds && Array.isArray(contactIds)) {
        data.contacts = data.contacts.filter((c: any) => !contactIds.includes(c.id))
        writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8')
      } else if (contactId) {
        data.contacts = data.contacts.filter((c: any) => c.id !== contactId)
        writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8')
      }
    }
    
    // Simulating slight network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'success',
          data: data.contacts,
          summary: {
            total: data.contacts.length,
            activeValue: data.contacts.filter((c: any) => c.status === 'active').reduce((acc: number, curr: any) => acc + curr.value, 0),
            activeCount: data.contacts.filter((c: any) => c.status === 'active').length
          }
        })
      }, 300)
    })
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to process CRM data'
    })
  }
})
