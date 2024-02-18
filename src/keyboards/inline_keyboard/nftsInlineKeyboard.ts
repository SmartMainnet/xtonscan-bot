import { InlineKeyboard } from 'grammy'

export const nftsInlineKeyboard = (
  ownerAddress: string,
  isApprovedByGetgems: boolean,
  urlTonviewer: string,
  urlGetgems: string,
  lastPage: number,
  page: number = 0
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

  if (lastPage > 1) {
    paginationButtonRow.push(
      InlineKeyboard.text(`${page + 1} / ${lastPage}`, 'disabledButton')
    )
  }

  if (page < lastPage - 1) {
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
