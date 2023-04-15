import requests
import json
from dotenv import load_dotenv
import pandas as pd
import os

load_dotenv()

url = "https://api.airstack.xyz/gpl"

headers = {
  "x-api-key": os.environ.get("AIRSTACK_API_KEY"),
  "Content-Type": "application/json"
}

def query_transaction(query, cursor=None):
    print('cursor is \n', cursor)
    if cursor is not None:
        # Tricky syntax here, make sure that the space and wordings are matching with the query
        query = query.replace('limit: 50', f'limit: 50, cursor:"{cursor}"')
    # print('The query is', query)
    response = requests.post(url, data=json.dumps({"query": query}), headers=headers)
    # print('Response status is', response.status_code)
    # print(response.text)
    result = response.json()
    # data = result['data']['NFTSaleTransactions']['NFTSaleTransaction']
    return response

def fetch_all_transactions(query):
    n_max_pages = 50
    n_page = 0
    # all_data = pd.DataFrame()
    # print('The query is', query)
    response = query_transaction(query)
    if response.status_code == 200:
        result = json.loads(response.text)
        # print(result)
        # For query 1
        # print('result[data][TokenBalances] is', type(result['data']['TokenBalances']['TokenBalance']))
        # list_data_1 = result['data']['TokenBalances']['TokenBalance']
        # for item in list_data_1:
        #     print(item.keys())
        #     print(item.values())
        # print(len(result['data']['TokenBalances']['TokenBalance']))
        # This is a list of dictionaries
        all_data_1 = pd.DataFrame(result['data']['TokenBalances']['TokenBalance'], columns=['tokenNfts', 'owner'])
        all_data_1.to_csv('output/demo_query_1.csv', index=False)
        print('data saved for demo query 1')

        # For query 2
        # print(result)
        # print(type(result['data']['CollectionStats']['CollectionStat'])) # a list
        # list_data_2 = result['data']['CollectionStats']['CollectionStat']
        # for item in list_data_2:
        #     print(item.keys())
        #     print(item.values())
        # print(result['data']['CollectionStats']['CollectionStat'][0].keys())
        # all_data_2 = pd.DataFrame(result['data']['CollectionStats']['CollectionStat'], columns=result['data']['CollectionStats']['CollectionStat'][0].keys())
        # all_data_2.to_csv('output/demo_query_2.csv', index=False)
        # print('data saved for demo query 2')
        # Loop will break when there's no more nextCursor or when the number of pages exceeds n_max_pages
        # while result['data']['NFTStats']['pageInfo']['nextCursor'] is not None and n_page < n_max_pages:
        #     n_page += 1
        #     print('The page number is', n_page)
        #     cursor = result['data']['NFTStats']['pageInfo']['nextCursor']
        #     # print('The cursor is', cursor)
        #     response = query_transaction(query, cursor)
        #     if response.status_code == 200:
        #         result = json.loads(response.text)
        #         new_data = pd.DataFrame(result['data']['NFTStats']['NFTStat'])
        #         all_data = pd.concat([all_data, new_data])
    else:
        print("Error:", response.status_code)
    # return all_data
    return None

# Show me the NFT pictures on Ethereum held by paradigm.eth
# paradigm.eth resolved address: 0xD61415F6c5D93027778CEab5F099F64c29F58fd7
query_1 = """
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
"""

# query_2 = Get the monthly stats for The Currency NFT collection. The collection address is 0xaaDc2D4261199ce24A4B0a57370c4FCf43BB60aa.
query_2 = """
{
  CollectionStats(
    input: {filter: {tokenAddress: {_eq: "0xaaDc2D4261199ce24A4B0a57370c4FCf43BB60aa"}, firstTransactionBlockTimestamp: {_lte: "2023-04-15T00:00:00.000Z"}, lastTransactionBlockTimestamp: {_lte: "2023-04-15T00:00:00.000Z"}}, blockchain: ethereum, timeFrame: MONTHLY, limit: 50}
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
"""

if __name__ == "__main__":
    # print(query_transaction(query_1))
    print(fetch_all_transactions(query_1))

    # fetch_all_transactions(query_2)
