import Image from "next/image";
import { Inter } from "next/font/google";
import { FormEvent, useState } from "react";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";

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
  queries: string[];
}

function DisplaySampleQueries({ queries }: DisplaySampleQueriesProps) {
  return (
    <div className="mt-16">
      {queries.map((query) => (
        <div className="w-full" key={query}>
          <button
            className="w-full mx-auto text-center text-gray-400 hover:underline hover:underline-offset-2"
            onClick={(e) => {
              console.log(query);
            }}
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
    <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:flex-col">
      <div className="w-full pt-52 pb-20">
        <div className="w-6/12 mx-auto">
          <p className="text-4xl text-center">ChatGPT for blockchain.</p>
        </div>
      </div>
      <form className="w-full max-w-5xl mx-auto" onSubmit={onSubmit}>
        <div className="flex items-center py-2 border-solid border-2 border-sky-500 rounded-lg">
          <input
            className="h-14 appearance-none bg-transparent w-full text-white mr-3 py-1 pl-4 pr-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter your question"
            aria-label="Search query"
            onChange={(e) => setUserQuery(e.target.value)}
          />
          <button type="submit">
            {isLoading ? (
              <FaSpinner className="h-10 w-10 pr-4" />
            ) : (
              <IoPaperPlaneOutline className="h-10 w-10 pr-4" />
            )}
          </button>
        </div>
      </form>
      <div className="flex flex-col items-center pt-12">
        {queryOutput === "" ? (
          <DisplaySampleQueries queries={sampleQueries} />
        ) : (
          <div className="bg-sky-900 w-full h-64 rounded p-8 overflow-scroll">
            {JSON.stringify(queryOutput)}
          </div>
        )}
      </div>
    </div>
  );
}
