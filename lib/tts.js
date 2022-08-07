const fetch = require('node-fetch')
let list = [
	'Twilight Sparkle', 'Fluttershy', 'Rarity', 'Rainbow Dash', 'Pinkie Pie', 'Applejack', 'SpongeBob SquarePants',
	'Kyu Sugardust', 'Rise Kujikawa', 'Sunset Shimmer', 'Adagio Dazzle', 'Aria Blaze', 'Sonata Dusk',
	'Miss Pauling', 'Scout', 'Soldier', 'Demoman', 'Heavy', 'Engineer', 'Medic', 'Sniper', 'Spy'
]

async function tts(chara, text) {
	let character = list.findIndex(v => v.toLowerCase() == chara.toLowerCase())
	character = list[character]
	let res = await fetch('https://api.15.ai/app/getAudioFile5', {
		method: 'post',
		headers: {
			'content-type': 'application/json' 
		},
		body: JSON.stringify({ text, character, emotion: 'Contextual' })
	})
	if (res.status !== 200) throw res.statusText
	let json = await res.json()
	return `https://cdn.15.ai/audio/${json.wavNames[0]}`
}

module.exports = { tts }