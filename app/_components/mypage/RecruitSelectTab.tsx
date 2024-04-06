import { Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";

const RecruitSelectTab = ({
  setSelected,
}: {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleCategorizeByRecruiting = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    const clickedTarget = e.target as HTMLLIElement;
    const clickedText = clickedTarget.textContent as string;
    setSelected(clickedText);
  };

  return (
    <Select
      aria-label="Select a state of recruiting"
      defaultSelectedKeys={["전체"]}
      size="md"
      radius="full"
      className="w-[8rem] "
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
  );
};

export default RecruitSelectTab;
