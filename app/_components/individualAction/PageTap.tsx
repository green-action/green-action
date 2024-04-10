import { useFetchIndivActionsBookmarks } from "@/app/_hooks/useQueries/main";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuPencilLine } from "react-icons/lu";
import { useSession } from "next-auth/react";
import PageList from "./PageList";

const PageTap = () => {
  const [activeTab, setActiveTab] = useState("모든 캠페인");
  const { data: actions, isLoading: isActionsLoading } =
    useFetchIndivActionsBookmarks();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filteredActions, setFilteredActions] = useState(actions);
  // 현재 로그인한 유저 uid
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

  const router = useRouter();

  useEffect(() => {
    filterActions();
  }, [activeTab, actions]);

  const filterActions = () => {
    if (!isActionsLoading) {
      let filtered = actions;
      if (activeTab === "모집중인 캠페인") {
        filtered = actions?.filter((action) => action.is_recruiting);
      } else if (activeTab === "마감된 캠페인") {
        filtered = actions?.filter((action) => !action.is_recruiting);
      }
      // console.log("필터 캠페인->", filtered);
      setFilteredActions(filtered);
    }
  };

  const handleActiveTabClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    const target = e.target as HTMLLIElement;
    const textContent = target.textContent;
    if (textContent) {
      setActiveTab(textContent);
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
    console.log("최신순", sortedActions);
  };

  const handlePopularOrder = () => {
    const sortedActions = actions?.slice().sort((a, b) => {
      return b.actionBookmarks.length - a.actionBookmarks.length;
    });

    setFilteredActions(sortedActions);
    console.log("찜한순", sortedActions);
  };

  const handleClick = () => {
    if (loggedInUserUid) {
      router.push("/individualAction/add");
      return;
    }
    alert("로그인이 필요합니다.");
    router.push("/login");
    return;
  };

  return (
    <>
      <div className="flex justify-between items-center w-[100%]">
        <ul className="flex gap-4 ml-6">
          <li
            onClick={handleActiveTabClick}
            className={`flex justify-center items-center cursor-pointer  rounded-2xl w-[130px] h-[34px] text-[12px] ${
              activeTab === "모든 캠페인"
                ? "bg-gray-200 transition duration-300 ease-in-out  text-[12px]"
                : ""
            }`}
          >
            모든 캠페인
          </li>
          <li
            onClick={handleActiveTabClick}
            className={`flex justify-center items-center cursor-pointer  rounded-2xl w-[130px] h-[34px]  text-[12px] ${
              activeTab === "모집중인 캠페인"
                ? "bg-gray-200 transition duration-300 ease-in-out  text-[12px]"
                : ""
            }`}
          >
            모집중인 캠페인
          </li>
          <li
            onClick={handleActiveTabClick}
            className={`flex justify-center items-center cursor-pointer  rounded-2xl w-[130px] h-[34px]  text-[12px] ${
              activeTab === "마감된 캠페인"
                ? "bg-gray-200 transition duration-300 ease-in-out  text-[12px]"
                : ""
            }`}
          >
            마감된 캠페인
          </li>
        </ul>

        <div className="flex items-center gap-4 ">
          <Select
            aria-label="Select"
            defaultSelectedKeys={["최신등록글"]}
            size="md"
            radius="full"
            className="w-[161px] h-[38px]"
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

      <PageList filteredActions={filteredActions} />
    </>
  );
};

export default PageTap;
