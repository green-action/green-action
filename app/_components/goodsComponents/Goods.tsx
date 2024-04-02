"use client";
import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { getGoods } from "@/app/_api/goods/goods_api";
import { useQuery } from "@tanstack/react-query";

const Goods = () => {
  const {
    data: goods,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["goods"], queryFn: getGoods });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching goods...</div>;

  return (
    <div className="mt-5">
      <div className="text-gray-400 font-medium">
        캠페인에 참여하고 포인트를 모아보세요!
      </div>
      <div className="gap-2 grid grid-cols-2 md:grid-cols-4 p-5">
        {goods?.map((item) => {
          return (
            <Card key={item.id} className="py-4 bg-slate-400">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <img
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={item.img_url}
                  width={270}
                />
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <p className="text-tiny uppercase font-bold">
                  {item.product_name}
                </p>
                <small className="text-default-500">{item.point}P</small>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Goods;
