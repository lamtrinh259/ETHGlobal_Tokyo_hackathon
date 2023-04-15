Get all tokens held by wallet address 0x540cb04ebab67e05a620b97bb367ac5e4ed68f09

```GraphQL
query QB5 {
  TokenBalances(input: {filter: { owner: {_eq: "0x540cb04ebab67e05a620b97bb367ac5e4ed68f09"}}, limit: 10, blockchain: ethereum}) {
    TokenBalance {
      amount
      chainId
      id
      lastUpdatedBlock
      lastUpdatedTimestamp
      owner {
        addresses
      }
      tokenAddress
      tokenId
      tokenType
      token {
        name
        symbol
      }
    }
  }
}
```

Get all tokens held by vitalik.eth

```GraphQL
query QB5 {
  TokenBalances(input: {filter: { owner: {_eq: "vitalik.eth"}}, limit: 10, blockchain: ethereum}) {
    TokenBalance {
      amount
      chainId
      id
      lastUpdatedBlock
      lastUpdatedTimestamp
      owner {
        addresses
      }
      tokenAddress
      tokenId
      tokenType
      token {
        name
        symbol
      }
    }
  }
}
```

For this list of ENS addresses, show me all NFTs they own, including images: dwr.eth, vitalik.eth, balajis.eth

```GraphQL
query MyQuery {
  TokenBalances(
    input: {filter: {owner: {_in: ["dwr.eth","vitalik.eth","balajis.eth"]}, tokenType: {_in: [ERC1155, ERC721]}}, blockchain: ethereum}
  ) {
    TokenBalance {
      amount
      tokenId
      tokenAddress
      tokenNfts {
        contentValue {
          image {
            medium
          }
        }
      }
      token {
        name
        symbol
      }
    }
  }
}
```

For this list of Farcaster users, show how many all NFTs they own, including images: dwr, vitalik, balajis

```GraphQL
query MyQuery {
  TokenBalances(
    input: {filter: {owner: {_in: ["fc_fname:v","fc_fname:dwr","fc_fname:balajis"]}, tokenType: {_in: [ERC1155, ERC721]}}, blockchain: ethereum, limit: 50}
  ) {
    TokenBalance {
      tokenAddress
      amount
      tokenType
      owner {
        addresses
        socials {
          profileName
          userAssociatedAddresses
        }
      }
    }
  }
}
```

Get all the token holders and their ENS names for Tether

```GraphQL
query MyQuery {
  TokenBalances(
    input: {blockchain: ethereum, limit: 10, filter: {tokenAddress: {_eq: "0xdac17f958d2ee523a2206206994597c13d831ec7"}}}
  ) {
    TokenBalance {
      amount
      chainId
      owner {
        addresses
        domains {
          id
          name
          owner
        }
      }
    }
  }
}
```

Get all the token holders and their ENS names for Nouns DAO

```GraphQL
{
  TokenBalances(
    input: {filter: {tokenAddress: {_eq: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03"}}, limit: 10, blockchain: ethereum}
  ) {
    TokenBalance {
      owner {
        addresses
        primaryDomain {
          name
        }
        domains {
          name
        }
      }
    }
  }
}
```

For the Ethereum token Matic, show me all token holders and the NFTs they hold

```GraphQL
{
  TokenBalances(
    input: {blockchain: ethereum, filter: {tokenAddress: {_eq: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"}}, limit: 10}
  ) {
    TokenBalance {
      owner {
        identity
        addresses
        tokenBalances {
          tokenNfts {
            tokenId
            contentType
          }
        }
      }
    }
  }
}

```

```

```

```

```
