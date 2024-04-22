import { useResponsive } from "@/app/_hooks/responsive";
import { Card, Skeleton } from "@nextui-org/react";
import React from "react";

const GoodsSkeleton = () => {
  const { isDesktop, isLaptop } = useResponsive();
  return (
    <Card
      className={`${
        isDesktop
          ? "desktop:h-[494px] desktop:w-[332px]"
          : isLaptop
          ? "laptop:w-[290px] laptop:h-[431px]"
          : "w-[296px] h-[441.76px] mb-[20px]"
      } `}
      radius="lg"
    >
      <Skeleton className="rounded-lg h-full">
        <div
          className={`rounded-lg bg-default-300 ${
            isDesktop
              ? "desktop:h-[494px] desktop:w-[332px]"
              : isLaptop
              ? "laptop:w-[290px] laptop:h-[431px]"
              : "w-[296px] h-[441.76px]"
          } `}
        ></div>
      </Skeleton>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col gap-2 w-1/2 desktop:mt-[28px] desktop:mx-[33px] laptop:mt-[23px] laptop:mx-[22px] mt-[20px] mx-[20px] mb-[47px]">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
        <div>
          <Skeleton className="flex rounded-full w-12 h-12 desktop:my-[28px] desktop:mx-[33px] laptop:my-[23px] laptop:mx-[22px] mt-[20px] mx-[20px]" />
        </div>
      </div>
    </Card>
  );
};

export default React.memo(GoodsSkeleton);
