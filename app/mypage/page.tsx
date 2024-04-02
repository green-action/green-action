import { supabase } from "@/utils/supabase/client";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import pointQuestion from "@/app/_assets/Group 32.png";
import React from "react";
import Image from "next/image";

const MyPage = async () => {
  const userUId = "6f971b1e-abaf-49d5-90e7-f8c6bfe4bd58"; // 임시 유저 아이디 설정
  // 6f971b1e-abaf-49d5-90e7-f8c6bfe4bd58  55e7ec4c-473f-4754-af5e-9eae5c587b81

  // TODO: myActions 없는 경우 처리
  // TODO: 리액트 아이콘 사용?
  // 상태변경할거라 리액트쿼리 사용?
  const fetchMyGreenActions = async () => {
    try {
      // 나중에 따로 분리하기?
      const { data: myActions, error } = await supabase
        .from("individual_green_actions")
        .select(
          "*, actionImgUrls:green_action_images(img_url), actionBookmarks:bookmarks(id)",
        )
        .eq("user_uid", userUId);
      if (error) throw error;
      console.log("myActions :", myActions);
      // console.log(
      //   "🐰 ~ fetchMyGreenActions ~ actionImgUrls : ",
      //   myActions[0].actionImgUrls,  // [{img_url:'', ..}]
      // );
      return myActions;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMyCommunityPosts = async () => {
    try {
      // 나중에 따로 분리하기?
      const { data: myPosts, error } = await supabase
        .from("community_posts")
        .select("*, communityLikes:likes(id)")
        .eq("user_uid", userUId);
      if (error) throw error;
      console.log("myPosts ", myPosts);
      return myActions;
    } catch (error) {
      console.error(error);
    }
  };

  const myActions = await fetchMyGreenActions();
  const myPosts = await fetchMyCommunityPosts();

  console.log(myActions![0].actionImgUrls[0]?.img_url);

  return (
    <div className="flex justify-center mt-10">
      <div className="flex w-[1400px] bg-red-200">
        <div className="flex flex-col gap-5 min-h-[42rem] bg-lime-200">
          <div className="flex gap-3 items-center">
            <Avatar showFallback src="" className="w-[4rem] h-[4rem]" />
            {/* size="lg"  */}
            {/* 메타데이터에서 가져와야 getUser? 일단 임시로하기 */}
            <div className="flex flex-col">
              <p>스파르타</p>
              <p>Greener</p>
            </div>
          </div>
          <Card className="w-[18rem] min-h-[16rem] p-[0.5rem]">
            <CardHeader className="font-bold">
              <p>My Profile</p>
            </CardHeader>
            <CardBody>
              <p className="text-sm">자기 소개를 아직 작성하지 않았어요.</p>
            </CardBody>
            <CardFooter className="flex justify-end">
              <button className="text-2xl">+</button>
            </CardFooter>
          </Card>
          <Card className="">
            <CardHeader className="mb-[-1.5rem]">
              <p>Points</p>
            </CardHeader>
            <CardBody className="flex">
              <div className="font-bold w-[10rem]">1000 P</div>
            </CardBody>
            <CardFooter className="flex justify-end">
              {/* mt-[-2.7rem] - hover 안됨*/}
              <Tooltip
                showArrow={true}
                key="bottom"
                placement="bottom"
                content={
                  <div className="text-gray-500 p-2 text-center  text-[0.8rem]">
                    {/* text-[0.8rem] */}
                    <p>Q. 포인트는 어디에 사용하나요?</p>
                    <p>A. 굿즈를 구매하실 수 있습니다!</p>
                    <br />
                    <p>Q. 포인트는 어떻게 얻을 수 있나요?</p>
                    <p>
                      A. 'Green Action' - '개인과 함께해요'에서 <br />
                      개인 Green Action에 참여하고
                      <br /> 'Community'에 인증샷을 올려주시면
                      <br /> 포인트 획득이 가능합니다!
                    </p>
                  </div>
                }
                className="w-[19rem]"
              >
                <Image
                  src={pointQuestion}
                  alt="questionMark"
                  width={17}
                  // className="bg-purple-300"
                />
              </Tooltip>
            </CardFooter>
          </Card>
        </div>
        {/* --------------- */}
        <div className="flex flex-col gap-10 px-10 pt-1">
          <div className="flex gap-10">
            <Button radius="full" size="md">
              My Green-Action
            </Button>
            <Button radius="full" size="md">
              작성게시물
            </Button>
            <Button radius="full" size="md">
              찜한 Green-Action
            </Button>
          </div>
          <div>
            <Card className="w-[20rem]">
              {/* 누르면 해당 상세페이지로 이동 */}
              <CardHeader>
                {/* 이미지 없는 경우 기본? */}
                <img
                  src={myActions![0].actionImgUrls[0]?.img_url}
                  alt="action-img"
                  width={250}
                  height={250}
                ></img>
              </CardHeader>
              <CardBody>
                <p>{myActions![0].title}</p>
                <p>{myActions![0].location}</p>
                <p>모집인원 : {myActions![0].recruit_number}</p>
                <p>북마크 : {myActions![0].actionBookmarks.length}</p>
                <Chip>모집중</Chip>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
