import { atom } from "jotai";

export const chartData = atom({});
export const userView = atom<"table" | "chart">("chart");
// export const collectionStatsData = atom({});
