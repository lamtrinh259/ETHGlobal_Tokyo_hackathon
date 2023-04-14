import path from "path";
import { OpenAI } from "langchain/llms/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatVectorDBQAChain } from "langchain/chains";

export default async function getChain() {
  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY!,
    temperature: 0,
  });
  const directory = path.join(__dirname, "../vector-store");
  const vectorStore = await HNSWLib.load(directory, new OpenAIEmbeddings());
  const chain = ChatVectorDBQAChain.fromLLM(model, vectorStore);
  return chain;
}
