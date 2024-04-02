"use client";
import { CircularProgress } from "@nextui-org/react";
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
    <div className="flex flex-row">
      {groupGreenActions.map((action) => {
        return (
          <div className="p-6 border" key={action.id}>
            <div className="w-[150px] h-[200px] mr-auto">
              <img
                className="w-full h-full"
                src={action.img_url}
                alt="campaign Img"
              />
            </div>
            <h2>캠페인 명 : {action.title}</h2>
            <GroupModal action={action} />
          </div>
        );
      })}
    </div>
  );
};

export default groupActionPage;
