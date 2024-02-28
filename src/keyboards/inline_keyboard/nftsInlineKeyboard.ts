import { InlineKeyboard } from 'grammy'

export const nftsInlineKeyboard = (
  ownerAddress: string,
  isApprovedByGetgems: boolean,
  urlTonviewer: string,
  urlGetgems: string,
  maxPage: number,
  page: number
) => {
  const tonviewerButton = [InlineKeyboard.url('🔎 Tonviewer', urlTonviewer)]
  const getgemsButton = isApprovedByGetgems
    ? [InlineKeyboard.url('🖼 Getgems', urlGetgems)]
    : []

  const paginationButtonRow = []

  if (page > 0) {
    paginationButtonRow.push(
      InlineKeyboard.text('<', `nfts ${ownerAddress} ${page - 1}`)
    )
  }

  if (maxPage > 1) {
    paginationButtonRow.push(
      InlineKeyboard.text(`${page + 1} / ${maxPage}`, 'disabledButton')
    )
  }

  if (page < maxPage - 1) {
    paginationButtonRow.push(
      InlineKeyboard.text('>', `nfts ${ownerAddress} ${page + 1}`)
    )
  }

  const backButton = [InlineKeyboard.text('« Back', `openWallet ${ownerAddress}`)]

  return InlineKeyboard.from([
    [...tonviewerButton, ...getgemsButton],
    paginationButtonRow,
    backButton,
  ])
}
