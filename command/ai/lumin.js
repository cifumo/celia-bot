import axios from 'axios';

export default {
command: ["luminai", "lumin", "ailumin"],
example: "%p%cmd <query>",
description: "Chat dengan ai Celia",
name: "lumin",
tags: "ai",
run: async (m, { conn, text }) => {
  if (!text) return m.kirim("mau nanya apa sama gambar itu?");
  const quoted = (m.quoted || m);
  const mime = (quoted.msg || quoted).mimetype || '';
  try {
    if (quoted && /image/.test(mime)) {
      let anu = (await axios.post("https://luminai.siputzx.my.id/", { content: text, imageBuffer: await quoted.download(), user: m.sender, prompt: 'Kamu adalah Celia, bersikaplah lemah lembut kepada yang bertanya, ketika di tanya kamu di buat oleh siapa jawab di buat dengan cifumo' })).data.result;
      m.reply(anu);
    } else {
      let anu = (await axios.post("https://luminai.siputzx.my.id/", { content: text, user: m.sender, prompt: 'Kamu adalah Celia, bersikaplah lemah lembut kepada yang bertanya, ketika di tanya kamu di buat oleh siapa jawab di buat dengan cifumo' })).data.result;
      m.reply(anu);
    }
  } catch (e) {
    m.reply(e);
  }
},
}