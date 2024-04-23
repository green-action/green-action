import { useResponsive } from "@/app/_hooks/responsive";
import { Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";

const RecruitSelectTab = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleCategorizeByRecruiting = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    const clickedTarget = e.target as HTMLLIElement;
    const clickedText = clickedTarget.textContent as string;
    setSelected(clickedText);
  };
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  return (
    <>
      {(isDesktop || isLaptop) && (
        <Select
          aria-label="Select a state of recruiting"
          defaultSelectedKeys={[selected]} // ["전체"]로 할 시 탭이동후 돌아올 때 기존데이터렌더링 시에도 '전체'로 뜨는 문제 -> selected(state)로 해결 (다만 탭 이동시 리셋되진않음)
          size="md"
          radius="full"
          className="w-[8rem]"
          variant="bordered"
          disallowEmptySelection
          selectionMode="single"
        >
          <SelectItem
            key="전체"
            value="전체"
            className="rounded-xl"
            onClick={handleCategorizeByRecruiting}
          >
            전체
          </SelectItem>
          <SelectItem
            key="모집 중"
            value="모집 중"
            className="rounded-xl"
            onClick={handleCategorizeByRecruiting}
          >
            모집 중
          </SelectItem>
          <SelectItem
            key="모집 마감"
            value="모집 마감"
            className="rounded-xl"
            onClick={handleCategorizeByRecruiting}
          >
            모집 마감
          </SelectItem>
        </Select>
      )}
      {isMobile && (
        <Select
          aria-label="Select a state of recruiting"
          defaultSelectedKeys={[selected]} // ["전체"]로 할 시 탭이동후 돌아올 때 기존데이터렌더링 시에도 '전체'로 뜨는 문제 -> selected(state)로 해결 (다만 탭 이동시 리셋되진않음)
          size="sm"
          radius="full"
          className="w-[100px] h-[20px] text-[11px]"
          variant="underlined"
          disallowEmptySelection
          selectionMode="single"
        >
          <SelectItem
            key="전체"
            value="전체"
            className="rounded-xl"
            onClick={handleCategorizeByRecruiting}
          >
            전체
          </SelectItem>
          <SelectItem
            key="모집 중"
            value="모집 중"
            className="rounded-xl"
            onClick={handleCategorizeByRecruiting}
          >
            모집 중
          </SelectItem>
          <SelectItem
            key="모집 마감"
            value="모집 마감"
            className="rounded-xl"
            onClick={handleCategorizeByRecruiting}
          >
            모집 마감
          </SelectItem>
        </Select>
      )}
    </>
  );
};

export default RecruitSelectTab;
