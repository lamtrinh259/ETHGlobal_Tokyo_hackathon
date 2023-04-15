import { CollectionStats } from "~/components/CollectionStats";
import TokenBalances from "~/components/TokenBalances";
import {
  ICollectionStat,
  ICollectionStats,
  ITokenBalances,
} from "./interfaces";

export default function parseAndRender(resp: any): any {
  console.log("response in render", resp);
  const type: string = Object.keys(resp)[0];
  console.log("type", type);

  return type === "data" ? (
    parseAndRender(resp["data"])
  ) : type === "CollectionStats" ? (
    renderCollectionStats(resp["CollectionStats"])
  ) : type === "TokenBalances" ? (
    renderTokenBalances(resp["TokenBalances"])
  ) : (
    <>{JSON.stringify(resp)}</>
  );
}

function renderCollectionStats(collectionStats: ICollectionStats) {
  console.log("reached collection stats");
  return (
    <div className="mx-auto w-full max-w-5xl overflow-auto rounded-lg bg-slate-900/60 p-8">
      <CollectionStats collectionStats={collectionStats["CollectionStat"]} />
      {/* {collectionStats.map((collectionStat) => {
        return <CollectionStat {...collectionStat} />;
      })} */}
    </div>
  );
}

function renderTokenBalances(tokenBalances: ITokenBalances) {
  console.log("At renderTokenBalances");

  return <TokenBalances tokenBalances={tokenBalances["TokenBalance"]} />;
}
