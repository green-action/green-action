"use client";

import React from "react";

import { useGetCommunityList } from "../_hooks/useQueries/community";

import AddPostModal from "../_components/community/AddPostModal";
import CommunityListPost from "../_components/community/CommunityListPost";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from "@nextui-org/react";

const CommunityListPage = () => {
  const { communityList, isLoading, isError } = useGetCommunityList();

  // 정렬 드랍다운 상태
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["정렬"]),
  );

  // 드랍다운 선택값 추출 로직
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  // 리스트 최신순 정렬
  // (new Date()를 사용하여 날짜를 비교할 때에는 각 날짜를 밀리초 단위로 변환해야 함 -> .getTime() 사용)
  const sortedLatestCommunityList = communityList?.slice().sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  // 리스트 좋아요순 정렬
  // 각 게시물의 좋아요 개수 계산 - communityList key에 likes_count 추가하기
  const communityListWithLikesCount = communityList?.map((post) => {
    return {
      ...post,
      likes_count: post.likes.length,
    };
  });

  // 좋아요 개수(likes_count)를 기준으로 정렬
  const sortedLikesCommunityList = communityListWithLikesCount?.sort(
    (a, b) => b.likes_count - a.likes_count,
  );

  return (
    <>
      {/* 전체 Wrapper */}
      <div className="w-[1000px] h-[100vh] mx-auto">
        {/* 정렬 드롭다운 */}
        <div className="flex justify-end mt-16 mb-4 mr-2">
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
              <DropdownItem key="최신순(기본)">최신순(기본)</DropdownItem>
              <DropdownItem key="좋아요순">좋아요순</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        {/* 커뮤니티 리스트 wrapper */}
        <div className="flex flex-wrap gap-8">
          {/* 커뮤니티 게시글 카드 map */}
          {selectedValue === "정렬" || selectedValue === "최신순(기본)"
            ? sortedLatestCommunityList?.map((communityPost) => (
                <CommunityListPost
                  key={communityPost.id}
                  communityPost={communityPost}
                  mode="community"
                />
              ))
            : sortedLikesCommunityList?.map((communityPost) => (
                <CommunityListPost
                  key={communityPost.id}
                  communityPost={communityPost}
                  mode="community"
                />
              ))}
        </div>
        <AddPostModal />
      </div>
    </>
  );
};

export default CommunityListPage;
