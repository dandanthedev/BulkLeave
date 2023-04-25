import axios from "axios";
export async function getGuilds(token) {
  const res = await axios
    .get("https://discord.com/api/v8/users/@me/guilds", {
      headers: { Authorization: token },
    })
    .catch(() => ({ data: { success: false } }));
  if (res.data.success) return { success: false };
  else return { success: true, data: res.data };
}
