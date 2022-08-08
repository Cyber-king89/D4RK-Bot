const fs = require('fs')
const chalk = require('chalk')

global.APIs = {
	zenz: 'https://zenzapis.xyz',
}

global.APIKeys = {
	'https://zenzapis.xyz': 'sancychan01',
}

global.vidmenu = fs.readFileSync("./Media/vid/Kanappi-MD-Vid.mp4") 

global.doc1 = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
global.doc2 = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
global.doc3 = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
global.doc4 = 'application/zip'
global.doc5 = 'application/pdf'
global.doc6 = 'application/vnd.android.package-archive'

global.vcardowner = ['919744933034'] 
global.ownername = "ꜱᴀᴄʜᴜ-ꜱᴇᴛᴛᴀɴ 🕊" 
global.ytname = "YT: Sachu-Mods" 
global.socialm = "GitHub: Sachu-Settan" 
global.location = "United Kottayam 🕊, Kerala ✨, India" 

global.owner = ['919744933034']
global.ownertag = ['919744933034']
global.botname = '𝗞𝗮𝗻𝗮𝗽𝗽𝗶 𝗕𝗼𝘁 🍃' 
global.linkz = "https://bit.ly/Bot-Zone" 
global.websitex = "https://Sachu-Settan.github.io" // Web Coming Soon
global.botscript = 'https://github.com/Sachu-Settan/Kanappi-Bot'
global.reactmoji = "💝" 
global.themeemoji = "⚠"
global.packname = " "
global.author = "💖 ᴋᴀɴᴀᴘᴘɪ ʙᴏᴛ 🕊 \n⚠\n🎀\n👻\n🤙\n☣\n🍇\n🍒\n🥂\n"
global.watermark = "👀 ᴋᴀɴᴀᴘᴘɪ ʙᴏᴛ 🕊"
global.orderTitle = "👻"
global.themeeline = "│"
global.themeline = "│✙"
global.themeendline = "│\n└──────────────────┈ ⳹"
global.zeroapi = "UGSWgULd"

global.widepicarr = ["Kanappi (3).jpg","Kanappi (1).jpg","Kanappi (2).jpg"]
Kanappii = widepicarr[Math.floor(Math.random() * widepicarr.length)]
global.thum = fs.readFileSync("./Bot Pic/Kanappi.jpg") 
global.log0 = fs.readFileSync("./Bot Pic/Kanappi.jpg") 
global.err4r = fs.readFileSync("./Bot Pic/Kanappi.jpg") 
global.thumb = fs.readFileSync("./Bot Pic/Kanappi.jpg") 
global.widelog0 = fs.readFileSync(`./Bot Pic/${Kanappii}`)

global.premium = ['919744933034'] 
global.ntilinkytvid = []
global.ntilinkytch = []
global.ntilinkig = []
global.ntilinkfb = []
global.ntilinktg = []
global.ntilinktt = []
global.ntilinktwt = []
global.ntilinkall = []
global.chattbot = []
global.nticall = []
global.ntwame = []
global.nttoxic = []
global.ntnsfw = []
global.ntvirtex = []
global.rkyt = []
global.wlcm = []
global.gcrevoke = []
global.autorep = []
global.ntilink = []

global.sessionfilename = 'session'
global.prefa = ['','!','.','🐦','🐤','🗿']
global.sp = '⭔'
global.mess = {
    success: 'Done ✓',
    caption: 'Here You Go !',
    admin: 'This Feature Is Only For Admin !',
    botAdmin: 'Bot Must Be Admin First !',
    owner: 'This Feature Is Only For Owner !',
    group: 'Feature Used Only For Groups !',
    private: 'Features Used Only For Private Chat !',
    bot: 'This Feature Is Only For Bot',
    wait: 'Prossesing....',
    error: 'Error !!',
    correctmediavid: 'This Feature Can Be Only Used For Video !!',
    viderr: 'Replay To A Video !',
    noargs: 'Please Enter A Query !!',
    linkm: 'Where Is The Link ?',
    notiglink: 'Link Given Is Not Ig (Instagram) Link !!',
    servererror: '⚠ Server Error ⚠',
    errorlink: 'Link Invalid !!',
    linkerror: '⚠ Invalid URL ⚠',
    downerror: 'Download Failed !! \n Check If File Size Is Over The Limit',
    igdownloaded: '⚠ Downloaded From Instagram ⚠',
    logodownloading: 'Wait a moment while making the logo about 1 minute',
    endLimit: 'Your Daily Limit Has Expired, The Limit Will Be Reset Every 12 Hours',
    ban: 'You have been banned by the owner, if you want to be unbanned, chat owner.',
    nsfw: 'The nsfw feature has not been activated, please contact the admin to activate',
    banChat: 'The bot was banned in this group, please contact the owner to unban',
    chatbotmediaerror: 'Sorry I Have Trouble To Identify Other Medias. Could You please Just Chat ?'
}
global.limitawal = {
    premium: "Infinity",
    free: 10,
    monayawal: 1000
}
global.rpg = {
   darahawal: 100,
   besiawal: 15,
   goldawal: 10,
   emeraldawal: 5,
   umpanawal: 5,
   potionawal: 1
}
global.thumb = fs.readFileSync('./Bot Pic/Kanappi.jpg')
global.flaming = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='
global.fluming = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=fluffy-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='
global.flarun = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=runner-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='
global.flasmurf = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=smurfs-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
