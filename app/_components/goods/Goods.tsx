"use client";
import { useGoods } from "@/app/_hooks/useQueries/goods";
import GoodsImg from "./GoodsImg";
import GoodsSkeleton from "./GoodsSkeleton";

const Goods = () => {
  const { data: goods, isLoading, isError } = useGoods();

  if (isLoading)
    return (
      <div className="desktop:mt-[160px] desktop:mx-0 laptop:mx-[56px]">
        <div className="grid desktop:gap-[23px] laptop:gap-[20px] desktop:grid-cols-5 laptop:grid-cols-3 laptop:mt-[120px]">
          {[...Array(5)].map((_, index) => (
            <GoodsSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  if (isError) return <div>Error fetching goods...</div>;

  return (
    <div className="desktop:mt-[160px] desktop:mx-0 laptop:mx-[56px]">
      <div>
        <div className="desktop:gap-[23px] laptop:gap-[20px] grid desktop:grid-cols-5 laptop:grid-cols-3 laptop:mt-[120px]">
          {goods?.map((item) => {
            return <GoodsImg item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Goods;
