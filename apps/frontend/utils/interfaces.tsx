export interface ICollectionStat {
  id: string;
  tokenAddress: string;
  firstTransactionBlockTimestamp: string;
  lastTransactionBlockTimestamp: string;
  totalSalesCount: number;
  averageSalePriceInUSDC: number;
  lowestSalePriceInUSDC: number;
  highestSalePriceInUSDC: number;
  totalSaleVolumeInUSDC: number;
  dappVersion: string;
  blockchain: string;
  lowestSalePriceInNativeToken: number;
  totalSaleVolumeInNativeToken: number;
  averageSalePriceInNativeToken: number;
}

export interface ICollectionStats {
  CollectionStat: ICollectionStat[];
}

export interface IData {
  [key: string]: any[];
}
