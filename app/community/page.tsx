"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCommunityList } from "../_api/community/community-api";
import AddPostModal from "../_components/community/AddPostModal";
import CommunityPost from "../_components/community/CommunityPost";
import { QUERY_KEY_COMMUNITYLIST } from "../_api/queryKeys";

const CommunityListPage = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["정렬"]),
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  const {
    data: communityList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEY_COMMUNITYLIST],
    queryFn: getCommunityList,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      {/* 전체 박스 */}
      <div className="w-[1000px] h-[100vh] mx-auto">
        {/* 정렬 */}
        <div className="flex justify-end mt-24 mb-4 mr-2">
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
        {/* 커뮤니티 리스트 */}
        <div className="flex flex-wrap gap-8">
          {/* nextUI 카드 */}
          <CommunityPost communityList={communityList} />
        </div>
        <AddPostModal />
      </div>
    </>
  );
};

export default CommunityListPage;
