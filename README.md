# `Fork Repo`

<p><a href="https://github.com/Sachu-Settan/Kanappi-Bot/fork"> <img align="center" src="https://git-scm.com/images/logos/downloads/Git-Logo-1788C.png" height="100" width="250" alt="Fork" /></a></p>

# `Scan QR Code For Session`
[![Qr](https://raw.githubusercontent.com/Sachu-Settan/Media/main/replit.svg)](https://replit.com/@Sachu-Settan/Multi-Device-QR#README.md?output%20only=1&lite=1#index.js)


# `Requirements`
* [Node.js](https://nodejs.org/en/)
* [Git](https://git-scm.com/downloads)
* [FFmpeg](https://github.com/BtbN/FFmpeg-Builds/releases/download/autobuild-2020-12-08-13-03/ffmpeg-n4.3.1-26-gca55240b8c-win64-gpl-4.3.zip) (for sticker command)

# `Installation`
[![Deploy](https://raw.githubusercontent.com/Sachu-Settan/Media/main/heroku.svg)](https://heroku.com/deploy?template=https://github.com/Sachu-Settan/Kanappi-Bot)
## `Heroku Buildpack`
```bash
heroku/nodejs
https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest
https://github.com/clhuang/heroku-buildpack-webp-binaries.git
```
## `For Termux`
```ts
termux-setup-storage
apt update && apt upgrade
pkg install nodejs git ffmpeg libwebp imagemagick
git clone https://github.com/Sachu-Settan/Kanappi-Bot
cd Kanappi-Bot
npm install --force
npm start
```

