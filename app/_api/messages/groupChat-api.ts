import { supabase } from "@/utils/supabase/client";
import { MODE_IN } from "../constant";

import type { ItemType, ParticipantInfo } from "@/app/_types/realtime-chats";

// 단체방 room_id 가져오기 - 채팅방 테이블 접근
export const getChatRoomId = async (action_id: string) => {
  try {
    const { data: room_id, error } = await supabase
      .from("chat_rooms_info")
      .select("id")
      .eq("action_id", action_id)
      .eq("room_type", "단체");

    if (error) {
      console.log("error", error.message);
      throw error;
    }

    const roomId = room_id[0].id;
    return roomId;
  } catch (error) {
    console.error("error >>", error);
    throw error;
  }
};

// 로그인유저가 참가자 테이블에 이미 있는지 확인 - 참가자의 participant_id 반환
export const checkUserExist = async ({
  room_id,
  loggedInUserUid,
}: {
  room_id: string;
  loggedInUserUid: string;
}) => {
  try {
    const { data, error } = await supabase
      .from("chat_participants")
      .select("id")
      .eq("room_id", room_id)
      .eq("participant_uid", loggedInUserUid);

    if (error) {
      console.log("error", error.message);
      throw error;
    }

    // 데이터가 있으면 첫 번째 아이템의 id 반환, 없으면 빈 값 반환
    return data.length > 0 ? data[0].id : null;
  } catch (error) {
    console.error("error >>", error);
    throw error;
  }
};

// 새롭게 참여하는 경우 - 참가자 테이블에 insert
export const insertNewParticipant = async ({
  room_id,
  loggedInUserUid,
}: {
  room_id: string;
  loggedInUserUid: string;
}) => {
  try {
    const { error } = await supabase.from("chat_participants").insert({
      room_id,
      participant_uid: loggedInUserUid,
      participant_type: "참가자",
    });

    if (error) {
      console.log("error", error.message);
      throw error;
    }
  } catch (error) {
    console.error("error >>", error);
    throw error;
  }
};

// 채팅방 인원 파악
export const countParticipants = async (room_id: string) => {
  try {
    const { data: participants, error: participantsNumberError } =
      await supabase
        .from("chat_participants")
        .select("id")
        .eq("room_id", room_id);

    if (participantsNumberError) {
      console.log("participantsNumberError", participantsNumberError.message);
      throw participantsNumberError;
    }

    const participantsNumber = participants.length;

    return participantsNumber;
  } catch (error) {
    console.error("error >>", error);
    throw error;
  }
};

// 모집인원 파악
export const getRecruitingNumber = async (room_id: string) => {
  try {
    const { data: recruiting, error: recruitingNumberError } = await supabase
      .from("chat_rooms_info")
      .select("individual_green_actions(recruit_number)")
      .eq("id", room_id);

    if (recruitingNumberError) {
      console.log("recruitingNumberError", recruitingNumberError.message);
      throw recruitingNumberError;
    }

    const recruitingNumber =
      recruiting[0]?.individual_green_actions?.recruit_number || 0;

    return recruitingNumber;
  } catch (error) {
    console.error("error >>", error);
    throw error;
  }
};

// action의 모집상태 변경하기(채팅방 인원 === 모집인원 일때)
// 1) mode가 'in'(단체방에 참가하려는 경우) - '모집마감'처리
// 2) mode가 'out'(단체방에서 나가려는 경우) - '모집중'처리
export const changeRecruitingState = async ({
  action_id,
  mode,
}: {
  action_id: string;
  mode: string;
}) => {
  try {
    const is_recruiting = mode === MODE_IN ? false : true;

    const { error } = await supabase
      .from("individual_green_actions")
      .update({ is_recruiting })
      .eq("id", action_id);

    if (error) {
      console.log("error", error.message);
      throw error;
    }
  } catch (error) {
    console.error("error >>", error);
    throw error;
  }
};

// 참가 취소시 - 참가자 테이블에서 삭제
export const deleteParticipant = async (loggedInUserUid: string) => {
  try {
    const { error } = await supabase
      .from("chat_participants")
      .delete()
      .eq("participant_uid", loggedInUserUid);

    if (error) {
      console.log("error", error.message);
      throw error;
    }
  } catch (error) {
    console.error("error >>", error);
    throw error;
  }
};

// 그룹채팅방 참여자 정보 가져오기
export const getParticipantsInfo = async (room_id: string) => {
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

// action 정보 가져오기
export const getGroupActionInfo = async (action_id: string) => {
  const { data, error } = await supabase
    .from("individual_green_actions")
    .select(
      "id, user_uid, title, recruit_number, is_recruiting, start_date, end_date, green_action_images(img_url)",
    )
    .eq("id", action_id);

  if (error) {
    console.log("error", error.message);
    throw error;
  }

  // 데이터가 존재하면 첫 번째 이미지 URL을 가져옴
  if (data && data.length > 0) {
    const { green_action_images, ...actionData } = data[0];
    const firstImgUrl = green_action_images[0]?.img_url;
    return { ...actionData, img_url: firstImgUrl };
  }

  return null;
};

// 참여중인 단체방 id들 가져오기
export const getMyGroupChatIds = async (loggedInUserUid: string) => {
  const { data, error } = await supabase
    .from("chat_participants")
    .select("room_id")
    .eq("participant_uid", loggedInUserUid);

  if (error) {
    console.log("error", error.message);
    throw error;
  }

  const allRoomIds = data.map((item) => {
    return item.room_id;
  });

  const { data: roomIds, error: roomIdsError } = await supabase
    .from("chat_rooms_info")
    .select("id")
    .in("id", allRoomIds)
    .eq("room_type", "단체");

  if (roomIdsError) {
    console.log("error", roomIdsError.message);
    throw roomIdsError;
  }

  const roomIdsArray = roomIds.map((roomId) => {
    return roomId.id;
  });

  return roomIdsArray;
};

// 단체방 리스트의 action들 info 가져오기
export const getGroupListActionInfo = async (roomIds: string[]) => {
  const { data: actionInfo, error: actionInfoError } = await supabase
    .from("chat_rooms_info")
    .select("individual_green_actions(id, title, recruit_number, user_uid)")
    .in("id", roomIds);

  if (actionInfoError) {
    console.log("error", actionInfoError.message);
    throw actionInfoError;
  }

  const actionIds = actionInfo.map((item) => {
    return item.individual_green_actions?.id;
  });

  const { data: actionUrlsIds, error: actionUrlsError } = await supabase
    .from("green_action_images")
    .select("img_url, action_id")
    .in("action_id", actionIds);

  if (actionUrlsError) {
    console.log("error", actionUrlsError.message);
    throw actionUrlsError;
  }

  // const actionUrls = actionUrlsIds.map((actionUrlId) => {
  //   const url = actionUrlId.img_url
  //   return actionUrlId.
  // })

  return actionUrlsIds;
};
