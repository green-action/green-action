import React from "react";
import CommunityDetailModal from "../community/CommunityDetailModal";
import { Card, CardBody, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const CommentDetail = ({
  item,
  onClose,
}: {
  item: {
    created_at: string;
    id: string;
    message: string;
    post_id: string;
    targetId: string;
  };
  onClose: () => void;
}) => {
  const router = useRouter();
  // 게시글 상세 모달창 open여부 props
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div key={item.id}>
      <Card className="mb-[20px]">
        <CardBody
          onClick={() => {
            // onClose();
            router.push(`/community`);
            onOpen();
          }}
          className="cursor-pointer"
        >
          {item.message}
        </CardBody>
      </Card>
      {isOpen && (
        <CommunityDetailModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          post_id={item.post_id}
        />
      )}
    </div>
  );
};

export default CommentDetail;
