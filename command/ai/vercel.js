import fetch from "node-fetch";

export default {
  command: ["vercel"],
  description: "chat with ai vercel",
  name: "vercel",
  tags: "ai",
  run: async (m, { conn, text, args }) => {
    if (!args[0]) {
      m.reply("Please provide a message to send to the AI");
      return;
    }

    const req = await fetch(
      `https://rest.cifumo.biz.id/api/ai/vercelai?ask=${text}`,
    );
    const data = await req.json();
    m.reply(data.data);
  },
};
