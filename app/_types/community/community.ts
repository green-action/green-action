export interface CommunityPostObj {
  action_id: string | null;
  action_type: string | null;
  content: string | null;
  created_at: string | null;
  id: string | null;
  img_url: any;
  title: string | null;
  user_uid: string | null;
}

export interface CommunityPostMutation {
  formData: FormData;
  currentUserUId: string;
}

export interface CommunityDetailProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
}
