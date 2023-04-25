import axios from "axios";

export async function checkToken(token) {
  const res = await axios
    .get("https://discord.com/api/v8/users/@me", {
      headers: { Authorization: token },
    })
    .catch(() => ({ data: { valid: false } }));
  if (res.data.valid === false)
    return {
      valid: false,
    };
  else
    return {
      valid: true,
      username: res.data.username,
      discriminator: res.data.discriminator,
    };
}
