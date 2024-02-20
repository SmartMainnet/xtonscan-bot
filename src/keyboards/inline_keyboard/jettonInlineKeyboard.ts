import { InlineKeyboard } from 'grammy'

export const jettonInlineKeyboard = (urlTonviewer: string, urlStonfi: string) => {
  const tonviewerButton = [InlineKeyboard.url('🔎 Tonviewer', urlTonviewer)]
  const stonfiButton = urlStonfi
    ? [InlineKeyboard.url('🔄 Swap on STON.fi', urlStonfi)]
    : []

  return InlineKeyboard.from([[...tonviewerButton, ...stonfiButton]])
}
