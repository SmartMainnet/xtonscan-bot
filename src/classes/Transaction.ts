export class Transaction {
  rawAddress: string
  transaction: any
  description: string
  type: string

  constructor(transaction: any, rawAddress: string) {
    this.rawAddress = rawAddress
    this.transaction = transaction
    this.description = transaction.actions[0].simple_preview.description
    this.type = transaction.actions[0].type
  }

  getTransaction() {
    const isTonTransfer = this.type === 'TonTransfer'
    const isJettonTransfer = this.type === 'JettonTransfer'
    const isNftItemTransfer = this.type === 'NftItemTransfer'
    const isJettonSwap = this.type === 'JettonSwap'
    const isAuctionBid = this.type === 'AuctionBid'

    if (isTonTransfer) {
      const sender = this.transaction.actions[0].TonTransfer.sender?.address
      const recipient = this.transaction.actions[0].TonTransfer.recipient?.address

      if (sender === this.rawAddress) {
        return `⬆️ ${this.description}`
      }

      if (recipient === this.rawAddress) {
        return `⬇️ ${this.description}`
      }
    }

    if (isJettonTransfer) {
      const sender = this.transaction.actions[0].JettonTransfer.sender?.address
      const recipient = this.transaction.actions[0].JettonTransfer.recipient?.address

      if (sender === this.rawAddress) {
        return `⬆️ ${this.description}`
      }

      if (recipient === this.rawAddress) {
        return `⬇️ ${this.description}`
      }
    }

    if (isNftItemTransfer) {
      const sender = this.transaction.actions[0].NftItemTransfer.sender?.address
      const recipient =
        this.transaction.actions[0].NftItemTransfer.recipient?.address

      if (sender === this.rawAddress) {
        return `⬆️ ${this.description}`
      }

      if (recipient === this.rawAddress) {
        return `⬇️ ${this.description}`
      }
    }

    if (isJettonSwap) {
      return `🔁 ${this.description}`
    }

    if (isAuctionBid) {
      return `🔨 ${this.description}`
    }

    return `↕️ ${this.description}`
  }
}
