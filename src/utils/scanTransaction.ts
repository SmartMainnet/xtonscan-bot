import { getTransactionInfo } from '../api/index.js'
import { Transaction } from '../classes/index.js'
import { ContextType } from '../types/index.js'

export const scanTransaction = async (ctx: ContextType, address: string) => {
  try {
    const transactionInfo = await getTransactionInfo(address)

    if (transactionInfo.error) {
      await ctx.reply(ctx.t(transactionInfo.error))
      return
    }

    const transaction = new Transaction(ctx, transactionInfo)

    await ctx.reply(transaction.getCaption(), {
      parse_mode: 'Markdown',
      reply_markup: transaction.getInlineKeyboard(),
    })
  } catch (e) {
    console.log(e)
    await ctx.reply(ctx.t('error'))
  }
}
