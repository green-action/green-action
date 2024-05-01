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
      <div className="desktop:w-[1306px] laptop:w-[910px] phone:w-[287px] mx-auto desktop:mb-12">
        <div className="grid desktop:grid-cols-3 laptop:grid-cols-2 desktop:gap-10 desktop:gap-y-[92px] desktop:mt-[178px] laptop:w-full laptop:gap-x-[40px] laptop:gap-y-[89px] laptop:mt-[178px] phone:grid-cols-2 phone:w-full phone:gap-x-[9px] phone:gap-y-[80px] phone:mt-[140px]">
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

  const sortedLatestCommunityList = communityList?.slice().sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const communityListWithLikesCount = communityList?.map((post) => {
    return {
      ...post,
      likes_count: post.likes.length,
    };
  });

  const sortedLikesCommunityList = communityListWithLikesCount?.sort(
    (a, b) => b.likes_count - a.likes_count,
  );

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
      <div className="desktop:w-[1306px] laptop:w-[910px] mx-auto desktop:mb-12">
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
        <div
          className="grid desktop:grid-cols-3 laptop:grid-cols-2 desktop:gap-10 desktop:gap-y-[92px] laptop:w-[100%] laptop:gap-x-[40px] laptop:gap-y-[89px]
        grid-cols-2 gap-x-[9px] gap-y-[80px]"
        >
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
