import { Endpoint } from '../classes/index.js'

export const getRawAddress = async (address: string) => {
  const rawAddress = new Endpoint('GET', '/ton/getRawAddress', { address })
  return await rawAddress.call()
}

export const getAddressType = async (address: string) => {
  const rawAddress = new Endpoint('GET', '/ton/getAddressType', { address })
  return await rawAddress.call()
}

export const getWalletInfo = async (address: string) => {
  const rawAddress = new Endpoint('GET', '/ton/getWalletInfo', { address })
  return await rawAddress.call()
}

export const getNftInfo = async (address: string) => {
  const rawAddress = new Endpoint('GET', '/ton/getNftInfo', { address })
  return await rawAddress.call()
}

export const getNftInfoByOwner = async (address: string, page: number) => {
  const rawAddress = new Endpoint('GET', '/ton/getNftInfoByOwner', { address, page })
  return await rawAddress.call()
}

export const getNfts = async (address: string) => {
  const rawAddress = new Endpoint('GET', '/ton/getNfts', { address })
  return await rawAddress.call()
}

export const getJettons = async (address: string) => {
  const rawAddress = new Endpoint('GET', '/ton/getJettons', { address })
  return await rawAddress.call()
}

export const getTransactions = async (address: string, limit: number) => {
  const rawAddress = new Endpoint('GET', '/ton/getTransactions', { address, limit })
  return await rawAddress.call()
}
