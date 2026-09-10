require('dotenv').config()
// TWITCH_BOT_USERNAME=""
// TWITCH_OAUTH_TOKEN=""

const tmi = require('tmi.js')

const twitchChannelName = 'channel'
const twitchBotUsername = 'channel_bot'
const twitchMarblesPhrase = 'Marbles on Stream'
const twitchPlayPhrase = '!play'
const timeoutEarliest = 2000
const timeoutLatest = 18000


const client = new tmi.Client({
  options: { debug: false, quiet: true },
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: `oauth:${process.env.TWITCH_OAUTH_TOKEN}`,
  },
  channels: [twitchChannelName],
})

client.connect()

client.on('message', (channel, tags, message, self) => {
  if (tags.username === twitchBotUsername) {
    if (message.includes(twitchMarblesPhrase)) {
    console.log(`🗨️[${new Date().toLocaleString()}]${message}`)
      const randomTime = Math.random() * timeoutLatest + timeoutEarliest
      console.log(`💭[${new Date().toLocaleString()}]Joining in ${(randomTime / 1000).toFixed(2)} seconds.`)
      setTimeout(() => {
        client.say(twitchChannelName, twitchPlayPhrase)
      }, randomTime)
    }
  }
  if (message.includes(process.env.TWITCH_BOT_USERNAME) || tags.username === process.env.TWITCH_BOT_USERNAME) {
    console.log(`💬[${new Date().toLocaleString()}]${message}`)
  }
})
