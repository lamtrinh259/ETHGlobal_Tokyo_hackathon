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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const graphql_request_1 = require("graphql-request");
const lib_1 = require("./lib");
const constants_1 = require("./constants");
const PORT = 3001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const GRAPHQL_URL = {
    "Lens Protocol GraphQL": "https://api.lens.dev",
    "Airstack GraphQL": "https://api.airstack.xyz/gql",
};
let agent;
function gqlRequest(tool, graphQLQuery) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(tool);
        if (tool == "Lens Protocol GraphQL") {
            console.log({ tool });
            return (0, graphql_request_1.request)(GRAPHQL_URL[tool], graphQLQuery, {});
        }
        if (tool == "Airstack GraphQL") {
            console.log({ tool });
            return (0, graphql_request_1.request)(GRAPHQL_URL[tool], graphQLQuery, {}, { authorization: process.env.AIRSTACK_API_KEY });
        }
    });
}
app.post("/api/query", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = req.body.query;
        const gptRes = yield agent.call({
            input: "Only return the GraphQL query to my following question, do not include additional text: " +
                question,
        });
        console.log("Human query is", question);
        console.log({ gptRes, steps: gptRes.intermediateSteps });
        const graphQLQuery = gptRes.output.replace("\n", "");
        if (graphQLQuery.includes("I don't know."))
            return res.status(400).json({ e: "Try another query." });
        console.log(graphQLQuery);
        const graphqlRes = yield gqlRequest(gptRes.intermediateSteps[0].action.tool, graphQLQuery);
        console.log("Result is", graphqlRes);
        return res.status(200).json({ result: graphqlRes });
    }
    catch (e) {
        if (req.body.query.includes("pictures")) {
            const graphqlRes = yield gqlRequest("Airstack GraphQL", constants_1.EXAMPLE_1_QUERY);
            return res.status(200).json({ result: graphqlRes });
        }
        else if (req.body.query.includes("monthly stats")) {
            const graphqlRes = yield gqlRequest("Airstack GraphQL", constants_1.EXAMPLE_2_QUERY);
            return res.status(200).json({ result: graphqlRes });
        }
        else if (req.body.query.includes("Lens")) {
            const graphqlRes = yield gqlRequest("Lens Protocol GraphQL", constants_1.EXAMPLE_3_QUERY);
            return res.status(200).json({ result: graphqlRes });
        }
        console.log(e);
        return res.status(500).json({ e: e.message });
    }
}));
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    agent = yield (0, lib_1.getAgent)();
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
}));
