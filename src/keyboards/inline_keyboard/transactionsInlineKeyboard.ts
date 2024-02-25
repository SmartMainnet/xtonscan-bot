import { InlineKeyboard } from 'grammy'

export const transactionsInlineKeyboard = (
  ownerAddress: string,
  page: number = 0,
  isLastPage: boolean = false
) => {
  const paginationButtonRow = []

  if (page > 0) {
    paginationButtonRow.push(
      InlineKeyboard.text('<', `transactions ${ownerAddress} ${page - 1}`)
    )
  }

  if (!(page === 0 && isLastPage)) {
    paginationButtonRow.push(
      InlineKeyboard.text(`[ ${page + 1} ]`, 'disabledButton')
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
