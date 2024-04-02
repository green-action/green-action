"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import AddPostModal from "../_components/community/AddPostModal";
import CommunityPost from "../_components/community/CommunityPost";
import { useQuery } from "@tanstack/react-query";
import { getCommunityList } from "../_api/community/community-api";

const CommunityListPage = () => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["정렬"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["communityList"],
    queryFn: getCommunityList,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  console.log("data", data);

  return (
    <>
      {/* 헤더 */}
      <div className="w-full h-28 bg-slate-400 mb-14">Header</div>
      {/* 전체 박스 */}
      <div className="w-[1000px] h-[100vh] mx-auto">
        {/* 정렬 */}
        <div className="flex justify-end">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                className="capitalize border-1 rounded-full h-7"
              >
                {selectedValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              <DropdownItem key="정렬">정렬</DropdownItem>
              <DropdownItem key="최신순">최신순</DropdownItem>
              <DropdownItem key="좋아요순">좋아요순</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* <div className="flex justify-end">
          <select className="w-[120px] h-[30px] pl-4 text-sm rounded-full border-1 border-gray-300 focus:outline-none mb-4">
            <option value="정렬">정렬</option>
            <option value="최신순">최신순</option>
            <option value="좋아요순">좋아요순</option>
          </select>
        </div> */}
        {/* 커뮤니티 리스트 */}
        <div className="flex flex-wrap gap-4">
          {/* nextUI 카드 */}
          <CommunityPost />
        </div>
        <AddPostModal />
      </div>
    </>
  );
};

export default CommunityListPage;
