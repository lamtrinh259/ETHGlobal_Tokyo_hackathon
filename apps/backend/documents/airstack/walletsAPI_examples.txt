For ENS dwr.eth, get Farcaster name, Farcaster account details, connected address, and all token balances and images

```GraphQL
query identity {
  Wallet(input: {identity: "dwr.eth"}) {
    socials {
      dappName
      profileName
      profileCreatedAtBlockTimestamp
      userAssociatedAddresses
    }
    tokenBalances {
      tokenAddress
      amount
      tokenId
      tokenType
      tokenNfts {
        contentValue {
          image {
            original
          }
        }
        token {
          name
        }
      }
    }
  }
}
```
