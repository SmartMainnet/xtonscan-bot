import { nftInlineKeyboard } from '../keyboards/inline_keyboard/index.js'
import { ContextType, INftInfo } from '../types/index.js'

export class NFT {
  ctx: ContextType
  owner_name: string
  image: string
  name: string
  description: string
  attributes: string
  approved_by: string
  is_approved_by_getgems: boolean
  tonviewer_url: string
  getgems_url: string

  constructor(ctx: ContextType, nftInfo: INftInfo) {
    this.ctx = ctx
    this.owner_name = nftInfo.owner_name || ''
    this.image = nftInfo.nft_image
    this.name = nftInfo.nft_name
    this.description = nftInfo.nft_description
      ? `\n\n${ctx.t('description', { description: nftInfo.nft_description })}`
      : ''
    this.attributes = nftInfo.nft_attributes
      ? `\n\n${ctx.t('attributes', {
          attributes: nftInfo.nft_attributes
            ?.map(attribute => `${attribute.trait_type}: *${attribute.value}*`)
            .join('\n· '),
        })}`
      : ''
    this.approved_by = nftInfo.approved_by
      ? `\n\n${ctx.t('approved_by', {
          approved_by: nftInfo.approved_by.join(', '),
        })}`
      : ''
    this.is_approved_by_getgems = nftInfo.approved_by
      ? nftInfo.approved_by.some(item => item === 'getgems')
      : false
    this.tonviewer_url = `https://tonviewer.com/${nftInfo.owner_address}/nft/${nftInfo.nft_address}`
    this.getgems_url = `https://getgems.io/collection/${nftInfo.collection_address}/${nftInfo.nft_address}`
  }

  getCaption() {
    return this.ctx.t('nft_info', {
      name: this.name,
      description: this.description,
      attributes: this.attributes,
      approved_by: this.approved_by,
      owner: this.owner_name,
    })
  }

  getInlineKeyboard() {
    return nftInlineKeyboard(
      this.is_approved_by_getgems,
      this.tonviewer_url,
      this.getgems_url
    )
  }
}
