import { CollectionStats } from "~/components/CollectionStats";
import ExploreProfiles from "~/components/ExploreProfiles";
import TokenBalances from "~/components/TokenBalances";
import {
  ICollectionStat,
  ICollectionStats,
  IExploreProfiles,
  ITokenBalances,
} from "./interfaces";

export default function parseAndRender(resp: any): any {
  console.log("response in render", resp);
  const type: string = Object.keys(resp)[0];
  console.log("type", type);

  return type === "data" ? (
    parseAndRender(resp["data"])
  ) : type === "result" ? (
    parseAndRender(resp["result"])
  ) : type === "CollectionStats" ? (
    renderCollectionStats(resp["CollectionStats"])
  ) : type === "exploreProfiles" ? (
    renderExploreProfiles(resp["exploreProfiles"])
  ) : type === "TokenBalances" ? (
    renderTokenBalances(resp["TokenBalances"])
  ) : (
    <>{JSON.stringify(resp)}</>
  );
}

function renderCollectionStats(collectionStats: ICollectionStats) {
  console.log("reached collection stats");
  return (
    <div
      id="chart"
      className="mx-auto w-full max-w-5xl overflow-auto rounded-lg bg-slate-900/60 p-8"
    >
      <CollectionStats collectionStats={collectionStats["CollectionStat"]} />
    </div>
  );
}

function renderTokenBalances(tokenBalances: ITokenBalances) {
  console.log("At renderTokenBalances");

  return <TokenBalances tokenBalances={tokenBalances["TokenBalance"]} />;
}

function renderExploreProfiles(exploreProfiles: IExploreProfiles) {
  return (
    <div
      id="chart"
      className="mx-auto w-full max-w-5xl overflow-auto rounded-lg bg-slate-900/60 p-8"
    >
      <ExploreProfiles items={exploreProfiles["items"]} />
    </div>
  );
}
