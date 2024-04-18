"use client";
import { useResponsive } from "@/app/_hooks/responsive";
import { useGroupAction } from "@/app/_hooks/useQueries/groupAction";
import TopButton from "../_components/TopButton";
import GroupContent from "../_components/groupAction/GroupContent";
import GroupSkeleton from "../_components/groupAction/GroupSkeleton";

const groupActionPage = () => {
  const { data: groupAction, isLoading } = useGroupAction();
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
        {[...Array(8)].map((_, index) => (
          <GroupSkeleton key={index} />
        ))}
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
          <GroupContent action={action} isLoading={isLoading} key={action.id} />
        );
      })}
    </div>
  );
};

export default groupActionPage;
