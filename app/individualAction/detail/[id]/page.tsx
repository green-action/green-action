"use client";
import { useIndividualAction } from "@/app/_hooks/useQueries/individualActions";
import { CircularProgress } from "@nextui-org/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";
import React from "react";

const DetailPage = () => {
  const { id: postId } = useParams<Params>();
  const params = { id: postId };
  const {
    data: individualAction,
    isLoading,
    isError,
  } = useIndividualAction({ params });

  if (isLoading || !individualAction)
    return (
      <div>
        <CircularProgress color="success" aria-label="Loading..." />
      </div>
    );
  const detail = individualAction![0];
  console.log(detail);

  if (isError) return <div>Error fetching details...</div>;
  return (
    <>
      <div>개인그린디테일page</div>
      <div className="flex flex-col w-[1200px] h-auto mx-auto m-5">
        <div className="grid grid-cols-4 grid-rows-5 gap-4">
          <div className="col-span-1 row-span-1 border-2 border-gray-300 rounded-3xl">
            1번
          </div>
          <div className="col-span-3 row-span-1 border-2 border-gray-300 rounded-3xl">
            <p>제목 : {detail.title}</p>
            <p>
              날짜 : {detail.start_date} ~ {detail.end_date}
            </p>
            <p>장소 : {detail.location}</p>
          </div>

          <div className="col-span-1 row-span-1">
            <div className="p-2 mb-4 border-2 border-gray-300 rounded-3xl">
              1:1 채팅하기
            </div>
            <div className="p-2 mb-4 border-2 border-gray-300 rounded-3xl">
              참여하기
            </div>
          </div>
          <div className="col-span-3 row-span-2 border-2 border-gray-300 rounded-3xl">
            <p>상세내용 : {detail.content}</p>
          </div>

          {/* <div className="col-span-1 row-span-1 border-2 border-gray-300 rounded-3xl">
            5번
          </div> */}
        </div>
      </div>
    </>
  );
};

export default DetailPage;
