import Image from "next/image";
import { Inter } from "next/font/google";
import { FormEvent, useState } from "react";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import parseAndRender from "~/utils/parser";
import { query1response, query2response } from "~/utils/sampleJSONOutputs";

const inter = Inter({ subsets: ["latin"] });

const sampleQueries: string[] = [
  "Show all ENS domains by vitalik.eth",
  "What are the largest Ethereum transactions in the past week?",
  "Smart contracts with the highest volume in the last month",
  "Top-performing ERC-20 tokens for trading volume",
  "What are the most popular NFT collections on Ethereum",
];

export default function Home() {
  return (
    <main>
      <HomePage />
    </main>
  );
}

interface DisplaySampleQueriesProps {
  setUserQuery: (query: string) => void;
  queries: string[];
}

function DisplaySampleQueries({
  queries,
  setUserQuery,
}: DisplaySampleQueriesProps) {
  return (
    <div className="mt-16 flex flex-col gap-4">
      {queries.map((query) => (
        <div className="w-full" key={query}>
          <button
            className="mx-auto w-full text-center text-xl text-gray-500 hover:underline hover:underline-offset-2"
            onClick={() => setUserQuery(query)}
          >
            {query}
          </button>
        </div>
      ))}
    </div>
  );
}

function HomePage() {
  const [userQuery, setUserQuery] = useState<string>("");
  const [queryOutput, setQueryOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/api/query", {
        query: userQuery,
      });
      setQueryOutput(res.data);
    } catch (e: any) {
      if (e.code === "ERR_BAD_REQUEST")
        window.alert("Please try a different query.");
      else window.alert("Error: An unexpected error occurred");
    }
    setIsLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 to-slate-950 sm:py-12">
      <div className="mx-auto p-12 pt-48">
        <p className="text-center text-6xl font-bold text-white">
          ChatGPT for blockchain.
        </p>
      </div>
      <form className="mx-auto w-full max-w-5xl" onSubmit={onSubmit}>
        <div className="flex h-14 items-center rounded-lg border-2 border-solid border-white bg-gray-800 py-2">
          <input
            className="mr-3 w-full appearance-none bg-transparent py-1 pl-4 pr-2 text-xl leading-tight text-gray-300 focus:outline-none"
            type="text"
            placeholder="Enter your question"
            aria-label="Search query"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
          />
          <button type="submit" className="p-4">
            {isLoading ? (
              <FaSpinner className="h-8 w-8 animate-spin" />
            ) : (
              <IoPaperPlaneOutline className="h-8 w-8 text-gray-500" />
            )}
          </button>
        </div>
      </form>
      <div className="flex flex-col items-center pt-12">
        {queryOutput === "" ? (
          <div className="mt-auto">
            <DisplaySampleQueries
              queries={sampleQueries}
              setUserQuery={setUserQuery}
            />
          </div>
        ) : (
          queryOutput !== "" && parseAndRender(queryOutput)
        )}
      </div>
    </main>
  );
}
