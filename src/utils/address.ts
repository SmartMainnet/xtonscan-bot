import { Address } from 'ton-core'

export const shortAddress = (address: string, length = 4) => {
  if (!address) return ''
  return `${address.substring(0, length)}...${address.substring(
    address.length - length
  )}`
}

export const getNameOrShortAddress = (data: { address: string; name?: string }) => {
  return data.name ?? shortAddress(Address.normalize(data.address))
}

export const toTon = (amount: number, decimals: number = 9) => {
  return amount / 10 ** decimals
}
