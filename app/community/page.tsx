"use client";

import React, { useState } from "react";

import { useGetCommunityList } from "../_hooks/useQueries/community";

import AddPostModal from "../_components/community/AddPostModal";
import CommunityListPost from "../_components/community/CommunityListPost";
import TopButton from "../_components/TopButton";

import { Select, SelectItem } from "@nextui-org/react";

import { MODE_COMMUNITY } from "../_api/constant";
import CommunitySkeleton from "../_components/community/CommunitySkeleton";

const CommunityListPage = () => {
  const [selectedValue, setSelectedValue] = useState("정렬");
  const { communityList, isLoading, isError } = useGetCommunityList();

  if (isLoading) {
    return (
      <div className="desktop:w-[1306px] laptop:w-[910px] mx-auto desktop:mb-12">
        <div className="grid desktop:grid-cols-3 laptop:grid-cols-2 desktop:gap-10 desktop:gap-y-[92px] laptop:w-[100%] laptop:gap-x-[40px] laptop:gap-y-[89px]">
          {[...Array(12)].map((_, index) => (
            <CommunitySkeleton key={index} />
          ))}
        </div>
      </div>
    );
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

  // 정렬 select option 클릭핸들러
  const handleCategorizeByRecruiting = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    const clickedTarget = e.target as HTMLLIElement;
    const clickedText = clickedTarget.textContent as string;
    setSelectedValue(clickedText);
  };

  return (
    <div className="desktop:w-[1920px] laptop:w-[1020px] w-[360px] px-[36px] mx-auto mb-[370px]">
      <TopButton />
      {/* 전체 Wrapper */}
      <div className="desktop:w-[1306px] laptop:w-[910px] mx-auto desktop:mb-12">
        {/* 정렬 select */}
        <div className="flex justify-end mt-16 mb-4">
          <Select
            placeholder="정렬"
            items={selectedValue}
            labelPlacement="outside"
            variant="bordered"
            radius="full"
            className="w-[10rem] mb-3"
          >
            <SelectItem
              key="최신순(기본)"
              textValue="최신순(기본)"
              className="rounded-xl"
              onClick={handleCategorizeByRecruiting}
            >
              최신순(기본)
            </SelectItem>
            <SelectItem
              key="좋아요순"
              textValue="좋아요순"
              className="rounded-xl"
              onClick={handleCategorizeByRecruiting}
            >
              좋아요순
            </SelectItem>
          </Select>
        </div>
        {/* 커뮤니티 리스트 wrapper */}
        {/* <div className="flex flex-wrap desktop:gap-x-[42px] desktop:gap-y-[92px] laptop:w-[100%] laptop:gap-x-[40px] laptop:gap-y-[89px] laptop:justify-center"> */}
        <div
          className="grid desktop:grid-cols-3 laptop:grid-cols-2 desktop:gap-10 desktop:gap-y-[92px] laptop:w-[100%] laptop:gap-x-[40px] laptop:gap-y-[89px]
        grid-cols-2 gap-x-[9px] gap-y-[80px]"
        >
          {/* 커뮤니티 게시글 카드 map */}
          {selectedValue === "정렬" || selectedValue === "최신순(기본)"
            ? sortedLatestCommunityList?.map((communityPost) => (
                <CommunityListPost
                  key={communityPost.id}
                  communityPost={communityPost}
                  mode={MODE_COMMUNITY}
                />
              ))
            : sortedLikesCommunityList?.map((communityPost) => (
                <CommunityListPost
                  key={communityPost.id}
                  communityPost={communityPost}
                  mode={MODE_COMMUNITY}
                />
              ))}
        </div>
        <AddPostModal />
      </div>
    </div>
  );
};

export default CommunityListPage;
