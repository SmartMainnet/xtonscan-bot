import { scanAddress } from '../../utils/index.js'
import { ContextType } from '../../types/index.js'

export const addressMessage = async (ctx: ContextType) => {
  try {
    const address = ctx.update.message?.text!
    await scanAddress(ctx, address)
  } catch (e) {
    console.log(e)
    await ctx.reply(ctx.t('error'))
  }
}
