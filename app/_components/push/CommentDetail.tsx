import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CommunityDetailModal from "../community/CommunityDetailModal";
import { Card, CardBody, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { updateUnreadPush } from "@/app/_api/push/push-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY_MY_PUSHLIST } from "@/app/_api/queryKeys";

const CommentDetail = ({
  item,
  setAlarm,
  alarm,
}: {
  item: {
    created_at: string;
    id: string;
    message: string;
    post_id: string;
    targetId: string;
    isRead: boolean;
  };
  setAlarm: React.Dispatch<
    SetStateAction<
      {
        created_at: string;
        id: string;
        message: string;
        post_id: string;
        targetId: string;
        isRead: boolean;
      }[]
    >
  >;
  alarm: {
    created_at: string;
    id: string;
    message: string;
    post_id: string;
    targetId: string;
    isRead: boolean;
  }[];
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateUnreadPushHandler = (id: string) => {
    const temp = alarm.map((item) => {
      console.log(item);
      return item.id === id ? { ...item, isRead: true } : item;
    });

    console.log(temp);
    setAlarm(temp);

    updateUnreadPushList(item.id);
  };

  // 게시글 상세 모달창 open여부 props
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // push 읽음 처리 mutation
  const { mutate: updateUnreadPushList } = useMutation({
    mutationFn: (id: string) => updateUnreadPush(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_MY_PUSHLIST],
      });
    },
  });

  return (
    <div key={item.id}>
      <Card className="mb-[20px]">
        <CardBody
          onClick={() => {
            updateUnreadPushHandler(item.id);
            // onClose();
            router.push(`/community`);
            onOpen();
          }}
          className={`cursor-pointer ${item.isRead ? "text-gray-500" : ""}`}
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
