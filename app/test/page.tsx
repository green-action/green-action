"use client";

import CommunitySkeleton from "../_components/community/CommunitySkeleton";

const page = ({ mode }: { mode: string }) => {
  return (
    <div
      className={` ${
        mode === "main" &&
        "desktop:w-[410px] desktop:h-[295px] laptop:w-[287px] laptop:h-[207px]"
      }
        ${
          mode === "myPosts" &&
          "desktop:w-[356px] laptop:w-[327px] laptop:h-[400px]"
        }
      ${mode !== "main" && mode !== "myPosts" && "w-[31%] mb-2"}
    `}
    >
      <CommunitySkeleton mode={`myPosts`} />
    </div>
  );
};

export default page;
