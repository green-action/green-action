export interface MessageType {
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

export interface ChatProps {
  isOpen: boolean;
  onOpenChange: () => void;
  roomId: string;
  actionId: string;
}

export interface PrivateRoomsInfoType {
  room_id: string;
  participant_type: string;
  chat_rooms_info: {
    action_id: string;
    room_type: string;
  } | null;
}

export interface PrivateChatsListItem {
  loggedInUserUid: string;
  data: PrivateRoomsInfoType[] | undefined;
}

export interface PrivateChatProps {
  privateChat: {
    user: {
      id: string;
      display_name: string;
      profile_img: string;
    };
    created_at?: string;
    content?: string;
    room_id?: string | undefined;
    sender_uid?: string;
  } | null;
  actionId: string;
}

export interface ItemType {
  participant_type: string;
  users: {
    id: string | null;
    display_name: string | null;
    profile_img: string | null;
  } | null;
}

export interface ParticipantInfo {
  id: string | null;
  display_name: string | null;
  profile_img: string | null;
  participant_type?: string;
}

export interface PrivateChat {
  user: {
    id: string;
    display_name: string;
    profile_img: string;
  };
  created_at?: string | undefined;
  content?: string | undefined;
  room_id?: string | undefined;
  sender_uid?: string | undefined;
}

export interface CombinedObject {
  chat_rooms_info: {
    room_type: string | undefined;
    room_id: string;
    participant_type: string;
  };
  action_info: {
    action_id: string;
    action_title: string;
    action_imgUrl: string;
  };
  message: {
    content: string;
    created_at: string;
    room_id: string;
    sender_uid: string;
    user: {
      display_name: string;
      id: string;
      profile_img: string;
    };
  } | null;
}

export interface LastDates {
  room_id: string;
  created_at: string;
}
