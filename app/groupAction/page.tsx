"use client";

import { Card, Image } from "@nextui-org/react";
import NextImage from "next/image";
import SoomLoaing from "../_assets/image/loading/SOOM_gif.gif";
import TopButton from "../_components/TopButton";
import GroupModal from "../_components/groupAction/GroupModal";
import { useGroupAction } from "../_hooks/useQueries/groupAction";

const groupActionPage = () => {
  const { data: groupAction, isLoading } = useGroupAction();

  if (isLoading || !groupAction) {
    return (
      <div className="w-[300px] h-auto mx-auto">
        <NextImage src={SoomLoaing} alt="SoomLoading" />
      </div>
    );
  }
  const { groupGreenActions, error } = groupAction;
  if (error) {
    return <div className="w-[300px] h-auto mx-auto">{error}</div>;
  }

  return (
    <div className="grid desktop:grid-cols-4 desktop:w-[1500px] laptop:w-[910px] gap-[50px] laptop:grid-cols-3 m-auto mt-14 mx-auto">
      <TopButton />
      {groupGreenActions.map((action) => {
        return (
          <div
            className="flex flex-col desktop:mb-[100px] laptop:mb-[180px]"
            key={action.id}
          >
            <Card className="desktop:w-[365px] desktop:h-[550px] laptop:w-[289px] laptop:h-[433px] m-auto brightness-90">
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
