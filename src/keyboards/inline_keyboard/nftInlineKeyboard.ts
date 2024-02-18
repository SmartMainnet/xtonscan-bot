import { InlineKeyboard } from 'grammy'

export const nftInlineKeyboard = (
  urlTonviewer: string,
  urlGetgems: string,
  isApprovedByGetgems: boolean
) => {
  const tonviewerButton = [InlineKeyboard.url('🔎 Tonviewer', urlTonviewer)]
  const getgemsButton = isApprovedByGetgems
    ? [InlineKeyboard.url('🖼 Getgems', urlGetgems)]
    : []

  return InlineKeyboard.from([[...tonviewerButton, ...getgemsButton]])
}

export const nftsInlineKeyboard = (
  urlTonviewer: string,
  urlGetgems: string,
  isApprovedByGetgems: boolean,
  address: string,
  nftCount: number,
  page: number = 0
) => {
  const tonviewerButton = [InlineKeyboard.url('🔎 Tonviewer', urlTonviewer)]
  const getgemsButton = isApprovedByGetgems
    ? [InlineKeyboard.url('🖼 Getgems', urlGetgems)]
    : []

  const paginationButtonRow = []

  if (page > 0) {
    paginationButtonRow.push(InlineKeyboard.text('<', `nfts ${address} ${page - 1}`))
  }

  if (nftCount > 1) {
    paginationButtonRow.push(
      InlineKeyboard.text(`${page + 1} / ${nftCount}`, 'disabledButton')
    )
  }

  if (page < nftCount - 1) {
    paginationButtonRow.push(InlineKeyboard.text('>', `nfts ${address} ${page + 1}`))
  }

  const backButton = [InlineKeyboard.text('« Back', `openWallet ${address}`)]

  return InlineKeyboard.from([
    [...tonviewerButton, ...getgemsButton],
    paginationButtonRow,
    backButton,
  ])
}
