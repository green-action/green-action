import { useResponsive } from "@/app/_hooks/responsive";
import { Button, ModalBody, ModalFooter } from "@nextui-org/react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import HeaderPrivateList from "./HeaderPrivateList";
import HeaderGroupList from "./HeaderGroupList";
import { useState } from "react";

const HeaderChatsSelect = ({ onClose }: { onClose: () => void }) => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const [privateSelected, setPrivateSelected] = useState(true);

  return (
    <>
      {/* 1:1채팅방 리스트 / 그룹채팅방 리스트 선택 */}
      <ModalBody className="p-0">
        <div className="flex w-full flex-col">
          <div className="h-screen">
            <div
              className={`${
                isDesktop
                  ? "w-full"
                  : isLaptop
                  ? "w-full"
                  : isMobile && "w-[332px] rounded-t-[55px]"
              } fixed bg-white z-10 flex text-[20px] h-[13%] gap-8 h-[60px] items-end pl-11`}
            >
              <div
                className={`pb-2 cursor-pointer ${
                  privateSelected
                    ? "border-b-3 border-black font-black text-black"
                    : "text-gray-500 "
                }`}
                onClick={() => setPrivateSelected(true)}
              >
                1:1 채팅
              </div>
              <div
                className={`pb-2 cursor-pointer ${
                  !privateSelected
                    ? "border-b-3 border-black font-black text-black"
                    : "text-gray-500 "
                }`}
                onClick={() => setPrivateSelected(false)}
              >
                단체 채팅
              </div>
            </div>
            <div
              className={`bg-[#F2F2F2] w-full h-full ${
                isDesktop
                  ? "mt-[17%]"
                  : isLaptop
                  ? "mt-[15%]"
                  : isMobile && "mt-[15%]"
              }`}
            >
              {privateSelected ? <HeaderPrivateList /> : <HeaderGroupList />}
            </div>
          </div>
        </div>
      </ModalBody>
    </>
  );
};

export default HeaderChatsSelect;
