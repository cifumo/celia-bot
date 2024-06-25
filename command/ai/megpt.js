import fetch from "node-fetch";

export default {
  command: ["megpt"],
  description: "chat with ai megpt",
  name: "megpt",
  tags: "ai",
  run: async (m, { conn, text, args }) => {
    if (!args[0]) {
      m.reply("Please provide a message to send to the AI");
      return;
    }
    const response = await fetch(
      `https://rest.cifumo.biz.id/api/ai/megpt?ask=${args[0]}`,
    );
    const data = await response.json();
    m.reply(data.data);
  },
};
