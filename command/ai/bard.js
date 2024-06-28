import fetch from "node-fetch";

export default {
  command: ["bard"],
  description: "chat with ai bard",
  name: "bard",
  example: '%p%cmd <replyimage/text>',
  tags: "ai",
  loading: true,
  run: async (m, { conn, text, args }) => {
    if (!text) {
      m.reply("Masukan pesannya atau kirim gambar");
      return;
    }
    const quoted = m.isQuoted ? m.quoted : m;
    if (quoted.isMedia) {
    if (Number(quoted.msg?.fileLength) > 350000000) throw "Kegeden mas";
    let media = await quoted.download();
    let image =
      /image/i.test(quoted.msg.mimetype) && !/webp/i.test(quoted.msg.mimetype)
        ? await func.upload.telegra(media)
        : await func.upload.pomf(media);
    const response = await fetch(
      "https://rest.cifumo.biz.id/api/ai/bard-image",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ask: text,
          image: image,
        }),
      },
    );
    const data = await response.json();
    m.reply(data.content);
    } else {
    const response = await fetch(
      `https://rest.cifumo.biz.id/api/ai/bard-chat?ask=${text}`,
    );
    const data = await response.json();
    m.reply(data.content);
    }
  },
};