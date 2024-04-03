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
