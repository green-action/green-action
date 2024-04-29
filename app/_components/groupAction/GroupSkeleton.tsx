import { useResponsive } from "@/app/_hooks/responsive";
import { Card, Skeleton } from "@nextui-org/react";
import React from "react";

const GroupSkeleton = () => {
  const { isDesktop, isLaptop } = useResponsive();
  return (
    <>
      <Card
        className={`object-cover ${
          isDesktop
            ? "w-[365px] h-[550px] mb-[100px]"
            : isLaptop
            ? "w-[289px] h-[433px] mb-[180px]"
            : "w-[278px] h-[415px]"
        }`}
        radius="lg"
      >
        <Skeleton
          className={`rounded-lg ${
            isDesktop
              ? "w-[365px] h-[550px]"
              : isLaptop
              ? "w-[289px] h-[433px]"
              : "w-[278px] h-[415px]"
          }`}
        >
          <div className={`h-full rounded-lg bg-default-300`}></div>
        </Skeleton>
        <div className="space-y-3">
          <section className="flex flex-row justify-center gap-3 items-center pl-[10px] mt-[30px]">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <div>
              <Skeleton className="rounded-full w-12 h-12" />
            </div>
          </section>
        </div>
      </Card>
    </>
  );
};

export default React.memo(GroupSkeleton);
