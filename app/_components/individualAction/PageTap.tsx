import { useResponsive } from "@/app/_hooks/responsive";
import { useFetchIndivActionsBookmarks } from "@/app/_hooks/useQueries/main";
import { Select, SelectItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import postImg from "../../_assets/image/individualAction/write.png";
import AlertModal from "../community/AlertModal";
import PageList from "./PageList";
import {
  ACTIVE_TAB,
  ACTIVE_TABS,
  SELECT_TAB_LATEST_ORDER,
  SELECT_TAB_POPULARITY_ORDER,
  TAB_ALL_ACTION,
  TAB_CLOSED_ACTION,
  TAB_RECRUITMENT_ACTION,
} from "@/app/_api/constant";

const PageTap = () => {
  const [activeTab, setActiveTab] = useState(TAB_ALL_ACTION);
  const [activeTabs, setActiveTabs] = useState(ACTIVE_TAB);
  const [selectedOrder, setSelectedOrder] = useState(SELECT_TAB_LATEST_ORDER);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [message, setMessage] = useState("");
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const { data: actions, isLoading: isActionsLoading } =
    useFetchIndivActionsBookmarks();
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";
  const router = useRouter();

  const sortedActions = actions?.slice().sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const sortedPopularActions = actions?.slice().sort((a, b) => {
    return b.actionBookmarks.length - a.actionBookmarks.length;
  });

  const [filteredActions, setFilteredActions] = useState(sortedActions);

  const filterAndSortActions = () => {
    if (activeTab === TAB_ALL_ACTION) {
      if (selectedOrder === SELECT_TAB_LATEST_ORDER) {
        setFilteredActions(sortedActions);
      } else if (selectedOrder === SELECT_TAB_POPULARITY_ORDER) {
        setFilteredActions(sortedPopularActions);
      }
    }

    if (activeTab === TAB_RECRUITMENT_ACTION) {
      if (selectedOrder === SELECT_TAB_LATEST_ORDER) {
        setFilteredActions(
          sortedActions?.filter((action) => action.is_recruiting),
        );
      } else if (selectedOrder === SELECT_TAB_POPULARITY_ORDER) {
        setFilteredActions(
          sortedPopularActions?.filter((action) => action.is_recruiting),
        );
      }
    }
    if (activeTab === TAB_CLOSED_ACTION) {
      if (selectedOrder === SELECT_TAB_LATEST_ORDER) {
        setFilteredActions(
          sortedActions?.filter((action) => !action.is_recruiting),
        );
      } else if (selectedOrder === SELECT_TAB_POPULARITY_ORDER) {
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
    setSelectedOrder(SELECT_TAB_LATEST_ORDER);
  };

  const handlePopularOrder = () => {
    setSelectedOrder(SELECT_TAB_POPULARITY_ORDER);
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
              className={`flex justify-center items-center cursor-pointer  desktop:w-[130px] h-[34px] text-[15px] laptop:w-[108px] ${
                activeTab === TAB_ALL_ACTION
                  ? "border-b-2 border-black transition duration-300 ease-in-out text-[12px]"
                  : ""
              }`}
            >
              모든 Green Action
            </li>
            <li
              onClick={handleActiveTabClick}
              className={`flex justify-center items-center cursor-pointer desktop:w-[150px] h-[34px] text-[15px] laptop:w-[108px] ${
                activeTab === TAB_RECRUITMENT_ACTION
                  ? "border-b-2 border-black transition duration-300 ease-in-out text-[12px]"
                  : ""
              }`}
            >
              모집중 Green Action
            </li>
            <li
              onClick={handleActiveTabClick}
              className={`flex justify-center items-center cursor-pointer desktop:w-[150px] h-[34px] text-[15px] laptop:w-[108px] ${
                activeTab === TAB_CLOSED_ACTION
                  ? "border-b-2 border-black transition duration-300 ease-in-out text-[12px] "
                  : ""
              }`}
            >
              마감된 Green Action
            </li>
          </ul>
        )}
        {isLaptop && (
          <ul className="flex gap-7 ml-6 font-bold">
            <li
              onClick={handleActiveTabClick}
              className={`flex justify-center items-center cursor-pointer  desktop:w-[130px] h-[34px] text-[12px]  laptop:w-[108px] ${
                activeTab === TAB_ALL_ACTION
                  ? "border-b-2 border-black transition duration-300 ease-in-out text-[12px]"
                  : ""
              }`}
            >
              모든 Green Action
            </li>
            <li
              onClick={handleActiveTabClick}
              className={`flex justify-center items-center cursor-pointer desktop:w-[130px] h-[34px]  text-[12px]  laptop:w-[108px] ${
                activeTab === TAB_RECRUITMENT_ACTION
                  ? "border-b-2 border-black transition duration-300 ease-in-out text-[12px]"
                  : ""
              }`}
            >
              모집중 Green Action
            </li>
            <li
              onClick={handleActiveTabClick}
              className={`flex justify-center items-center cursor-pointer desktop:w-[130px] h-[34px] text-[12px] laptop:w-[108px] ${
                activeTab === TAB_CLOSED_ACTION
                  ? "border-b-2 border-black transition duration-300 ease-in-out text-[12px] "
                  : ""
              }`}
            >
              마감된 Green Action
            </li>
          </ul>
        )}
        {isMobile && (
          <div>
            <div className="flex items-center justify-center desktop:w-[1510px] laptop:w-[920px] phone:w-[292px] mx-auto gap-14 border-b-2 border-[#EDEDED] text-[13px] text-[#989898] ">
              <Link
                href="/individualAction"
                className={`cursor-pointer p-3 font-bold ${
                  activeTabs === ACTIVE_TAB
                    ? "border-b-2 border-black text-black mt-1"
                    : ""
                }`}
              >
                개인과 함께해요
              </Link>
              <Link
                href="/groupAction"
                className={`cursor-pointer p-3 font-bold ${
                  activeTabs === ACTIVE_TABS
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
                  activeTab === TAB_ALL_ACTION
                    ? "text-black transition duration-300 ease-in-out text-[12px] "
                    : ""
                }`}
              >
                모든 Green Action
              </li>
              <li
                onClick={handleActiveTabClick}
                className={`flex justify-center items-center cursor-pointer h-[34px] text-[12px]  ${
                  activeTab === TAB_RECRUITMENT_ACTION
                    ? "text-black transition duration-300 ease-in-out text-[12px] "
                    : ""
                }`}
              >
                모집중 Green Action
              </li>
              <li
                onClick={handleActiveTabClick}
                className={`flex justify-center items-center cursor-pointer h-[34px] text-[12px] ${
                  activeTab === TAB_CLOSED_ACTION
                    ? "text-black transition duration-300 ease-in-out text-[12px] "
                    : ""
                }`}
              >
                마감된 Green Action
              </li>
            </ul>
          </div>
        )}
        {isDesktop && (
          <div className="flex items-center gap-4 mr-4">
            <Select
              aria-label="Select"
              placeholder={SELECT_TAB_LATEST_ORDER}
              size="md"
              radius="full"
              items={selectedOrder}
              className=" desktop:w-[161px] h-[30px] text-[15px] laptop:w-[127px]"
              variant="bordered"
              disallowEmptySelection
              defaultSelectedKeys={[SELECT_TAB_LATEST_ORDER]}
            >
              <SelectItem
                key={SELECT_TAB_LATEST_ORDER}
                value={SELECT_TAB_LATEST_ORDER}
                className="rounded-xl"
                onClick={handleLatestOrder}
              >
                최신순
              </SelectItem>
              <SelectItem
                key={SELECT_TAB_POPULARITY_ORDER}
                value={SELECT_TAB_POPULARITY_ORDER}
                className="rounded-xl"
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
              placeholder={SELECT_TAB_LATEST_ORDER}
              size="md"
              radius="full"
              items={selectedOrder}
              className=" desktop:w-[161px] h-[30px] text-[15px] laptop:w-[127px]"
              variant="bordered"
              disallowEmptySelection
              defaultSelectedKeys={[SELECT_TAB_LATEST_ORDER]}
            >
              <SelectItem
                key={SELECT_TAB_LATEST_ORDER}
                value={SELECT_TAB_LATEST_ORDER}
                className="rounded-xl"
                onClick={handleLatestOrder}
              >
                최신순
              </SelectItem>
              <SelectItem
                key={SELECT_TAB_POPULARITY_ORDER}
                value={SELECT_TAB_POPULARITY_ORDER}
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
              placeholder={SELECT_TAB_LATEST_ORDER}
              radius="full"
              variant="underlined"
              items={selectedOrder}
              className="w-[90px] h-[20px] text-[11px]"
              disallowEmptySelection
              defaultSelectedKeys={[SELECT_TAB_LATEST_ORDER]}
            >
              <SelectItem
                key={SELECT_TAB_LATEST_ORDER}
                value={SELECT_TAB_LATEST_ORDER}
                className="rounded-xl"
                onClick={handleLatestOrder}
              >
                최신순
              </SelectItem>
              <SelectItem
                key={SELECT_TAB_POPULARITY_ORDER}
                value={SELECT_TAB_POPULARITY_ORDER}
                className="rounded-xl"
                onClick={handlePopularOrder}
              >
                찜한순
              </SelectItem>
            </Select>
          </div>
        )}
      </div>

      {(isDesktop || isLaptop) && (
        <Image
          src={postImg}
          alt="게시글 작성 이미지"
          className="desktop:size-[85px] laptop:size-[80px] fixed z-50 bottom-[360px] right-[22px] cursor-pointer hover:scale-105 ease-in-out duration-300"
          onClick={handleClick}
        />
      )}
      {isMobile && (
        <Image
          src={postImg}
          alt="게시글 작성 이미지"
          className="size-[50px] fixed z-50 bottom-[170px] right-[20px] cursor-pointer hover:scale-105 ease-in-out duration-300"
          onClick={handleClick}
        />
      )}
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
