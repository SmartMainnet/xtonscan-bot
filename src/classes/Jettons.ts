import { jettonsInlineKeyboard } from '../keyboards/inline_keyboard/index.js'
import { Address } from './index.js'
import { ContextType } from '../types/index.js'

export class Jettons {
  ctx: ContextType
  page: number
  max_page: number
  owner_address: string
  jettons: any

  constructor(ctx: ContextType, jettonsInfo: any) {
    this.ctx = ctx
    this.page = jettonsInfo.page
    this.max_page = jettonsInfo.max_page
    this.owner_address = jettonsInfo.owner_address
    this.jettons = jettonsInfo.jettons
      ?.filter((jetton_data: any) => {
        const balance = jetton_data.balance / 10 ** jetton_data.jetton.decimals
        const price = jetton_data.price.prices.USD

        return balance * price > 0.01
      })
      ?.sort((a: any, b: any) => {
        const balanceA = a.balance / 10 ** a.jetton.decimals
        const balanceB = b.balance / 10 ** b.jetton.decimals
        const priceA = a.price.prices.USD
        const priceB = b.price.prices.USD

        return balanceB * priceB - balanceA * priceA
      })
      ?.map((jetton_data: any) => {
        const name = jetton_data.jetton.name
        const jettonAddress = jetton_data.jetton.address
        const friendlyAddress = Address.getNonBounceable(jettonAddress)
        const deepLink = `t.me/${ctx.me.username}?start=${friendlyAddress}`
        const symbol = jetton_data.jetton.symbol
        const balance = jetton_data.balance / 10 ** jetton_data.jetton.decimals
        const price = jetton_data.price.prices.USD

        return ctx.t('jetton', {
          name: `[${name}](${deepLink})`,
          balance: balance.toFixed(2),
          symbol,
          balance_usd: (balance * price).toFixed(2),
        })
      })
      .join('\n')
  }

  getCaption() {
    return this.ctx.t('jettons', {
      short_address: Address.short(this.owner_address),
      jettons: this.jettons,
    })
  }

  getInlineKeyboard() {
    return jettonsInlineKeyboard(this.owner_address, this.max_page, this.page)
  }
}
