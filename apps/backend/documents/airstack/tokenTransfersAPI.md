TokenTransfers API
The TokenTransfers API delivers information on token transfers between wallets & contracts.
Inputs & Filters

```code
input TokenTransferFilter {
from: # Identity: blockchain address, domain name, social identity
to: # Identity: blockchain address, domain name, social identity
tokenAddress: # Token contract address (ERC20, ERC721, ERC1155(
tokenId: # Unique NFT token ID
tokenType: # ERC20, ERC721, ERC1155
transactionHash: # transaction hash
}
```

Output

```code
type TokenTransfer {
amount: String # Amount transferred in the token transfer
amounts: [String] # ERC1155 batch transfer specific amounts
blockchain: Blockchain # Blockchain where the token transfer took place
blockNumber: Int # Block number of the token transfer
blockTimestamp: Time # Timestamp of the token transfer
chainId: String # Airstack unique identifier for the blockchain
from:  # **Nested query** - wallet-related information, including address, domains, social profile, other token balances, and transfer history.
id: ID # Airstack unique identifier for the token transfer
operator:  # **Nested query** - operator (contract) wallet-related information, including address, domains, social profile, other token balances, and transfer history.
to:  # **Nested query** - wallet-related information, including address, domains, social profile, other token balances, and transfer history.
token: Token # **Nested query** - token contract level information
tokenAddress: Address # Token contract address
tokenId: String # Token ID associated with the token transfer, if applicable
tokenIds: [String] # List of token IDs associated with the token transfer, if applicable
tokenNft: TokenNft # **Nested query** - individual NFT token level data
tokenType: TokenType # Token type (ERC20, ERC721, or ERC1155)
transactionHash: String! # Transaction hash of the token transfer
type: String # Type of the token transfer
}
```

The TokenTransfers API only covers transfers of the "transfer" type and excludes "sale" transactions for NFT contracts.
