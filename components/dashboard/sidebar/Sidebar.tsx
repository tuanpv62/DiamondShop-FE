"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

function Sidebar({ handleActive }: any) {
  const [activeUser, setActiveUser] = useState(false);
  const [activeProduct, setActiveProduct] = useState(false);
  const [activeAcution, setActiveAcution] = useState(false);

  const { data: session } = useSession();

  const isAdmin =
    session?.user.roleName?.toUpperCase() === "ADMIN" ||
    session?.user.roleName?.toUpperCase() === "MANAGER";

  const isStaff = session?.user.roleName?.toUpperCase() === "STAFF";

  const haveAllPermission = isAdmin || isStaff;

  return (
    <aside className="sidebar-wrapper fixed top-0 z-30 block h-full w-[308px] bg-white dark:bg-darkblack-600 sm:hidden xl:block">
      <div className="sidebar-header relative z-30 flex h-[108px] w-full items-center border-b border-r border-b-[#F7F7F7] border-r-[#F7F7F7] pl-[50px] dark:border-darkblack-400">
        <Link
          href="/"
          className="flex items-center font-bold dark:text-blue-200  "
        >
          <Image
            alt="logo"
            src="/images/logo-white.svg"
            height={40}
            width={40}
            priority={true}
            className=""
          />
          <span className="text-2xl ml-2 font-bold">Orchid</span>
        </Link>
        <button
          aria-label="none"
          type="button"
          onClick={handleActive}
          className="drawer-btn absolute right-0 top-auto"
          title="Ctrl+b"
        >
          <span>
            <Icons.buttonCloseOpenSidebarIcon />
          </span>
        </button>
      </div>
      <div className="sidebar-body overflow-style-none relative z-30 h-screen w-full overflow-y-scroll pb-[200px] pl-[48px] pt-[14px]">
        <div className="nav-wrapper mb-[36px] pr-[50px]">
          <div className="item-wrapper mb-5">
            <h4 className="border-b border-bgray-200 text-sm font-medium leading-7 text-bgray-700 dark:border-darkblack-400 dark:text-bgray-50">
              Bảng điều khiển
            </h4>
            <ul className="mt-2.5">
              <li className="item py-[11px] text-bgray-900 dark:text-white">
                <Link href="/dashboard" className="cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico">
                        <Icons.dashboarSidebarIcon />
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Trang Chủ
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              {isAdmin && (
                <li className="item py-[11px] text-bgray-900 dark:text-white">
                  <Link href="/dashboard/transaction">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <span className="item-ico">
                          <Icons.transactionSidebarIcon />
                        </span>
                        <span className="item-text text-lg font-medium leading-none">
                          Giao dịch
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              )}

              {/* <li className="item py-[11px] text-bgray-900 dark:text-white">
                <Link href="/dashboard/integrations">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico">
                        <Icons.intergrationsSidebarIcon />
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Integrations
                      </span>
                    </div>
                  </div>
                </Link>
              </li> */}
              {isAdmin && (
                <li
                  className="item py-[11px] text-bgray-900 dark:text-white"
                  onClick={() => setActiveUser(!activeUser)}
                >
                  <a className="cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <span className="item-ico">
                          <Icons.userSidebarIcon />
                        </span>
                        <span className="item-text text-lg font-medium leading-none">
                          Người Dùng
                        </span>
                      </div>
                      <span>
                        <Icons.sidebarChevonLeftIcon />
                      </span>
                    </div>
                  </a>
                  <ul
                    className={`sub-menu ml-2.5 mt-[22px] border-l border-success-100 pl-5 ${
                      activeUser && "active"
                    }`}
                  >
                    <li>
                      <Link
                        href="/dashboard/users"
                        className="text-md inline-block py-1.5 font-medium text-bgray-600 transition-all hover:text-bgray-800 dark:text-bgray-50 hover:dark:text-success-300"
                      >
                        Thông Tin Người Dùng
                      </Link>
                    </li>
                    {/* <li>
                      <Link
                        href="/dashboard/create-staff"
                        className="text-md inline-block py-1.5 font-medium text-bgray-600 transition-all hover:text-bgray-800 dark:text-bgray-50 hover:dark:text-success-300"
                      >
                        Create
                      </Link>
                    </li> */}
                  </ul>
                </li>
              )}

              <li
                className="item py-[11px] text-bgray-900 dark:text-white"
                onClick={() => setActiveAcution(!activeAcution)}
              >
                <a className="cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico ">
                        <Icons.auctionDashboardIcon />
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Đấu Giá
                      </span>
                    </div>
                    <span>
                      <Icons.sidebarChevonLeftIcon />
                    </span>
                  </div>
                </a>
                <ul
                  className={`sub-menu ml-2.5 mt-[22px] border-l border-success-100 pl-5 ${
                    activeAcution && "active"
                  }`}
                >
                  {haveAllPermission && (
                    <li>
                      <Link
                        href="/dashboard/auctions"
                        className="text-md inline-block py-1.5 font-medium text-bgray-600 transition-all hover:text-bgray-800 dark:text-bgray-50 hover:dark:text-success-300"
                      >
                        Xem Danh Sách Đấu Giá
                      </Link>
                    </li>
                  )}

                  {/* <li>
                    <Link
                      href="/dashboard/auction/create-auctions"
                      className="text-md inline-block py-1.5 font-medium text-bgray-600 transition-all hover:text-bgray-800 dark:text-bgray-50 hover:dark:text-success-300"
                    >
                      Tạo Mới Đấu Giá
                    </Link>
                  </li> */}
                  {isAdmin && (
                    <li>
                      <Link
                        href="/dashboard/censorship"
                        className="text-md inline-block py-1.5 font-medium text-bgray-600 transition-all hover:text-bgray-800 dark:text-bgray-50 hover:dark:text-success-300"
                      >
                        Kiểm Duyệt Sản Phẩm
                      </Link>
                    </li>
                  )}
                  {isAdmin && (
                    <li>
                      <Link
                        href="/dashboard/evaluate"
                        className="text-md inline-block py-1.5 font-medium text-bgray-600 transition-all hover:text-bgray-800 dark:text-bgray-50 hover:dark:text-success-300"
                      >
                        Định giá sản phẩm
                      </Link>
                    </li>
                  )}
                  {isAdmin && (
                    <li>
                      <Link
                        href="/dashboard/confirm"
                        className="text-md inline-block py-1.5 font-medium text-bgray-600 transition-all hover:text-bgray-800 dark:text-bgray-50 hover:dark:text-success-300"
                      >
                        Xác nhận sản phẩm
                      </Link>
                    </li>
                  )}
                </ul>
              </li>

              <li className="item py-[11px] text-bgray-900 dark:text-white">
                <Link href="/dashboard/orders">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico">
                        <Icons.historySidebarIcon />
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Đơn Hàng
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="item-wrapper mb-5">
            <h4 className="border-b border-bgray-200 text-sm font-medium leading-7 text-bgray-700 dark:border-darkblack-400 dark:text-bgray-50">
              Trợ Giúp
            </h4>
            <ul className="mt-2.5">
              <li className="item py-[11px] text-bgray-900 dark:text-white">
                <Link href="/dashboard/settings">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico">
                        <Icons.helpSidebarIcon />
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Cài Đặt
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="item-wrapper mb-5">
            <h4 className="border-b border-bgray-200 text-sm font-medium leading-7 text-bgray-700 dark:border-darkblack-400 dark:text-bgray-50">
              Khác
            </h4>
            <ul className="mt-2.5">
              <li className="item py-[11px] text-bgray-900 dark:text-white">
                <Button
                  onClick={() => signOut()}
                  className=" bg-white dark:bg-darkblack-600 "
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico">
                        <Icons.logoutSidebardIcon />
                      </span>
                      <span className="item-text text-lg font-medium leading-none text-bgray-900 dark:text-white hover:text-green-300">
                        Đăng Xuất
                      </span>
                    </div>
                  </div>
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <div className="copy-write-text">
          <p className="text-sm text-[#969BA0]">© 2024 All Rights Reserved</p>
          <p className="text-sm font-medium text-bgray-700">
            Made with ❤️ by
            <a
              href="#"
              target="_blank"
              className="border-b font-semibold hover:text-blue-600 ml-1"
            >
              Diamond Shop
            </a>
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
