"use client";
import CommunitySkeleton from "../_components/community/CommunitySkeleton";

const page = () => {
  return (
    <div className="desktop:w-[1306px] laptop:w-[910px] phone:w-[287px] mx-auto desktop:mb-12">
      <div className="grid desktop:grid-cols-3 laptop:grid-cols-2 desktop:gap-10 desktop:gap-y-[92px] laptop:w-full laptop:gap-x-[40px] laptop:gap-y-[89px] phone:grid-cols-2 phone:w-[287px] phone:gap-x-[9px] phone:gap-y-[80px] phone:mt-[140px]">
        {[...Array(12)].map((_, index) => (
          <CommunitySkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default page;
