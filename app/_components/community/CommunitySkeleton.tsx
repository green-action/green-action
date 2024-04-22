import { MODE_MAIN, MODE_MY_POSTS } from "@/app/_api/constant";
import { Card, Skeleton } from "@nextui-org/react";

const CommunitySkeleton = ({ mode }: { mode?: string }) => {
  return (
    <div
      className={` ${
        mode === MODE_MAIN &&
        "desktop:w-[410px] desktop:h-[295px] laptop:w-[287px] laptop:h-[207px]"
      }
            ${
              mode === MODE_MY_POSTS &&
              "desktop:w-[356px] laptop:w-[433px] laptop:h-[311px]"
            }
          ${mode !== "main" && mode !== MODE_MY_POSTS && "w-[31%] mb-2"}
        `}
    >
      <Card
        radius="lg"
        className={`shadow-none border-none desktop:w-[410px] desktop:h-[295px] laptop:w-[433px] laptop:h-[311px] mb-3 rounded-2xl ${
          mode === MODE_MY_POSTS &&
          "desktop:w-[356px] laptop:w-[327px] desktop:h-[250px] laptop:h-[230px]"
        }
            ${
              mode === MODE_MAIN &&
              "desktop:w-full desktop:h-full laptop:w-full laptop:h-full "
            }
            `}
      >
        <Skeleton className="rounded-lg w-fll h-full">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
      </Card>
      <div className="flex mt-4 w-[433px]">
        <Skeleton
          className={`w-2/5 flex items-center justify-center ml-[24px] rounded-[24px] 
             p-0.5  h-[31px]
          ${
            mode === MODE_MY_POSTS &&
            "ml-[15px]  desktop:w-[160px] laptop:w-[140px]"
          }  
          ${
            mode === MODE_MAIN &&
            "desktop:ml-[20px] laptop:ml-[15px] desktop:w-[180px]  desktop:px-0 laptop:px-0 laptop:w-[130px] desktop:h-[28px] laptop:h-[24px]"
          }`}
        >
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton
          className={` w-1/5 mx-[24px]  ${
            mode === MODE_MAIN && "desktop:mx-[24px] laptop:mx-[15px] "
          } ${
            mode === MODE_MY_POSTS &&
            " desktop:ml-[24px] laptop:ml-[15px] mr-0 "
          }
            `}
        >
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
    </div>
  );
};

export default CommunitySkeleton;
