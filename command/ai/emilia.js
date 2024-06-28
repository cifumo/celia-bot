export default {
  command: ["emilia"],
  example: "%p%cmd Halo emilia",
  description: "Chatan dengan ai Emilia",
  tags: "ai",
  name: "emilia",
  register: true,
  run: async (m, { conn, text }) => {
    const user = db.data.users[m.sender]
    if(!text) return m.reply('mau nanya apa?')
    const req = await func.fetchJson(API('cif', '/api/ai/emilia', { name: user.name || m.pushName, ask: text }))
    if(!req.status) return m.reply('endpoint lagi error')
    await m.reply(req.data)
  },
}