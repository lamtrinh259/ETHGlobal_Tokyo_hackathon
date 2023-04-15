import { useMemo, useState } from "react";
import { ICollectionStat } from "~/utils/interfaces";
import { useTable } from "react-table";
import CollectionStatsChart from "./CollectionStatsChart";

export function CollectionStats({
  collectionStats,
}: {
  collectionStats: ICollectionStat[];
}) {
  const [view, setView] = useState<"table" | "chart">("chart");

  const columns = useMemo(
    () => [
      // {
      //   Header: "Id",
      //   accessor: "id",
      // },
      // {
      //   Header: "Token Address",
      //   accessor: "tokenAddress",
      // },
      {
        Header: "First Transaction Block Timestamp",
        accessor: "firstTransactionBlockTimestamp",
        Cell: (props: any) => props.value.slice(0, 10),
      },
      {
        Header: "Last Transaction Block Timestamp",
        accessor: "lastTransactionBlockTimestamp",
        Cell: (props: any) => props.value.slice(0, 10),
      },
      {
        Header: "Total Sales Count",
        accessor: "totalSalesCount",
      },
      {
        Header: "Average Sale Price In USDC",
        accessor: "averageSalePriceInUSDC",
        Cell: (props: any) =>
          props.value.toLocaleString("en-us", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          }),
      },
      // {
      //   Header: "Lowest Sale Price In USDC",
      //   accessor: "lowestSalePriceInUSDC",
      // },
      {
        Header: "Highest Sale Price In USDC",
        accessor: "highestSalePriceInUSDC",
        Cell: (props: any) =>
          props.value.toLocaleString("en-us", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          }),
      },
      {
        Header: "Total Sale Volume In USDC",
        accessor: "totalSaleVolumeInUSDC",
        Cell: (props: any) =>
          props.value.toLocaleString("en-us", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          }),
      },
      // {
      //   Header: "dapp Version",
      //   accessor: "dappVersion",
      // },
      // {
      //   Header: "Blockchain",
      //   accessor: "blockchain",
      // },
      // {
      //   Header: "Lowest Sale Price In Native Token",
      //   accessor: "lowestSalePriceInNativeToken",
      // },
      {
        Header: "Total Sale Volume In Native Token",
        accessor: "totalSaleVolumeInNativeToken",
        Cell: (props: any) =>
          props.value.toLocaleString("en-us", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          }),
      },
      {
        Header: "Average Sale Price In Native Token",
        accessor: "averageSalePriceInNativeToken",
        // accessor: averageSalePriceInNativeToken
        Cell: (props: any) =>
          props.value.toLocaleString("en-us", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          }),
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      collectionStats.sort(
        (a: any, b: any) =>
          new Date(a["firstTransactionBlockTimestamp"]).getTime() -
          new Date(b["firstTransactionBlockTimestamp"]).getTime()
      ),
    []
  );

  return (
    <div className="flex flex-col items-start justify-start gap-4">
      <div className="flex flex-row">
        <button
          className="rounded px-4 py-2 text-white disabled:bg-slate-950"
          disabled={view === "table"}
          onClick={() => setView("table")}
        >
          Table
        </button>
        <button
          className="rounded px-4 py-2 text-white disabled:bg-slate-950"
          disabled={view === "chart"}
          onClick={() => setView("chart")}
        >
          Chart
        </button>
      </div>
      {view === "table" ? (
        <Table columns={columns} data={data} />
      ) : (
        <CollectionStatsChart collectionStats={data} />
      )}
    </div>
  );
}

function Table({ columns, data }: { columns: any; data: any }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <table
      {...getTableProps()}
      className="mx-2 my-2 table-auto px-2 py-2 text-white"
    >
      <thead>
        {headerGroups.map((headerGroup: any, i: number) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers.map((column: any, i: number) => (
              <th {...column.getHeaderProps()} className="text-md" key={i}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any, i: number) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={i}>
              {row.cells.map((cell: any, i: number) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    className="text-center text-sm"
                    key={i}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
