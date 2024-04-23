import IndividualSkeleton from "../_components/individualAction/IndividualSkeleton";

const test = () => {
  return (
    <div className="mt-10 gap-5 grid p-2 desktop:grid-cols-4 laptop:grid-cols-3 desktop:w-[1510px] laptop:w-[920px] phone:w-[292px] mx-auto phone:grid-cols-2">
      <IndividualSkeleton />
      <IndividualSkeleton />
    </div>
  );
};

export default test;
