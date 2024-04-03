import { CommunityDetailProps } from "@/app/_types/community/community";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";

// AddPostModal 복사본 - 버튼 대신 각 포스트 클릭했을때 이동하도록 수정 필요
const CommunityDetailModal = ({
  isOpen,
  onOpen,
  onOpenChange,
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
        <ModalContent className="h-[600px]">
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-2 items-center mt-4 pb-1 ml-4">
                <div className="bg-black w-[30px] h-[30px] rounded-full mr-2" />
                <p className="font-semibold text-xs">뚜찌빠찌</p>
                <p className="font-normal text-xs">Greener</p>
              </ModalHeader>
              <ModalBody>
                {/* 이미지 자리 */}
                <div className="mx-auto mb-1 w-[96%] h-[60%] rounded-2xl bg-slate-300"></div>
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
                  {/* 두번째 : 활동 내용 */}
                  <p className=" mx-auto text-xs mb-2 w-[97%]">
                    활동내용이 어쩌구저쩌구 이래서 저래서 재밌었고 어쩌구
                    활동내용이 어쩌구저쩌구 이래서 저래서 재밌었고 어쩌구
                    활동내용이 ...더보기
                  </p>
                  {/* 세번째 : 작성일, dot */}
                  <div className="flex justify-between items-end">
                    <p className="text-[11px]">2024-04-03</p>
                    <HiOutlineDotsVertical />
                  </div>
                  <hr />
                  {/* 댓글 wrapper */}
                  <div className="flex flex-col">
                    <p className="text-xs">댓글</p>
                    {/* 댓글 등록 */}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommunityDetailModal;
