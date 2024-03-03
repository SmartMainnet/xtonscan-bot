import { transactionInlineKeyboard } from '../keyboards/inline_keyboard/index.js'
import { Address } from './index.js'
import { getDeepLink, getAddressDeepLink, toTon } from '../utils/index.js'
import { ContextType } from '../types/index.js'
import { getNftInfo } from '../api/endpoints.js'

export class Transaction {
  ctx: ContextType
  transaction_event_id: string
  tonviewer_url: string
  transaction: any

  constructor(ctx: ContextType, transaction: any) {
    this.ctx = ctx
    this.transaction_event_id = transaction.event_id
    this.tonviewer_url = `https://tonviewer.com/transaction/${transaction.event_id}`
    this.transaction = transaction
  }

  async getCaption() {
    const ctx = this.ctx
    const transaction = this.transaction

    return this.ctx.t('transaction', {
      short_hash: Address.short(this.transaction_event_id),
      transaction: (
        await Promise.all(
          transaction.actions?.map(async (action: any) => {
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
              const { sender, recipient, amount } = action.TonTransfer

              const value = toTon(amount)
              const from = getAddressDeepLink(ctx, sender)
              const to = getAddressDeepLink(ctx, recipient)

              return `💎 *TON Transfer:* ${from} => ${to}\n  └   ${value} TON`
            }

            if (isContractDeploy) {
              const { ContractDeploy, status } = action

              const contract = getAddressDeepLink(ctx, ContractDeploy)

              return `📝 *Deploy Contract:* ${contract}\n  └   ${status}`
            }

            if (isJettonTransfer) {
              const { sender, recipient, amount, decimals } = action.JettonTransfer
              const { address, symbol } = action.JettonTransfer.jetton

              const value = toTon(amount, decimals)
              const jetton = getDeepLink(
                ctx,
                symbol,
                Address.getNonBounceable(address)
              )
              const from = getAddressDeepLink(ctx, sender)
              const to = getAddressDeepLink(ctx, recipient)

              return `🪙 *Jetton Transfer:* ${from} => ${to}\n  └   ${value} ${jetton}`
            }

            // TODO: Check it
            if (isJettonBurn) {
              const { sender, amount } = action.JettonBurn
              const { address, symbol, decimals } = action.JettonBurn.jetton

              const value = toTon(amount, decimals)
              const jetton = getDeepLink(
                ctx,
                symbol,
                Address.getNonBounceable(address)
              )
              const from = getAddressDeepLink(ctx, sender)

              return `🪙 *Jetton Burn:* ${from}\n  └   ${value} ${jetton}`
            }

            // TODO: Check it
            if (isJettonMint) {
              const { recipient, amount } = action.JettonMint
              const { address, symbol, decimals } = action.JettonMint.jetton

              const value = toTon(amount, decimals)
              const jetton = getDeepLink(
                ctx,
                symbol,
                Address.getNonBounceable(address)
              )
              const to = getAddressDeepLink(ctx, recipient)

              return `🪙 *Jetton Mint:* ${to}\n  └   ${value} ${jetton}`
            }

            if (isNftItemTransfer) {
              const { sender, recipient } = action.NftItemTransfer

              const nftInfoResponse: any = await getNftInfo(
                action.NftItemTransfer.nft
              )
              const nft = getDeepLink(
                ctx,
                nftInfoResponse.result.nft_name,
                nftInfoResponse.result.nft_address
              )
              const from = getAddressDeepLink(ctx, sender)
              const to = getAddressDeepLink(ctx, recipient)

              return `🖼 *NFT Transfer:* ${from} => ${to}\n  └   ${nft}`
            }

            if (isSubscribe) {
              return `🖼 ${description}`
            }

            if (isUnSubscribe) {
              return `🖼 ${description}`
            }

            if (isAuctionBid) {
              return `🔨 ${description}`
            }

            if (isNftPurchase) {
              return `🔨 ${description}`
            }

            if (isDepositStake) {
              return `🔨 ${description}`
            }

            if (isWithdrawStake) {
              return `🔨 ${description}`
            }

            if (isWithdrawStakeRequest) {
              return `🔨 ${description}`
            }

            if (isElectionsDepositStake) {
              return `🔨 ${description}`
            }

            if (isElectionsRecoverStake) {
              return `🔨 ${description}`
            }

            if (isJettonSwap) {
              const { user_wallet, router, ton_in, ton_out } = action.JettonSwap

              const amount_in = action.JettonSwap.amount_in
              const decimals_in = action.JettonSwap.jetton_master_in?.decimals
              const symbol_in = action.JettonSwap.jetton_master_in?.symbol
              const address_in = action.JettonSwap.jetton_master_in?.address

              const amount_out = action.JettonSwap.amount_out
              const decimals_out = action.JettonSwap.jetton_master_out?.decimals
              const symbol_out = action.JettonSwap.jetton_master_out?.symbol
              const address_out = action.JettonSwap.jetton_master_out?.address

              const from = getAddressDeepLink(ctx, router)
              const to = getAddressDeepLink(ctx, user_wallet)

              const input = ton_in
                ? `${toTon(ton_in)} TON`
                : `${toTon(amount_in, decimals_in)} ${getDeepLink(
                    ctx,
                    symbol_in,
                    Address.getNonBounceable(address_in)
                  )}`
              const output = ton_out
                ? `${toTon(ton_out)} TON`
                : `${toTon(amount_out, decimals_out)} ${getDeepLink(
                    ctx,
                    symbol_out,
                    Address.getNonBounceable(address_out)
                  )}`

              return `🔁 *Jetton Swap:* ${from} => ${to}\n  └   ${input} > ${output}`
            }

            if (isSmartContractExec) {
              const { executor, contract, ton_attached } = action.SmartContractExec

              const value = toTon(ton_attached)
              const from = getAddressDeepLink(ctx, executor)
              const to = getAddressDeepLink(ctx, contract)

              return `📃 *Call Contract:* ${from} => ${to}\n  └   ${value} TON`
            }

            if (isDomainRenew) {
              return `🔨 ${description}`
            }

            if (isInscriptionTransfer) {
              return `🔨 ${description}`
            }

            if (isInscriptionMint) {
              return `🔨 ${description}`
            }

            return `↕️ ${description}`
          })
        )
      ).join('\n'),
    })
  }

  getInlineKeyboard() {
    return transactionInlineKeyboard(this.tonviewer_url)
  }
}
