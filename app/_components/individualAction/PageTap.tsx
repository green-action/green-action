import { useFetchIndivActionsBookmarks } from "@/app/_hooks/useQueries/main";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuPencilLine } from "react-icons/lu";
import AlertModal from "../community/AlertModal";
import PageList from "./PageList";

const PageTap = () => {
  const [activeTab, setActiveTab] = useState("모든 캠페인");
  const [selectedOrder, setSelectedOrder] = useState("최신등록글");

  // alert 대체 모달창을 위한 상태관리
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [message, setMessage] = useState("");

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
    if (activeTab === "모든 캠페인") {
      if (selectedOrder === "최신등록글") {
        setFilteredActions(sortedActions);
      } else if (selectedOrder === "찜한순") {
        setFilteredActions(sortedPopularActions);
      }
    }

    if (activeTab === "모집중인 캠페인") {
      if (selectedOrder === "최신등록글") {
        setFilteredActions(
          sortedActions?.filter((action) => action.is_recruiting),
        );
      } else if (selectedOrder === "찜한순") {
        setFilteredActions(
          sortedPopularActions?.filter((action) => action.is_recruiting),
        );
      }
    }
    if (activeTab === "마감된 캠페인") {
      if (selectedOrder === "최신등록글") {
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
    setSelectedOrder("최신등록글");
  };

  const handlePopularOrder = () => {
    setSelectedOrder("찜한순");
  };

  const handleClick = () => {
    if (loggedInUserUid) {
      router.push("/individualAction/add");
      return;
    }
    // alert("로그인이 필요합니다.");
    setMessage("로그인이 필요한 서비스입니다.");
    setIsOpenAlertModal(true);
    // router.push("/login");
    return;
  };

  return (
    <>
      <div className="flex justify-between items-center desktop:w-[1510px] laptop:w-[920px]  mx-auto">
        <ul className="flex gap-4 ml-6 font-bold">
          <li
            onClick={handleActiveTabClick}
            className={`flex justify-center items-center cursor-pointer rounded-2xl  desktop:w-[130px] h-[34px] text-[12px]  laptop:w-[108px] ${
              activeTab === "모든 캠페인"
                ? "bg-[#F1F1F1] transition duration-300 ease-in-out text-[12px]"
                : ""
            }`}
          >
            모든 캠페인
          </li>
          <li
            onClick={handleActiveTabClick}
            className={`flex justify-center items-center cursor-pointer rounded-2xl desktop:w-[130px] h-[34px]  text-[12px]  laptop:w-[108px] ${
              activeTab === "모집중인 캠페인"
                ? "bg-[#F1F1F1] transition duration-300 ease-in-out text-[12px]"
                : ""
            }`}
          >
            모집중인 캠페인
          </li>
          <li
            onClick={handleActiveTabClick}
            className={`flex justify-center items-center cursor-pointer rounded-2xl desktop:w-[130px] h-[34px]  text-[12px]  laptop:w-[108px] ${
              activeTab === "마감된 캠페인"
                ? "bg-[#F1F1F1] transition duration-300 ease-in-out text-[12px] "
                : ""
            }`}
          >
            마감된 캠페인
          </li>
        </ul>

        <div className="flex items-center gap-4 mr-4">
          <Select
            aria-label="Select"
            placeholder="최신등록글"
            size="md"
            radius="full"
            items={selectedOrder}
            className=" desktop:w-[161px] h-[30px] text-[15px] laptop:w-[127px] "
            variant="bordered"
            disallowEmptySelection
            defaultSelectedKeys={["최신등록글"]}
          >
            <SelectItem
              key="최신등록글"
              value="최신등록글"
              className="rounded-xl "
              onClick={handleLatestOrder}
            >
              최신등록글
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
