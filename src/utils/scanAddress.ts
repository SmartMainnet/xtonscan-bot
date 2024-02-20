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
    const addressType = await getAddressType(address)

    if (addressType.error) {
      await ctx.reply(ctx.t(addressType.error))
      return
    }

    if (addressType.type === 'wallet') {
      const walletInfo = await getWalletInfo(addressType.address)

      if (walletInfo.error) {
        await ctx.reply(ctx.t(walletInfo.error))
        return
      }

      const wallet = new Wallet(ctx, walletInfo)

      await ctx.reply(wallet.getCaption(), {
        parse_mode: 'Markdown',
        reply_markup: wallet.getInlineKeyboard(),
      })
    }

    if (addressType.type === 'jetton') {
      const jettonInfo = await getJettonInfo(addressType.address)

      if (jettonInfo.error) {
        await ctx.reply(ctx.t(jettonInfo.error))
        return
      }

      const jetton = new Jetton(ctx, jettonInfo)

      await ctx.reply(jetton.getCaption(), {
        parse_mode: 'Markdown',
        reply_markup: jetton.getInlineKeyboard(),
      })
    }

    if (addressType.type === 'nft') {
      const nftInfo = await getNftInfo(addressType.address)

      if (nftInfo.error) {
        await ctx.reply(ctx.t(nftInfo.error))
        return
      }

      const nft = new NFT(ctx, nftInfo)

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
