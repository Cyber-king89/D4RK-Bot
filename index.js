/*
 * You Can Recode, Reupload or Copy The Codes/Scripts With Credits To Code Owners ( Sachu-Settan )
 * Licenced Under MIT License
 * Copyright © 2022 Sachu. Kanappi MD
 */

require('./config')
const {
	default: KanappiConnect,
	useSingleFileAuthState,
	DisconnectReason,
	fetchLatestBaileysVersion,
	generateForwardMessageContent,
	prepareWAMessageMedia,
	generateWAMessageFromContent,
	generateMessageID,
	downloadContentFromMessage,
	makeInMemoryStore,
	jidDecode,
	proto
} = require("@adiwajshing/baileys")
const {
	state,
	saveState
} = useSingleFileAuthState(`./${sessionfilename}.json`)
const pino = require('pino')
const {
	Boom
} = require('@hapi/boom')
const fs = require('fs')
const yargs = require('yargs/yargs')
const chalk = require('chalk')
const CFonts = require('cfonts')
const FileType = require('file-type')
const path = require('path')
const PhoneNumber = require('awesome-phonenumber')
const {
	imageToWebp,
	videoToWebp,
	writeExifImg,
	writeExifVid
} = require('./lib/exif')
const {
	smsg,
	isUrl,
	generateMessageTag,
	getBuffer,
	getSizeMedia,
	fetchJson,
	await,
	sleep
} = require('./lib/myfunc')
const moment = require('moment-timezone')

var low
try {
	low = require('lowdb')
} catch (e) {
	low = require('./lib/lowdb')
}

const {
	Low,
	JSONFile
} = low
const mongoDB = require('./lib/mongoDB')

global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
	...query,
	...(apikeyqueryname ? {
		[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
	} : {})
})) : '')

const store = makeInMemoryStore({
	logger: pino().child({
		level: 'silent',
		stream: 'store'
	})
})

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
	/https?:\/\//.test(opts['db'] || '') ?
	new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
	new mongoDB(opts['db']) :
	new JSONFile(`database/database.json`)
)
global.db.data = {
	users: {},
	chats: {},
	database: {},
	game: {},
	settings: {},
	others: {},
	sticker: {},
	...(global.db.data || {})
}

if (global.db) setInterval(async () => {
	if (global.db.data) await global.db.write()
}, 30 * 1000)

async function startKanappi() {
	const Kanappi = KanappiConnect({
		logger: pino({
			level: 'silent'
		}),
		printQRInTerminal: true,
		browser: ['Kanappi Bot', 'Windows', '11.0'],
		auth: state
	})

	CFonts.say('Kanappi-MD', {
		font: 'block',
		color: ['#ff9c00'],
		align: 'center',
	})
	CFonts.say(`Multi Device WhatsApp Bot Created By Sachu-Settan | Kannapi Mwol Is Startingg...`, {
		font: 'console',
		align: 'center',
		gradient: ['red', 'magenta']
	})

	store.bind(Kanappi.ev)

	Kanappi.ws.on('CB:call', async (json) => {
		const callerId = json.content[0].attrs['call-creator']
		if (json.content[0].tag == 'offer') {
			let fek = await Kanappi.sendContact(callerId, global.owner)
			Kanappi.sendMessage(callerId, {
				text: `Automatic Block System!\nDon't Call Bot!\nPlease Ask Or Contact The Owner To Unblock You!`
			}, {
				quoted: fek
			})
			await sleep(8000)
			await Kanappi.updateBlockStatus(callerId, "block")
		}
	})

	Kanappi.ev.on('messages.upsert', async chatUpdate => {
		//console.log(JSON.stringify(chatUpdate, undefined, 2))
		try {
			mek = chatUpdate.messages[0]
			if (!mek.message) return
			mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
			if (mek.key && mek.key.remoteJid === 'status@broadcast') return
			if (!Kanappi.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
			if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
			m = smsg(Kanappi, mek, store)
			require("./Kanappi")(Kanappi, m, chatUpdate, store)
		} catch (err) {
			console.log(err)
		}
	})

	Kanappi.ev.on('groups.update', async pea => {
		try {
			ppgc = await Kanappi.profilePictureUrl(pea[0].id, 'image')
		} catch {
			ppgc = 'https://telegra.ph/file/65d5c3a0691ac0d6a77d6.png'
		}
		let lol = {
			url: ppgc
		}
		if (pea[0].announce == true) {
			Kanappi.send5ButImg(pea[0].id, `「 Group Settings Changed 」\n\nThe Group Has Been Closed By Admin, Now Only Admin Can Send Messages !`, `${botname}`, lol, [])
		} else if (pea[0].announce == false) {
			Kanappi.send5ButImg(pea[0].id, `「 Group Settings Changed 」\n\nThe Group Has Been Opened By Admin, Now Participants Can Send Messages !`, `${botname}`, lol, [])
		} else if (pea[0].restrict == true) {
			Kanappi.send5ButImg(pea[0].id, `「 Group Settings Changed 」\n\nGroup Info Has Been Restricted, Now Only Admin Can Edit Group Info !`, `${botname}`, lol, [])
		} else if (pea[0].restrict == false) {
			Kanappi.send5ButImg(pea[0].id, `「 Group Settings Changed 」\n\nGroup Info Has Been Opened, Now Participants Can Edit Group Info !`, `${botname}`, lol, [])
		} else {
			Kanappi.send5ButImg(pea[0].id, `「 Group Settings Changed 」\n\nGroup Subject Has Been Changed To *${pea[0].subject}*`, `${botname}`, lol, [])
		}
	})

	function pickRandom(list) {
		return list[Math.floor(list.length * Math.random())]
	}
	let documents = [doc1, doc2, doc3, doc4, doc5, doc6]
	let docs = pickRandom(documents)

	Kanappi.ev.on('group-participants.update', async (anu) => {
		console.log(anu)
		try {
			let metadata = await Kanappi.groupMetadata(anu.id)
			let participants = anu.participants
			for (let num of participants) {
				try {
					ppuser = await Kanappi.profilePictureUrl(num, 'image')
				} catch {
					ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				try {
					ppgroup = await Kanappi.profilePictureUrl(anu.id, 'image')
				} catch {
					ppgroup = 'https://telegra.ph/file/65d5c3a0691ac0d6a77d6.png'
				}

				let nama = await Kanappi.getName(num)
				memb = metadata.participants.length
				// let Wlcm = await getBuffer(`https://zerochanbot.herokuapp.com/api/bot/welkom2?pp=${encodeURIComponent(ppuser)}&nama=${encodeURIComponent(nama)}&bg=https://telegra.ph/file/d4c05638fa7886a1d8060.jpg&gc=${encodeURIComponent(metadata.subject)}&member=${encodeURIComponent(memb)}&apikey=${encodeURIComponent(global.zeroapi)}`)
				let Lft = await getBuffer(`https://zerochanbot.herokuapp.com/api/bot/goodbye2?pp=${encodeURIComponent(ppuser)}&nama=${encodeURIComponent(nama)}&bg=https://telegra.ph/file/d4c05638fa7886a1d8060.jpg&member=${encodeURIComponent(memb)}&apikey=${encodeURIComponent(global.zeroapi)}`)
				let Wlcm = await getBuffer(`https://api.dhamzxploit.my.id/api/canvas/welcome?pp=${encodeURIComponent(ppuser)}&name=${encodeURIComponent(nama)}&bg=https://telegra.ph/file/d4c05638fa7886a1d8060.jpg&grupname=${encodeURIComponent(metadata.subject)}&member=${encodeURIComponent(memb)}`)
				// let Lft = await getBuffer(`https://api.dhamzxploit.my.id/api/canvas/goodbye?pp=${encodeURIComponent(ppuser)}&nama=${encodeURIComponent(nama)}&bg=https://telegra.ph/file/d4c05638fa7886a1d8060.jpg&member=${encodeURIComponent(memb)}`)

				if (anu.action == 'add') {
					const buffer = await getBuffer(ppuser)
					let Name = num
					const xtime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
					const xdate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
					const xmembers = metadata.participants.length
					let unicorndoc = {
						key: {
							fromMe: false,
							"participant": "0@s.whatsapp.net",
							"remoteJid": "919744933034-1604595598@g.us"
						},
						"message": {
							orderMessage: {
								itemCount: 9999999,
								status: 200,
								thumbnail: log0,
								surface: 200,
								message: `${metadata.subject}`,
								orderTitle: '',
								sellerJid: '0@s.whatsapp.net'
							}
						},
						contextInfo: {
							"forwardingScore": 999,
							"isForwarded": true
						},
						sendEphemeral: true
					}
					body = `┌─❖
│「 𝗛𝗶 👋 」
└┬❖ 「 @${Name.split("@")[0]}  」
  │✑  𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 
  │✑  ${metadata.subject}
  │✑  𝗠𝗲𝗺𝗯𝗲𝗿 : ${xmembers}th
  │✑  𝗝𝗼𝗶𝗻𝗲𝗱 : ${xtime} ${xdate}
  └───────────────┈ ⳹`

					let buttons = [{
						buttonId: `welocommmee`,
						buttonText: {
							displayText: 'Welcome 💐'
						},
						type: 1
					}]
					let buttonMessage = {
						image: Wlcm,
						jpegThumbnail: Wlcm,
						mentions: [num],
						caption: body,
						footer: `\n ${botname}`,
						buttons: buttons,
						headerType: 4,
						contextInfo: {
							externalAdReply: {
								title: `${ownername}`,
								body: `Don't forget to read group description`,
								mediaType: 2,
								thumbnail: log0,
								sourceUrl: `${websitex}`,
								mediaUrl: `${websitex}`
							}
						}
					}
					Kanappi.sendMessage(anu.id, buttonMessage, {
						quoted: unicorndoc
					})
				} else if (anu.action == 'remove') {
					const buffer = await getBuffer(ppuser)
					const time = moment.tz('Asia/Kolkata').format('HH:mm:ss')
					const date = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
					let Name = num
					const members = metadata.participants.length
					let unicorndoc = {
						key: {
							fromMe: false,
							"participant": "0@s.whatsapp.net",
							"remoteJid": "919744933034-1604595598@g.us"
						},
						"message": {
							orderMessage: {
								itemCount: 9999999,
								status: 200,
								thumbnail: buffer,
								surface: 200,
								message: `${metadata.subject}`,
								orderTitle: '',
								sellerJid: '0@s.whatsapp.net'
							}
						},
						contextInfo: {
							"forwardingScore": 999,
							"isForwarded": true
						},
						sendEphemeral: true
					}
					body = `┌─❖
│「 𝗚𝗼𝗼𝗱𝗯𝘆𝗲 👋 」
└┬❖ 「 @${Name.split("@")[0]}  」
   │✑  𝗟𝗲𝗳𝘁 
   │✑ ${metadata.subject}
   │✑  𝗠𝗲𝗺𝗯𝗲𝗿 : 
   │✑ ${members}th
   │✑  𝗧𝗶𝗺𝗲 : 
   │✑  ${time} ${date}
   └───────────────┈ ⳹`
					let buttons = [{
						buttonId: `wkwkwk`,
						buttonText: {
							displayText: 'Sayonara 🥀'
						},
						type: 1
					}]
					let buttonMessage = {
						image: Lft,
						jpegThumbnail: Lft,
						mentions: [num],
						caption: body,
						footer: `${botname}`,
						buttons: buttons,
						headerType: 4,
						contextInfo: {
							externalAdReply: {
								title: `${ownername}`,
								body: `Bye! my friend, take care.`,
								mediaType: 2,
								thumbnail: log0,
								sourceUrl: `${websitex}`,
								mediaUrl: `${websitex}`
							}
						}
					}
					Kanappi.sendMessage(anu.id, buttonMessage, {
						quoted: unicorndoc
					})
				}
			}
		} catch (err) {
			console.log(err)
		}
	})

	//Setting\\
	Kanappi.decodeJid = (jid) => {
		if (!jid) return jid
		if (/:\d+@/gi.test(jid)) {
			let decode = jidDecode(jid) || {}
			return decode.user && decode.server && decode.user + '@' + decode.server || jid
		} else return jid
	}

	Kanappi.ev.on('contacts.update', update => {
		for (let contact of update) {
			let id = Kanappi.decodeJid(contact.id)
			if (store && store.contacts) store.contacts[id] = {
				id,
				name: contact.notify
			}
		}
	})

	Kanappi.getName = (jid, withoutContact = false) => {
		id = Kanappi.decodeJid(jid)
		withoutContact = Kanappi.withoutContact || withoutContact
		let v
		if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
			v = store.contacts[id] || {}
			if (!(v.name || v.subject)) v = Kanappi.groupMetadata(id) || {}
			resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
		})
		else v = id === '0@s.whatsapp.net' ? {
				id,
				name: 'WhatsApp'
			} : id === Kanappi.decodeJid(Kanappi.user.id) ?
			Kanappi.user :
			(store.contacts[id] || {})
		return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
	}

	Kanappi.sendContact = async (jid, kon, quoted = '', opts = {}) => {
		let list = []
		for (let i of kon) {
			list.push({
				displayName: await Kanappi.getName(i + '@s.whatsapp.net'),
				vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await Kanappi.getName(i + '@s.whatsapp.net')}\nFN:${global.ownername}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${global.ytname}\nitem2.X-ABLabel:YouTube\nitem3.URL:${global.socialm}\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${global.location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
			})
		}
		Kanappi.sendMessage(jid, {
			contacts: {
				displayName: `${list.length} Contact`,
				contacts: list
			},
			...opts
		}, {
			quoted
		})
	}

	Kanappi.setStatus = (status) => {
		Kanappi.query({
			tag: 'iq',
			attrs: {
				to: '@s.whatsapp.net',
				type: 'set',
				xmlns: 'status',
			},
			content: [{
				tag: 'status',
				attrs: {},
				content: Buffer.from(status, 'utf-8')
			}]
		})
		return status
	}

	Kanappi.public = true

	Kanappi.serializeM = (m) => smsg(Kanappi, m, store)

	Kanappi.ev.on('connection.update', async (update) => {
		const {
			connection,
			lastDisconnect
		} = update
		if (connection === 'close') {
			let reason = new Boom(lastDisconnect?.error)?.output.statusCode
			if (reason === DisconnectReason.badSession) {
				console.log(`Bad Session File, Please Delete Session and Scan Again`);
				Kanappi.logout();
			} else if (reason === DisconnectReason.connectionClosed) {
				console.log("✔ Connection closed, reconnecting....");
				startKanappi();
			} else if (reason === DisconnectReason.connectionLost) {
				console.log("✔ Connection Lost from Server, reconnecting...");
				startKanappi();
			} else if (reason === DisconnectReason.connectionReplaced) {
				console.log("✔ Connection Replaced, Another New Session Opened, Please Close Current Session First");
				Kanappi.logout();
			} else if (reason === DisconnectReason.loggedOut) {
				console.log(`✔ Device Logged Out, Please Scan Again And Run.`);
				Kanappi.logout();
			} else if (reason === DisconnectReason.restartRequired) {
				console.log("✔ Restart Required, Restarting...");
				startKanappi();
			} else if (reason === DisconnectReason.timedOut) {
				console.log("✔ Connection Timed Out, Reconnecting....");
				startKanappi();
			} else Kanappi.end(`✔ Unknown Disconnect Reason: ${reason}|${connection}`)
		}
		console.log('Connected...', update)
	})

	Kanappi.ev.on('creds.update', saveState)

	// Add Other
	/** Send Button 5 Image
	 *
	 * @param {*} jid
	 * @param {*} text
	 * @param {*} footer
	 * @param {*} image
	 * @param [*] button
	 * @param {*} options
	 * @returns
	 */
	Kanappi.send5ButImg = async (jid, text = '', footer = '', img, but = [], options = {}) => {
		let message = await prepareWAMessageMedia({
			image: img
		}, {
			upload: Kanappi.waUploadToServer
		})
		var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
			templateMessage: {
				hydratedTemplate: {
					imageMessage: message.imageMessage,
					"hydratedContentText": text,
					"hydratedFooterText": footer,
					"hydratedButtons": but
				}
			}
		}), options)
		Kanappi.relayMessage(jid, template.message, {
			messageId: template.key.id
		})
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} buttons 
	 * @param {*} caption 
	 * @param {*} footer 
	 * @param {*} quoted 
	 * @param {*} options 
	 */
	Kanappi.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
		let buttonMessage = {
			text,
			footer,
			buttons,
			headerType: 2,
			...options
		}
		Kanappi.sendMessage(jid, buttonMessage, {
			quoted,
			...options
		})
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} text 
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	Kanappi.sendText = (jid, text, quoted = '', options) => Kanappi.sendMessage(jid, {
		text: text,
		...options
	}, {
		quoted
	})

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} path 
	 * @param {*} caption 
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	Kanappi.sendImage = async (jid, path, caption = '', quoted = '', options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		return await Kanappi.sendMessage(jid, {
			image: buffer,
			caption: caption,
			...options
		}, {
			quoted
		})
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} path 
	 * @param {*} caption 
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	Kanappi.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		return await Kanappi.sendMessage(jid, {
			video: buffer,
			caption: caption,
			gifPlayback: gif,
			...options
		}, {
			quoted
		})
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} path 
	 * @param {*} quoted 
	 * @param {*} mime 
	 * @param {*} options 
	 * @returns 
	 */
	Kanappi.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		return await Kanappi.sendMessage(jid, {
			audio: buffer,
			ptt: ptt,
			...options
		}, {
			quoted
		})
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} text 
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	Kanappi.sendTextWithMentions = async (jid, text, quoted, options = {}) => Kanappi.sendMessage(jid, {
		text: text,
		contextInfo: {
			mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net')
		},
		...options
	}, {
		quoted
	})

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} path 
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	Kanappi.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
		let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		let buffer
		if (options && (options.packname || options.author)) {
			buffer = await writeExifImg(buff, options)
		} else {
			buffer = await imageToWebp(buff)
		}

		await Kanappi.sendMessage(jid, {
			sticker: {
				url: buffer
			},
			...options
		}, {
			quoted
		})
		return buffer
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} path 
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	Kanappi.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
		let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		let buffer
		if (options && (options.packname || options.author)) {
			buffer = await writeExifVid(buff, options)
		} else {
			buffer = await videoToWebp(buff)
		}

		await Kanappi.sendMessage(jid, {
			sticker: {
				url: buffer
			},
			...options
		}, {
			quoted
		})
		return buffer
	}

	/**
	 * 
	 * @param {*} message 
	 * @param {*} filename 
	 * @param {*} attachExtension 
	 * @returns 
	 */
	Kanappi.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
		let quoted = message.msg ? message.msg : message
		let mime = (message.msg || message).mimetype || ''
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
		const stream = await downloadContentFromMessage(quoted, messageType)
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		let type = await FileType.fromBuffer(buffer)
		trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
		// save to file
		await fs.writeFileSync(trueFileName, buffer)
		return trueFileName
	}

	Kanappi.downloadMediaMessage = async (message) => {
		let mime = (message.msg || message).mimetype || ''
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
		const stream = await downloadContentFromMessage(message, messageType)
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}

		return buffer
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} path 
	 * @param {*} filename
	 * @param {*} caption
	 * @param {*} quoted 
	 * @param {*} options 
	 * @returns 
	 */
	Kanappi.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
		let types = await Kanappi.getFile(path, true)
		let {
			mime,
			ext,
			res,
			data,
			filename
		} = types
		if (res && res.status !== 200 || file.length <= 65536) {
			try {
				throw {
					json: JSON.parse(file.toString())
				}
			} catch (e) {
				if (e.json) throw e.json
			}
		}
		let type = '',
			mimetype = mime,
			pathFile = filename
		if (options.asDocument) type = 'document'
		if (options.asSticker || /webp/.test(mime)) {
			let {
				writeExif
			} = require('./lib/exif')
			let media = {
				mimetype: mime,
				data
			}
			pathFile = await writeExif(media, {
				packname: options.packname ? options.packname : global.packname,
				author: options.author ? options.author : global.author,
				categories: options.categories ? options.categories : []
			})
			await fs.promises.unlink(filename)
			type = 'sticker'
			mimetype = 'image/webp'
		} else if (/image/.test(mime)) type = 'image'
		else if (/video/.test(mime)) type = 'video'
		else if (/audio/.test(mime)) type = 'audio'
		else type = 'document'
		await Kanappi.sendMessage(jid, {
			[type]: {
				url: pathFile
			},
			caption,
			mimetype,
			fileName,
			...options
		}, {
			quoted,
			...options
		})
		return fs.promises.unlink(pathFile)
	}

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} message 
	 * @param {*} forceForward 
	 * @param {*} options 
	 * @returns 
	 */
	Kanappi.copyNForward = async (jid, message, forceForward = false, options = {}) => {
		let vtype
		if (options.readViewOnce) {
			message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
			vtype = Object.keys(message.message.viewOnceMessage.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessage.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessage.message
			}
		}

		let mtype = Object.keys(message.message)[0]
		let content = await generateForwardMessageContent(message, forceForward)
		let ctype = Object.keys(content)[0]
		let context = {}
		if (mtype != "conversation") context = message.message[mtype].contextInfo
		content[ctype].contextInfo = {
			...context,
			...content[ctype].contextInfo
		}
		const waMessage = await generateWAMessageFromContent(jid, content, options ? {
			...content[ctype],
			...options,
			...(options.contextInfo ? {
				contextInfo: {
					...content[ctype].contextInfo,
					...options.contextInfo
				}
			} : {})
		} : {})
		await Kanappi.relayMessage(jid, waMessage.message, {
			messageId: waMessage.key.id
		})
		return waMessage
	}

	Kanappi.cMod = (jid, copy, text = '', sender = Kanappi.user.id, options = {}) => {
		//let copy = message.toJSON()
		let mtype = Object.keys(copy.message)[0]
		let isEphemeral = mtype === 'ephemeralMessage'
		if (isEphemeral) {
			mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
		}
		let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
		let content = msg[mtype]
		if (typeof content === 'string') msg[mtype] = text || content
		else if (content.caption) content.caption = text || content.caption
		else if (content.text) content.text = text || content.text
		if (typeof content !== 'string') msg[mtype] = {
			...content,
			...options
		}
		if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
		else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
		copy.key.remoteJid = jid
		copy.key.fromMe = sender === Kanappi.user.id

		return proto.WebMessageInfo.fromObject(copy)
	}


	Kanappi.send5ButImg = async (jid, text = '', footer = '', img, but = [], thumb, options = {}) => {
		let message = await prepareWAMessageMedia({
			image: img,
			jpegThumbnail: thumb
		}, {
			upload: Kanappi.waUploadToServer
		})
		var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
			templateMessage: {
				hydratedTemplate: {
					imageMessage: message.imageMessage,
					"hydratedContentText": text,
					"hydratedFooterText": footer,
					"hydratedButtons": but
				}
			}
		}), options)
		Kanappi.relayMessage(jid, template.message, {
			messageId: template.key.id
		})
	}



	Kanappi.send5ButVid = async (jid, text = '', footer = '', vid, but = [], options = {}) => {
		let message = await prepareWAMessageMedia({
			video: vid
		}, {
			upload: Kanappi.waUploadToServer
		})
		var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
			templateMessage: {
				hydratedTemplate: {
					videoMessage: message.videoMessage,
					"hydratedContentText": text,
					"hydratedFooterText": footer,
					"hydratedButtons": but
				}
			}
		}), options)
		Kanappi.relayMessage(jid, template.message, {
			messageId: template.key.id
		})
	}


	Kanappi.send5ButMsg = (jid, text = '', footer = '', but = []) => {
		let templateButtons = but
		var templateMessage = {
			text: text,
			footer: footer,
			templateButtons: templateButtons
		}
		Kanappi.sendMessage(jid, templateMessage)
	}



	Kanappi.sendListMsg = (jid, text = '', footer = '', title = '', butText = '', sects = [], quoted) => {
		let sections = sects
		var listMes = {
			text: text,
			footer: footer,
			title: title,
			buttonText: butText,
			sections
		}
		Kanappi.sendMessage(jid, listMes, {
			quoted: quoted
		})
	}

	Kanappi.send5ButGif = async (jid, text = '', footer = '', gif, but = [], options = {}) => {
		let message = await prepareWAMessageMedia({
			video: gif,
			gifPlayback: true
		}, {
			upload: Kanappi.waUploadToServer
		})
		var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
			templateMessage: {
				hydratedTemplate: {
					videoMessage: message.videoMessage,
					"hydratedContentText": text,
					"hydratedFooterText": footer,
					"hydratedButtons": but
				}
			}
		}), options)
		Kanappi.relayMessage(jid, template.message, {
			messageId: template.key.id
		})
	}


	/**
	 * 
	 * @param {*} path 
	 * @returns 
	 */
	Kanappi.getFile = async (PATH, save) => {
		let res
		let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,` [1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
		//if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
		let type = await FileType.fromBuffer(data) || {
			mime: 'application/octet-stream',
			ext: '.bin'
		}
		filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
		if (data && save) fs.promises.writeFile(filename, data)
		return {
			res,
			filename,
			size: await getSizeMedia(data),
			...type,
			data
		}

	}

	return Kanappi
}

startKanappi()


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})