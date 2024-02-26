import { jettonInlineKeyboard } from '../keyboards/inline_keyboard/index.js'
import { shortAddress } from '../utils/index.js'
import { ContextType } from '../types/index.js'

const { REFERRAL_ADDRESS } = process.env

export class Jetton {
  ctx: ContextType
  address: string
  raw_address: string
  mintable: boolean
  total_supply: string
  holders_count: number
  name: string
  symbol: string
  decimals: string
  description: string
  tonviewer_url: string
  stonfi_url: string

  constructor(ctx: ContextType, jetton: any) {
    this.ctx = ctx
    this.address = jetton.address
    this.raw_address = jetton.raw_address
    this.mintable = jetton.mintable
    this.total_supply = jetton.total_supply
    this.holders_count = jetton.holders_count
    this.name = jetton.name
    this.symbol = jetton.symbol
    this.decimals = jetton.decimals
    this.description = jetton.description
    this.tonviewer_url = `https://tonviewer.com/${this.address}`
    this.stonfi_url = jetton.verification
      ? `https://app.ston.fi/swap?referral_address=${REFERRAL_ADDRESS}&chartVisible=true&chartInterval=1w&ft=TON&tt=${jetton.symbol}`
      : ''
  }

  getCaption() {
    return this.ctx.t('jetton_info', {
      short_address: shortAddress(this.address),
      mintable: this.mintable ? 'Yes' : 'No',
      total_supply: this.total_supply,
      holders_count: this.holders_count,
      name: this.name,
      symbol: this.symbol,
      description: this.ctx.t('description', { description: this.description }),
    })
  }

  getInlineKeyboard() {
    return jettonInlineKeyboard(this.tonviewer_url, this.stonfi_url)
  }
}
