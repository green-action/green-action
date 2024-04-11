"use client";
import { Card, CircularProgress, Image } from "@nextui-org/react";
import GroupModal from "../_components/groupAction/GroupModal";
import { useGroupAction } from "../_hooks/useQueries/groupAction";

const groupActionPage = () => {
  const { data: groupAction, isLoading } = useGroupAction();
  if (isLoading || !groupAction) {
    return (
      <div>
        <CircularProgress color="success" aria-label="Loading..." />
      </div>
    );
  }
  const { groupGreenActions, error } = groupAction;
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid desktop:grid-cols-4 laptop:grid-cols-3 m-auto mt-14 mx-auto">
      {groupGreenActions.map((action) => {
        return (
          <div
            className="flex flex-col desktop:mb-[100px] laptop:mb-[180px] relative"
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
            <section className="flex flex-row desktop:w-[250px] desktop:indent-[60px] laptop:indent-[120px]">
              <h2 className="font-bold mt-[30px] text-[14px] text-ellipsis whitespace-nowrap">
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
