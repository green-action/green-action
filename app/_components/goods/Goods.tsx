"use client";
import React from "react";
import { CircularProgress } from "@nextui-org/react";
import ProductInfoModal from "./ProductInfoModal";
import { useGoods } from "@/app/_hooks/useQueries/goods";
import { useSession } from "next-auth/react";

const Goods = () => {
  const { data: goods, isLoading, isError } = useGoods();
  const session = useSession();
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="success" aria-label="Loading..." />
      </div>
    );
  if (isError) return <div>Error fetching goods...</div>;

  return (
    <div className="mt-5">
      <div className="text-gray-400 font-medium">
        캠페인에 참여하고 포인트를 모아보세요!
      </div>

      <div className="gap-3 grid grid-cols-5 md:grid-cols-5 mt-12">
        {goods?.map((item) => {
          return (
            <div>
              <img
                alt="Card background"
                className="rounded-2xl"
                src={item.img_url}
              />
              <div className="flex justify-between mt-4">
                <div>
                  <p>{item.product_name}</p>
                  <p className="text-default-500">
                    {item.point.toLocaleString()}P
                  </p>
                </div>
                <div>
                  <ProductInfoModal item={item} session={session} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Goods;
