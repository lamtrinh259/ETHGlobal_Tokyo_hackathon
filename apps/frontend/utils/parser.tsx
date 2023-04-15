import { CollectionStats } from "~/components/CollectionStats";
import { ICollectionStat, ICollectionStats } from "./interfaces";

export default function parseAndRender(resp: any): any {
  console.log("response in render", resp);
  const type: string = Object.keys(resp)[0];
  console.log("type", type);

  return type === "data" ? (
    parseAndRender(resp["data"])
  ) : type === "CollectionStats" ? (
    renderCollectionStats(resp["CollectionStats"])
  ) : (
    <>{JSON.stringify(resp)}</>
  );
}

function renderCollectionStats(collectionStats: ICollectionStats) {
  console.log("reached collection stats");
  return (
    <div className="mx-auto w-full max-w-5xl overflow-auto rounded-lg border-2 border-solid ">
      <CollectionStats collectionStats={collectionStats["CollectionStat"]} />
      {/* {collectionStats.map((collectionStat) => {
        return <CollectionStat {...collectionStat} />;
      })} */}
    </div>
  );
}
