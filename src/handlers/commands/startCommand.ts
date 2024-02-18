import { ContextType } from '../../types/index.js'

export const startCommand = async (ctx: ContextType) => {
  try {
    await ctx.reply(ctx.t('start', { bot_name: ctx.me.first_name }))
    await ctx.reply(ctx.t('help'), {
      parse_mode: 'Markdown',
    })
  } catch (e) {
    console.log(e)
  }
}
