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
    <div className="grid grid-cols-4 m-auto mt-14 mx-auto w-[1920px]">
      {groupGreenActions.map((action) => {
        return (
          <div className="flex flex-col mb-[100px] relative" key={action.id}>
            <Card className="w-[365px] h-[550px] m-auto brightness-90">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                className="w-full object-cover h-full"
                src={action.img_url as string}
                alt="campaign Img"
              />
            </Card>
            <section className="flex flex-row w-[250px] indent-[50px]">
              <h2 className="font-bold mt-[30px] text-[14px] text-ellipsis whitespace-nowrap ">
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
