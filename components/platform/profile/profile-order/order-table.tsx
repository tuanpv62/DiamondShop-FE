"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";

import {
  searchableColumns,
  filterableColumns,
  fetchOrderTableColumnDefs,
} from "./order-table-column-def";
import { useRouter } from "next/navigation";
import { IOrder } from "@/types/dashboard";
import { getOrders, getOrdersByUserId } from "@/lib/actions";

interface OrdersTableProps {
  orderPromise: ReturnType<typeof getOrders>;
}

export function OrderTable({ orderPromise }: OrdersTableProps) {
  // const { data, pageCount } = React.use(orderPromise);
  // const [isPending, startTransition] = React.useTransition();
  // console.log(data)
  const router = useRouter();
  // const columns = React.useMemo<ColumnDef<IOrder, unknown>[]>(
  //   () => fetchOrderTableColumnDefs(isPending, startTransition, router),
  //   [isPending, router]
  // );

  ///...{ gpt
  const [orders, setOrders] = React.useState<IOrder[]>([]);
  const [pageCount, setPageCount] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    const fetchOrders = async () => {
      const searchParams = {}; // Define your search parameters here if any
      try {
        const response = await getOrders(searchParams);
        setOrders(response.data);
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
    () => fetchOrderTableColumnDefs(isPending, startTransition, router),
    [isPending, startTransition, router]
  );

  ///...}

  const { dataTable } = useDataTable({
    data: orders,
    columns,
    pageCount,
    searchableColumns,
    filterableColumns,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DataTable
      dataTable={dataTable}
      columns={columns}
      searchableColumns={searchableColumns}
      filterableColumns={filterableColumns}
      //   floatingBarContent={TasksTableFloatingBarContent(dataTable)}
      //   deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
    />
  );
}
