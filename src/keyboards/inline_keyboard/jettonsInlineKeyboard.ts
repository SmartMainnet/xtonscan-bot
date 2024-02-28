import { InlineKeyboard } from 'grammy'

export const jettonsInlineKeyboard = (
  ownerAddress: string,
  maxPage: number,
  page: number
) => {
  const isLastPage = page === maxPage
  const paginationButtonRow = []

  if (page > 0) {
    paginationButtonRow.push(
      InlineKeyboard.text('<', `jettons ${ownerAddress} ${page - 1}`)
    )
  }

  if (!(page === 0 && isLastPage)) {
    paginationButtonRow.push(
      InlineKeyboard.text(`[ ${page + 1} / ${maxPage + 1} ]`, 'disabledButton')
    )
  }

  if (!isLastPage) {
    paginationButtonRow.push(
      InlineKeyboard.text('>', `jettons ${ownerAddress} ${page + 1}`)
    )
  }

  const backButton = [InlineKeyboard.text('« Back', `openWallet ${ownerAddress}`)]

  return InlineKeyboard.from([paginationButtonRow, backButton])
}
