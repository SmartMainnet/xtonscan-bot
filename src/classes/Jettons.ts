import { backToWalletInlineKeyboard } from '../keyboards/inline_keyboard/index.js'
import { shortAddress } from '../utils/index.js'
import { ContextType } from '../types/index.js'

export class Jettons {
  ctx: ContextType
  owner_address: string
  jettons: any

  constructor(ctx: ContextType, owner_address: string, jettons: any) {
    this.ctx = ctx
    this.owner_address = owner_address
    this.jettons = jettons
      ?.map((jetton_data: any) => {
        const name = jetton_data.jetton.name
        const symbol = jetton_data.jetton.symbol
        const balance = jetton_data.balance / 10 ** jetton_data.jetton.decimals
        const price = jetton_data.price.prices.USD

        return ctx.t('jetton', {
          name,
          balance: balance.toFixed(2),
          symbol,
          balance_usd: (balance * price).toFixed(2),
        })
      })
      .join('\n')
  }

  getCaption() {
    return this.ctx.t('jettons', {
      short_address: shortAddress(this.owner_address),
      jettons: this.jettons,
    })
  }

  getInlineKeyboard() {
    return backToWalletInlineKeyboard(this.owner_address)
  }
}
