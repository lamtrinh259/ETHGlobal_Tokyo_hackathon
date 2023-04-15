Example: Get all holders of the BAYC NFT Collection, the NFTs they hold, traits, and resized images

```GraphQL
query QB2 {
  TokenNfts(input: {filter: {address: {_eq: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"}}, blockchain: ethereum}) {
    TokenNft {
      address
      chainId
      contentType
      contentValue {
        image {
          extraSmall
          original
          large
        }
      }
      #currentHolderCount - being fixed
      id
      lastTransferBlock
      lastTransferHash
      lastTransferTimestamp
      metaData {
        animationUrl
        attributes {
          trait_type
          value
        }
        backgroundColor
        description
        image
        externalUrl
        imageData
        name
        youtubeUrl
      }
      rawMetaData
      token {
        id
      }
      tokenBalances {
        id
      }
      tokenId
      tokenURI
      totalSupply
      #transferCount - being fixed
      type
    }
    pageInfo {
      nextCursor
      prevCursor
    }
  }
}
```

Example: Get tokens in the BAYC NFT Collection and the traits of each NFT

```GraphQL
query QB4 {
  TokenNfts(input: {filter: { address: {_eq: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"}, metaData: {attributes: {trait_type: {_eq: "Background"}, value: {_eq: "Orange"}}}}, blockchain: ethereum}) {
    TokenNft {
      address
      chainId
      id
      metaData {
        animationUrl
        attributes {
          trait_type
          value
        }
        description
        image
      }
      tokenId
    }
    pageInfo {
      nextCursor
      prevCursor
    }
  }
}
```

Example: Get sales history for the tokens in the BAYC NFT Collection with trait Background Orange

```GraphQL
query QB16 {
  TokenNfts(
    input: {filter: {address: {_eq: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"}, metaData: {attributes: {trait_type: {_eq: "Background"}, value: {_eq: "Orange"}}}}, blockchain: ethereum}
  ) {
    TokenNft {
      address
      tokenId
      token {
        name
        symbol
      }
      nftSaleTransactions {
        dappSlug
        formattedPaymentAmount
        formattedFeeAmountInUSDC
        formattedPaymentAmountInNativeToken
        paymentToken {
          address
          name
          decimals
          symbol
        }
        blockNumber
        blockTimestamp
        nfts {
          tokenId
          tokenType
        }
      }
      metaData {
        attributes {
          trait_type
          value
        }
      }
      contentType
      contentValue {
        image {
          extraSmall
          large
          medium
          original
        }
      }
    }
  }
}
```

Example: Get the token transfer and sales history for the Mutant Ape Yacht Club NFT Collection on Ethereum

```GraphQL
{
  TokenNfts(
    input: {filter: {address: {_eq: "0x60e4d786628fea6478f785a6d7e704777c86a7c6"}}, limit: 10, blockchain: ethereum}
  ) {
    TokenNft {
      tokenId
      tokenTransfers {
        from {
          identity
        }
        to {
          identity
        }
        blockTimestamp
        transactionHash
      }
      nftSaleTransactions {
        from {
          identity
        }
        to {
          identity
        }
        blockTimestamp
        transactionHash
        paymentAmount
        paymentToken {
          symbol
        }
      }
    }
  }
}
```
