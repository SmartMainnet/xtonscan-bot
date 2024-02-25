import { transactionsInlineKeyboard } from '../keyboards/inline_keyboard/index.js'
import { shortAddress } from '../utils/index.js'
import { ContextType } from '../types/index.js'

export class Transactions {
  ctx: ContextType
  owner_address: string
  transactions: any
  page: number
  is_last_page: boolean

  constructor(
    ctx: ContextType,
    owner_address: string,
    raw_owner_address: string,
    transactions: any,
    page: number
  ) {
    this.ctx = ctx
    this.page = page
    this.is_last_page = transactions.is_last_page
    this.owner_address = owner_address
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

          if (sender === raw_owner_address) {
            return `⬆️ [${description}](${deepLink})`
          }

          if (recipient === raw_owner_address) {
            return `⬇️ [${description}](${deepLink})`
          }
        }

        if (isJettonTransfer) {
          const sender = transaction.actions[0].JettonTransfer.sender?.address
          const recipient = transaction.actions[0].JettonTransfer.recipient?.address

          if (sender === raw_owner_address) {
            return `⬆️ [${description}](${deepLink})`
          }

          if (recipient === raw_owner_address) {
            return `⬇️ [${description}](${deepLink})`
          }
        }

        if (isNftItemTransfer) {
          const sender = transaction.actions[0].NftItemTransfer.sender?.address
          const recipient = transaction.actions[0].NftItemTransfer.recipient?.address

          if (sender === raw_owner_address) {
            return `⬆️ [${description}](${deepLink})`
          }

          if (recipient === raw_owner_address) {
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
      short_address: shortAddress(this.owner_address),
      transactions: this.transactions,
    })
  }

  getInlineKeyboard() {
    return transactionsInlineKeyboard(
      this.owner_address,
      this.page,
      this.is_last_page
    )
  }
}
