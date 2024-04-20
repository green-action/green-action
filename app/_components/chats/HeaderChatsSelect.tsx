import { useState } from "react";
import { useResponsive } from "@/app/_hooks/responsive";
import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarContent,
  Tab,
  Tabs,
} from "@nextui-org/react";
import HeaderPrivateChats from "./HeaderPrivateList";

const HeaderChatsSelect = ({ onClose }: { onClose: () => void }) => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const [selected, setSelected] = useState<string>("private"); // 탭의 선택 상태

  const handleSelectedTab = (mode: string) => {
    setSelected(mode);
  };

  // console.log("selected", selected);

  return (
    <>
      {/* 탭 선택 - UT 후 리팩토링 예정 */}
      {/* 1:1채팅방 리스트 / 그룹채팅방 리스트 */}
      {/* <ModalHeader className="flex flex-col gap-1">
        <Navbar className={`${isDesktop && "flex w-full"}`}>
          <NavbarContent>
            <div className="flex flex-col items-center">
              <Tabs
                selectedKey={selected} // 선택된 부모 탭의 키
                radius="full"
                aria-label="NavBar-Tab-Options"
                variant="light"
                className="flex rounded-full bg-white/30 font-bold" // + 볼드체
                classNames={{
                  tab: "px-4 desktop:h-[35px] laptop:h-[27px]",
                  tabList:
                    "flex items-center desktop:gap-[10px] laptop:gap-[30px] desktop:h-[45px] laptop:h-[35px] desktop:w-[600px] laptop:w-[446px]", // d:w-[511px] h-[39px]인데 자체변경? / laptop gap 자체
                  tabContent:
                    "flex items-center text-[#454545] desktop:text-[13pt] laptop:text-[10pt] laptop:h-[35px]", // ㅣ:text 11 자체
                }}
              >
                <Tab
                  key="private"
                  title="1:1 채팅"
                  className="desktop:w-[10rem] laptop:w-[96px]"
                  // onClick={() => handleSelectedTab("private")}
                  onSelect={() => setSelected("private")}
                />
                <Tab
                  key="group"
                  title="그룹채팅"
                  className="desktop:w-[10rem] laptop:w-[96px]"
                  // onClick={() => handleSelectedTab("group")}
                  onSelect={() => setSelected("group")}
                />
              </Tabs>
            </div>
          </NavbarContent>
        </Navbar>
      </ModalHeader> */}
      <ModalHeader className="flex flex-col gap-1 z-10 shadow-md px-7 py-5">
        <div className="text-gray-500 text-xl font-[Italiana]">soom</div>
        <div>나의 1:1 문의 목록</div>
      </ModalHeader>
      <ModalBody className="bg-[#EAEAEA] pt-10 pb-7">
        {selected === "private" && <HeaderPrivateChats />}
        {selected === "group" && <div>그룹 채팅</div>}
      </ModalBody>
      <ModalFooter className="bg-[#EAEAEA] flex justify-start">
        <Button color="default" onPress={onClose}>
          close
        </Button>
      </ModalFooter>
    </>
  );
};

export default HeaderChatsSelect;
