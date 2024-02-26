import { Endpoint } from '../classes/index.js'

export const getFriendlyAddress = async (address: string) => {
  return await Endpoint.call('GET', '/ton/getFriendlyAddress', { address })
}

export const getRawAddress = async (address: string) => {
  return await Endpoint.call('GET', '/ton/getRawAddress', { address })
}

export const getAddressType = async (address: string) => {
  return await Endpoint.call('GET', '/ton/getAddressType', { address })
}

export const getWalletInfo = async (address: string) => {
  return await Endpoint.call('GET', '/ton/getWalletInfo', { address })
}

export const getTransactionInfo = async (address: string) => {
  return await Endpoint.call('GET', '/ton/getTransactionInfo', { address })
}

export const getJettonInfo = async (address: string) => {
  return await Endpoint.call('GET', '/ton/getJettonInfo', { address })
}

export const getNftInfo = async (address: string) => {
  return await Endpoint.call('GET', '/ton/getNftInfo', { address })
}

export const getNftInfoByOwner = async (address: string, page: number) => {
  return await Endpoint.call('GET', '/ton/getNftInfoByOwner', { address, page })
}

export const getTransactions = async (
  address: string,
  limit: number,
  page: number
) => {
  return await Endpoint.call('GET', '/ton/getTransactions', {
    address,
    limit,
    page,
  })
}

export const getJettons = async (address: string) => {
  return await Endpoint.call('GET', '/ton/getJettons', { address })
}

export const getNfts = async (address: string) => {
  return await Endpoint.call('GET', '/ton/getNfts', { address })
}
