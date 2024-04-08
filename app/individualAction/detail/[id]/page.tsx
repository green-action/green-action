"use client";
import KakaoShareButton from "@/app/_components/kakaoShare/KakaoShare";
import {
  useActionImages,
  useIndividualAction,
} from "@/app/_hooks/useQueries/individualActions";
import { Avatar, Chip, CircularProgress } from "@nextui-org/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";
import React from "react";
import { FaRegCalendar } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSession } from "next-auth/react";
import { RxPerson } from "react-icons/rx";
import Bookmark from "@/app/_components/bookmark/Bookmark";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const DetailPage = () => {
  const session = useSession();
  const user_uid = session?.data?.user.user_uid || "";
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // 참여하기 모달창
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  };

  // const { data, isLoading: fetchUserInfoLoading } = useFetchUserInfo(user_uid);
  // const { display_name, introduction, profile_img } = (data as User) || "";

  const { id: postId } = useParams<Params>();
  const params = { id: postId };
  const {
    data: individualAction,
    isLoading: individualActionLoading,
    isError: individualActionError,
  } = useIndividualAction({ params });

  // 상세 이미지 가져오기
  const {
    data: imgUrl,
    isLoading: actionImagesLoading,
    isError: actionImagesError,
  } = useActionImages({ params });

  // 두 요청이 모두 완료되었는지 확인
  const isLoading = individualActionLoading || actionImagesLoading;
  const isError = individualActionError || actionImagesError;

  console.log("이미지url : ", imgUrl);

  if (isLoading || !individualAction)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="success" aria-label="Loading..." />
      </div>
    );
  const detail = individualAction![0];
  console.log(detail);

  if (isError) return <div>Error fetching details...</div>;
  return (
    <>
      <div className="flex flex-col w-[1200px] h-auto mx-auto m-5">
        <div className="grid grid-cols-4 grid-rows-3 gap-4">
          <div className="col-span-1 row-span-1 border-2 border-gray-300 rounded-3xl">
            <div className="mt-5 ml-5 mr-5 mb-3 border-b-2 border-b-gray-300 content-center">
              <div className="flex gap-4 items-center">
                <Avatar
                  showFallback
                  src={detail.users?.profile_img || ""}
                  className="w-[2.5rem] h-[2.5rem]"
                />
                <div className="flex flex-col gap-[0.1rem] w-[9rem]">
                  <p className="text-[0.7rem]">작성자</p>
                  <p className="font-bold text-sm">
                    {detail.users?.display_name} Greener
                  </p>
                </div>
              </div>
              <div className="flex items-end pb-2"></div>
            </div>
            <div className="m-5">
              <p className="text-[0.8rem]">{detail.users?.introduction}</p>
            </div>
          </div>

          <div className="col-span-3 row-span-1 border-2 border-gray-300 rounded-3xl pt-4 pl-10 pr-10">
            <Chip className="text-base">Green-action</Chip>
            <div className="flex justify-between mt-5 mb-6 pb-1 border-b-2 border-gray-300">
              <p className="font-extrabold text-xl">{detail.title}</p>
              <div className="flex flex-row text-sm">
                <Chip
                  size="sm"
                  color={`${detail.is_recruiting ? "success" : "default"}`}
                  className="text-white mr-3"
                >
                  {detail.is_recruiting ? "모집중" : "마감됨"}
                </Chip>
                <RxPerson className="float-end mr-1" />
                <p className="float-end mr-3">최대 {detail.recruit_number}명</p>
                <Bookmark action_id={params.id} />
              </div>
            </div>

            <div className="border-b-2 w-1/3 text-sm">
              <FaRegCalendar className="float-left mr-3" />
              <p>
                날짜&nbsp;&nbsp; {detail.start_date} ~ {detail.end_date}
              </p>
            </div>
            <div className="mt-1 mb-2 text-sm">
              <LuMapPin className="float-left mr-3" />
              <p>장소&nbsp;&nbsp; {detail.location}</p>
            </div>
          </div>

          <div className="col-span-1 row-span-1">
            <div className="p-2 mb-4 border-2 border-gray-300 rounded-3xl text-center font-extrabold cursor-pointer">
              1:1 채팅하기
            </div>

            <div
              className="p-2 mb-4 border-2 border-gray-300 rounded-3xl text-center font-extrabold cursor-pointer"
              key={"opaque"}
              color="warning"
              onClick={() => handleOpen()}
            >
              참여하기
            </div>
            <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Green-action 참여 오픈채팅방
                    </ModalHeader>
                    <ModalBody>
                      <a href={detail.kakao_link!}>{detail.kakao_link}</a>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onPress={onClose}>
                        닫기
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            <KakaoShareButton description={detail.content!} />
          </div>
          <div className="col-span-3 row-span-2 border-2 border-gray-300 rounded-3xl flex justify-around pt-12">
            <div className="w-[300px] h-[400px]">
              <p className="text-neutral-600">상세내용</p>
              <br />
              <p className="text-neutral-600">{detail.content}</p>
            </div>
            <div>
              {/* 이미지 슬라이드 */}
              {imgUrl!.length === 1 ? (
                <img
                  src={imgUrl![0].img_url}
                  alt="green_action_image"
                  className="w-[250px] h-[250px]"
                />
              ) : (
                <Slider {...settings} className="w-[250px] h-[250px]">
                  {imgUrl?.map((item) => {
                    return (
                      <div>
                        <img
                          src={item.img_url}
                          alt="green_action_image"
                          className="w-[250px] h-[250px]"
                        />
                      </div>
                    );
                  })}
                </Slider>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
