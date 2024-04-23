import { useResponsive } from "@/app/_hooks/responsive";
import { Button, ModalBody, ModalFooter } from "@nextui-org/react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import HeaderPrivateList from "./HeaderPrivateList";
import HeaderGroupList from "./HeaderGroupList";

const HeaderChatsSelect = ({ onClose }: { onClose: () => void }) => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  return (
    <>
      {/* 1:1채팅방 리스트 / 그룹채팅방 리스트 선택 */}
      <ModalBody>
        <div className="flex w-full flex-col">
          <Tabs aria-label="Options" className="self-center">
            <Tab key="privateChats" title="1:1 문의 목록">
              <Card>
                <CardBody className="bg-[#EAEAEA] w-full h-full pt-10 pb-7">
                  <HeaderPrivateList />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="groupChats" title="그룹 채팅 목록">
              <Card>
                <CardBody className="bg-[#EAEAEA] w-full h-full pt-10 pb-7">
                  <HeaderGroupList />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </ModalBody>
      <ModalFooter className="bg-[#EAEAEA] flex justify-start">
        <Button color="default" onPress={onClose}>
          close
        </Button>
      </ModalFooter>
      {/* 기존
      <ModalHeader className="flex flex-col gap-1 z-10 shadow-md px-7 py-5">
        <div className="text-gray-500 text-xl font-[Italiana]">soom</div>
        <div>나의 1:1 문의 목록</div>
      </ModalHeader>
      <ModalBody className="bg-[#EAEAEA] pt-10 pb-7">
        {selected === "private" && <HeaderPrivateChats />}
        {selected === "group" && <div>그룹 채팅</div>}
      </ModalBody> */}
    </>
  );
};

export default HeaderChatsSelect;
