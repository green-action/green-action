import { useFetchIndivActionsBookmarks } from "@/app/_hooks/useQueries/main";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuPencilLine } from "react-icons/lu";
import PageList from "./pageList";
import { useSession } from "next-auth/react";

const PageTap = () => {
  const [activeTab, setActiveTab] = useState("모든 캠페인");
  const { data: actions, isLoading: isActionsLoading } =
    useFetchIndivActionsBookmarks();
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
      console.log("필터 캠페인->", filtered); // 필터링된 결과를 콘솔에 출력
      setFilteredActions(filtered);
    }
  };

  const handleActiveTabClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    const target = e.target as HTMLLIElement;
    const textContent = target.textContent;
    if (textContent) {
      // console.log("Tab clicked:", textContent);
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
            aria-label="Select"
            defaultSelectedKeys={["최신등록글"]}
            size="md"
            radius="full"
            className="w-[8rem]"
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

      <PageList filteredActions={filteredActions} />
    </>
  );
};

export default PageTap;
