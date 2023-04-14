import * as dotenv from "dotenv";
dotenv.config();

import path from "path";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

async function main() {
  const loader = new DirectoryLoader(path.join(__dirname, "./documents"), {
    ".txt": (path) => new TextLoader(path),
  });
  const docs = await loader.load();
  const embeddings = new OpenAIEmbeddings();
  const vectorStore = await HNSWLib.fromDocuments(docs, embeddings);
  const directory = path.join(__dirname, "./vector-store");
  await vectorStore.save(directory);
}

main();
