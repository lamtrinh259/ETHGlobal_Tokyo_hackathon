Get all meta data about the BAYC NFT collection including a summary of the traits distribution

```GraphQL
query QB1 {
  Tokens(input: {filter: {address: {_eq: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"}}, blockchain: ethereum}) {
    Token {
      address
      baseURI
      chainId
      contractMetaDataURI
      decimals
      id
      lastTransferBlock
      lastTransferHash
      lastTransferTimestamp
      name
      rawContractMetaData
      symbol
      tokenBalances {
        owner {
          addresses
        }
        amount
      }
      tokenNfts {
        id
        tokenId
        tokenURI
        metaData {
          name
        }
        contentValue {
          image {
            large
            medium
            original
            small
            extraSmall
          }
        }
      }
      tokenTraits
      totalSupply
      type
    }
    pageInfo {
      nextCursor
      prevCursor
    }
  }
}
```

For the Moonbirds NFT collection, get the holders, the holder’s ENS names, and their Farcaster profile names if they have one

```GraphQL
query Moonbirds_ENS_FC {
  Tokens(
    input: {filter: {address: {_eq: "0x23581767a106ae21c074b2276d25e5c3e136a68b"}}, blockchain: ethereum}
  ) {
    Token {
      address
      baseURI
      chainId
      contractMetaDataURI
      # currentHolderCount - being fixed
      decimals
      id
      symbol
      name
      tokenBalances {
        owner {
          addresses
          identity
          socials {
            profileName
          }
          domains {
            name
          }
        }
      }
    }
    pageInfo {
      nextCursor
      prevCursor
    }
  }
}
```

Get the contract information for the Matic token

```GraphQL
{
  Token(
    input: {address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0", blockchain: ethereum}
  ) {
    name
    symbol
    decimals
    totalSupply
    lastTransferBlock
    lastTransferTimestamp
  }
}
```

Fetch the Ethereum contract address for BAYC

```GraphQL
{
  Tokens(
    input: {filter: {name: {_eq: "Bored Ape Yacht Club"}, type: {_eq: ERC721}}, blockchain: ethereum, limit: 1}
  ) {
    Token {
      address
      name
    }
  }
}
```
