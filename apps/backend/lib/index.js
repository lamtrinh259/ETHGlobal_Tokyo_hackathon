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
            temperature: 0.1,
        });
        const vectorStore = yield hnswlib_1.HNSWLib.load(path_1.default.join(__dirname, `../vector-store/airstack`), new openai_2.OpenAIEmbeddings());
        const chain = chains_1.VectorDBQAChain.fromLLM(model, vectorStore);
        const airstackTool = new tools_1.ChainTool({
            name: "Airstack GraphQL",
            description: "This is a tool for generating GraphQL queries for Airstack. Userful for generating queries for getting tokens, token balances, and NFTs for a provided address. Please use the user query directly as input.",
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
            temperature: 0.25,
        });
        const vectorStore = yield hnswlib_1.HNSWLib.load(path_1.default.join(__dirname, `../vector-store/lens-protocol`), new openai_2.OpenAIEmbeddings());
        const chain = chains_1.VectorDBQAChain.fromLLM(model, vectorStore);
        const lensProtocolTool = new tools_1.ChainTool({
            name: "Lens Protocol GraphQL",
            description: "This is a tool for generating GraphQL queries for Lens Protocol. Useful for generating queries for getting profiles, publications of provided lens handles. Please use the user query directly as input",
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
