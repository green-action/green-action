import { ItemType, ParticipantInfo } from "@/app/_types/realtime-chats";
import { supabase } from "@/utils/supabase/client";

// 메시지 리스트 가져오기
export const getMessages = async (room_id: string) => {
  const { data, error } = await supabase
    .from("chat_messages")
    .select("*, users(id, display_name, profile_img)")
    .eq("room_id", room_id)
    .order("created_at", { ascending: true });

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
      .in("id", roomIds)
      .eq("room_type", "개인")
      .eq("action_id", action_id);

    if (roomIdError) {
      console.log("error", roomIdError.message);
      throw roomIdError;
    }

    if (room_id && room_id.length > 0) {
      return room_id[0].id;
    } else {
      return null;
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

// action 참가자 가져오기
export const getActionParticipantsInfo = async (action_id: string) => {
  const { data: actionRoomId, error: actionRoomIdError } = await supabase
    .from("chat_rooms_info")
    .select("id")
    .eq("action_id", action_id);

  if (actionRoomIdError) {
    console.log("error", actionRoomIdError.message);
    throw actionRoomIdError;
  }

  const room_id = actionRoomId[0].id;

  const { data, error } = await supabase
    .from("chat_participants")
    .select("participant_type, users(id, display_name, profile_img)")
    .eq("room_id", room_id);

  if (error) {
    console.log("error", error.message);
    throw error;
  }

  const newArray: ParticipantInfo[] = data.map((item: ItemType) => {
    return {
      id: item.users?.id ?? null,
      display_name: item.users?.display_name ?? null,
      profile_img: item.users?.profile_img ?? null,
      participant_type: item.participant_type,
    };
  });

  return newArray;
};
