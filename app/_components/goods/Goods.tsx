"use client";
import { useGoods } from "@/app/_hooks/useQueries/goods";
import Image from "next/image";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";
import GoodsImg from "./GoodsImg";

const Goods = () => {
  const { data: goods, isLoading, isError } = useGoods();

  if (isLoading)
    return (
      <div className="w-[300px] h-auto mx-auto">
        <Image src={SoomLoaing} alt="SoomLoading" />
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
