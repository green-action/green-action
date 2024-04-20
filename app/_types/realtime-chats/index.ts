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
}
