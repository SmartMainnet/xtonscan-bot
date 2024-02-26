import { transactionsInlineKeyboard } from '../keyboards/inline_keyboard/index.js'
import { Address } from './index.js'
import { ContextType } from '../types/index.js'

export class Transactions {
  ctx: ContextType
  owner_address: string
  raw_owner_address: string
  transactions: any
  page: number
  max_page: number

  constructor(ctx: ContextType, transactions: any) {
    this.ctx = ctx
    this.page = transactions.page
    this.max_page = transactions.max_page
    this.owner_address = transactions.owner_address
    this.raw_owner_address = transactions.raw_owner_address
    this.transactions = transactions.events
      ?.map((transaction: any) => {
        const type = transaction.actions[0].type
        const description = transaction.actions[0].simple_preview.description
        const deepLink = `t.me/${ctx.me.username}?start=${transaction.event_id}`

        const isTonTransfer = type === 'TonTransfer'
        const isJettonTransfer = type === 'JettonTransfer'
        const isNftItemTransfer = type === 'NftItemTransfer'
        const isJettonSwap = type === 'JettonSwap'
        const isAuctionBid = type === 'AuctionBid'

        if (isTonTransfer) {
          const sender = transaction.actions[0].TonTransfer.sender?.address
          const recipient = transaction.actions[0].TonTransfer.recipient?.address

          if (sender === this.raw_owner_address) {
            return `⬆️ [${description}](${deepLink})`
          }

          if (recipient === this.raw_owner_address) {
            return `⬇️ [${description}](${deepLink})`
          }
        }

        if (isJettonTransfer) {
          const sender = transaction.actions[0].JettonTransfer.sender?.address
          const recipient = transaction.actions[0].JettonTransfer.recipient?.address

          if (sender === this.raw_owner_address) {
            return `⬆️ [${description}](${deepLink})`
          }

          if (recipient === this.raw_owner_address) {
            return `⬇️ [${description}](${deepLink})`
          }
        }

        if (isNftItemTransfer) {
          const sender = transaction.actions[0].NftItemTransfer.sender?.address
          const recipient = transaction.actions[0].NftItemTransfer.recipient?.address

          if (sender === this.raw_owner_address) {
            return `⬆️ [${description}](${deepLink})`
          }

          if (recipient === this.raw_owner_address) {
            return `⬇️ [${description}](${deepLink})`
          }
        }

        if (isJettonSwap) {
          return `🔁 [${description}](${deepLink})`
        }

        if (isAuctionBid) {
          return `🔨 [${description}](${deepLink})`
        }

        return `↕️ [${description}](${deepLink})`
      })
      .join('\n')
  }

  getCaption() {
    return this.ctx.t('transactions', {
      short_address: Address.short(this.owner_address),
      transactions: this.transactions,
    })
  }

  getInlineKeyboard() {
    return transactionsInlineKeyboard(this.owner_address, this.page, this.max_page)
  }
}
