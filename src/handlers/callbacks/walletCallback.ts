import { InputMediaBuilder } from 'grammy'

import {
  backToWalletInlineKeyboard,
  nftsInlineKeyboard,
  walletInlineKeyboard,
} from '../../keyboards/inline_keyboard/index.js'
import {
  getJettons,
  getNftInfoByOwner,
  getRawAddress,
  getTransactions,
  getWalletInfo,
} from '../../api/index.js'
import { NFT, Transaction, Wallet } from '../../classes/index.js'
import { shortAddress } from '../../utils/index.js'
import { ContextType } from '../../types/index.js'

export const walletCallback = async (ctx: ContextType) => {
  try {
    const callback = ctx.update.callback_query!

    const data = callback.data!.split(' ')[0]
    const address = callback.data!.split(' ')[1]
    const pageString = callback.data!.split(' ')[2]

    const rawAddress = await getRawAddress(address)

    if (rawAddress.error) {
      await ctx.reply(ctx.t(rawAddress.error))
      return
    }

    const page = pageString !== undefined ? Number(pageString) : undefined

    if (data === 'jettons') {
      const jettons = await getJettons(address)

      if (jettons.error) {
        await ctx.reply(ctx.t(jettons.error))
        return
      }

      const jettonsString = jettons
        ?.map((data: any) => {
          const name = data.jetton.name
          const symbol = data.jetton.symbol
          const balance = data.balance / 10 ** data.jetton.decimals
          const price = data.price.prices.USD

          return ctx.t('jetton', {
            name,
            balance: balance.toFixed(2),
            symbol,
            balance_usd: (balance * price).toFixed(2),
          })
        })
        .join('\n')

      await ctx.editMessageText(
        ctx.t('jettons', {
          short_address: shortAddress(address),
          jettons: jettonsString,
        }),
        {
          parse_mode: 'Markdown',
          reply_markup: backToWalletInlineKeyboard(address),
        }
      )
    }

    if (data === 'nfts') {
      const nftInfo = await getNftInfoByOwner(address, page || 0)

      if (nftInfo.error) {
        await ctx.reply(ctx.t(nftInfo.error))
        return
      }

      const nft = new NFT(ctx, nftInfo)

      if (page === undefined) {
        await ctx.replyWithPhoto(nft.image, {
          caption: ctx.t('nftInfo', nft.getCaption()),
          parse_mode: 'Markdown',
          reply_markup: nftsInlineKeyboard(
            nft.tonviewer_url,
            nft.getgems_url,
            nft.is_approved_by_getgems,
            address,
            nft.last_page
          ),
        })
        await ctx.deleteMessage()
        return
      }

      if (page !== undefined) {
        const newMedia = InputMediaBuilder.photo(nft.image, {
          caption: ctx.t('nftInfo', nft.getCaption()),
          parse_mode: 'Markdown',
        })

        await ctx.editMessageMedia(newMedia, {
          reply_markup: nftsInlineKeyboard(
            nft.tonviewer_url,
            nft.getgems_url,
            nft.is_approved_by_getgems,
            address,
            nft.last_page,
            page
          ),
        })
        return
      }
    }

    if (data === 'transactions') {
      const transactions = await getTransactions(address, 10)

      if (transactions.error) {
        await ctx.reply(ctx.t(transactions.error))
        return
      }

      const transactionsString = transactions.events
        ?.map((transaction: any) =>
          new Transaction(transaction, rawAddress).getTransaction()
        )
        .join('\n')

      await ctx.editMessageText(
        ctx.t('transactions', {
          short_address: shortAddress(address),
          transactions: transactionsString,
        }),
        {
          parse_mode: 'Markdown',
          reply_markup: backToWalletInlineKeyboard(address),
        }
      )
    }

    if (data === 'backToWallet') {
      const walletInfo = await getWalletInfo(address)

      if (walletInfo.error) {
        await ctx.reply(ctx.t(walletInfo.error))
        return
      }

      const wallet = new Wallet(walletInfo)

      await ctx.editMessageText(ctx.t('walletInfo', wallet.getCaption()), {
        parse_mode: 'Markdown',
        reply_markup: walletInlineKeyboard(address),
      })
    }

    if (data === 'openWallet') {
      const walletInfo = await getWalletInfo(address)

      if (walletInfo.error) {
        await ctx.reply(ctx.t(walletInfo.error))
        return
      }

      const wallet = new Wallet(walletInfo)

      await ctx.reply(ctx.t('walletInfo', wallet.getCaption()), {
        parse_mode: 'Markdown',
        reply_markup: walletInlineKeyboard(address),
      })
      await ctx.deleteMessage()
    }
  } catch (e) {
    console.log(e)
  }
}
