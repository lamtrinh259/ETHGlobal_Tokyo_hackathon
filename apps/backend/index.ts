import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { request } from "graphql-request";
import { getAgent } from "./lib";

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors());

const GRAPHQL_URL: { [key: string]: string } = {
  "Lens Protocol GraphQL": "https://api.lens.dev",
  "Airstack GraphQL": "https://api.airstack.xyz/gql",
};

async function gqlRequest(tool: string, graphQLQuery: string): Promise<any> {
  console.log(tool);
  if (tool == "Lens Protocol GraphQL") {
    console.log({ tool });
    return request(GRAPHQL_URL[tool], graphQLQuery, {});
  }
  if (tool == "Airstack GraphQL") {
    console.log({ tool });
    return request(
      GRAPHQL_URL[tool],
      graphQLQuery,
      {},
      { authorization: process.env.AIRSTACK_API_KEY! }
    );
  }
}

app.post("/api/query", async (req: express.Request, res: express.Response) => {
  try {
    const agent = await getAgent();
    const question = req.body.query;
    const gptRes = await agent.call({
      input: question + " Only return the GraphQL query.",
    });
    console.log({ gptRes, steps: gptRes.intermediateSteps });
    const graphQLQuery = gptRes.output.replace("\n", "");
    if (graphQLQuery.includes("I don't know."))
      return res.status(400).json({ e: "Try another query." });
    console.log(graphQLQuery);
    const graphqlRes = await gqlRequest(
      gptRes.intermediateSteps[0].action.tool,
      graphQLQuery
    );
    return res.status(200).json({ result: graphqlRes });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({ e: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
