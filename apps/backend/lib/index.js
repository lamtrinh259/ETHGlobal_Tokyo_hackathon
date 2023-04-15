"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgent = exports.getLensProtocolTool = exports.getAirstackTool = exports.getChain = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const path_1 = __importDefault(require("path"));
const agents_1 = require("langchain/agents");
const hnswlib_1 = require("langchain/vectorstores/hnswlib");
const openai_1 = require("langchain/llms/openai");
const openai_2 = require("langchain/embeddings/openai");
const chains_1 = require("langchain/chains");
const tools_1 = require("langchain/tools");
function getChain() {
    return __awaiter(this, void 0, void 0, function* () {
        const model = new openai_1.OpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            temperature: 0,
        });
        const directory = path_1.default.join(__dirname, "../vector-store");
        const vectorStore = yield hnswlib_1.HNSWLib.load(directory, new openai_2.OpenAIEmbeddings());
        const chain = chains_1.ChatVectorDBQAChain.fromLLM(model, vectorStore);
        return chain;
    });
}
exports.getChain = getChain;
function getAirstackTool() {
    return __awaiter(this, void 0, void 0, function* () {
        const model = new openai_1.OpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            temperature: 0,
        });
        const vectorStore = yield hnswlib_1.HNSWLib.load(path_1.default.join(__dirname, `../vector-store/airstack`), new openai_2.OpenAIEmbeddings());
        const chain = chains_1.VectorDBQAChain.fromLLM(model, vectorStore);
        const airstackTool = new tools_1.ChainTool({
            name: "Airstack GraphQL",
            description: `You are the expert at Airstack API and how to parse human query into GraphQL language that is conformant to Airstack API schema.
      Your main objective is to generate GraphQL code based on the query of the user. Your output has to be GraphQL because it will be used as input to
      Airstack API endpoint. I have pre-fed into your memory the documents containing the GraphQL schema of Airstack API along with many examples.
      For those examples, if the user asks a question that is almost similar (by any measure of similarity distance) or same as the examples, you can simply copy
      the GraphQL code from the examples and return that as the output. If the user asks a question that is not similar to any of the examples, that is where you
      can use your creativity, but please try to stick to the schema as much as possible.
      `,
            chain,
        });
        return airstackTool;
    });
}
exports.getAirstackTool = getAirstackTool;
function getLensProtocolTool() {
    return __awaiter(this, void 0, void 0, function* () {
        const model = new openai_1.OpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            temperature: 0,
        });
        const vectorStore = yield hnswlib_1.HNSWLib.load(path_1.default.join(__dirname, `../vector-store/lens-protocol`), new openai_2.OpenAIEmbeddings());
        const chain = chains_1.VectorDBQAChain.fromLLM(model, vectorStore);
        const lensProtocolTool = new tools_1.ChainTool({
            name: "Lens Protocol GraphQL",
            description: `You are the expert at Lens Protocol API and how to parse human query into GraphQL language that is conformant to Lens Protocol API schema.
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
    });
}
exports.getLensProtocolTool = getLensProtocolTool;
function getAgent() {
    return __awaiter(this, void 0, void 0, function* () {
        const lensProtocolTool = yield getLensProtocolTool();
        const airstackTool = yield getAirstackTool();
        const tools = [airstackTool, lensProtocolTool];
        const executorModel = new openai_1.OpenAI({ temperature: 0 });
        const executor = yield (0, agents_1.initializeAgentExecutor)(tools, executorModel, "zero-shot-react-description");
        return executor;
    });
}
exports.getAgent = getAgent;
