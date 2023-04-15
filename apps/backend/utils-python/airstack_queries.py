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
    all_data = pd.DataFrame()
    # print('The query is', query)
    response = query_transaction(query)
    if response.status_code == 200:
        result = json.loads(response.text)
        # all_data = pd.DataFrame(result['data']['NFTSaleTransactions']['NFTSaleTransaction'])
        # For query 2
        # all_data = pd.DataFrame(result['data']['NFTStats']['NFTStat'])
        all_data = pd.DataFrame(result['data']['TokenBalances']['TokenBalance'])
        # all_data = pd.DataFrame(all_data)
        print('all_data at time 0 is', all_data)
        all_data.to_csv('output/query_1.csv', index=False)
        print('data saved')
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
    return all_data

# Who are the top 10 holders of Bitcoin on Polygon?
# Wrapped BTC on Polygon: 0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6
query_1 = """
query Top10BitcoinHolders {
  TokenBalances(
    input: {filter: {tokenAddress: {_eq: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6"}}, blockchain: polygon, limit: 50, order: {}}
  ) {
    TokenBalance {
      owner {
        addresses
        socials {
          profileName
          userAssociatedAddresses
        }
      }
      amount
      formattedAmount
      blockchain
      lastUpdatedTimestamp
    }
  }
}"""

# query_2 =

if __name__ == "__main__":
    # print(query_transaction(query_1))
    print(fetch_all_transactions(query_1))
