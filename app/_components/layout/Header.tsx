"use client"; // import from "@nextui-org/react"; 시 꼭 필요

import { Avatar, CircularProgress, Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { logoutUser } from "../../_api/auth";
import { useQueryUser } from "../../_hooks/useQueries/user";

function Header() {
  const { data: session, isLoading: sessionIsLoading } = useQueryUser();
  const isLoggedIn = session?.user ? true : false;

  const handleLogout = async () => {
    const confirmed = window.confirm("로그아웃 하시겠습니까?");
    if (confirmed) {
      try {
        await logoutUser();
        // logout();
        alert("로그아웃 되었습니다.");
        router.replace("/");
      } catch (error) {
        console.error("Logout error:", error);
      }
    } else {
      return;
    }
  };

  const pathname = usePathname();
  const router = useRouter();
  // TODO 하위 탭 선택 시의 문제 해결하기

  // const [selected, setSelected] = useState("/");

  // 부모 탭의 선택 상태
  const [parentSelected, setParentSelected] = useState(null);

  // 하위 탭의 선택 상태
  const [childSelected, setChildSelected] = useState<string | null>(null);

  // 부모 탭 선택 시 하위 탭 선택 상태 초기화
  const handleParentTabSelect = (key: any) => {
    setParentSelected(key);
    // setChildSelected(null); // 부모 탭이 선택될 때 하위 탭의 선택 상태 초기화
    // if (key !== "/groupAction") {
    //   setChildSelected(null); // 부모 탭이 '단체와 함께해요'가 아닌 경우에만 하위 탭의 선택 상태 초기화
    // }
  };

  if (sessionIsLoading) {
    return (
      // 임시로 처리
      <div className="flex justify-center items-center h-40">
        <CircularProgress
          color="success"
          label="세션 정보를 가져오는 중입니다...!"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mx-[5rem] h-[10rem]">
      <div>
        <Link href={"/"}>LOGO</Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Tabs
          // selectedKey={pathname}
          // selectedKey={selected}
          // onSelectionChange={setSelected}
          // key="md"
          selectedKey={parentSelected || pathname} // 선택된 부모 탭의 키 또는 경로 사용
          size="md"
          radius="full"
          aria-label="Options"
          color="default"
          className="flex justify-center" // 여기에서 w넓이로 gap 넓힐 수 없고, m,gap 으로도 안됨
          // onSelectionChange={(value: any) => {
          //   console.log("The value is", value);
          //   router.push(value);
          // }}
        >
          <Tab
            key="/about"
            title="About"
            as={Link}
            href="/about"
            className="w-[10rem]"
            onSelect={() => handleParentTabSelect("/about")}
          />
          <Tab
            as={Link}
            href="/individualAction"
            key="/individualAction"
            // defaultSelectedKey={`/individualAction`} //안됨
            // onSelect={() => {
            //   setSelected(true);
            // }}
            title="Green Action"
            className="w-[10rem] flex justify-center"
            onSelect={(key) => handleParentTabSelect(key)}
          >
            <Tabs
              // key="md"
              title="Green-Action"
              size="md"
              radius="full"
              aria-label="green-action-sub-nav"
              color="default"
              className="flex w-[20rem]"
              selectedKey={childSelected || pathname} // 선택된 하위 탭의 키 또는 경로 사용4\
              // onSelectionChange={() => {}}
              // onSelectionChange={(key: any) => {
              //   key === '/groupAction' ?
              // }}
              // selectedKey={pathname}
              // selectedKey={selected}
              // onSelectionChange={setSelected}
              // defaultSelectedKey={`/individualAction`}
            >
              <Tab
                // as={Link}
                href="/individualAction"
                key="/individualAction"
                title="개인과 함께해요"
                className="w-[10rem]"
                onSelect={() => setChildSelected("/individualAction")}
              />
              <Tab
                as={Link}
                href="/groupAction"
                key="/groupAction"
                title="단체와 함께해요"
                className="w-[10rem]"
                onSelect={() => setChildSelected("/groupAction")}
              />
            </Tabs>
          </Tab>
          <Tab
            as={Link}
            key="/community"
            title="Community"
            href="/community"
            className="w-[10rem]"
            onSelect={() => handleParentTabSelect("/community")}
          />
          <Tab
            as={Link}
            key="/goods"
            title="Goods"
            href="/goods"
            className="w-[10rem]"
            onSelect={() => handleParentTabSelect("/goods")}
          />
        </Tabs>
      </div>
      <div className="flex gap-10">
        {/* 임시: 로그인상태에 따라 수정예정 */}
        {isLoggedIn ? (
          <>
            <Link href={"/"} onClick={handleLogout}>
              Logout
            </Link>
            <Link href={"/mypage"}>
              <Avatar showFallback src="" size="md" />
            </Link>
          </>
        ) : (
          <>
            <Link href={"/signup"}>Sign up</Link>
            <Link href={"/login"}>Log in</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
