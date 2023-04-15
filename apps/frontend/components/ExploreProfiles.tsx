import { useMemo, useState } from "react";
import { useTable } from "react-table";
import { userView } from "~/utils/atoms";
import { IItems } from "~/utils/interfaces";
import ExploreProfilesChart from "./ExploreProfilesChart";
import { useAtom } from "jotai";

export default function ExploreProfiles({ items }: { items: IItems[] }) {
  // const [view, setView] = useAtom<"table" | "chart">(userView);
  const [view, setView] = useAtom(userView);

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Handle",
        accessor: "handle",
      },
      {
        Header: "Statistics",
        columns: [
          {
            Header: "Total Followers",
            accessor: (row: any, _: any) => row["stats"]["totalFollowers"],
          },
        ],
      },
    ],
    []
  );

  const data = useMemo(() => items, []);

  return (
    <div className="flex flex-col items-start justify-start gap-4">
      <div className="flex flex-row">
        <button
          className="rounded px-4 py-2 disabled:bg-slate-950"
          disabled={view === "table"}
          onClick={() => setView("table")}
        >
          Table
        </button>
        <button
          className="rounded px-4 py-2 disabled:bg-slate-950"
          disabled={view === "chart"}
          onClick={() => setView("chart")}
        >
          Chart
        </button>
      </div>
      {view === "table" ? (
        <Table columns={columns} data={data} />
      ) : (
        <ExploreProfilesChart items={data} />
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
      className="mx-2 my-2 w-full table-auto px-2 py-2 text-white"
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
