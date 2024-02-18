import { Context, Api } from 'grammy'
import { I18nFlavor } from '@grammyjs/i18n'

interface IConfig {
  [key: string]: any
}

export interface IAPI {
  ok: boolean
  result?: { [key: string]: any }
  error?: { [key: string]: any }
}

export interface IAttribute {
  trait_type: string
  value: string
}

export interface INftInfo {
  nft_address: string
  collection_address: string
  owner_address: string
  owner_name?: string
  last_page?: number
  nft_image: string
  nft_name: string
  nft_description?: string
  nft_attributes?: IAttribute[]
  approved_by?: string[]
}

export type ContextType = Context & IConfig & I18nFlavor

export type BotApiType = { api: Api }
