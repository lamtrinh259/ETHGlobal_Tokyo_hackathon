"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXAMPLE_3_QUERY = exports.EXAMPLE_2_QUERY = exports.EXAMPLE_1_QUERY = void 0;
exports.EXAMPLE_1_QUERY = `
query NFTPicturesHeldByParadigmEth {
  TokenBalances(
    input: {filter: {owner: {_eq: "paradigm.eth"}, tokenType: {_in: [ERC1155, ERC721]}}, blockchain: ethereum, limit: 50}
  ) {
    TokenBalance {
      tokenNfts {
        contentValue {
          image {
            original
          }
        }
      }
      owner {
        primaryDomain {
          name
        }
      }
    }
  }
}
`;
exports.EXAMPLE_2_QUERY = `
query GetMonthlyStats {
  CollectionStats(
    input: {filter: {tokenAddress: {_eq: "0xaaDc2D4261199ce24A4B0a57370c4FCf43BB60aa"}}, blockchain: ethereum, timeFrame: MONTHLY, limit: 50}
  ) {
    CollectionStat {
      id
      tokenAddress
      firstTransactionBlockTimestamp
      lastTransactionBlockTimestamp
      totalSalesCount
      averageSalePriceInUSDC
      lowestSalePriceInUSDC
      highestSalePriceInUSDC
      totalSaleVolumeInUSDC
      dappVersion
      blockchain
      lowestSalePriceInNativeToken
      totalSaleVolumeInNativeToken
      averageSalePriceInNativeToken
    }
  }
}
`;
exports.EXAMPLE_3_QUERY = `
query ExploreProfilesTop10 {
  exploreProfiles(request: { sortCriteria: MOST_FOLLOWERS, limit: 10 }) {
    items {
      id
      name
      handle
      stats{
        totalFollowers
      }
    }
  }
}
`;
