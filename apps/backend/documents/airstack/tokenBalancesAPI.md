TokenBalances API
The TokenBalances API covers the owners and balances of ERC20, ERC721, and ERC1155 tokens.
Inputs & Filters

```code
input TokenBalanceFilter {
owner: # Identity: blockchain address, domain name, social identity
tokenAddress: # Token contract address on the blockchain (ERC20, ERC721, ERC1155)
tokenId: # Unique NFT token ID
tokenType: # ERC20, ERC721, ERC1155
}
```

Outputs

```code
type TokenBalance {
amount: String! # Token balance amount
blockchain: Blockchain # Blockchain where the token balance is located
chainId: String! # Airstack unique identifier for the blockchain
id: ID! # Airstack unique identifier for the data point
lastUpdatedBlock: Int! # Block number when the token balance was last updated
lastUpdatedTimestamp: Time # Timestamp when the token balance was last updated
owner: Wallet! # **Nested query** allowing to retrieve address, domain names, and social profiles of the owner
token: Token # **Nested query** to get token contract level data
tokenAddress: Address! # Token contract address
tokenId: String # Unique NFT token ID, if applicable
tokenNfts: # **Nested query** allowing to get NFT token data (images, traits, etc.)
tokenTransfer: # **Nested query** with token transfer history and details
tokenType: TokenType # ERC20, ERC721, or ERC1155
}
```

See Airstack Identity API page for how to query with ENS or web3 social identities, such as Farcaster
