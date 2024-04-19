"use client";
import { useResponsive } from "@/app/_hooks/responsive";
import { useGroupAction } from "@/app/_hooks/useQueries/groupAction";
import TopButton from "../_components/TopButton";
import GroupContent from "../_components/groupAction/GroupContent";
import GroupSkeleton from "../_components/groupAction/GroupSkeleton";
import Link from "next/link";
import { useState } from "react";

const groupActionPage = () => {
  const { data: groupAction, isLoading } = useGroupAction();
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const [activeTabs, setActiveTabs] = useState("단체와 함께해요");

  if (isLoading || !groupAction) {
    return (
      <div
        className={`grid gap-[50px] m-auto mt-14 mx-auto ${
          isDesktop
            ? "grid-cols-4 w-[1500px]"
            : isLaptop
            ? "grid-cols-3 w-[910px]"
            : isMobile
            ? "grid-cols-a w-[282px]"
            : ""
        }`}
      >
        {[...Array(8)].map((_, index) => (
          <GroupSkeleton key={index} />
        ))}
      </div>
    );
  }
  const { groupGreenActions, error } = groupAction;
  if (error) {
    return <div className="w-[300px] h-auto mx-auto">{error}</div>;
  }

  return (
    <div
      className={`grid gap-[50px] m-auto mt-14 mx-auto ${
        isDesktop
          ? "grid-cols-4 w-[1500px]"
          : isLaptop
          ? "grid-cols-3 w-[910px]"
          : isMobile
          ? "grid w-[282px]"
          : ""
      }`}
    >
      <TopButton />
      {isMobile && (
        <div className="flex items-center justify-center w-[100%]  mx-auto gap-16 border-b-2 border-[#EDEDED] text-[#989898]">
          <Link
            href="/individualAction"
            className="cursor-pointer text-[13px] font-bold mt-3"
          >
            개인과 함께해요
          </Link>
          <Link
            href="/groupAction"
            className={`cursor-pointer text-[13px] font-bold p-3 ${
              activeTabs === "단체와 함께해요"
                ? "text-black border-b-2 border-black mt-3"
                : ""
            }`}
          >
            단체와 함께해요
          </Link>
        </div>
      )}
      {groupGreenActions.map((action) => {
        return (
          <GroupContent action={action} isLoading={isLoading} key={action.id} />
        );
      })}
    </div>
  );
};

export default groupActionPage;
