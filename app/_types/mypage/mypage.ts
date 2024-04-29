export interface MyAction {
  id: string;
  content: string | null;
  created_at: string;
  end_date: string | null;
  is_recruiting: boolean;
  location: string | null;
  recruit_number: number | null;
  start_date: string | null;
  title: string;
  user_uid: string | null;
  actionImgUrls: { img_url: string }[];
  bookmarkedAction: {
    id: string;
    content: string | null;
    created_at: string;
    end_date: string | null;
    is_recruiting: boolean;
    location: string | null;
    recruit_number: number | null;
    start_date: string | null;
    title: string;
    user_uid: string | null;
    actionImgUrls: { img_url: string }[];
  };
}

export interface BookmarkedAction {
  id: string;
  content: string | null;
  created_at: string;
  end_date: string | null;
  is_recruiting: boolean;
  location: string | null;
  recruit_number: number | null;
  start_date: string | null;
  title: string;
  user_uid: string | null;
  actionImgUrls: { img_url: string }[];
}

export interface actionImgUrls {
  actionImgUrls: { img_url: string }[];
}

export interface userInfoProps {
  display_name: string | null;
  email: string | null;
  id: string;
  introduction: string | null;
  point: number | null;
  profile_img: string | null;
}
export interface ProfileFileUpload {
  file: File | undefined;
  user_uid: string;
}

export interface ProfileImgUploadProps {
  uploadedFileUrl: string;
  setUploadedFileUrl: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export interface InsertProfileImgUrls {
  user_uid: string;
  imgUrl: string | null | undefined;
}

export interface MyActionRecruitingChange {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}
