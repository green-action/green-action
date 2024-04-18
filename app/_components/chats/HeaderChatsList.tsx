import React from "react";
import { ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

const HeaderChatsList = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      {/* 모달 내용물 분리 - 헤더에서 클릭시 1:1채팅, 그룹채팅 / 상세페이지에서 클릭시 해당 액션의 채팅리스트 모아보기 */}
      {/* 헤더에서 클릭시 + 상세페이지에서 클릭시 이 모달을 열어야되는데, open상태를 어디서 관리해야하나? */}
      {/* 일단 헤더에서 모달창 열게 만들어놓고, 모달 사이즈부터 수정해보자. 페이지 오른쪽에 꽉차게 만들기 */}
      {/* 상세페이지 : 로그인유저 === 액션장인 경우 '1:1문의 목록보기'로 문구 변경 */}
      <ModalHeader className="flex flex-col gap-1">
        1:1채팅방 리스트 / 그룹채팅방 리스트
      </ModalHeader>
      <ModalBody>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
          hendrerit risus, sed porttitor quam.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
          hendrerit risus, sed porttitor quam.
        </p>
        <p>
          Magna exercitation reprehenderit magna aute tempor cupidatat consequat
          elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum
          quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do
          dolor eiusmod.
        </p>
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
  );
};

export default HeaderChatsList;
