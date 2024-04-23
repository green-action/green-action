import { MODE_MAIN, MODE_MY_POSTS } from "../_api/constant";
import CommunitySkeleton from "../_components/community/CommunitySkeleton";

const test = ({ mode }: { mode?: string }) => {
  return (
    <div
      className={`${
        mode === MODE_MAIN &&
        "desktop:w-[410px] desktop:h-[295px] laptop:w-[287px] laptop:h-[207px]"
      }
            ${
              mode === MODE_MY_POSTS &&
              "desktop:w-[356px] laptop:w-[327px] laptop:h-[400px]"
            }
          ${mode !== MODE_MAIN && mode !== MODE_MY_POSTS && "w-[31%] mb-2"}
        `}
    >
      <CommunitySkeleton />
      <CommunitySkeleton />
      <CommunitySkeleton />
    </div>
  );
};

export default test;
