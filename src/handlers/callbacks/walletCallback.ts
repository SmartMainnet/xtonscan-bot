import { InputMediaBuilder } from 'grammy'

import {
  getJettons,
  getNftInfoByOwner,
  getRawAddress,
  getTransactions,
  getWalletInfo,
} from '../../api/index.js'
import { Jettons, NFTs, Transactions, Wallet } from '../../classes/index.js'
import { ContextType } from '../../types/index.js'

export const walletCallback = async (ctx: ContextType) => {
  try {
    const callback = ctx.update.callback_query!

    const data = callback.data!.split(' ')[0]
    const address = callback.data!.split(' ')[1]
    const pageString = callback.data!.split(' ')[2]

    const page = pageString !== undefined ? Number(pageString) : undefined
    const rawAddress = await getRawAddress(address)

    if (rawAddress.error) {
      await ctx.reply(ctx.t(rawAddress.error))
      return
    }

    if (data === 'jettons') {
      const jettonsArray = await getJettons(address)

      if (jettonsArray.error) {
        await ctx.reply(ctx.t(jettonsArray.error))
        return
      }

      const jettons = new Jettons(ctx, address, jettonsArray)

      await ctx.editMessageText(jettons.getCaption(), {
        parse_mode: 'Markdown',
        reply_markup: jettons.getInlineKeyboard(),
      })
    }

    if (data === 'nfts') {
      const nftInfo = await getNftInfoByOwner(address, page || 0)

      if (nftInfo.error) {
        await ctx.reply(ctx.t(nftInfo.error))
        return
      }

      const nft = new NFTs(ctx, address, nftInfo, page)

      if (page === undefined) {
        await ctx.replyWithPhoto(nft.image, {
          caption: nft.getCaption(),
          parse_mode: 'Markdown',
          reply_markup: nft.getInlineKeyboard(),
        })
        await ctx.deleteMessage()
        return
      }

      if (page !== undefined) {
        const newMedia = InputMediaBuilder.photo(nft.image, {
          caption: nft.getCaption(),
          parse_mode: 'Markdown',
        })

        await ctx.editMessageMedia(newMedia, {
          reply_markup: nft.getInlineKeyboard(),
        })
        return
      }
    }

    if (data === 'transactions') {
      const transactionsArray = await getTransactions(address, 10)

      if (transactionsArray.error) {
        await ctx.reply(ctx.t(transactionsArray.error))
        return
      }

      const transactions = new Transactions(
        ctx,
        address,
        rawAddress,
        transactionsArray
      )

      await ctx.editMessageText(transactions.getCaption(), {
        parse_mode: 'Markdown',
        reply_markup: transactions.getInlineKeyboard(),
      })
    }

    if (data === 'backToWallet') {
      const walletInfo = await getWalletInfo(address)

      if (walletInfo.error) {
        await ctx.reply(ctx.t(walletInfo.error))
        return
      }

      const wallet = new Wallet(ctx, walletInfo)

      await ctx.editMessageText(wallet.getCaption(), {
        parse_mode: 'Markdown',
        reply_markup: wallet.getInlineKeyboard(),
      })
    }

    if (data === 'openWallet') {
      const walletInfo = await getWalletInfo(address)

      if (walletInfo.error) {
        await ctx.reply(ctx.t(walletInfo.error))
        return
      }

      const wallet = new Wallet(ctx, walletInfo)

      await ctx.reply(wallet.getCaption(), {
        parse_mode: 'Markdown',
        reply_markup: wallet.getInlineKeyboard(),
      })
      await ctx.deleteMessage()
    }
  } catch (e) {
    console.log(e)
  }
}
