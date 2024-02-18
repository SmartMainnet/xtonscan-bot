import { walletInlineKeyboard } from '../keyboards/inline_keyboard/index.js'
import { shortAddress } from '../utils/index.js'
import { ContextType, IWalletInfo } from '../types/index.js'

export class Wallet {
  ctx: ContextType
  address: string
  short_address: string
  status: string
  name: string
  balance_ton: number
  balance_usd: number
  jetton_count: number
  nft_count: number
  transaction_count: number

  constructor(ctx: ContextType, walletInfo: IWalletInfo) {
    this.ctx = ctx
    this.address = walletInfo.address
    this.short_address = shortAddress(walletInfo.address)
    this.status = walletInfo.status
    this.name = walletInfo.name || 'no'
    this.balance_ton = walletInfo.balance.TON
    this.balance_usd = walletInfo.balance.USD
    this.jetton_count = walletInfo.jetton_count
    this.nft_count = walletInfo.nft_count
    this.transaction_count = walletInfo.transaction_count
  }

  getCaption() {
    return this.ctx.t('walletInfo', {
      short_address: this.short_address,
      status: this.status,
      name: this.name,
      balance_ton: this.balance_ton,
      balance_usd: this.balance_usd,
      jetton_count: this.jetton_count,
      nft_count: this.nft_count,
      transaction_count: this.transaction_count,
    })
  }

  getInlineKeyboard() {
    return walletInlineKeyboard(this.address)
  }
}
