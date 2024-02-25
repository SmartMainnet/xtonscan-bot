import { InlineKeyboard } from 'grammy'

export const transactionsInlineKeyboard = (
  ownerAddress: string,
  page: number,
  max_page: number
) => {
  const isLastPage = page === max_page
  const paginationButtonRow = []

  if (page > 0) {
    paginationButtonRow.push(
      InlineKeyboard.text('<', `transactions ${ownerAddress} ${page - 1}`)
    )
  }

  if (!(page === 0 && isLastPage)) {
    paginationButtonRow.push(
      InlineKeyboard.text(`[ ${page + 1} / ${max_page + 1} ]`, 'disabledButton')
    )
  }

  if (!isLastPage) {
    paginationButtonRow.push(
      InlineKeyboard.text('>', `transactions ${ownerAddress} ${page + 1}`)
    )
  }

  const backButton = [InlineKeyboard.text('« Back', `openWallet ${ownerAddress}`)]

  return InlineKeyboard.from([paginationButtonRow, backButton])
}
