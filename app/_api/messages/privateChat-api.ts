import { supabase } from "@/utils/supabase/client";

// 메시지 리스트 가져오기
export const getMessages = async (room_id: string) => {
  const { data, error } = await supabase
    .from("chat_messages")
    .select("*, users(display_name, profile_img)")
    .eq("room_id", room_id)
    .order("created_at", { ascending: true });
  // 개수 100개쯤 제한? -> 무한스크롤 10개씩 증가할수있음

  if (error) {
    console.log("error", error.message);
    throw error;
  }
  return data;
};

// 액션장 uid 가져오기
export const getActionOwnerUid = async (action_id: string) => {
  const { data: ownerId, error: ownerIdError } = await supabase
    .from("individual_green_actions")
    .select("user_uid")
    .eq("id", action_id);

  if (ownerIdError) {
    console.log("error", ownerIdError.message);
    throw ownerIdError;
  }

  const actionOwnerId = ownerId[0].user_uid;
  return actionOwnerId;
};

// 1. 이미 1:1방 존재하는지 먼저 확인하기
export const checkPrivateChatRoomExist = async ({
  user_uid,
  action_id,
}: {
  user_uid: string;
  action_id: string;
}) => {
  try {
    // 1) 참가자 테이블 접근 -> 로그인 유저 uid로 내가 참여중인 방의 room_id 리스트 뽑기
    const { data: roomsList, error: roomsListError } = await supabase
      .from("chat_participants")
      .select("room_id")
      .eq("participant_uid", user_uid);

    if (roomsListError) {
      console.log("error", roomsListError.message);
      throw roomsListError;
    }

    // 2) roomsList에서 room_id 리스트 추출
    const roomIds = roomsList?.map((room) => room.room_id) || [];

    // 3) 채팅방 테이블 접근 -> room_id리스트 중 room_id 일치 + room_type이 '개인'인 것 + action_id 일치하는것 뽑기
    const { data: room_id, error: roomIdError } = await supabase
      .from("chat_rooms_info")
      .select("id")
      .in("id", roomIds) // roomsList에서 가져온 room_id 리스트 중에 포함되는 것만 선택
      .eq("room_type", "개인")
      .eq("action_id", action_id);

    if (roomIdError) {
      console.log("error", roomIdError.message);
      throw roomIdError;
    }

    if (room_id && room_id.length > 0) {
      return room_id[0].id; // room_id 값이 있으면 해당 값 반환 - 이미 1:1 방이 있는 경우
    } else {
      return null; // 값이 없으면 null 반환 - 아직 1:1방이 열리지 않은 경우
    }
  } catch (error) {
    console.error("error >>", error);
    throw error;
  }
};

// 2. 열려있는 채팅방이 없는 경우 - 채팅방 테이블, 참가자 테이블에 insert
export const insertNewPrivateChatRoom = async ({
  action_id,
  loggedInUserUid,
}: {
  action_id: string;
  loggedInUserUid: string;
}) => {
  try {
    // 1) 채팅방 테이블에 insert
    // 2) action_id로 owner_id 파악하여 함께 insert
    // 3) room_id 반환

    // owner_id 가져오기
    // const { data: ownerId, error: ownerIdError } = await supabase
    //   .from("individual_green_actions")
    //   .select("user_uid")
    //   .eq("id", action_id);

    // if (ownerIdError) {
    //   console.log("error", ownerIdError.message);
    //   throw ownerIdError;
    // }

    // const actionOwnerId = ownerId[0].user_uid;
    const actionOwnerId = await getActionOwnerUid(action_id);

    // 채팅방 insert, room_id 반환
    if (actionOwnerId !== null) {
      const { data: roomId, error: insertRoomError } = await supabase
        .from("chat_rooms_info")
        .insert({
          owner_uid: actionOwnerId,
          action_id,
          room_type: "개인",
        })
        .select("id");

      if (insertRoomError) {
        console.log("error", insertRoomError.message);
        throw insertRoomError;
      }
      const privateChatRoom_id = roomId[0]?.id;

      // 4) 참가자 테이블에 insert - 참가자 본인과, 방장도 함께
      const { error: insertParticipantError } = await supabase
        .from("chat_participants")
        .insert([
          {
            room_id: privateChatRoom_id,
            participant_uid: loggedInUserUid,
            participant_type: "참가자",
          },
          {
            room_id: privateChatRoom_id,
            participant_uid: actionOwnerId,
            participant_type: "방장",
          },
        ]);

      if (insertParticipantError) {
        console.log("error", insertParticipantError.message);
        throw insertParticipantError;
      }

      return privateChatRoom_id;
    }
  } catch (error) {
    console.error("error >>", error);
    throw error;
  }
};

// 메시지 보내기
export const sendMessage = async ({
  sender_uid,
  room_id,
  content,
}: {
  sender_uid: string;
  room_id: string;
  content: string;
}) => {
  const { error } = await supabase.from("chat_messages").insert({
    sender_uid,
    room_id,
    content,
  });

  if (error) {
    console.log("error", error.message);
    throw error;
  }
};

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
export const getPrivateChatsList = async (roomIds: string[]) => {
  const chatPromises = roomIds.map(async (roomId) => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("created_at, content, room_id, users(display_name, profile_img)")
      // .select(
      //   "created_at, content, room_id, chat_participants(filter(participant_type='참가자'), users(display_name, profile_img)))",
      // )
      .eq("room_id", roomId)
      // .eq(chat_participants("participant_type", "참가자"))
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

  // const chatList = await Promise.all(chatPromises);
  // return chatList;

  const chatList = await Promise.all(chatPromises);

  // chatList에서 undefined 값 제거하고 값 있는 채팅만 필터링하여 새로운 배열 반환
  const filteredChatList = chatList.filter((chat) => chat !== undefined);

  return filteredChatList;
};

// export const getPrivateChatsList = async (roomIds: string[]) => {
//   const chatPromises = roomIds.map(async (roomId) => {
//     const { data, error } = await supabase
//       .from("chat_messages")
//       .select("created_at, content, room_id, sender_uid")
//       .eq("room_id", roomId)
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

//   const chatList = await Promise.all(chatPromises);
//   console.log("chatList", chatList);

//   // 각 채팅 메시지의 sender_uid 배열 추출
//   const senderUids = chatList.map((chat) => chat?.sender_uid);

//   // sender_uid로 users 테이블에서 display_name, profile_img 가져오기
//   const usersDataPromises = senderUids.map(async (senderUid) => {
//     const { data, error } = await supabase
//       .from("users")
//       .select("id, display_name, profile_img")
//       .in("id", senderUids);

//     if (error) {
//       console.log(
//         `Error fetching user data for user ${senderUid}: ${error.message}`,
//       );
//       throw error;
//     }

//     return data;
//   });

//   const usersData = await Promise.all(usersDataPromises);

//   // chatList와 usersData를 결합하여 새로운 배열 생성
//   const combinedData = chatList.map((chat, index) => {
//     const userData = usersData[index]?.[0]; // usersData는 각각의 Promise로부터 반환된 배열이므로 [0]으로 접근
//     return {
//       ...chat,
//       user: userData
//         ? {
//             display_name: userData.display_name,
//             profile_img: userData.profile_img,
//           }
//         : null,
//     };
//   });

//   return combinedData;
// };
