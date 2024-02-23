import { InlineKeyboard } from 'grammy'

export const transactionInlineKeyboard = (urlTonviewer: string) => {
  const tonviewerButton = [InlineKeyboard.url('🔎 Tonviewer', urlTonviewer)]

  return InlineKeyboard.from([[...tonviewerButton]])
}
