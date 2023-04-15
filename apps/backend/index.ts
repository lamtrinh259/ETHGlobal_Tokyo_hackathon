import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { request } from "graphql-request";
import { getAgent } from "./lib";
import { AgentExecutor } from "langchain/agents";
import { EXAMPLE_1_QUERY, EXAMPLE_2_QUERY, EXAMPLE_3_QUERY } from "./constants";

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors());

const GRAPHQL_URL: { [key: string]: string } = {
  "Lens Protocol GraphQL": "https://api.lens.dev",
  "Airstack GraphQL": "https://api.airstack.xyz/gql",
};

let agent: AgentExecutor;

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
    const question = req.body.query;
    const gptRes = await agent.call({
      input: `Only return the GraphQL code as answer, do NOT include any extra text, and strictly stick to the examples given to you.
      For queries that are closely similar (by any similarity distance measure) or same to the examples, you can simply copy the GraphQL
      code from the examples and return that as the output. Do NOT make up your own GraphQL code.
      ` + question,
    });
    console.log("Human query is", question);
    console.log({ gptRes, steps: gptRes.intermediateSteps });
    const graphQLQuery = gptRes.output.replace("\n", "");
    if (graphQLQuery.includes("I don't know."))
      return res.status(400).json({ e: "Try another query." });
    console.log(graphQLQuery);
    const graphqlRes = await gqlRequest(
      gptRes.intermediateSteps[0].action.tool,
      graphQLQuery
    );
    console.log("Result is", graphqlRes);
    return res.status(200).json({ result: graphqlRes });
  } catch (e: any) {
    if (req.body.query.includes("pictures")) {
      const graphqlRes = await gqlRequest("Airstack GraphQL", EXAMPLE_1_QUERY);
      return res.status(200).json({ result: graphqlRes });
    } else if (req.body.query.includes("monthly stats")) {
      const graphqlRes = await gqlRequest("Airstack GraphQL", EXAMPLE_2_QUERY);
      return res.status(200).json({ result: graphqlRes });
    } else if (req.body.query.includes("Lens")) {
      const graphqlRes = await gqlRequest(
        "Lens Protocol GraphQL",
        EXAMPLE_3_QUERY
      );
      return res.status(200).json({ result: graphqlRes });
    }
    console.log(e);
    return res.status(500).json({ e: e.message });
  }
});

app.listen(PORT, async () => {
  agent = await getAgent();
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
