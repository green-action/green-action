import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const PageTap = () => {
  const [activeTab, setActiveTab] = useState("모든 캠페인");

  const handleActiveTabClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    const target = e.target as HTMLLIElement;
    const textContent = target.textContent;
    if (textContent) {
      setActiveTab(textContent);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <ul className="flex justify-around gap-4">
        <li
          onClick={handleActiveTabClick}
          className={`p-3 rounded-full ${
            activeTab === "모든 캠페인" ? "bg-gray-200" : ""
          }`}
        >
          모든 캠페인
        </li>
        <li
          onClick={handleActiveTabClick}
          className={`p-3 rounded-full ${
            activeTab === "모집중인 캠페인" ? "bg-gray-200" : ""
          }`}
        >
          모집중인 캠페인
        </li>
        <li
          onClick={handleActiveTabClick}
          className={`p-3 rounded-full ${
            activeTab === "마감된 캠페인" ? "bg-gray-200" : ""
          }`}
        >
          마감된 캠페인
        </li>
      </ul>
      <Button color="default" variant="bordered">
        캠페인 생성하기
      </Button>
      <div className="flex justify-end mt-16 mb-4 mr-2">
        <Dropdown>
          <DropdownTrigger>
            <Button color="default" variant="bordered">
              정렬
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">최신순</DropdownItem>
            <DropdownItem key="copy">찜한순</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default PageTap;
