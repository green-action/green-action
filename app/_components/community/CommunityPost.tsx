import React from "react";
import { useState } from "react";
import { Button, Card, CardFooter } from "@nextui-org/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CommunityPost = () => {
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
      <div className=" w-[31%] mb-4">
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
    </>
  );
};

export default CommunityPost;
