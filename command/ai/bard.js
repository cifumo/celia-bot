import fetch from "node-fetch";

export default {
  command: ["bard"],
  description: "chat with ai bard",
  name: "bard",
  tags: "ai",
  loading: true,
  run: async (m, { conn, text, args }) => {
    if (!args[0]) {
      m.reply("Please provide a message to send to the AI");
      return;
    }
    const response = await fetch(
      `https://rest.cifumo.biz.id/api/ai/bard-chat?ask=${args[0]}`,
    );
    const data = await response.json();
    m.reply(data.content);
  },
};
