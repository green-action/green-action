"use client";
import { Button, Card, CardFooter } from "@nextui-org/react";
import Link from "next/link";
import AddPostModal from "../_components/community/AddPostModal";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

const CommunityList = () => {
  const [isLike, setIsLike] = useState(false);

  const handleLikeOnClick = async () => {
    if (!isLike) {
      setIsLike((prev) => !prev);
    } else if (isLike) {
      setIsLike((prev) => !prev);
    }
  };

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
        <div className="flex flex-wrap gap-4">
          {/* nextUI 카드 1*/}
          <div className=" w-[32%]">
            <Card
              isFooterBlurred
              radius="lg"
              className="border-none h-[240px] mb-3"
            >
              <img
                alt="Woman listing to music"
                className="object-cover w-full h-[198px]"
                src="https://cdn.imweb.me/thumbnail/20220707/39dbbc8e6c313.jpg"
              />
              <CardFooter className="justify-between  border-white/20 border-1 overflow-hidden py-1 absolute bottom-0 w-[calc(100%)] shadow-small  z-10 pl-4 pr-1">
                <div className="flex items-center">
                  <div className="rounded-full bg-black mr-4 w-[26px] h-[26px]"></div>
                  <p className="text-tiny text-black text-[13https://cdn.imweb.me/thumbnail/20220707/39dbbc8e6c313.jpgpx]">
                    뚜찌빠찌 Greener
                  </p>
                </div>
                <div className="flex items-center">
                  <Button
                    className="text-white bg-transparent !p-0"
                    radius="lg"
                    size="sm"
                  >
                    <>
                      {isLike ? (
                        <>
                          <FaHeart
                            onClick={handleLikeOnClick}
                            className="hover:cursor-pointer text-rose-600 text-[15px]"
                          />
                          <p className="text-xs text-black">3</p>
                        </>
                      ) : (
                        <>
                          <FaRegHeart
                            onClick={handleLikeOnClick}
                            className="hover:cursor-pointer text-rose-600 text-[15px]"
                          />
                          <p className="text-xs text-black">3</p>
                        </>
                      )}
                    </>
                  </Button>
                </div>
              </CardFooter>
            </Card>
            <div className="flex justify-center items-center">
              <div className="mr-2 rounded-full border-1 border-gray-300 text-xs p-0.5 px-4">
                단체와 함께해요!
              </div>
              <p className="text-xs">제로해 캠페인에 동참했어요! 뿌듯</p>
            </div>
          </div>

          {/* nextUI 카드 2*/}
          <div className=" w-[32%]">
            <Card
              isFooterBlurred
              radius="lg"
              className="border-none h-[240px] mb-3"
            >
              <img
                alt="Woman listing to music"
                className="object-cover"
                src="https://cdn.imweb.me/thumbnail/20220707/39dbbc8e6c313.jpg"
              />
              <CardFooter className="justify-between border-white/20 border-1 overflow-hidden py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 pr-0">
                <div className="flex items-center">
                  <div className="rounded-full bg-black mr-4 w-[26px] h-[26px]"></div>
                  <p className="text-tiny text-black text-[13https://cdn.imweb.me/thumbnail/20220707/39dbbc8e6c313.jpgpx]">
                    뚜찌빠찌 Greener
                  </p>
                </div>
                <div className="flex items-center">
                  <Button
                    className="text-white bg-transparent !p-0"
                    radius="lg"
                    size="sm"
                  >
                    <>
                      {isLike ? (
                        <>
                          <FaHeart
                            onClick={handleLikeOnClick}
                            className="hover:cursor-pointer text-rose-600 text-[15px]"
                          />
                          <p className="text-xs text-black">3</p>
                        </>
                      ) : (
                        <>
                          <FaRegHeart
                            onClick={handleLikeOnClick}
                            className="hover:cursor-pointer text-rose-600 text-[15px]"
                          />
                          <p className="text-xs text-black">3</p>
                        </>
                      )}
                    </>
                  </Button>
                </div>
              </CardFooter>
            </Card>
            <div className="flex justify-center items-center">
              <div className="mr-2 rounded-full border-1 border-gray-300 text-xs p-0.5 px-4">
                단체와 함께해요!
              </div>
              <p className="text-xs">제로해 캠페인에 동참했어요! 뿌듯</p>
            </div>
          </div>

          {/* nextUI 카드 3*/}
          <div className=" w-[32%]">
            <Card
              isFooterBlurred
              radius="lg"
              className="border-none h-[240px] mb-3"
            >
              <img
                alt="Woman listing to music"
                className="object-cover"
                src="https://mblogthumb-phinf.pstatic.net/20160530_37/npine1_14645694042832DjR6_JPEG/%B5%BF%C8%A3%C8%B86.jpg?type=w800"
              />
              <CardFooter className="justify-between border-white/20 border-1 overflow-hidden py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 pr-0">
                <div className="flex items-center">
                  <div className="rounded-full bg-black mr-4 w-[26px] h-[26px]"></div>
                  <p className="text-tiny text-black text-[13https://cdn.imweb.me/thumbnail/20220707/39dbbc8e6c313.jpgpx]">
                    뚜찌빠찌 Greener
                  </p>
                </div>
                <div className="flex items-center">
                  <Button
                    className="text-white bg-transparent !p-0"
                    radius="lg"
                    size="sm"
                  >
                    <>
                      {isLike ? (
                        <>
                          <FaHeart
                            onClick={handleLikeOnClick}
                            className="hover:cursor-pointer text-rose-600 text-[15px]"
                          />
                          <p className="text-xs text-black">3</p>
                        </>
                      ) : (
                        <>
                          <FaRegHeart
                            onClick={handleLikeOnClick}
                            className="hover:cursor-pointer text-rose-600 text-[15px]"
                          />
                          <p className="text-xs text-black">3</p>
                        </>
                      )}
                    </>
                  </Button>
                </div>
              </CardFooter>
            </Card>
            <div className="flex justify-center items-center">
              <div className="mr-2 rounded-full border-1 border-gray-300 text-xs p-0.5 px-4">
                단체와 함께해요!
              </div>
              <p className="text-xs">제로해 캠페인에 동참했어요! 뿌듯</p>
            </div>
          </div>

          {/* nextUI 카드 4*/}
          <div className=" w-[32%]">
            <Card
              isFooterBlurred
              radius="lg"
              className="border-none h-[240px] mb-3"
            >
              <img
                alt="Woman listing to music"
                className="object-cover w-full h-full"
                src="https://image.edaily.co.kr/images/Photo/files/NP/S/2021/11/PS21113001027.jpg"
              />
              <CardFooter className="justify-between border-white/20 border-1 overflow-hidden py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 pr-0">
                <div className="flex items-center">
                  <div className="rounded-full bg-black mr-4 w-[26px] h-[26px]"></div>
                  <p className="text-tiny text-black text-[13https://cdn.imweb.me/thumbnail/20220707/39dbbc8e6c313.jpgpx]">
                    뚜찌빠찌 Greener
                  </p>
                </div>
                <div className="flex items-center">
                  <Button
                    className="text-white bg-transparent !p-0"
                    radius="lg"
                    size="sm"
                  >
                    <>
                      {isLike ? (
                        <>
                          <FaHeart
                            onClick={handleLikeOnClick}
                            className="hover:cursor-pointer text-rose-600 text-[15px]"
                          />
                          <p className="text-xs text-black">3</p>
                        </>
                      ) : (
                        <>
                          <FaRegHeart
                            onClick={handleLikeOnClick}
                            className="hover:cursor-pointer text-rose-600 text-[15px]"
                          />
                          <p className="text-xs text-black">3</p>
                        </>
                      )}
                    </>
                  </Button>
                </div>
              </CardFooter>
            </Card>
            <div className="flex justify-center items-center">
              <div className="mr-2 rounded-full border-1 border-gray-300 text-xs p-0.5 px-4">
                단체와 함께해요!
              </div>
              <p className="text-xs">제로해 캠페인에 동참했어요! 뿌듯</p>
            </div>
          </div>

          {/* 기존 카드 */}
          <Link
            href={`/community/detail/${123}`}
            className="w-[32%] h-[300px] cursor-pointer"
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
