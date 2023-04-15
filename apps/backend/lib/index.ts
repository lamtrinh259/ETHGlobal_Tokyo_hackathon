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
    temperature: 0,
  });
  const vectorStore = await HNSWLib.load(
    path.join(__dirname, `../vector-store/airstack`),
    new OpenAIEmbeddings()
  );
  const chain = VectorDBQAChain.fromLLM(model, vectorStore);
  const airstackTool = new ChainTool({
    name: "Airstack GraphQL",
    description:
      `You are the expert at Airstack API and how to parse human query into GraphQL language that is conformant to Airstack API schema.
      Your main objective is to generate GraphQL code based on the query of the user. Your output has to be GraphQL because it will be used as input to
      Airstack API endpoint. I have pre-fed into your memory the documents containing the GraphQL schema of Airstack API along with many examples.
      For those examples, if the user asks a question that is almost similar (by any measure of similarity distance) or same as the examples, you can simply copy
      the GraphQL code from the examples and return that as the output. If the user asks a question that is not similar to any of the examples, that is where you
      can use your creativity, but please try to stick to the schema as much as possible.
      `,
    chain,
  });
  return airstackTool;
}

export async function getLensProtocolTool() {
  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY!,
    temperature: 0,
  });
  const vectorStore = await HNSWLib.load(
    path.join(__dirname, `../vector-store/lens-protocol`),
    new OpenAIEmbeddings()
  );
  const chain = VectorDBQAChain.fromLLM(model, vectorStore);
  const lensProtocolTool = new ChainTool({
    name: "Lens Protocol GraphQL",
    description:
      `You are the expert at Lens Protocol API and how to parse human query into GraphQL language that is conformant to Lens Protocol API schema.
      Your main objective is to generate GraphQL code based on the query of the user. Your output has to be GraphQL because it will be used as input to
      Lens Protocol API endpoint. I have pre-fed into your memory the documents containing the examples for certain queries in this format:
      - user query
      - GraphQL output
      For those examples, if the user asks a question that is almost similar (by any measure of similarity distance) or same as the examples, you can simply copy
      the GraphQL code from the examples and return that as the output. If the user asks a question that is not similar to any of the examples, please use your
      creativity to generate GraphQL code that is based off of the closet example in terms of similary distance measure.
      `,
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
    "zero-shot-react-description",
  );
  return executor;
}
