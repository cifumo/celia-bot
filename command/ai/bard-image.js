import fetch from "node-fetch";

export default {
  command: ["bard-image", "bardimg", "bardimage"],
  description: "generate image with ai bard",
  example: "bard-image reply photo",
  name: "bard-image",
  tags: "ai",
  loading: true,
  media: {
    image: true,
  },
  run: async (m, { conn, text, args }) => {
    const quoted = m.isQuoted ? m.quoted : m;
    if (!quoted.isMedia) return m.reply("Reply media messages");
    if (Number(quoted.msg?.fileLength) > 350000000) throw "Kegeden mas";
    let media = await quoted.download();
    let image =
      /image/i.test(quoted.msg.mimetype) && !/webp/i.test(quoted.msg.mimetype)
        ? await func.upload.telegra(media)
        : await func.upload.pomf(media);
    const response = await fetch(
      "https://rest.cifumo.biz.id/api/ai/gemini-image",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ask: args[0],
          image: image,
        }),
      },
    );
    const data = await response.json();
    m.reply(data.content);
  },
};
