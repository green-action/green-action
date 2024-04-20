import { useFetchIndivActionsBookmarks } from "@/app/_hooks/useQueries/main";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuPencilLine } from "react-icons/lu";
import AlertModal from "../community/AlertModal";
import PageList from "./PageList";
import { useResponsive } from "@/app/_hooks/responsive";
import Link from "next/link";

const PageTap = () => {
  const [activeTab, setActiveTab] = useState("모든 GreenAction");
  const [activeTabs, setActiveTabs] = useState("개인과 함께해요");
  const [selectedOrder, setSelectedOrder] = useState("최신순");

  // alert 대체 모달창을 위한 상태관리
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [message, setMessage] = useState("");
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  const { data: actions, isLoading: isActionsLoading } =
    useFetchIndivActionsBookmarks();

  // 현재 로그인한 유저 uid
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

  const router = useRouter();

  // 정렬
  const sortedActions = actions?.slice().sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const sortedPopularActions = actions?.slice().sort((a, b) => {
    return b.actionBookmarks.length - a.actionBookmarks.length;
  });

  const [filteredActions, setFilteredActions] = useState(sortedActions);

  const filterAndSortActions = () => {
    if (activeTab === "모든 GreenAction") {
      if (selectedOrder === "최신순") {
        setFilteredActions(sortedActions);
      } else if (selectedOrder === "찜한순") {
        setFilteredActions(sortedPopularActions);
      }
    }

    if (activeTab === "모집중 GreenAction") {
      if (selectedOrder === "최신순") {
        setFilteredActions(
          sortedActions?.filter((action) => action.is_recruiting),
        );
      } else if (selectedOrder === "찜한순") {
        setFilteredActions(
          sortedPopularActions?.filter((action) => action.is_recruiting),
        );
      }
    }
    if (activeTab === "마감된 GreenAction") {
      if (selectedOrder === "최신순") {
        setFilteredActions(
          sortedActions?.filter((action) => !action.is_recruiting),
        );
      } else if (selectedOrder === "찜한순") {
        setFilteredActions(
          sortedPopularActions?.filter((action) => !action.is_recruiting),
        );
      }
    }
  };

  useEffect(() => {
    filterAndSortActions();
  }, [activeTab, selectedOrder, actions]);

  const handleActiveTabClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    const target = e.target as HTMLLIElement;
    const textContent = target.textContent;
    if (textContent) {
      setActiveTab(textContent);
    }
  };

  const handleLatestOrder = () => {
    setSelectedOrder("최신순");
  };

  const handlePopularOrder = () => {
    setSelectedOrder("찜한순");
  };

  const handleClick = () => {
    if (loggedInUserUid) {
      router.push("/individualAction/add");
      return;
    }
    setMessage("로그인이 필요한 서비스입니다.");
    setIsOpenAlertModal(true);
    return;
  };

  return (
    <>
      <div className="flex justify-between items-center desktop:w-[1510px] laptop:w-[920px] phone:w-[292px] mx-auto">
        {isDesktop && (
          <ul className="flex gap-7 ml-6 font-bold">
            <li
              onClick={handleActiveTabClick}
              className={`flex justify-center items-center cursor-pointer  desktop:w-[130px] h-[34px] text-[12px] laptop:w-[108px] ${
                activeTab === "모든 GreenAction"
                  ? "border-b-2 border-black transition duration-300 ease-in-out text-[12px]"
                  : ""
              }`}
            >
              모든 GreenAction
            </li>
            <li
              onClick={handleActiveTabClick}
              className={`flex justify-center items-center cursor-pointer desktop:w-[130px] h-[34px] text-[12px] laptop:w-[108px] ${
                activeTab === "모집중 GreenAction"
                  ? "border-b-2 border-black transition duration-300 ease-in-out text-[12px]"
                  : ""
              }`}
            >
              모집중 GreenAction
            </li>
            <li
              onClick={handleActiveTabClick}
              className={`flex justify-center items-center cursor-pointer desktop:w-[130px] h-[34px] text-[12px] laptop:w-[108px] ${
                activeTab === "마감된 GreenAction"
                  ? "border-b-2 border-black transition duration-300 ease-in-out text-[12px] "
                  : ""
              }`}
            >
              마감된 GreenAction
            </li>
          </ul>
        )}
        {isLaptop && (
          <ul className="flex gap-7 ml-6 font-bold">
            <li
              onClick={handleActiveTabClick}
              className={`flex justify-center items-center cursor-pointer  desktop:w-[130px] h-[34px] text-[12px]  laptop:w-[108px] ${
                activeTab === "모든 GreenAction"
                  ? "border-b-2 border-black transition duration-300 ease-in-out text-[12px]"
                  : ""
              }`}
            >
              모든 GreenAction
            </li>
            <li
              onClick={handleActiveTabClick}
              className={`flex justify-center items-center cursor-pointer desktop:w-[130px] h-[34px]  text-[12px]  laptop:w-[108px] ${
                activeTab === "모집중 GreenAction"
                  ? "border-b-2 border-black transition duration-300 ease-in-out text-[12px]"
                  : ""
              }`}
            >
              모집중 GreenAction
            </li>
            <li
              onClick={handleActiveTabClick}
              className={`flex justify-center items-center cursor-pointer desktop:w-[130px] h-[34px] text-[12px] laptop:w-[108px] ${
                activeTab === "마감된 GreenAction"
                  ? "border-b-2 border-black transition duration-300 ease-in-out text-[12px] "
                  : ""
              }`}
            >
              마감된 GreenAction
            </li>
          </ul>
        )}
        {isMobile && (
          <div>
            <div className="flex items-center justify-center desktop:w-[1510px] laptop:w-[920px] phone:w-[292px] mx-auto gap-14 border-b-2 border-[#EDEDED] text-[13px] text-[#989898] ">
              <Link
                href="/individualAction"
                className={`cursor-pointer p-3 font-bold ${
                  activeTabs === "개인과 함께해요"
                    ? "border-b-2 border-black text-black mt-1"
                    : ""
                }`}
              >
                개인과 함께해요
              </Link>
              <Link
                href="/groupAction"
                className={`cursor-pointer p-3 font-bold ${
                  activeTabs === "단체와 함께해요"
                    ? "border-b-2 border-black text-black mt-3"
                    : ""
                }`}
              >
                단체와 함께해요
              </Link>
            </div>
            <ul className="w-full flex gap-7 ml-3 font-bold mt-5 text-center text-[#989898] ">
              <li
                onClick={handleActiveTabClick}
                className={`flex justify-center items-center cursor-pointer h-[34px] text-[12px]
                ${
                  activeTab === "모든 GreenAction"
                    ? "text-black transition duration-300 ease-in-out text-[12px] "
                    : ""
                }`}
              >
                모든 GreenAction
              </li>
              <li
                onClick={handleActiveTabClick}
                className={`flex justify-center items-center cursor-pointer h-[34px] text-[12px]  ${
                  activeTab === "모집중 GreenAction"
                    ? "text-black transition duration-300 ease-in-out text-[12px] "
                    : ""
                }`}
              >
                모집중 GreenAction
              </li>
              <li
                onClick={handleActiveTabClick}
                className={`flex justify-center items-center cursor-pointer h-[34px] text-[12px] ${
                  activeTab === "마감된 GreenAction"
                    ? "text-black transition duration-300 ease-in-out text-[12px] "
                    : ""
                }`}
              >
                마감된 GreenAction
              </li>
            </ul>
          </div>
        )}
        {isDesktop && (
          <div className="flex items-center gap-4 mr-4">
            <Select
              aria-label="Select"
              placeholder="최신순"
              size="md"
              radius="full"
              items={selectedOrder}
              className=" desktop:w-[161px] h-[30px] text-[15px] laptop:w-[127px]"
              variant="bordered"
              disallowEmptySelection
              defaultSelectedKeys={["최신순"]}
            >
              <SelectItem
                key="최신순"
                value="최신순"
                className="rounded-xl "
                onClick={handleLatestOrder}
              >
                최신순
              </SelectItem>
              <SelectItem
                key="찜한순"
                value="찜한순"
                className="rounded-xl "
                onClick={handlePopularOrder}
              >
                찜한순
              </SelectItem>
            </Select>
          </div>
        )}
        {isLaptop && (
          <div className="flex items-center gap-4 mr-4">
            <Select
              aria-label="Select"
              placeholder="최신순"
              size="md"
              radius="full"
              items={selectedOrder}
              className=" desktop:w-[161px] h-[30px] text-[15px] laptop:w-[127px]"
              variant="bordered"
              disallowEmptySelection
              defaultSelectedKeys={["최신순"]}
            >
              <SelectItem
                key="최신순"
                value="최신순"
                className="rounded-xl "
                onClick={handleLatestOrder}
              >
                최신순
              </SelectItem>
              <SelectItem
                key="찜한순"
                value="찜한순"
                className="rounded-xl "
                onClick={handlePopularOrder}
              >
                찜한순
              </SelectItem>
            </Select>
          </div>
        )}
        {isMobile && (
          <div className="flex items-center relative top-20 right-[100px] mt-16 ">
            <Select
              aria-label="Select"
              placeholder="최신순"
              radius="full"
              variant="underlined"
              items={selectedOrder}
              className="w-[90px] h-[20px] text-[11px]"
              disallowEmptySelection
              defaultSelectedKeys={["최신순"]}
            >
              <SelectItem
                key="최신순"
                value="최신순"
                className="rounded-xl"
                onClick={handleLatestOrder}
              >
                최신순
              </SelectItem>
              <SelectItem
                key="찜한순"
                value="찜한순"
                className="rounded-xl"
                onClick={handlePopularOrder}
              >
                찜한순
              </SelectItem>
            </Select>
          </div>
        )}
      </div>
      <Button
        className="fixed z-50 bottom-16 right-16 rounded-full w-20 h-20 bg-gray-300 flex items-center justify-center"
        onClick={handleClick}
      >
        <LuPencilLine className="w-8 h-8" />
      </Button>

      <PageList
        filteredActions={filteredActions}
        isActionsLoading={isActionsLoading}
      />
      {isOpenAlertModal && (
        <AlertModal
          isOpen={isOpenAlertModal}
          onClose={() => setIsOpenAlertModal(false)}
          message={message}
        />
      )}
    </>
  );
};

export default PageTap;
