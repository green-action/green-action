"use client";
import React from "react";
import { useGroupAction } from "../_hooks/useQueries";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

const groupActionPage = () => {
  const { data: groupAction, isLoading } = useGroupAction();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (isLoading || !groupAction) {
    return <div>Loading...</div>;
  }
  const { groupGreenActions, error } = groupAction;
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {groupGreenActions.map((action) => {
        return (
          <div key={action.id}>
            <img src={action.img_url} alt="campaign Img" />
            <h2>캠페인 명 : {action.title}</h2>
            <Button onPress={onOpen}>자세히</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      <img src={action.img_url} alt="캠페인 포스터" />
                    </ModalHeader>
                    <ModalBody>
                      <h2>캠페인 명 : {action.title}</h2>
                      <p>주관 : {action.hosted_by}</p>
                      <p>상세내용 : {action.content}</p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        );
      })}
    </>
  );
};

export default groupActionPage;
