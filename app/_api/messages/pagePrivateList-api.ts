import { supabase } from "@/utils/supabase/client";

// 액션별 1:1 채팅방 room_id들 배열로 가져오기
export const getPrivateRoomIds = async (action_id: string) => {
  const { data, error } = await supabase
    .from("chat_rooms_info")
    // sender_uid와 연결된 테이블가서 display_name가져오기, content중 가장 최근꺼 하나만 가져오기
    .select("id")
    .eq("action_id", action_id)
    .eq("room_type", "개인");

  if (error) {
    console.log("error", error.message);
    throw error;
  }
  const roomIds = data.map((item) => {
    return item.id;
  });
  return roomIds;
};

// TODO 이중 외래키로 채팅방의 참가자 닉네임, 프로필 가져오기 (chat_participants - participant_type이 '개인' 인 participant_uid -> users 접근)
// 1:1 채팅방 리스트 가져오기
// export const getPrivateChatsList = async (roomIds: string[]) => {
//   const chatPromises = roomIds.map(async (roomId) => {
//     const { data, error } = await supabase
//       .from("chat_messages")
//       .select("created_at, content, room_id, users(display_name, profile_img)")
//       // .select(
//       //   "created_at, content, room_id, chat_participants(filter(participant_type='참가자'), users(display_name, profile_img)))",
//       // )
//       .eq("room_id", roomId)
//       // .eq(chat_participants("participant_type", "참가자"))
//       .order("created_at", { ascending: false })
//       .limit(1);

//     if (error) {
//       console.log(
//         `Error fetching chat messages for room ${roomId}: ${error.message}`,
//       );
//       throw error;
//     }

//     if (data && data.length > 0) {
//       return data[0]; // 가장 최신 메시지 반환
//     } else {
//       // 메시지 없이 빈 채팅방인 경우
//       return;
//     }
//   });

//   // const chatList = await Promise.all(chatPromises);
//   // return chatList;

// const chatList = await Promise.all(chatPromises);

// // chatList에서 undefined 값 제거하고 값 있는 채팅만 필터링하여 새로운 배열 반환
// const filteredChatList = chatList.filter((chat) => chat !== undefined);

//   return filteredChatList;
// };

// 채팅방 리스트 가져오기 (채팅방 참가자 정보 포함)
export const getPrivateChatsList = async (roomIds: string[]) => {
  const chatPromises = roomIds.map(async (roomId) => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("created_at, content, room_id, sender_uid")
      .eq("room_id", roomId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      console.log(
        `Error fetching chat messages for room ${roomId}: ${error.message}`,
      );
      throw error;
    }

    if (data && data.length > 0) {
      return data[0]; // 가장 최신 메시지 반환
    } else {
      // 메시지 없이 빈 채팅방인 경우
      return;
    }
  });

  const chatList = await Promise.all(chatPromises);

  // chatList에서 undefined 값 제거하고 값 있는 채팅만 필터링하여 새로운 배열 반환
  const filteredChatList = chatList.filter((chat) => chat !== undefined);

  // 각 채팅 메시지의 room_id 배열 추출
  const filteredRoomIds = filteredChatList.map((chat) => chat?.room_id);

  // 채팅방 '참가자'의 display_name, profile_img 가져오기
  const { data: participantData, error } = await supabase
    .from("chat_participants")
    .select("users(id, display_name, profile_img)")
    .in("room_id", filteredRoomIds)
    .eq("participant_type", "참가자");

  if (error) {
    console.log("error", error.message);
    throw error;
  }

  // 채팅방에 참가한 사용자 데이터와 채팅 메시지를 결합하여 반환
  const combinedData = filteredChatList.map((chat) => {
    const participant = participantData.find(
      (participant) => participant.users?.id === chat?.sender_uid,
    );

    if (participant) {
      return {
        ...chat,
        user: {
          display_name: participant.users?.display_name,
          profile_img: participant.users?.profile_img,
        },
      };
    } else {
      // 참가자 데이터를 찾을 수 없는 경우에 대한 처리
      console.log(`Participant data not found for room ${chat?.room_id}`);
      return chat;
    }
  });

  return combinedData;
};
