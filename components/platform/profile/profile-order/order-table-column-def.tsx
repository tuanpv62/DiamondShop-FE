"use client";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { MdOutlinePending } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import { BiSolidBank } from "react-icons/bi";
import { FaWallet } from "react-icons/fa";
import { IOrder } from "@/types/dashboard";
import {
  deleteAuction,
  setCommingAuction,
  setPaymentOrder,
} from "@/lib/actions";
import { Eye } from "lucide-react";

export function fetchOrderTableColumnDefs(
  isPending: boolean,
  startTransition: React.TransitionStartFunction,
  router: AppRouterInstance
): ColumnDef<IOrder, unknown>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
          className="translate-y-[2px] dark:text-white"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
          className="translate-y-[2px] dark:text-white"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "orderId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="OrderId" />
      ),
      cell: ({ row }) => (
        <div className="w-[80px]">{row.getValue("orderId")}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("phone")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "auctionName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="auctionName" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("auctionName")}
            </span>
          </div>
        );
      },
    },
    // {
    //   accessorKey: "auctionCode",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Auction Code" />
    //   ),
    //   cell: ({ row }) => {
    //     const auctionCode = row.getValue("auctionCode");
    //     return (
    //       <div className="flex space-x-2">
    //         <span className="max-w-[500px] truncate font-medium">
    //           {auctionCode !== null ? String(auctionCode) : "null"}
    //         </span>
    //       </div>
    //     );
    //   },
    // },
    {
      accessorKey: "total",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Price" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("total")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="quantity" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("quantity")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "paymentMethod",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="paymentMethod" />
      ),
      cell: ({ row }) => {
        const paymentMethod = row.original.paymentMethod;

        let paymentMethodText;
        let paymentMethodIcon;
        let paymentMethodColor;
        if (paymentMethod === "BANK") {
          paymentMethodText = "BANK";
          paymentMethodIcon = (
            <BiSolidBank
              className="mr-2 size-6 text-muted-foreground text-yellow-500 font-bold"
              aria-hidden="true"
            />
          );
          paymentMethodColor = "text-yellow-500";
        } else {
          paymentMethodText = "CARD";
          paymentMethodColor = "text-green-500";
          paymentMethodIcon = (
            <FaWallet
              className="mr-2 size-6 text-muted-foreground text-green-500 font-bold"
              aria-hidden="true"
            />
          );
        }

        return (
          <div className="flex items-center  w-full h-14 rounded-md px-2">
            <span>{paymentMethodIcon}</span>
            <span className={`capitalize ${paymentMethodColor}`}>
              {paymentMethodText}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value instanceof Array && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.original.status;

        let statusText;
        let statusIcon;
        let statusColor;
        if (status === 0) {
          statusText = "Chờ thanh toán";
          statusIcon = (
            <MdOutlinePending
              className="mr-2 size-6 text-muted-foreground text-yellow-500 font-bold"
              aria-hidden="true"
            />
          );
          statusColor = "text-yellow-500";
        } else if (status === 1) {
          statusText = "Đã thanh toán";
          statusColor = "text-green-500";
          statusIcon = (
            <FaRegCircleCheck
              className="mr-2 size-6 text-muted-foreground text-green-500 font-bold"
              aria-hidden="true"
            />
          );
        } else if (status === 2) {
          statusText = "Hết hạn";
          statusIcon = (
            <FcCancel
              className="mr-2 size-6 text-muted-foreground text-red-500 font-bold"
              aria-hidden="true"
            />
          );
          statusColor = "text-red-500";
        } else {
          statusText = status;
          statusIcon = (
            <FcCancel
              className="mr-2 size-6 text-muted-foreground"
              aria-hidden="true"
            />
          );
          statusColor = "";
        }

        return (
          <div className="flex items-center w-full h-14 rounded-md px-2">
            <span>{statusIcon}</span>
            <span className={`capitalize ${statusColor}`}>{statusText}</span>
          </div>
        );
      },
      filterFn: (row, OrderId, value) => {
        return value instanceof Array && value.includes(row.getValue(OrderId));
      },
    },

    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Open menu"
              variant="ghost"
              className="flex size-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsHorizontalIcon className="size-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            {Number(row.original.status) === 0 && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Trạng thái</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => {
                      startTransition(() => {
                        row.toggleSelected(false);
                        toast.promise(
                          setPaymentOrder({
                            id: row.original.orderId,
                          }),
                          {
                            loading: "Update...",
                            success: () => "Payment successfully.",
                            error: () => "Payment error",
                          }
                        );
                      });
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    xác nhận thanh toán
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                startTransition(() => {
                  row.toggleSelected(false);
                  toast.promise(
                    deleteAuction(row.original.orderId.toString()),
                    {
                      loading: "Deleting...",
                      success: () => "Auction deleted successfully.",
                      // error: (err: unknown) => catchError(err),
                      error: () => "Dellete error",
                    }
                  );
                });
              }}
            >
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}

export const filterableColumns: DataTableFilterableColumn<IOrder>[] = [
  {
    id: "status",
    title: "status",
    options: ["PENDING", "CONFIRMED", "FAILED"].map((status) => ({
      label: status[0]?.toUpperCase() + status.slice(1),
      value: status,
    })),
  },
  {
    id: "paymentMethod",
    title: "paymentMethod",
    options: ["BANK", "CARD"].map((status) => ({
      label: status[0]?.toUpperCase() + status.slice(1),
      value: status,
    })),
  },
];

export const searchableColumns: DataTableSearchableColumn<IOrder>[] = [
  {
    id: "auctionName",
    title: "auctionName",
  },
];
