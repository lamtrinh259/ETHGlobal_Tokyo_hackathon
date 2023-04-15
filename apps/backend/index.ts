import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { request } from "graphql-request";
import { getAgent } from "./lib";
import { AgentExecutor } from "langchain/agents";

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
      input:
        "Only return the GraphQL query to my following question, do not include additional text: " +
        question,
    });
    console.log("Human query is", question);
    console.log({ gptRes, steps: gptRes.intermediateSteps });
    const graphQLQuery = gptRes.output.replace("\n", "");
    if (graphQLQuery.includes("I don't know."))
      return res.status(400).json({ e: "Try another query." });
    console.log(graphQLQuery);
    const graphqlRes = await gqlRequest(
      gptRes.intermediateSteps[gptRes.intermediateSteps.length - 1].action.tool,
      graphQLQuery
    );
    console.log("Result is", graphqlRes);
    return res.status(200).json({ result: graphqlRes });
  } catch (e: any) {
    const gptRes2 = await agent.call({
      input: `This is the error I got previously from using the GraphQL query produceed by you: ${e.message},
    regenerate a new GraphQL query to my following question, keeping in mind the error message I have sent, and do not include additional text: ${req.body.query} `,
    });
    const graphQLQuery2 = gptRes2.output.replace("\n", "");
    const graphqlRes2 = await gqlRequest(
      gptRes2.intermediateSteps[gptRes2.intermediateSteps.length - 1].action
        .tool,
      graphQLQuery2
    );
    return res.status(200).json({ result: graphqlRes2 });
  }
});

app.listen(PORT, async () => {
  agent = await getAgent();
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
