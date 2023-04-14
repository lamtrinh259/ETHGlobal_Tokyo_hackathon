import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { request } from "graphql-request";
import getChain from "./lib/chain";

const PORT = 3001;
const AIRSTACK_GRAPHQL_URL = "https://api.airstack.xyz/gql";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/query", async (req: express.Request, res: express.Response) => {
  try {
    const chain = await getChain();
    const question = req.body.query;
    const gptRes = await chain.call({
      question,
      chat_history: [],
    });
    const graphQLQuery = gptRes.text.replace("\n", "");
    console.log(graphQLQuery);
    const airstackRes = (await request(
      AIRSTACK_GRAPHQL_URL,
      graphQLQuery,
      {},
      { authorization: process.env.AIRSTACK_API_KEY! }
    )) as any;
    return res.status(200).json({ result: airstackRes });
  } catch (e: any) {
    return res.status(500).json({ e: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
