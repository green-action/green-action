"use client";
import GoodsSkeleton from "../_components/goods/GoodsSkeleton";
import { useResponsive } from "../_hooks/responsive";

const page = () => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  return (
    <div
      className={`grid gap-[50px] mt-14 mx-auto desktop:grid-cols-4 desktop:w-[1500px] laptop:grid-cols-3 laptop:w-[910px] phone:grid-cols-1 phone:w-[300px] `}
    >
      <GoodsSkeleton />
      <GoodsSkeleton />
      <GoodsSkeleton />
    </div>
  );
};

export default page;
