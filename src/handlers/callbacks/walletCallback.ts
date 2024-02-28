import { InputMediaBuilder } from 'grammy'

import {
  getJettons,
  getNftInfoByOwner,
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

    if (data === 'jettons') {
      const jettonsResponse = await getJettons(address, 10, page || 0)

      if ('error' in jettonsResponse) {
        await ctx.reply(ctx.t(jettonsResponse.error))
        return
      }

      const jettons = new Jettons(ctx, jettonsResponse.result)

      await ctx.editMessageText(jettons.getCaption(), {
        parse_mode: 'Markdown',
        reply_markup: jettons.getInlineKeyboard(),
      })
    }

    if (data === 'nfts') {
      const nftInfoResponse = await getNftInfoByOwner(address, page || 0)

      if ('error' in nftInfoResponse) {
        await ctx.reply(ctx.t(nftInfoResponse.error))
        return
      }

      const nft = new NFTs(ctx, nftInfoResponse.result)

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
      const transactionsResponse = await getTransactions(address, 10, page || 0)

      if ('error' in transactionsResponse) {
        await ctx.reply(ctx.t(transactionsResponse.error))
        return
      }

      const transactions = new Transactions(ctx, transactionsResponse.result)

      await ctx.editMessageText(transactions.getCaption(), {
        parse_mode: 'Markdown',
        reply_markup: transactions.getInlineKeyboard(),
      })
    }

    if (data === 'backToWallet') {
      const walletInfoResponse = await getWalletInfo(address)

      if ('error' in walletInfoResponse) {
        await ctx.reply(ctx.t(walletInfoResponse.error))
        return
      }

      const wallet = new Wallet(ctx, walletInfoResponse.result)

      await ctx.editMessageText(wallet.getCaption(), {
        parse_mode: 'Markdown',
        reply_markup: wallet.getInlineKeyboard(),
      })
    }

    if (data === 'openWallet') {
      const walletInfoResponse = await getWalletInfo(address)

      if ('error' in walletInfoResponse) {
        await ctx.reply(ctx.t(walletInfoResponse.error))
        return
      }

      const wallet = new Wallet(ctx, walletInfoResponse.result)

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
