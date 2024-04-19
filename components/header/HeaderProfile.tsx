import { useFetchUserInfo } from "@/app/_hooks/useQueries/mypage";
import { User } from "@/app/_types";
import { Avatar, Chip } from "@nextui-org/react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";

interface Props {
  session: Session | null;
  isLoggedIn: boolean;
}

const HeaderProfile = ({ isLoggedIn, session }: Props) => {
  const user_uid = session?.user.user_uid as string;
  const { data: userData, isLoading: isUserDataLoading } =
    useFetchUserInfo(user_uid);
  // console.log("유저데이터==>", userData);
  const { display_name, profile_img } = (userData as User) || "";
  return (
    <>
      {isLoggedIn && (
        <Avatar
          as="button"
          className="transition-transform laptop:w-[30px] desktop:w-[38px] laptop:h-[30px] desktop:h-[38px] desktop:ml-[0px] laptop:ml-[8px]"
          name={display_name}
          // size="sm"
          showFallback
          src={profile_img || ""}
        />
      )}
    </>
  );
};

export default HeaderProfile;

// 헤더도 서버컴포넌트로 변경해야될수도?.. 데이터를 불러오도록변경해야함
// 마이페이지 api 쿼리 유저정보가져오는걸 다없애야함
// 2안 한번만 깜빡이게 ㅎㅎ
// 사용자 정보가 다들어오기전까지 전체화면이 흰화면!
// 렌더링된다음에요청 ㅋ하니깐 그런거야~
// 유저프로필 버튼만 다른 컴포넌트로 뺀다(서버클라이언트) => 헤더에 props로 넘겨주기
// useSeeion = > status 사용하기

// 컴포넌트를 따로 빼는게 좋을거같음 칩이랑 아바타만 빼서(트리거하위영역)

// components app폴더 useclient csr 컴포넌트 전체다 밖으로 빼는게좋다 왜냐하면
// 나중에 렌더링후에 html을 보여주기 때문에 느리다 <= 현재사용하는방법
//  js와 html 렌더링하는동시에 데이터를 불러올수있어 빨라져서 좋다 ssr (렌더링을 위해~)      () < 감싸면 없는처리됨
// app 폴더는 라우트만있게하기 !!!!!!!
// 컴포넌트화 시키는것=> 코드스슬플리팅