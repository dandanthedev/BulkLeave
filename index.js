import ora from "ora";
import prompts from "prompts";
import { getGuilds } from "./utils/getGuilds.js";
import { checkToken } from "./utils/checkToken.js";
var twofactorcode = false;
async function main() {
  console.clear();
  const { value: token } = await prompts({
    type: "password",
    name: "value",
    message: "Enter your Discord token",
  });

  const tokenSpinner = ora("Checking token").start();
  const tokenValid = await checkToken(token);
  if (!tokenValid.valid) {
    tokenSpinner.fail("Invalid token");
    process.exit(1);
  }
  tokenSpinner.succeed(
    `Token valid for ${tokenValid.username}#${tokenValid.discriminator}`
  );

  const guildSpinner = ora("Getting servers").start();
  const guilds = await getGuilds(token);
  if (!guilds.success) {
    guildSpinner.fail("Failed to get servers");
    process.exit(1);
  }
  guildSpinner.succeed(`Got ${guilds.data.length} servers`);

  //ask how to sort the servers
  const { value: sortType } = await prompts({
    type: "select",
    name: "value",
    message: "How do you want to sort the servers?",
    choices: [
      { title: "Name", value: "name" },
      { title: "Default", value: "default" },
    ],
  });
  const sortSpinner = ora("Sorting servers").start();
  //sort the servers
  guilds.data.sort((a, b) => {
    if (sortType === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return 0;
    }
  });
  sortSpinner.succeed("Sorted servers using " + sortType);

  //ask if settings are correct
  const { value: confirmSettings } = await prompts({
    type: "confirm",
    name: "value",
    message: "Are these settings correct?",
  });
  if (!confirmSettings) {
    sortSpinner.fail("Cancelled");
    process.exit(1);
  }

  //select multiple guilds
  const { value: selectedGuilds } = await prompts({
    type: "multiselect",
    name: "value",
    message: "Select servers to leave",
    choices: guilds.data.map((guild) => ({
      title: guild.name,
      value: guild.id,
    })),
  });
  //loading bar
  const leaveSpinner = ora("Leaving servers").start();
  if (!selectedGuilds || !selectedGuilds.length) {
    leaveSpinner.fail("No servers selected");
    process.exit(1);
  }
  //confirm selection
  leaveSpinner.stop();
  const { value: confirmSelection } = await prompts({
    type: "confirm",
    name: "value",
    message: `Are you sure you want to leave ${selectedGuilds.length} servers?`,
  });
  if (!confirmSelection) {
    leaveSpinner.fail("Cancelled");
    process.exit(1);
  }
  leaveSpinner.start();
  //check if user has 2FA enabled
  const user = await fetch("https://discord.com/api/v8/users/@me", {
    headers: { Authorization: token },
  }).then((res) => res.json());
  if (!user.mfa_enabled) {
    leaveSpinner.info("2FA not enabled");
  } else {
    twofactorcode = true;
  }

  for (const guild of selectedGuilds) {
    //get guild and check if it is owned by the user
    const guildInfo = await fetch(
      `https://discord.com/api/v8/guilds/${guild}`,
      {
        headers: { Authorization: token },
      }
    ).then((res) => res.json());
    //check if user is owner of the server
    if (guildInfo.owner_id !== user.id) {
      leaveSpinner.info(`Not owner of ${guildInfo.name}, leaving...`);
      await fetch(`https://discord.com/api/v8/users/@me/guilds/${guild}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      continue;
    } else {
      //stop loading bar
      leaveSpinner.stop();
      //ask if user wants to delete the server
      const { value: deleteServer } = await prompts({
        type: "confirm",
        name: "value",
        message: `Do you want to delete ${guildInfo.name}?`,
      });
      if (deleteServer) {
        if (twofactorcode === true) {
          const { value: twofactor } = await prompts({
            type: "text",
            name: "value",
            message: `Enter your 2FA code for ${guildInfo.name}`,
          });
          console.log(
            `Attempting to delete ${guildInfo.name} with id ${
              guildInfo.id
            }, header: ${token} and body: ${JSON.stringify({
              code: twofactor,
            })}`
          );
          fetch(
            "https://discord.com/api/v9/guilds/" + guildInfo.id + "/delete",
            {
              headers: {
                authorization: token,
                "content-type": "application/json",
                pragma: "no-cache",
              },
              body: '{"code":"' + twofactor + '"}',
              method: "POST",
            }
          ).then(async (res) => {
            if (res.status === 204) {
              leaveSpinner.succeed(`Successfully deleted ${guildInfo.name}`);
            } else {
              leaveSpinner.fail(`Failed to delete ${guildInfo.name}`);
            }
          });
        } else {
          await fetch(
            `https://discord.com/api/v9/guilds/${guildInfo.id}/delete`,
            {
              method: "POST",
              headers: { Authorization: token },
            }
          ).then(async (res) => {
            if (res.status === 204) {
              leaveSpinner.succeed(`Successfully deleted ${guildInfo.name}`);
            } else {
              leaveSpinner.fail(`Failed to delete ${guildInfo.name}`);
            }
          });
        }
      }
    }
  }
  leaveSpinner.succeed("Successfully left all servers");
}
main();
