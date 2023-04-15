TokenNFTs API
The TokenNFTs API provides detailed data about a specific NFT token within an NFT Collection, either an ERC721 or ERC1155 contract. You can use this API to return token-specific metadata, including traits, and resized images.
Inputs & Filters

```code
input TokenNftFilter {
  address: # Contract address (ERC721, ERC1155)
  metaData: # allows querying by NFT Token Name, or specific trait or attribute.
  tokenId: # Unique NFT token ID
}
```

Outputs

```code
type TokenNft {
address: Address! # NFT contract address on the blockchain
blockchain: Blockchain # Blockchain where the NFT token is deployed
chainId: String! # Airstack unique identifier for the blockchain
contentType: String # Content type of the NFT token (image, video, audio, etc.)
contentValue: Media # NFT Media - resized images, animation, videos, etc.
#currentHolderCount: # Number of current holders of the token NFT - being fixed
id: # Airstack unique identifier for the NFT token
lastTransferBlock: # Block number of the token NFT's most recent transfer
lastTransferHash: # Hash of the token NFT's most recent transfer
lastTransferTimestamp: # Timestamp of the token NFT's most recent transfer
metaData: NftMetadata # Metadata associated with the NFT token
nftSaleTransactions: # **Nested query** allowing to retrieve token sale transactions
rawMetaData: # NFT token metadata as defined in the contract
token: # **Nested query** allowing to query contract level data
tokenBalances: # **Nested query** with token balance data & owner data
tokenId: IntString! # Unique NFT token ID
tokenTransfers: # **Nested query** with token transfers data
tokenURI: String # URI for the token NFT's resources
totalSupply: String # Total supply of the NFT token
# transferCount: Int # Count of transfers of token NFT token - being fixed
type: TokenType # Type of NFT - ERC721 or ERC1155
}
```
