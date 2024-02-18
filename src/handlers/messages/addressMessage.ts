import {
  nftInlineKeyboard,
  walletInlineKeyboard,
} from '../../keyboards/inline_keyboard/index.js'
import { getAddressType, getNftInfo, getWalletInfo } from '../../api/index.js'
import { NFT, Wallet } from '../../classes/index.js'
import { ContextType } from '../../types/index.js'

export const addressMessage = async (ctx: ContextType) => {
  try {
    const address = ctx.update.message?.text!
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

      const wallet = new Wallet(walletInfo)

      await ctx.reply(ctx.t('walletInfo', wallet.getCaption()), {
        parse_mode: 'Markdown',
        reply_markup: walletInlineKeyboard(walletInfo.address),
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
        caption: ctx.t('nftInfo', nft.getCaption()),
        parse_mode: 'Markdown',
        reply_markup: nftInlineKeyboard(
          nft.tonviewer_url,
          nft.getgems_url,
          nft.is_approved_by_getgems
        ),
      })
    }
  } catch (e) {
    console.log(e)
    await ctx.reply(ctx.t('error'))
  }
}
