"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";

import {
  searchableColumns,
  filterableColumns,
  fetchTransactionTableColumnDefs,
} from "./transaction-table-column-def";
import { useRouter } from "next/navigation";
import {
  getTransactionByUserId,
  getTransactions,
} from "@/lib/actions/transaction";
import { IOrder, ITransaction } from "@/types/dashboard";

interface OrdersTableProps {
  transactionPromise: ReturnType<typeof getTransactionByUserId>;
}

export function TransactionTable({ transactionPromise }: OrdersTableProps) {
  const router = useRouter();

  ///...{ gpt
  const [transactions, setTransactions] = React.useState<ITransaction[]>([]);
  const [pageCount, setPageCount] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    const fetchOrders = async () => {
      const searchParams = {}; // Define your search parameters here if any
      try {
        const response = await getTransactionByUserId();
        setTransactions(response.data);
        setPageCount(response.pageCount || 0);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const columns = React.useMemo(
    () => fetchTransactionTableColumnDefs(isPending, startTransition, router),
    [isPending, startTransition, router]
  );

  ///...}

  const { dataTable } = useDataTable({
    data: transactions,
    columns,
    pageCount: 10,
    searchableColumns,
    filterableColumns,
  });

  return (
    <div className="space-y-4 overflow-hidden">
      <DataTable
        dataTable={dataTable}
        columns={columns}
        searchableColumns={searchableColumns}
        filterableColumns={filterableColumns}
        //   floatingBarContent={TasksTableFloatingBarContent(dataTable)}
        //   deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
      />
    </div>
  );
}
