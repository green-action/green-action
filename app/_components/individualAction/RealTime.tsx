"use client";

import { getMessages, sendMessage } from "@/app/_api/messages/messages-api";
import { supabase } from "@/utils/supabase/client";
import { Input } from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface MessageType {
  action_id: string;
  content: string;
  created_at: string;
  id: number;
  user_uid: string;
  users: {
    display_name: string | null;
    email: string | null;
    id: string;
    introduction: string | null;
    point: number | null;
    profile_img: string | null;
  } | null;
}

const RealtimeChat = () => {
  const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState([]);

  const queryClient = useQueryClient();

  // 현재 로그인한 유저 uid
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";
  const action_id = "0cabf4aa-e1bc-4a8d-b754-f9661bf9875a";

  useEffect(() => {
    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          queryClient.invalidateQueries({
            queryKey: ["messagesList"],
          });
          //   // queryClient.setQueryData({
          //   //   queryKey: ["messagesList"]
          //   // }, update);
        },
        // (payload) => {
        //   // Update the specific part of the query data
        //   const newMessage = payload.new;
        //   queryClient.setQueryData(
        //     ["messagesList"],
        //     (prevData: MessageType[]) => {
        //       // Check if prevData is an array, if not, initialize it as an empty array
        //       const newData = Array.isArray(prevData)
        //         ? [...prevData, newMessage]
        //         : [newMessage];
        //       return newData;
        //     },
        //   );
        // },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const {
    data: messagesList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["messagesList", loggedInUserUid],
    queryFn: getMessages,
  });

  if (isLoading) {
    <div>Loading</div>;
  }
  if (isError || messagesList === undefined) {
    <div>Error</div>;
  }

  // console.log("messagesList", messagesList);

  // const messages = supabase
  //   .from("messages")
  //   .on("INSERT", (payload) => {
  //     console.log("New message:", payload.new);
  //   })
  //   .subscribe();

  // const channel = supabase.channel("room1").subscribe((status) => {
  //   if (status === "SUBSCRIBED") {
  //     channel.send({
  //       type: "broadcast",
  //       event: "cursor-pos",
  //       payload: { x: Math.random(), y: Math.random() },
  //     });
  //   }
  // });

  // 메시지 보내기 핸들러
  const handleSendMessage = async () => {
    if (message === "") return;
    setMessage(""); // 메시지를 전송한 후에 입력 필드의 값을 비움

    await sendMessage({
      user_uid: loggedInUserUid,
      action_id,
      content: message,
    });
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <div className="mb-10 font-bold text-3xl">채팅</div>
        {messagesList?.map((message) => (
          <div className="m-3" key={message.id}>
            <div className="">{message.users?.display_name}</div>
            <div>{message.content}</div>
          </div>
        ))}
        {/* <div className="m-3">
          <div className="">작성자</div>
          <div>내용</div>
        </div> */}
        <div>
          <Input
            className="w-80 mb-5 mt-10"
            value={message} // 입력 필드의 값을 상태로 설정
            onChange={(e) => setMessage(e.target.value)} // 입력 필드의 값이 변경될 때마다 상태를 업데이트
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RealtimeChat;
