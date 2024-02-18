import { ContextType } from '../../types/index.js'

export const helpCommand = async (ctx: ContextType) => {
  try {
    await ctx.reply(ctx.t('help'), {
      parse_mode: 'Markdown',
    })
  } catch (e) {
    console.log(e)
  }
}
