
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// fake data
import { SearchParams } from "@/types/table";
import { Shell } from "@/components/shell";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

import { UsersTable } from "./_components/users-table";

import { useGetStaff, useGetUsers } from "@/lib/react-query/queries";
import { getUserWithRoleCustomer, getUserWithRoleStaff } from "@/lib/actions";

export interface IndexPageProps {
  searchParams: SearchParams;
}

const UsersPage = ({ searchParams }: IndexPageProps) => {
  // const { data: staffs, isLoading: staffLoading } = useGetStaff(searchParams);
  // const { data: users, isLoading: userLoading } = useGetUsers(searchParams);

  const users = getUserWithRoleCustomer(searchParams);
  const staffs = getUserWithRoleStaff(searchParams);
  return (
    <>
      <div className="2xl:flex-1 w-full">
        <Tabs defaultValue="staff" className="w-full ">
          <TabsList>
            <TabsTrigger value="staff">Nhân viên</TabsTrigger>
            <TabsTrigger value="user">Khách hàng</TabsTrigger>
          </TabsList>
          <TabsContent value="staff">
            Nhân viên here
            <Shell>
              <React.Suspense
                fallback={
                  <DataTableSkeleton
                    columnCount={4}
                    filterableColumnCount={2}
                  />
                }
              >
                <UsersTable
                  usersPromise={staffs}
                />
              </React.Suspense>
            </Shell>
          </TabsContent>
          <TabsContent value="user">
            Khách hàng here.
            <Shell>
              <React.Suspense
                fallback={
                  <DataTableSkeleton
                    columnCount={4}
                    filterableColumnCount={2}
                  />
                }
              >
                <UsersTable
                  usersPromise={users}
                />
              </React.Suspense>
            </Shell>
          </TabsContent>
        </Tabs>
      </div>
      {/* <RightSidebar /> */}
    </>
  );
};

export default UsersPage;
