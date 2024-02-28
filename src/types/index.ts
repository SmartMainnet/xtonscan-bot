import { Context, Api } from 'grammy'
import { I18nFlavor } from '@grammyjs/i18n'

interface IConfig {
  [key: string]: any
}

export interface IApiResponse {
  data?: {
    ok: boolean
    result?: { [key: string]: any }
    error?: { message: string }
  }
}

export interface IAttribute {
  trait_type: string
  value: string
}

export interface INftInfo {
  page: number
  max_page: number
  nft_address: string
  collection_address: string
  owner_address: string
  owner_name?: string
  nft_image: string
  nft_name: string
  nft_description?: string
  nft_attributes?: IAttribute[]
  approved_by?: string[]
}

export interface IWalletInfo {
  address: string
  raw_address: string
  status: string
  name?: string
  balance: {
    TON: number
    USD: number
  }
  jetton_count: number
  nft_count: number
  transaction_count: number
  is_wallet: boolean
}

export type EndpointType = Promise<{ error: string } | { result: any }>

export type ContextType = Context & IConfig & I18nFlavor

export type BotApiType = { api: Api }
