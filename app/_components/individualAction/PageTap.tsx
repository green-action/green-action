import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  ButtonGroup,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import PageList from "./PageList";

const PageTap = (id: string) => {
  const [selectedOption, setSelectedOption] = React.useState(
    new Set(["정렬하기"]),
  );
  const [activeTab, setActiveTab] = useState("모든 캠페인");
  const router = useRouter();
  const handleActiveTabClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    const target = e.target as HTMLLIElement;
    const textContent = target.textContent;
    if (textContent) {
      setActiveTab(textContent);
    }
  };

  const selectedOptionValue = Array.from(selectedOption)[0];
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
        <div className="flex justify-end mt-16 mb-4 mr-2 gap-9">
          <Button color="default" variant="bordered" onClick={handleClick}>
            캠페인 생성하기
          </Button>
          {/* <ButtonGroup variant="flat">
          <Button>{selectedOptionValue}</Button>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly>
                <ChevronDownIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Merge options"
              selectedKeys={selectedOption}
              selectionMode="single"
              onSelectionChange={setSelectedOption}
              // 오류해결해야됨
              className="max-w-[300px]"
            >
              <DropdownItem key="최신순">최신순</DropdownItem>
              <DropdownItem key="찜한순">찜한순</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ButtonGroup> */}
        </div>
      </div>
      <PageList action_id={id} id={id} activeTab={activeTab} />
    </>
  );
};

export default PageTap;
