import { scanTransaction } from '../../utils/index.js'
import { ContextType } from '../../types/index.js'

export const transactionMessage = async (ctx: ContextType) => {
  try {
    const address = ctx.update.message?.text!
    await scanTransaction(ctx, address)
  } catch (e) {
    console.log(e)
    await ctx.reply(ctx.t('error'))
  }
}
