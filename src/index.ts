import 'dotenv/config'
import { Bot } from 'grammy'

import { i18nMiddleware, limitMiddleware } from './middlewares/plugins/index.js'
import { helpCommand, startCommand } from './handlers/commands/index.js'
import {
  addressMessage,
  textMessage,
  transactionMessage,
} from './handlers/messages/index.js'
import { walletCallback } from './handlers/callbacks/index.js'
import { ContextType } from './types/index.js'

const { BOT_TOKEN } = process.env

const bot = new Bot<ContextType>(BOT_TOKEN!)

// set commands
await bot.api.setMyCommands([
  { command: 'start', description: 'Restart bot' },
  { command: 'help', description: 'Show help' },
])

// plugins
bot.use(i18nMiddleware)
bot.use(limitMiddleware)

// commands
bot.command('start', startCommand)
bot.command('help', helpCommand)

// messages
bot.hears([/^[a-z0-9+/_-]{48}$/i, /^(0|-1):[a-f0-9]{64}$/i], addressMessage)
bot.hears(/^[a-f0-9]{64}$/i, transactionMessage)
bot.hears(/./, textMessage)

// callbacks
bot.callbackQuery(/^[a-z]+\s[a-z0-9+/_-]{48}(\s[0-9]+)?$/i, walletCallback)

// start bot
bot.start({
  onStart(botInfo) {
    console.log('botInfo: ', botInfo)
  },
  allowed_updates: ['message', 'callback_query'],
})
