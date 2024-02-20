import { scanAddress } from '../../utils/index.js'
import { ContextType } from '../../types/index.js'

export const startCommand = async (ctx: ContextType) => {
  try {
    const address = String(ctx.match)
    const RegExp = /^[a-z0-9+/_-]{48}$/i

    if (RegExp.test(address)) {
      await scanAddress(ctx, address)
    } else {
      await ctx.reply(ctx.t('start', { bot_name: ctx.me.first_name }))
      await ctx.reply(ctx.t('help'), {
        parse_mode: 'Markdown',
      })
    }
  } catch (e) {
    console.log(e)
  }
}
