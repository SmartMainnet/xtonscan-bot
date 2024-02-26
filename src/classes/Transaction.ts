import { transactionInlineKeyboard } from '../keyboards/inline_keyboard/index.js'
import { Address } from './index.js'
import { getNameOrShortAddress, toTon } from '../utils/index.js'
import { ContextType } from '../types/index.js'

export class Transaction {
  ctx: ContextType
  transaction_event_id: string
  tonviewer_url: string
  transaction: string

  constructor(ctx: ContextType, transaction: any) {
    this.ctx = ctx
    this.transaction_event_id = transaction.event_id
    this.tonviewer_url = `https://tonviewer.com/transaction/${transaction.event_id}`
    this.transaction = transaction.actions
      ?.map((action: any) => {
        const type = action.type
        const description = action.simple_preview.description

        const isTonTransfer = type === 'TonTransfer'
        const isContractDeploy = type === 'ContractDeploy'
        const isJettonTransfer = type === 'JettonTransfer'
        const isJettonBurn = type === 'JettonBurn'
        const isJettonMint = type === 'JettonMint'
        const isNftItemTransfer = type === 'NftItemTransfer'
        const isSubscribe = type === 'Subscribe'
        const isUnSubscribe = type === 'UnSubscribe'
        const isAuctionBid = type === 'AuctionBid'
        const isNftPurchase = type === 'NftPurchase'
        const isDepositStake = type === 'DepositStake'
        const isWithdrawStake = type === 'WithdrawStake'
        const isWithdrawStakeRequest = type === 'WithdrawStakeRequest'
        const isElectionsDepositStake = type === 'ElectionsDepositStake'
        const isElectionsRecoverStake = type === 'ElectionsRecoverStake'
        const isJettonSwap = type === 'JettonSwap'
        const isSmartContractExec = type === 'SmartContractExec'
        const isDomainRenew = type === 'DomainRenew'
        const isInscriptionTransfer = type === 'InscriptionTransfer'
        const isInscriptionMint = type === 'InscriptionMint'

        if (isTonTransfer) {
          const { sender } = action.TonTransfer
          const { recipient } = action.TonTransfer
          const { amount } = action.TonTransfer

          const from = getNameOrShortAddress(sender)
          const to = getNameOrShortAddress(recipient)
          const value = toTon(amount)

          return `💎 *Transfer TON:* ${from} => ${to}\n  └   ${value} TON`
        }

        if (isContractDeploy) {
          const { ContractDeploy } = action
          const { status } = action

          const contract = getNameOrShortAddress(ContractDeploy)

          return `📝 *Deploy contract:* ${contract}\n  └   ${status}`
        }

        if (isJettonTransfer) {
          const { sender } = action.JettonTransfer
          const { recipient } = action.JettonTransfer
          const { amount } = action.JettonTransfer
          const { decimals } = action.JettonTransfer
          const { symbol } = action.JettonTransfer.jetton

          const from = getNameOrShortAddress(sender)
          const to = getNameOrShortAddress(recipient)
          const value = toTon(amount, decimals)

          return `🪙 *Transfer token:* ${from} => ${to}\n  └   ${value} ${symbol}`
        }

        if (isNftItemTransfer) {
          return `🖼 ${description}`
        }

        if (isAuctionBid) {
          return `🔨 ${description}`
        }

        if (isJettonSwap) {
          const { user_wallet } = action.JettonSwap
          const { router } = action.JettonSwap
          const { ton_in } = action.JettonSwap
          const { ton_out } = action.JettonSwap

          const amount_in = action.JettonSwap.amount_in
          const decimals_in = action.JettonSwap.jetton_master_in?.decimals
          const symbol_in = action.JettonSwap.jetton_master_in?.symbol

          const amount_out = action.JettonSwap.amount_out
          const decimals_out = action.JettonSwap.jetton_master_out?.decimals
          const symbol_out = action.JettonSwap.jetton_master_out?.symbol

          const from = getNameOrShortAddress(router)
          const to = getNameOrShortAddress(user_wallet)

          const input = ton_in
            ? `${toTon(ton_in)} TON`
            : `${toTon(amount_in, decimals_in)} ${symbol_in}`
          const output = ton_out
            ? `${toTon(ton_out)} TON`
            : `${toTon(amount_out, decimals_out)} ${symbol_out}`

          return `🔁 *Swap tokens:* ${from} => ${to}\n  └   ${input} > ${output}`
        }

        if (isSmartContractExec) {
          const { executor } = action.SmartContractExec
          const { contract } = action.SmartContractExec
          const { ton_attached } = action.SmartContractExec

          const from = getNameOrShortAddress(executor)
          const to = getNameOrShortAddress(contract)
          const value = toTon(ton_attached)

          return `📃 *Call contract:* ${from} => ${to}\n  └   ${value} TON`
        }

        return `↕️ ${description}`
      })
      .join('\n')
  }

  getCaption() {
    return this.ctx.t('transaction', {
      short_hash: Address.short(this.transaction_event_id),
      transaction: this.transaction,
    })
  }

  getInlineKeyboard() {
    return transactionInlineKeyboard(this.tonviewer_url)
  }
}
