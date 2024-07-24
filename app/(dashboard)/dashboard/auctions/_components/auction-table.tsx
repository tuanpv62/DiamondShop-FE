"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";

import { IAuction } from "@/types/dashboard";
import {
  fetchAutionsTableColumnDefs,
  searchableColumns,
  filterableColumns,
} from "./auction-table-column-def";
import { getTableAuctions } from "@/lib/actions/auction";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import { useSession } from "next-auth/react";

interface AutionsTableProps {
  auctionPromise: ReturnType<typeof getTableAuctions>;
}

export function AuctionTable({ auctionPromise }: AutionsTableProps) {
  const { data, pageCount } = React.use(auctionPromise);
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const { onOpen } = useModal();
  // console.log(data)
  const { data: session } = useSession();

  const isAdmin =
    session?.user.roleName?.toUpperCase() === "ADMIN" ||
    session?.user.roleName?.toUpperCase() === "MANAGER";

    const evaluateAuction: IAuction[] = data.filter((item) => Number(item.status) === 1 )
  

  const columns = React.useMemo<ColumnDef<IAuction, unknown>[]>(
    () =>
      fetchAutionsTableColumnDefs(
        isPending,
        startTransition,
        router,
        onOpen,
        isAdmin
      ),
    [isPending, router, onOpen]
  );

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount,
    searchableColumns,
    filterableColumns,
  });
  const { dataTable: dataTable2 } = useDataTable({
    data: evaluateAuction,
    columns,
    pageCount,
    searchableColumns,
    filterableColumns,
  });

  return (
    <div className="space-y-4 overflow-hidden">
      {isAdmin ? (
        <DataTable
          dataTable={dataTable}
          columns={columns}
          searchableColumns={searchableColumns}
          filterableColumns={filterableColumns}
          //   floatingBarContent={TasksTableFloatingBarContent(dataTable)}
          //   deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
        />
      ) : (
        <DataTable
          dataTable={dataTable2}
          columns={columns}
          searchableColumns={searchableColumns}
          filterableColumns={filterableColumns}
          //   floatingBarContent={TasksTableFloatingBarContent(dataTable)}
          //   deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
        />
      )}
    </div>
  );
}
