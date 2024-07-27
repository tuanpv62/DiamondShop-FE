"use client";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types/table";

import { BsGenderMale, BsGenderFemale, BsGenderTrans } from "react-icons/bs";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { IUser } from "@/types/dashboard";
import { format, parseISO } from "date-fns";

export function fetchTasksTableColumnDefs(
  isPending: boolean,
  startTransition: React.TransitionStartFunction
): ColumnDef<IUser, unknown>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("name")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("email")}
            </span>
          </div>
        );
      },
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
      accessorKey: "dob",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Day Of Birth" />
      ),
      cell: ({ row }) => {
        const dobValue = row.getValue("dob") as string;
        const parsedDate = parseISO(dobValue);
        const formattedDob = format(parsedDate, "dd/MM/yyyy");

        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {formattedDob}
            </span>
          </div>
        );
      },
    },
  ];
}

export const searchableColumns: DataTableSearchableColumn<IUser>[] = [
  {
    id: "email",
    title: "emails",
  },
];
