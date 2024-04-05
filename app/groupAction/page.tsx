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
    <div className="flex flex-row gap-8 w-[80%] m-auto mt-14">
      {groupGreenActions.map((action) => {
        return (
          <div className="flex flex-col gap-3 relative" key={action.id}>
            <Card className="w-[150px] max-w-64 h-[200px] max-h-96 m-auto">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                className="w-full object-cover h-full"
                src={action.img_url}
                alt="campaign Img"
              />
            </Card>
            <h2>캠페인 명 : {action.title}</h2>
            <GroupModal action={action} />
          </div>
        );
      })}
    </div>
  );
};

export default groupActionPage;
