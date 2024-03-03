import { getTransactionInfo } from '../api/index.js'
import { Transaction } from '../classes/index.js'
import { ContextType } from '../types/index.js'

export const scanTransaction = async (ctx: ContextType, address: string) => {
  try {
    const transactionInfoResponse = await getTransactionInfo(address)

    if ('error' in transactionInfoResponse) {
      await ctx.reply(ctx.t(transactionInfoResponse.error))
      return
    }

    const transaction = new Transaction(ctx, transactionInfoResponse.result)

    await ctx.reply(await transaction.getCaption(), {
      parse_mode: 'Markdown',
      reply_markup: transaction.getInlineKeyboard(),
    })
  } catch (e) {
    console.log(e)
    await ctx.reply(ctx.t('error'))
  }
}
