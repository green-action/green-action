"use client";
import React from "react";
import { useGroupAction } from "../_hooks/useQueries/groupAction";
import GroupModal from "../_components/groupAction/GroupModal";

const groupActionPage = () => {
  const { data: groupAction, isLoading } = useGroupAction();
  if (isLoading || !groupAction) {
    return <div>Loading...</div>;
  }
  const { groupGreenActions, error } = groupAction;
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {groupGreenActions.map((action) => {
        return (
          <div key={action.id}>
            <img src={action.img_url} alt="campaign Img" />
            <h2>캠페인 명 : {action.title}</h2>
            <GroupModal action={action} />
          </div>
        );
      })}
    </>
  );
};

export default groupActionPage;
