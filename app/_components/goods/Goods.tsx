"use client";
import { useGoods } from "@/app/_hooks/useQueries/goods";
import Image from "next/image";
import ProductInfoModal from "./ProductInfoModal";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";

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
    <div className="desktop:mt-[160px]">
      <div>
        <div className="desktop:gap-[23px] laptop:gap-[20px] grid desktop:grid-cols-5 laptop:grid-cols-3 laptop:mt-[120px]">
          {goods?.map((item) => {
            return (
              <div className="relative">
                <img
                  alt="Card background"
                  className="rounded-2xl desktop:h-[494px] laptop:h-[431px] object-cover"
                  src={item.img_url}
                />
                {/* 제품 이미지 하단 전체 */}
                <div className="flex justify-between desktop:mt-[28px] desktop:mx-[33px] laptop:mt-[23px] laptop:mx-[22px]">
                  <div className="text-[15px] ">
                    <p>{item.product_name}</p>
                    <p className="text-[#929292]">
                      {item.point.toLocaleString()}P
                    </p>
                  </div>
                  <div>
                    <ProductInfoModal item={item} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Goods;
