import { backToWalletInlineKeyboard } from '../keyboards/inline_keyboard/index.js'
import { shortAddress } from '../utils/index.js'
import { ContextType } from '../types/index.js'

export class Transactions {
  ctx: ContextType
  owner_address: string
  transactions: any

  constructor(
    ctx: ContextType,
    owner_address: string,
    raw_owner_address: string,
    transactions: any
  ) {
    this.ctx = ctx
    this.owner_address = owner_address
    this.transactions = transactions.events
      ?.map((transaction: any) => {
        const description = transaction.actions[0].simple_preview.description
        const type = transaction.actions[0].type

        const isTonTransfer = type === 'TonTransfer'
        const isJettonTransfer = type === 'JettonTransfer'
        const isNftItemTransfer = type === 'NftItemTransfer'
        const isJettonSwap = type === 'JettonSwap'
        const isAuctionBid = type === 'AuctionBid'

        if (isTonTransfer) {
          const sender = transaction.actions[0].TonTransfer.sender?.address
          const recipient = transaction.actions[0].TonTransfer.recipient?.address

          if (sender === raw_owner_address) {
            return `⬆️ ${description}`
          }

          if (recipient === raw_owner_address) {
            return `⬇️ ${description}`
          }
        }

        if (isJettonTransfer) {
          const sender = transaction.actions[0].JettonTransfer.sender?.address
          const recipient = transaction.actions[0].JettonTransfer.recipient?.address

          if (sender === raw_owner_address) {
            return `⬆️ ${description}`
          }

          if (recipient === raw_owner_address) {
            return `⬇️ ${description}`
          }
        }

        if (isNftItemTransfer) {
          const sender = transaction.actions[0].NftItemTransfer.sender?.address
          const recipient = transaction.actions[0].NftItemTransfer.recipient?.address

          if (sender === raw_owner_address) {
            return `⬆️ ${description}`
          }

          if (recipient === raw_owner_address) {
            return `⬇️ ${description}`
          }
        }

        if (isJettonSwap) {
          return `🔁 ${description}`
        }

        if (isAuctionBid) {
          return `🔨 ${description}`
        }

        return `↕️ ${description}`
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
    return backToWalletInlineKeyboard(this.owner_address)
  }
}
