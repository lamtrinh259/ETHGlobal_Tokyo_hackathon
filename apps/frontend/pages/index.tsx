import Image from "next/image";
import { Inter } from "next/font/google";
import { FormEvent, useState } from "react";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import parseAndRender from "~/utils/parser";
import { query1response, query2response } from "~/utils/sampleJSONOutputs";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSigner } from "wagmi";
import * as PushAPI from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { userView } from "~/utils/atoms";
import { useAtom } from "jotai";
import html2canvas from "html2canvas";

const inter = Inter({ subsets: ["latin"] });

const sampleQueries: string[] = [
  "Show all ENS domains by vitalik.eth.",
  "What are the largest Ethereum transactions in the past week?",
  "Show me the NFT pictures on Ethereum held by paradigm.eth.",
  "Get the monthly stats for The Currency NFT collection. The collection address is 0xaaDc2D4261199ce24A4B0a57370c4FCf43BB60aa.",
  "Find the top 10 Lens Profiles and return their id, name, handle, and the number of totalFollowers, sorted by the number of most followers.",
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

async function sendPushMessage(
  account: string,
  targetAddress: string,
  message: string,
  signer: any,
  isImage: boolean
) {
  const user = await PushAPI.user.get({
    account: `eip155:${account}`,
    env: ENV.PROD,
  });

  if (user === null)
    await PushAPI.user.create({ signer: signer, env: ENV.PROD });

  const pgpPrivKey = await PushAPI.chat.decryptPGPKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    signer: signer,
  });

  if (isImage) {
  } else if (typeof message === "object") {
    message = JSON.stringify(message);
  }
  const fileMessageContent = {
    content: "",
    name: "testimage",
  };
  const element = document.getElementById("chart");
  const canvas = await html2canvas(element!);
  const link = document.createElement("a");
  const dataURL = canvas.toDataURL("image/jpg", 1.0);

  /* to download */
  // link.href = dataURL;
  // link.download = "test-downloaded-image.jpg";
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);
  fileMessageContent.content = dataURL;

  await PushAPI.chat.send({
    messageContent: isImage ? JSON.stringify(fileMessageContent) : message,
    messageType: isImage ? "Image" : "Text",
    receiverAddress: "eip155:" + targetAddress,
    signer: signer,
    pgpPrivateKey: pgpPrivKey,
    env: ENV.PROD,
  });
}

function Modal({
  address,
  message,
  signer,
  view,
}: {
  address: string;
  message: string;
  signer: any;
  view: string;
}) {
  const [showModal, setShowModal] = useState(false);
  const [targetAddress, setTargetAddress] = useState("");
  return (
    <div className="mt-5 flex justify-end">
      <button
        className="mb-1 mr-1 rounded border-2 border-gray-400 bg-slate-800/95 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-pink-600"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Send via Push
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-4/12 max-w-3xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                  <h3 className="text-3xl font-semibold text-black">
                    Send query result
                  </h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  {/* <p className="my-4 text-lg leading-relaxed text-slate-500">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p> */}
                  <p className="inline-block pr-2 text-black">
                    Target Address:{" "}
                  </p>
                  <input
                    type="text"
                    value={targetAddress}
                    onChange={(e) => setTargetAddress(e.target.value)}
                    className="h-16 w-full text-black"
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center rounded-b border-t border-solid border-slate-200 p-6">
                  <button
                    className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                    type="button"
                    onClick={() => {
                      sendPushMessage(
                        address,
                        targetAddress,
                        message,
                        signer,
                        view === "chart"
                      );
                      setShowModal(false);
                    }}
                  >
                    Send message
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </div>
  );
}

function HomePage() {
  const [userQuery, setUserQuery] = useState<string>("");
  const [queryOutput, setQueryOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data: signer } = useSigner();
  const [view, setView] = useAtom(userView);

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
    <div className="flex min-h-screen flex-col bg-gray-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 to-slate-950 sm:py-12">
      <header className="flex justify-between pr-14">
        <img src="./project_icon.png" className="ml-14 h-16 w-16 rounded-lg" />
        <ConnectButton />
      </header>
      <main>
        <div className="mx-auto p-12 pt-48">
          <p className="text-center text-8xl font-bold text-white">
            Octoplorer
          </p>
          <p className="mt-4 text-center text-4xl font-bold text-white">
            Block query made easy.
          </p>
        </div>
        <form className="mx-auto w-full max-w-5xl" onSubmit={onSubmit}>
          <div className="flex h-14 items-center rounded-lg border-2 border-solid border-white bg-gray-800 py-2">
            <input
              className="focus:outline-none` mr-3 w-full appearance-none bg-transparent py-1 pl-4 pr-2 text-xl leading-tight text-gray-300"
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
          {queryOutput !== "" && !isDisconnected && (
            <Modal
              address={address!}
              message={queryOutput}
              signer={signer}
              view={view}
            />
          )}
        </form>
        <div className="flex flex-col items-center pt-6">
          {queryOutput === "" ? (
            <div className="mt-auto">
              <DisplaySampleQueries
                queries={sampleQueries}
                setUserQuery={setUserQuery}
              />
            </div>
          ) : (
            parseAndRender(queryOutput)
          )}
        </div>
      </main>
    </div>
  );
}
