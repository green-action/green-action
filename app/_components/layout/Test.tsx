import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Test = () => {
  const { data, status } = useSession();
  const user_uid = data?.user.user_uid;

  console.log("TEST ===> ", user_uid);
  console.log("status ===> ", status);

  if (status === "authenticated" || status === "loading") {
    return null;
  }

  return (
    <div className="flex ml-[3rem] gap-14 w-[10rem]">
      <Link href={"/signup"}>Sign up</Link>
      <Link href={"/login"}>Log in</Link>
    </div>
  );
};

export default Test;
