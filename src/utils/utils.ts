import { Address } from '../classes/index.js'

export const getNameOrShortAddress = (data: { address: string; name?: string }) => {
  return data.name ?? Address.short(Address.getNonBounceable(data.address))
}

export const toTon = (amount: number, decimals: number = 9) => {
  return amount / 10 ** decimals
}
