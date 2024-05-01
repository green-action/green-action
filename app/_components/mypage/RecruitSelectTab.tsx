import { useResponsive } from "@/app/_hooks/responsive";
import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

import type { recruitSelectTabProps } from "@/app/_types";

const RecruitSelectTab: React.FC<recruitSelectTabProps> = ({
  selected,
  setSelected,
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
          defaultSelectedKeys={[selected]}
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
          defaultSelectedKeys={[selected]}
          size="sm"
          radius="full"
          className="w-[110px] h-[20px] text-[11px]"
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
