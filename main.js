const axios = require('axios')
const cheerio = require('cheerio')
var Discord = require('discord.js')
var bot = new Discord.Client()

bot.on('ready', (evt) => {
	console.log("Logged in and ready!")
	run()
})

bot.login("") //Place bot token here

function send(text) {
	bot.channels.fetch("893310557531283479").then((channel) => {
		channel.send(text)
	})
}

async function check() {
	let bb = await axios.get('https://www.bestbuy.com/site/metroid-dread-special-edition-nintendo-switch-nintendo-switch-lite/6464104.p?skuId=6464104')
	if (bb.status != 200) {
		console.log(bb.status)
	} else {
		let bbtree = cheerio.load(bb.data)
		let text = bbtree(".fulfillment-add-to-cart-button .add-to-cart-button").text()
		console.log("Best Buy:", text)
		if (!text.match(/^(Coming Soon|Sold Out)+$/i)) {
			console.error("Best Buy:", text)
			send("<@&893315617732583436> BEST BUY SPECIAL EDITION:\n\nhttps://www.bestbuy.com/site/metroid-dread-special-edition-nintendo-switch-nintendo-switch-lite/6464104.p?skuId=6464104\n\n" + text)
		}
	}
	
	bb = await axios.get('https://www.bestbuy.com/site/nintendo-metroid-dread-amiibo-2-pack/6464163.p?skuId=6464163')
	if (bb.status != 200) {
		console.log(bb.status)
	} else {
		let bbtree = cheerio.load(bb.data)
		let text = bbtree(".fulfillment-add-to-cart-button .add-to-cart-button").text()
		console.log("Best Buy amiibo:", text)
		if (!text.match(/^(Coming Soon|Sold Out)+$/i)) {
			console.error("Best Buy amiibo:", text)
			send("<@&893315541090045962> BEST BUY AMIIBO:\n\nhttps://www.bestbuy.com/site/nintendo-metroid-dread-amiibo-2-pack/6464163.p?skuId=6464163\n\n" + text)
		}
	}
}

async function run() {
	while (true) {
		try {
			await check()
		} catch (error) {
			console.error(error)
		}
		await sleep(1000)
	}
}

async function sleep(mills) {
	return new Promise((res, rej) => {
		setTimeout(() => {res()}, mills)
	})
}
