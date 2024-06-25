import fetch from "node-fetch";

export default {
  command: ["thinkany"],
  description: "chat with ai thinkany",
  name: "thinkany",
  tags: "ai",
  run: async (m, { conn, text, args }) => {
    if (!args[0]) {
      m.reply("Please provide a message to send to the AI");
      return;
    }
    const response = await fetch(
      `https://rest.cifumo.biz.id/api/ai/thinkany?ask=${args[0]}`,
    );
    const data = await response.json();
    m.reply(data.data);
  },
};
