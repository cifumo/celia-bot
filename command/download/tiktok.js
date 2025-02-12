export default {
  command: ["tiktok"],
  description: "Download TikTok video",
  example: "Contoh: %p%cmd <TikTok URL>", // %p = prefix, %cmd = command, %text = teks
  name: "tiktok",
  tags: "download",

  run: async (m, { conn }) => {
    const url = m.args[0];

    if (!func.isUrl(url))
      return m.reply(
        `Invalid URL\n\nContoh: ${m.prefix + m.command} https://vm.tiktok.com/ZSY5tdEQW/`
      );

    const apiTypes = ["", "v2", "v3"];
    let response;

    for (const type of apiTypes) {
      let apiUrl;
      if (type) {
        apiUrl = API("itzpire", "/download/tiktok", { url: url, type: type });
      } else {
        apiUrl = API("itzpire", "/download/tiktok", { url: url });
      }

      console.log(apiUrl);
      try {
        response = await func.fetchJson(apiUrl);
        if (response.status === "success") {
          break; // Break the loop if a successful response is received
        }
      } catch (err) {
        console.error(`Error with type ${type}:`, err);
      }
    }

    if (!response || response.status !== "success" || !response.data) {
      return m.reply("Failed to fetch TikTok video.");
    }

    console.log(response);

    const { desc, author, statistics, video, video1, video2, video_hd, images, music } = response.data;
    const videoUrls = [video, video1, video2, video_hd].filter(Boolean); // Filter out undefined or null values

    if (!videoUrls.length && !images) {
      return m.reply("Content not found.");
    }

    const replyText = `
      *Description:* ${desc || "No description"}
      *Author:* ${author?.nickname || "Unknown"}
      *Likes:* ${statistics?.likeCount || "0"}
      *Comments:* ${statistics?.commentCount || "0"}
      *Shares:* ${statistics?.shareCount || "0"}
    `;

    try {
      if (videoUrls.length > 0) {
        // Send video URLs
        for (const videoUrl of videoUrls) {
          await m.reply(videoUrl, { caption: replyText });
          await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 1 second
        }
      } else if (Array.isArray(images)) {
        // Send images one by one with a delay
        for (const imageUrl of images) {
          await m.reply(imageUrl, { caption: replyText });
          await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 1 second
        }
      }
    } catch (err) {
      console.error(err);
      m.reply("An error occurred while sending the TikTok content.");
    }
  },
};