Get the token transfer history of the Mutant Apes NFT Collection on Ethereum
query MyQuery {
  TokenTransfers(
    input: {filter: {tokenAddress: {_eq: "0x60e4d786628fea6478f785a6d7e704777c86a7c6"}}, blockchain: ethereum}
  ) {
    TokenTransfer {
      amount
      amounts
      blockNumber
      blockTimestamp
      blockchain
      chainId
      from {
        addresses
      }
      to {
        addresses
      }
      tokenType
    }
  }
}
