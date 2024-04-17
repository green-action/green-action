import HeaderPage from "@/components/header/HeaderPage";
import { getSession } from "next-auth/react";

const Header = async () => {
  const session = await getSession();
  const isLoggedIn = !!session;
  console.log("session 정보==>", session);
  console.log("isLoggedIn 정보==>", isLoggedIn);
  return <HeaderPage isLoggedIn={isLoggedIn} session={session} />;
};

export default Header;
