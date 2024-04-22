"use client";
import { useResponsive } from "@/app/_hooks/responsive";
import { useGoods } from "@/app/_hooks/useQueries/goods";
import GoodsImg from "./GoodsImg";
import GoodsSkeleton from "./GoodsSkeleton";

const Goods = () => {
  const { data: goods, isLoading, isError } = useGoods();
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  if (isLoading)
    return (
      <>
        <div className="desktop:mt-[160px] desktop:mx-0 laptop:mx-[56px]">
          <div className="grid desktop:gap-[23px] laptop:gap-[20px] desktop:grid-cols-5 laptop:grid-cols-3 laptop:mt-[120px]">
            {[...Array(5)].map((_, index) => (
              <GoodsSkeleton key={index} />
            ))}
          </div>
        </div>
        {isMobile && (
          <div>
            <div className="mt-[70px]">
              {[...Array(5)].map((_, index) => (
                <GoodsSkeleton key={index} />
              ))}
            </div>
          </div>
        )}
      </>
    );
  if (isError) return <div>Error fetching goods...</div>;

  return (
    <>
      {isDesktop && (
        <div className="desktop:mt-[160px] desktop:mx-0">
          <div className="desktop:gap-[23px] grid desktop:grid-cols-5">
            {goods?.map((item) => {
              return <GoodsImg item={item} />;
            })}
          </div>
        </div>
      )}
      {isLaptop && (
        <div className="laptop:mx-[56px]">
          <div className="laptop:gap-[20px] grid laptop:grid-cols-3 laptop:mt-[120px]">
            {goods?.map((item) => {
              return <GoodsImg item={item} />;
            })}
          </div>
        </div>
      )}
      {isMobile && (
        <div className="mt-[70px]">
          <div className="">
            {goods?.map((item) => {
              return <GoodsImg item={item} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Goods;
