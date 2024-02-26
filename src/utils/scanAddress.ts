import {
  getAddressType,
  getJettonInfo,
  getNftInfo,
  getWalletInfo,
} from '../api/index.js'
import { Jetton, NFT, Wallet } from '../classes/index.js'
import { ContextType } from '../types/index.js'

export const scanAddress = async (ctx: ContextType, address: string) => {
  try {
    const addressTypeResponse = await getAddressType(address)

    if ('error' in addressTypeResponse) {
      await ctx.reply(ctx.t(addressTypeResponse.error))
      return
    }

    if (addressTypeResponse.result.type === 'wallet') {
      const walletInfoResponse = await getWalletInfo(
        addressTypeResponse.result.address
      )

      if ('error' in walletInfoResponse) {
        await ctx.reply(ctx.t(walletInfoResponse.error))
        return
      }

      const wallet = new Wallet(ctx, walletInfoResponse.result)

      await ctx.reply(wallet.getCaption(), {
        parse_mode: 'Markdown',
        reply_markup: wallet.getInlineKeyboard(),
      })
    }

    if (addressTypeResponse.result.type === 'jetton') {
      const jettonInfoResponse = await getJettonInfo(
        addressTypeResponse.result.address
      )

      if ('error' in jettonInfoResponse) {
        await ctx.reply(ctx.t(jettonInfoResponse.error))
        return
      }

      const jetton = new Jetton(ctx, jettonInfoResponse.result)

      await ctx.reply(jetton.getCaption(), {
        parse_mode: 'Markdown',
        reply_markup: jetton.getInlineKeyboard(),
      })
    }

    if (addressTypeResponse.result.type === 'nft') {
      const nftInfoResponse = await getNftInfo(addressTypeResponse.result.address)

      if ('error' in nftInfoResponse) {
        await ctx.reply(ctx.t(nftInfoResponse.error))
        return
      }

      const nft = new NFT(ctx, nftInfoResponse.result)

      await ctx.replyWithPhoto(nft.image, {
        caption: nft.getCaption(),
        parse_mode: 'Markdown',
        reply_markup: nft.getInlineKeyboard(),
      })
    }
  } catch (e) {
    console.log(e)
    await ctx.reply(ctx.t('error'))
  }
}
