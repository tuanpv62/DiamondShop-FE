"use client";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types/table";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { IAuction } from "@/types/dashboard";

// icon
import { BsGenderMale } from "react-icons/bs";
import { MdOutlinePending, MdCloseFullscreen } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RiLiveFill } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";

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
import {
  deleteAuction,
  setApproveAuction,
  updateReEvaluate,
  updateStatusAcceptAuction,
  updateStatusAuction,
  updateStatusRejectAuction,
} from "@/lib/actions/auction";
import { Edit, Eye } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { formatDate } from "@/lib/format-fucntion/format-dns";
import { isStatusDisabled } from "@/lib/format-fucntion/disable-status";
import { ModalData, ModalType } from "@/hooks/use-modal";
import { auctionSchema } from "@/lib/schemas";

export function fetchAutionsTableColumnDefs(
  isPending: boolean,
  startTransition: React.TransitionStartFunction,
  router: AppRouterInstance,
  onOpen: (type: ModalType, data: ModalData) => void
): ColumnDef<IAuction, unknown>[] {
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
      accessorKey: "auctionId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Auction ID" />
      ),
      cell: ({ row }) => (
        <div className="w-[80px]">{row.getValue("auctionId")}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("title") ? row.getValue("title") : "Chưa có"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "productCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("productCode")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "productName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("productName")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Quantity" />
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
      accessorKey: "startPrice",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="startPrice" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("startPrice")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "depositPrice",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="depositPrice" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("depositPrice")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="startDate" />
      ),
      cell: ({ row }) => {
        const startDateString: string = row.getValue("startDate");
        const formattedStartDate = formatDate(startDateString);

        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {formattedStartDate}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "endDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="endDate" />
      ),
      cell: ({ row }) => {
        const endDateString: string = row.getValue("endDate");
        const formattedEndDate = formatDate(endDateString);
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {formattedEndDate}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = Number(row.original.status);
        if (!status) {
          return null;
        }

        return (
          <div className="flex items-center">
            {status === 5 ? (
              <AiOutlineClockCircle
                className="mr-2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
            ) : status === 6 ? (
              <RiLiveFill
                className="mr-2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
            ) : status === 7 ? (
              <MdCloseFullscreen
                className="mr-2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
            ) : (
              <MdOutlinePending
                className="mr-2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
            )}
            <span className="capitalize">
              {status === 0
                ? "PENDING"
                : status === 1
                ? "EVALUATE"
                : status === 2
                ? "WAITING"
                : status === 3
                ? "CONFIRM"
                : status === 4
                ? "APPROVE"
                : status === 5
                ? "COMING"
                : status === 6
                ? "BIDDING"
                : status === 7
                ? "END"
                : "UNKNOWN"}
            </span>
          </div>
        );
      },
      filterFn: (row, auctionId, value) => {
        return (
          value instanceof Array && value.includes(row.getValue(auctionId))
        );
      },
    },
    // {
    //   accessorKey: "status",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Duyệt bài" />
    //   ),
    //   cell: ({ row }) => {
    //     const status = row.original.status;

    //     const isApprove = !!row.original.approved;
    //     const isReject = !!row.original.rejected;

    //     // nếu status = WAITING và isApprove = false và isReject = false  => Trạng thái Chờ duyệt bài
    //     // nếu status = COMING và isApprove = true và is sReject = false  =>   Đã được duyệt
    //     // nếu status = END và is isApprove = false và is sReject = true  => Ko dc duyệt

    //     let statusText;
    //     let statusIcon;
    //     let statusColor;
    //     if (status === "WAITING" && !isApprove && !isReject) {
    //       statusText = "PENDING";
    //       statusIcon = (
    //         <MdOutlinePending
    //           className="mr-2 size-6 text-muted-foreground text-yellow-500 font-bold"
    //           aria-hidden="true"
    //         />
    //       );
    //       statusColor = "text-yellow-500";
    //     } else if (status !== "WAITING" && isApprove && !isReject) {
    //       statusText = "APPROVE";
    //       statusColor = "text-green-500";
    //       statusIcon = (
    //         <FaRegCircleCheck
    //           className="mr-2 size-6 text-muted-foreground text-green-500 font-bold"
    //           aria-hidden="true"
    //         />
    //       );
    //     } else if (status === "LIVE" && isApprove && !isReject) {
    //       statusText = "APPROVE";
    //       statusColor = "text-green-500";
    //       statusIcon = (
    //         <FaRegCircleCheck
    //           className="mr-2 size-6 text-muted-foreground text-green-500 font-bold"
    //           aria-hidden="true"
    //         />
    //       );
    //     } else if (status === "END" && isReject) {
    //       statusText = "REJECT";
    //       statusIcon = (
    //         <FcCancel
    //           className="mr-2 size-6 text-muted-foreground text-red-500 font-bold"
    //           aria-hidden="true"
    //         />
    //       );
    //       statusColor = "text-red-500";
    //     } else {
    //       statusText = "END";
    //       statusIcon = (
    //         <FcCancel
    //           className="mr-2 size-6 text-muted-foreground text-red-500 font-bold"
    //           aria-hidden="true"
    //         />
    //       );
    //       statusColor = "text-red-500";
    //     }

    //     return (
    //       <div className="flex items-center bg-slate-700 w-full h-14 rounded-md px-2">
    //         <span>{statusIcon}</span>
    //         <span className={`capitalize ${statusColor}`}>{statusText}</span>
    //       </div>
    //     );
    //   },
    //   filterFn: (row, auctionId, value) => {
    //     return value instanceof Array && value.includes(row.getValue(auctionId));
    //   },
    // },

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
            {Number(row.original.status) === 2 && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Trạng thái</DropdownMenuSubTrigger>

                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    // onClick={() =>
                    //   onOpen("rejectAuction", { auction: row.original })

                    // }
                    onClick={() => {
                      startTransition(() => {
                        row.toggleSelected(false);
                        toast.promise(
                          setApproveAuction(row.original.auctionId.toString()),
                          {
                            loading: "Update...",
                            success: () => "Auction approve successfully.",
                            // error: (err: unknown) => catchError(err),
                            error: () => "approve error",
                          }
                        );
                      });
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Chấp thuận giá
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() =>
                      onOpen("reEvaluateModal", { auction: row.original })
                    }
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Định giá lại
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                startTransition(() => {
                  row.toggleSelected(false);
                  toast.promise(
                    deleteAuction(row.original.auctionId.toString()),
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

export const filterableColumns: DataTableFilterableColumn<IAuction>[] = [
  {
    id: "status",
    title: "status",
    options: ["WAITING", "COMING", "LIVE", "END"].map((status) => ({
      label: status[0]?.toUpperCase() + status.slice(1),
      value: status,
    })),
  },
];

export const searchableColumns: DataTableSearchableColumn<IAuction>[] = [
  {
    id: "productCode",
    title: "productCode",
  },
];
