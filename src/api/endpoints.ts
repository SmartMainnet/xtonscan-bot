import { Endpoint } from '../classes/index.js'

export const getFriendlyAddress = async (address: string) => {
  const rawAddress = new Endpoint('GET', '/ton/getFriendlyAddress', { address })
  return await rawAddress.call()
}

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

export const getTransactionInfo = async (address: string) => {
  const rawAddress = new Endpoint('GET', '/ton/getTransactionInfo', { address })
  return await rawAddress.call()
}

export const getJettonInfo = async (address: string) => {
  const rawAddress = new Endpoint('GET', '/ton/getJettonInfo', { address })
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

export const getTransactions = async (
  address: string,
  message_id: number,
  limit: number,
  page: number
) => {
  const rawAddress = new Endpoint('GET', '/ton/getTransactions', {
    address,
    message_id,
    limit,
    page,
  })
  return await rawAddress.call()
}

export const getJettons = async (address: string) => {
  const rawAddress = new Endpoint('GET', '/ton/getJettons', { address })
  return await rawAddress.call()
}

export const getNfts = async (address: string) => {
  const rawAddress = new Endpoint('GET', '/ton/getNfts', { address })
  return await rawAddress.call()
}
