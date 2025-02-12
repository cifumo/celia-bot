export default {
  command: ["menu", "help"],
  description: "Menampilkan list menu",
  name: "menu",
  tags: "main",

  run: async (m, { conn, args }) => {
    const selectedCategory = args[0];

    if (!selectedCategory) {
      let body =
        `This bot is designed to help WhatsApp users with various features, starting from downloading videos or music, creating stickers, and many other functions.\n\n┌  ◦  *Creator* : ${global.author}\n│  ◦  *Instagram* : tyoochann\n╰───────···\n\nPlease select a category to see the available commands.`;

      const categories = new Set();

      for (const [filePath, command] of Object.entries(global.plugins)) {
        const cmd = command.default || command;
        if (
          !cmd ||
          !cmd.command ||
          !Array.isArray(cmd.command) ||
          !cmd.command[0]
        ) {
          continue;
        }

        const category = cmd.tags || "General";
        categories.add(category);
      }

      const sections = [
        {
          title: "Categories",
          rows: Array.from(categories).map((category) => ({
            title: category,
            id: `.menu ${category}`,
            description: `View commands in the ${category} category`,
          })),
        },
      ];

      return conn.sendListM(m.chat, body, wm, sections, global.thumbnail, m, {
                    mentionedJid: [m.sender],
                    forwardedNewsletterMessageInfo: {
                            newsletterName: global.name,
                            newsletterJid: "120363298369543523@newsletter",
                        },
                });
    } else {
      let body = `Commands in the ${selectedCategory} category:\n\n`;

      const commandsInCategory = [];

      for (const [filePath, command] of Object.entries(global.plugins)) {
        const cmd = command.default || command;
        if (
          !cmd ||
          !cmd.command ||
          !Array.isArray(cmd.command) ||
          !cmd.command[0]
        ) {
          continue;
        }

        const category = cmd.tags || "General";
        if (category.toLowerCase() === selectedCategory.toLowerCase()) {
          commandsInCategory.push(cmd);
        }
      }

      commandsInCategory.forEach((cmd) => {
        body += `❒ *${cmd.name}:*\n↳『${cmd.description || "No description"}』\n------------------------------------\n`;
      });

      if (commandsInCategory.length === 0) {
        body = `No commands found in the ${selectedCategory} category.`;
      }

      return conn.sendMessage(m.chat, { text: body,
        	    contextInfo: {
                    mentionedJid: [m.sender],
                    forwardedNewsletterMessageInfo: {
                            newsletterName: global.name,
                            newsletterJid: "120363298369543523@newsletter",
                        },
                    externalAdReply: {
                        mediaType: 1,
                        previewType: "pdf",
                        title: global.name,
                        body: wm,
                        thumbnail: thumbnail,
                        renderLargerThumbnail: true,
                        sourceUrl: link
                    }
                }
            }, { quoted: m })
    }
  },
};