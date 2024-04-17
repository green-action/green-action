"use client";
import { useGoods } from "@/app/_hooks/useQueries/goods";
import Image from "next/image";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";
import GoodsImg from "./GoodsImg";
import { useResponsive } from "@/app/_hooks/responsive";

const Goods = () => {
  const { data: goods, isLoading, isError } = useGoods();
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  if (isLoading)
    return (
      <div className="w-[300px] h-auto mx-auto">
        <Image src={SoomLoaing} alt="SoomLoading" />
      </div>
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
