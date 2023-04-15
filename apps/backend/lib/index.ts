import * as dotenv from "dotenv";
dotenv.config();

import path from "path";
import { initializeAgentExecutor } from "langchain/agents";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatVectorDBQAChain, VectorDBQAChain } from "langchain/chains";
import { ChainTool } from "langchain/tools";

export async function getChain() {
  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY!,
    temperature: 0,
  });
  const directory = path.join(__dirname, "../vector-store");
  const vectorStore = await HNSWLib.load(directory, new OpenAIEmbeddings());
  const chain = ChatVectorDBQAChain.fromLLM(model, vectorStore);
  return chain;
}

export async function getAirstackTool() {
  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY!,
    temperature: 0.1,
  });
  const vectorStore = await HNSWLib.load(
    path.join(__dirname, `../vector-store/airstack`),
    new OpenAIEmbeddings()
  );
  const chain = VectorDBQAChain.fromLLM(model, vectorStore);
  const airstackTool = new ChainTool({
    name: "Airstack GraphQL",
    description:
      "This is a tool for generating GraphQL queries for Airstack. Userful for generating queries for getting tokens, token balances, and NFTs for a provided address. Please use the user query directly as input.",
    chain,
  });
  return airstackTool;
}

export async function getLensProtocolTool() {
  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY!,
    temperature: 0.25,
  });
  const vectorStore = await HNSWLib.load(
    path.join(__dirname, `../vector-store/lens-protocol`),
    new OpenAIEmbeddings()
  );
  const chain = VectorDBQAChain.fromLLM(model, vectorStore);
  const lensProtocolTool = new ChainTool({
    name: "Lens Protocol GraphQL",
    description:
      "This is a tool for generating GraphQL queries for Lens Protocol. Useful for generating queries for getting profiles, publications of provided lens handles. Please use the user query directly as input",
    chain,
  });
  return lensProtocolTool;
}

export async function getAgent() {
  const lensProtocolTool = await getLensProtocolTool();
  const airstackTool = await getAirstackTool();
  const tools = [airstackTool, lensProtocolTool];
  const executorModel = new OpenAI({ temperature: 0 });
  const executor = await initializeAgentExecutor(
    tools,
    executorModel,
    "zero-shot-react-description"
  );
  return executor;
}
