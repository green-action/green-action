import { CommunityDetailProps } from "@/app/_types/community/community";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";

// AddPostModal 복사본 - 버튼 대신 각 포스트 클릭했을때 이동하도록 수정 필요
const CommunityDetailModal = ({
  isOpen,
  onOpenChange,
  post_id,
}: CommunityDetailProps) => {
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="h-[600px] overflow-y-auto scrollbar-hide">
          {() => (
            <>
              <ModalHeader className="flex gap-2 items-center mt-1 pb-1 ml-4">
                <div className="bg-black w-[30px] h-[30px] rounded-full mr-2" />
                <p className="font-semibold text-xs">뚜찌빠찌</p>
                <p className="font-normal text-xs">Greener</p>
              </ModalHeader>
              <ModalBody>
                {/* 이미지 자리 */}
                <div className="mx-auto mb-1 w-[96%] h-[260px] rounded-2xl bg-slate-300"></div>
                {/* 이미지 아래 전체 wrapper */}
                <div className="flex flex-col gap-2 w-[90%] mx-auto">
                  {/* 첫 줄 */}
                  <div className="flex justify-between mb-2 ">
                    <div className="flex gap-2 items-center">
                      <p className=" rounded-full border-1 border-gray-300 text-xs p-0.5 px-4 w-[110px]">
                        개인과 함께해요
                      </p>
                      <p className="text-[13px] font-semibold">
                        쓰레기 줍기 실천 인증!!
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isLike ? (
                        <>
                          <FaHeart
                            onClick={handleLikeOnClick}
                            className="hover:cursor-pointer text-rose-600 text-[17px]"
                          />
                          <p className="text-xs text-black">3</p>
                        </>
                      ) : (
                        <>
                          <FaRegHeart
                            onClick={handleLikeOnClick}
                            className="hover:cursor-pointer text-rose-600 text-[17px]"
                          />
                          <p className="text-xs text-black">3</p>
                        </>
                      )}
                    </div>
                  </div>
                  {/* 두번째 : 활동 내용 -> ...더보기 처리하기*/}
                  <p className=" mx-auto text-xs mb-2 w-[97%]">
                    활동내용이 어쩌구저쩌구 이래서 저래서 재밌었고 어쩌구
                    활동내용이 어쩌구저쩌구 이래서 저래서 재밌었고 어쩌구
                    활동내용이 ...더보기
                  </p>
                  {/* 세번째 : 작성일, dot -> 내가 쓴 글 일 때만 보이게 */}
                  <div className="flex justify-between items-end mb-1">
                    <p className="text-[11px]">2024-04-03</p>
                    <HiOutlineDotsVertical className="cursor-pointer" />
                  </div>
                  <hr className="my-2" />
                  {/* 댓글 wrapper */}
                  <div className="flex flex-col mx-auto mb-2 w-[95%]">
                    <p className="text-xs mb-1">댓글</p>
                    {/* 댓글 등록 - 로그인 상태일 때만 보이게 */}
                    <form className="flex items-center border-1 border-gray-300 h-[30px] rounded-full mb-4">
                      <label className="w-[88%]">
                        <input
                          type="text"
                          id="activityTitle"
                          name="activityTitle"
                          required
                          className=" h-[34px] ml-5 pr-4 bg-inherit focus:outline-none text-xs text-gray-400"
                        />
                      </label>
                      <button
                        type="submit"
                        className="text-xs mr-2 cursor-pointer"
                      >
                        | 등록
                      </button>
                    </form>
                    {/* 댓글 1개 */}
                    <div className="flex w-[90%] mx-auto mb-4">
                      <div className="bg-black mr-2 w-[20px] h-[20px] rounded-full"></div>
                      <div className="flex flex-col justify-between">
                        <p className="text-xs mt-1 mb-1">스파르타 Greener</p>
                        <p className="text-xs text-gray-500">우왕 멋져요!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommunityDetailModal;
