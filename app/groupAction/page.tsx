"use client";

import { Card, Image } from "@nextui-org/react";
import TopButton from "../_components/TopButton";
import GroupModal from "../_components/groupAction/GroupModal";
import GroupSkeleton from "../_components/groupAction/GroupSkeleton";
import { useResponsive } from "../_hooks/responsive";
import { useGroupAction } from "../_hooks/useQueries/groupAction";

const groupActionPage = () => {
  const { data: groupAction, isLoading } = useGroupAction();
  const groupLength = groupAction?.groupGreenActions.length;
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  if (isLoading || !groupAction) {
    return (
      <div
        className={`grid gap-[50px] m-auto mt-14 mx-auto ${
          isDesktop
            ? "grid-cols-4 w-[1500px]"
            : isLaptop
            ? "grid-cols-3 w-[910px]"
            : ""
        }`}
      >
        <GroupSkeleton />
        <GroupSkeleton />
        <GroupSkeleton />
        <GroupSkeleton />
        {/* {[...Array(groupLength)].map((_, index) => (
          <GroupSkeleton key={index} />
        ))} */}
      </div>
    );
  }
  const { groupGreenActions, error } = groupAction;
  if (error) {
    return <div className="w-[300px] h-auto mx-auto">{error}</div>;
  }

  return (
    <div
      className={`grid gap-[50px] m-auto mt-14 mx-auto ${
        isDesktop
          ? "grid-cols-4 w-[1500px]"
          : isLaptop
          ? "grid-cols-3 w-[910px]"
          : ""
      }`}
    >
      <TopButton />
      {groupGreenActions.map((action) => {
        return (
          <div
            className={`flex flex-col ${
              isDesktop ? "mb-[100px]" : isLaptop ? "mb-[180px]" : "mb-[100px]"
            }`}
            key={action.id}
          >
            <Card
              className={`m-auto brightness-90 ${
                isDesktop
                  ? "w-[365px] h-[550px]"
                  : isLaptop
                  ? "w-[289px] h-[433px]"
                  : ""
              } `}
            >
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                className="w-full object-cover desktop:h-[550px] laptop:h-[433px]"
                src={action.img_url as string}
                alt="campaign Img"
              />
            </Card>
            <section className="flex flex-row justify-between items-center pl-[4%]">
              <h2 className="font-bold mt-[30px] text-[14px]  whitespace-nowrap w-[48%]">
                {action.title}
              </h2>
              <GroupModal action={action} />
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default groupActionPage;
