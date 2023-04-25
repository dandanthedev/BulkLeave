# BulkLeave

BulkLeave is a command-line interface (CLI) program written in Node.js that allows you to quickly and easily leave multiple Discord servers at once. It is especially useful for cleaning up your server list or leaving servers that you are no longer active in.

## Installation

To use BulkLeave, you must have Node.js installed on your computer. If you do not have Node.js installed, you can download it [here](https://nodejs.org/en/download/).

### Cloning or Downloading the Repository

To clone or download the repository, follow these steps:

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone or download the repository.
3. If you have Git installed, run `git clone https://github.com/daanschenkel/BulkLeave.git`. If you do not have Git installed, you can download the repository as a ZIP file by clicking the green "Code" button on the GitHub repository page and selecting "Download ZIP".
4. If you cloned the repository with Git, navigate to the `BulkLeave` directory. If you downloaded the ZIP file, extract it to the directory where you want to install BulkLeave and navigate to the `BulkLeave-master` directory.
5. Run `npm install` to install the required dependencies.

### Installing with NPM

Alternatively, you can install BulkLeave using NPM by running the following command in your terminal or command prompt:
```npm install -g bulkleave```

This will install BulkLeave globally on your system, allowing you to run it from anywhere using the `bulkleave` command.

## Getting Your Discord Token

In order to use BulkLeave, you will need to obtain your Discord token. Your Discord token is a unique identifier that is used to authenticate your account with the Discord API.

To obtain your Discord token, follow these steps:

1. Log in to your Discord account in your web browser.
2. Press `Ctrl`+`Shift`+`I` on your keyboard to open the developer tools.
3. Click the "Application" tab in the developer tools.
4. Click "Local Storage" in the left-hand menu.
5. Click on the `discordapp.com` dropdown in the "Local Storage" section.
6. Select the `token` key.
7. Copy the value of the `token` key.

Note that your Discord token changes frequently, so you may need to repeat these steps to obtain a new token.

Alternatively, you can also find guides on how to obtain your Discord token by searching online. However, please be cautious when following guides from third-party websites, as they may contain malicious instructions or lead to the compromise of your account. For example, the following website provides a guide on how to obtain your Discord token, but we cannot vouch for its accuracy or safety: [https://discordhelp.net/discord-token](https://discordhelp.net/discord-token).

## Usage

To use BulkLeave, follow these steps:

1. Open your terminal or command prompt.
2. Run `bulkleave`.
3. Follow the prompts in the terminal to authenticate your Discord account and select the servers you want to leave.

Note: If you have two-factor authentication (2FA) enabled on your Discord account, you will be prompted to enter a verification code after logging in.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on GitHub. If you would like to contribute code, please
