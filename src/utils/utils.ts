import { Address } from '../classes/index.js'
import { ContextType } from '../types/index.js'

export const getAddressDeepLink = (
  ctx: ContextType,
  wallet: { address: string; name?: string }
) => {
  return getDeepLink(
    ctx,
    getNameOrShortAddress(wallet),
    Address.getNonBounceable(wallet.address)
  )
}

export const getDeepLink = (ctx: ContextType, text: string, payload: string) => {
  return `[${text}](t.me/${ctx.me.username}?start=${payload})`
}

export const getNameOrShortAddress = (wallet: {
  address: string
  name?: string
}) => {
  return (
    wallet.name ??
    Address.short(Address.getNonBounceable(wallet.address)).replace('_', '\\_')
  )
}

export const toTon = (amount: number, decimals: number = 9) => {
  return amount / 10 ** decimals
}
