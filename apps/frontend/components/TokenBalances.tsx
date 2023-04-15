import { ITokenBalance } from "~/utils/interfaces";

export default function TokenBalances({
  tokenBalances,
}: {
  tokenBalances: ITokenBalance[];
}) {
  const owner: string = tokenBalances[0].owner.primaryDomain.name;

  return (
    <div className="bg-slate-900/60">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Owner: {owner}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-9">
          {generateImageCards(getImageUrls(tokenBalances))}
        </div>
      </div>
    </div>
  );
}

function getImageUrls(tokenBalances: ITokenBalance[]) {
  const urls: string[] = [];

  tokenBalances.forEach((tokenBalance) => {
    if (tokenBalance.tokenNfts.contentValue.image !== null)
      urls.push(tokenBalance.tokenNfts.contentValue.image.original);
  });

  return urls;
}

function generateImageCards(urls: string[]) {
  return urls.map((url) => {
    return (
      <div className="group relative">
        <div className="min-h-80 aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
          <img
            src={url}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            loading="lazy"
          />
        </div>
      </div>
    );
  });
}
