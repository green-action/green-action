export type User = {
  id: string;
  email?: string | undefined;
  profile_img: string | null;
  display_name: string;
  password: string;
  point: number;
  introduction: string;
  sub: string;
};

export type Index = {
  id: string;
  user_uid: string;
  title: string;
  created_at: string;
  content: string;
  start_date: string;
  end_date: string;
  location: string;
  recruit_number: number;
  kakao_link: string;
  is_recruiting: boolean;
  actionImgUrls: [];
  actionBookmarks: [];
};
