start =
  🤖 Welcome to { $bot_name }!
help =
  Enter any TON address to scan it.
  Example: `UQBBDmW8NxpCirSBW4tUF3uvpMqVRDqolW1rVDTBgGSKw9ep`

only_members =
  To use the Bot, you must be a Member from [Smart Bots](https://t.me/{ $CHANNEL })
only_ton_addresses =
  ⚠️ Only TON addresses!
address_not_found =
  ⚠️ Address Not Found!
limit =
  Rate limit exceeded
rate_limit =
  Sorry, too many users.
  Try again in a few seconds!

checking =
  Checking...
error =
  Something went wrong...

description =
  Description:
  · _{ $description }_
attributes =
  Attributes:
  · { $attributes }
approved_by =
  Approved: *{ $approved_by }*

transaction =
  📖 *Transaction (Beta)*
  🔖 Hash: *{ $short_hash }*

  { $transaction }
jetton =
  🪙 { $name }: *{ $balance } { $symbol } | ${ $balance_usd }*

transactions =
  📖 *Transactions (Beta)*
  👛 Address: *{ $short_address }*

  { $transactions }
jettons =
  📖 *Jettons (Beta)*
  👛 Address: *{ $short_address }*

  { $jettons }

wallet_info =
  📖 *Wallet Info (Beta)*
  👛 Address: *{ $short_address }*

  ℹ️ Status: *{ $status }*
  🏷 Name: *{ $name }*
  💎 Balance: *{ $balance_ton } TON | ${ $balance_usd }*
  🪙 Jettons Count: *{ $jetton_count }*
  🖼 NFT Count: *{ $nft_count }*
jetton_info =
  📖 *Jetton Info (Beta)*
  👛 Address: *{ $short_address }*

  ℹ️ Mintable: *{ $mintable }*
  🪙 Total Supply: *{ $total_supply }*
  👤 Holders Count: *{ $holders_count }*
  🏷 Name: *{ $name }*
  💎 Symbol: *{ $symbol }

  📓 *{ $description }
nft_info =
  Name: *{ $name }*{ $description }{ $attributes }{ $approved_by }

  Owner: *{ $owner }*