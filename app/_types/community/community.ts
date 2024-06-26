export interface CommunityPostObj {
  action_id: string | null;
  action_type: string | null;
  content: string | null;
  created_at: string | null;
  id: string | null;
  img_url: any;
  title: string | null;
  user_uid: string | null;
  users?: { display_name: string | null; profile_img: string | null } | null;
}

export interface CommunityPostMutation {
  formData: FormData;
  loggedInUserUid: string;
}

export interface CommunityEditMutation {
  post_id: string;
  imgUrl: string | null;
  formData: FormData;
}

export interface CommunityDetailProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  post_id: string;
  mode?: string;
}

export interface CommunityListPostProps {
  communityPost: CommunityPostObj | undefined;
  mode: string;
  my_display_name?: string;
  my_profile_img?: string | null;
}

export interface CommentProps {
  comment: {
    content: string | null;
    created_at: string;
    id: string;
    post_id: string | null;
    user_uid: string | null;
    users: { display_name: string | null; profile_img: string | null } | null;
  };
}

export interface InsertComment {
  content: string;
  loggedInUserUid: string;
  post_id: string;
}

export interface PostImgUploadProps {
  uploadedFileUrl: string;
  setUploadedFileUrl: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null | undefined>>;
}

export interface EditPostProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  post_id: string;
  mode: string;
}

export interface EditImgProps {
  uploadedFileUrl: string | null;
  setUploadedFileUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setFile: React.Dispatch<React.SetStateAction<File | null | undefined>>;
}

export interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}
