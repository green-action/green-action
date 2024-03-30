"use client";
import Link from "next/link";
import { useState } from "react";
import { LuPencilLine } from "react-icons/lu";
import AddPostModal from "../_components/community/AddPostModal";

const CommunityList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* 헤더 */}
      <div className="w-full h-28 bg-slate-400 mb-14">Header</div>
      {/* 전체 박스 */}
      <div className="w-[1000px] h-[100vh] mx-auto">
        {/* 정렬 */}
        <div className="flex justify-end">
          <select className="w-[120px] h-[30px] pl-4 text-sm rounded-full border-2 border-gray-300 focus:outline-none mb-4">
            <option value="정렬">정렬</option>
            <option value="최신순">최신순</option>
            <option value="좋아요순">좋아요순</option>
          </select>
        </div>
        {/* 커뮤니티 리스트 */}
        <div className="flex gap-8">
          {/* 커뮤니티 글 1 */}
          <Link
            href={`/community/detail/${123}`}
            className="w-1/3 h-[300px] cursor-pointer"
          >
            <div className="w-full h-4/5 mb-4">
              <img
                src="https://contents.lotteon.com/itemimage/20240319145402/LM/88/09/69/69/20/25/6_/00/1/LM8809696920256_001_1.jpg/dims/resizef/720X720"
                alt=""
                className="w-full h-full rounded-3xl"
              />
            </div>
            <div className="flex justify-between mb-2 px-4">
              <div>
                <img />
                <p>스파르타 Greener</p>
              </div>
              <div>🧡 8</div>
            </div>
            <div className="flex justify-center items-center">
              <div className="mr-4 rounded-full border-2 border-gray-300 text-sm p-0.5 px-4">
                단체와 함께해요!
              </div>
              <p className="text-sm">이런 행동을 실천했어요!</p>
            </div>
          </Link>
          {/* 커뮤니티 글 2 */}
          <Link
            href={`/community/detail/${123}`}
            className="w-1/3 h-[300px] cursor-pointer"
          >
            <div className="w-full h-4/5 mb-4">
              <img
                src="https://contents.lotteon.com/itemimage/20240319145402/LM/88/09/69/69/20/25/6_/00/1/LM8809696920256_001_1.jpg/dims/resizef/720X720"
                alt=""
                className="w-full h-full rounded-3xl"
              />
            </div>
            <div className="flex justify-between mb-2 px-4">
              <div>
                <img />
                <p>스파르타 Greener</p>
              </div>
              <div>🧡 8</div>
            </div>
            <div className="flex justify-center items-center">
              <div className="mr-4 rounded-full border-2 border-gray-300 text-sm p-0.5 px-4">
                단체와 함께해요!
              </div>
              <p className="text-sm">이런 행동을 실천했어요!</p>
            </div>
          </Link>
          {/* 커뮤니티 글 3 */}
          <Link
            href={`/community/detail/${123}`}
            className="w-1/3 h-[300px] cursor-pointer"
          >
            <div className="w-full h-4/5 mb-4">
              <img
                src="https://contents.lotteon.com/itemimage/20240319145402/LM/88/09/69/69/20/25/6_/00/1/LM8809696920256_001_1.jpg/dims/resizef/720X720"
                alt=""
                className="w-full h-full rounded-3xl"
              />
            </div>
            <div className="flex justify-between mb-2 px-4">
              <div>
                <img />
                <p>스파르타 Greener</p>
              </div>
              <div>🧡 8</div>
            </div>
            <div className="flex justify-center items-center">
              <div className="mr-4 rounded-full border-2 border-gray-300 text-sm p-0.5 px-4">
                단체와 함께해요!
              </div>
              <p className="text-sm">이런 행동을 실천했어요!</p>
            </div>
          </Link>
        </div>
        <AddPostModal />
      </div>
    </>
  );
};

export default CommunityList;
