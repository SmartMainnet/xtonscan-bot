import { InlineKeyboard } from 'grammy'

export const nftInlineKeyboard = (
  isApprovedByGetgems: boolean,
  urlTonviewer: string,
  urlGetgems: string
) => {
  const tonviewerButton = [InlineKeyboard.url('🔎 Tonviewer', urlTonviewer)]
  const getgemsButton = isApprovedByGetgems
    ? [InlineKeyboard.url('🖼 Getgems', urlGetgems)]
    : []

  return InlineKeyboard.from([[...tonviewerButton, ...getgemsButton]])
}
