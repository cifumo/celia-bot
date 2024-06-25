import fetch from "node-fetch";

export default {
  command: ["yousearch"],
  description: "search anything on the web",
  name: "yousearch",
  tags: "ai",
  run: async (m, { conn, text, args }) => {
    if (!args[0]) {
      m.reply("Please provide a message to send to the AI");
      return;
    }
    const response = await fetch(
      `https://rest.cifumo.biz.id/api/ai/yousearch?ask=${args[0]}`,
    );
    const data = await response.json();
    m.reply(data.data);
  },
};
