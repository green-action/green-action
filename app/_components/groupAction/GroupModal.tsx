import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

const GroupModal = ({
  action,
}: {
  action: {
    content: string | null;
    hosted_by: string | null;
    id: string;
    img_url: string;
    title: string | null;
  };
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        className="bg-transparent absolute w-[100%] h-[100%] top-0 left-0 z-10"
        onPress={onOpen}
      ></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 max-h-[500px]  overflow-hidden">
                <img
                  className="rounded-3xl bg-origin-border"
                  src={action.img_url}
                  alt="캠페인 포스터"
                />
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
    </>
  );
};

export default GroupModal;
