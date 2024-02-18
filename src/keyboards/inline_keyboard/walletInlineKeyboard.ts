import { InlineKeyboard } from 'grammy'

export const walletInlineKeyboard = (address: string) => {
  const urlTonviewer = `https://tonviewer.com/${address}`

  return new InlineKeyboard()
    .url('🔎 Tonviewer', urlTonviewer)
    .row()
    .text('↕️ Transactions', `transactions ${address}`)
    .row()
    .text('🪙 Jettons', `jettons ${address}`)
    .text('🖼 NFTs', `nfts ${address}`)
}

export const backToWalletInlineKeyboard = (address: string) => {
  return new InlineKeyboard().text('« Back', `backToWallet ${address}`)
}
