import { useFetchIndivActionsBookmarks } from "@/app/_hooks/useQueries/main";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuPencilLine } from "react-icons/lu";
import PageList from "./PageList";

const PageTap = () => {
  const [activeTab, setActiveTab] = useState("모든 캠페인");

  const { data: actions, isLoading: isActionsLoading } =
    useFetchIndivActionsBookmarks();
  const [filteredActions, setFilteredActions] = useState(actions);

  const router = useRouter();

  const filterAllCampaigns = () => {
    setFilteredActions(actions);
  };

  const filterRecruitingCampaigns = () => {
    setFilteredActions(actions?.filter((action) => action.is_recruiting));
  };

  const filterClosedCampaigns = () => {
    setFilteredActions(actions?.filter((action) => !action.is_recruiting));
  };

  const handleActiveTabClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    const target = e.target as HTMLLIElement;
    const textContent = target.textContent;
    if (textContent) {
      setActiveTab(textContent);
      if (textContent === "모든 캠페인") {
        filterAllCampaigns();
      }
      if (textContent === "모집중인 캠페인") {
        filterRecruitingCampaigns();
      }
      if (textContent === "마감된 캠페인") {
        filterClosedCampaigns();
      }
      // console.log(filterAllCampaigns());
    }
  };

  // 정렬

  const handleLatestOrder = () => {
    const sortedActions = actions?.slice().sort((a, b) => {
      const createdAtA = new Date(a.created_at);
      const createdAtB = new Date(b.created_at);
      return createdAtB.getTime() - createdAtA.getTime();
    });

    setFilteredActions(sortedActions);
  };

  const handlePopularOrder = () => {
    const sortedActions = actions?.sort((a, b) => {
      return b.actionBookmarks.length - a.actionBookmarks.length;
    });
    setFilteredActions(sortedActions);
  };

  const handleClick = () => router.push("/individualAction/add");
  return (
    <>
      <div className="flex justify-between items-center ">
        <ul className="flex gap-4">
          <li
            onClick={handleActiveTabClick}
            className={`p-3 rounded-full ${
              activeTab === "모든 캠페인"
                ? "bg-gray-200 transition duration-300 ease-in-out"
                : ""
            }`}
          >
            모든 캠페인
          </li>
          <li
            onClick={handleActiveTabClick}
            className={`p-3 rounded-full ${
              activeTab === "모집중인 캠페인"
                ? "bg-gray-200 transition duration-300 ease-in-out"
                : ""
            }`}
          >
            모집중인 캠페인
          </li>
          <li
            onClick={handleActiveTabClick}
            className={`p-3 rounded-full ${
              activeTab === "마감된 캠페인"
                ? "bg-gray-200 transition duration-300 ease-in-out"
                : ""
            }`}
          >
            마감된 캠페인
          </li>
        </ul>
        {/* 글쓰기버튼 삭제하고 동그란 아이콘으로 바꾸기 */}

        {/* <Button color="default" variant="bordered" onClick={handleClick}>
            캠페인 생성하기
          </Button> */}
        <Button
          className="fixed z-50 bottom-16 right-16 rounded-full w-20 h-20 bg-gray-300 flex items-center justify-center"
          onClick={handleClick}
        >
          <LuPencilLine className="w-8 h-8" />
        </Button>
        <div className="flex justify-end mt-16 mb-4 mr-2 gap-9">
          <Select
            aria-label="Select a state of recruiting"
            defaultSelectedKeys={["최신등록글"]}
            size="md"
            radius="full"
            className="w-[8rem] "
            variant="bordered"
          >
            <SelectItem
              key="최신등록글"
              value="최신등록글"
              className="rounded-xl"
              onClick={handleLatestOrder}
            >
              최신등록글
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
      </div>

      <PageList />
    </>
  );
};

export default PageTap;
