"use client";

import { useMyCommunityList } from "@/app/_hooks/useQueries/push";
import { supabase } from "@/utils/supabase/client";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const CommentAlarm = () => {
  // 내가 작성한 글 가져오기
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";
  console.log(loggedInUserUid);

  const { data, isLoading, isError } = useMyCommunityList(loggedInUserUid);
  console.log(data);
  let communityPostIdList: string[] = [];
  if (data) {
    communityPostIdList = data.map((item) => item.id);
    console.log("내가 작성한 커뮤니티 글 아이디 : ", communityPostIdList);
  }

  // 새로운 댓글 가져오기
  const [commentData, setCommentData] = useState<
    RealtimePostgresInsertPayload<{
      [key: string]: any;
    }>
  >();

  const channel = supabase
    .channel("table-db-changes")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "community_comments",
        filter: `post_id=in.(${communityPostIdList})`,
      },
      (payload) => {
        setCommentData(payload);
      },
    )
    .subscribe();
  console.log("payload : ", commentData);

  useEffect(() => {
    if (commentData) {
      const commentWriterUid = commentData.new.user_uid;

      const commentPush = async () => {
        // 댓글 작성자 정보 가져오기
        const { data: commentWriter } = await supabase
          .from("users")
          .select("display_name")
          .eq("id", commentWriterUid)
          .single();

        if (commentWriter) {
          const newPush = {
            created_at: commentData.commit_timestamp,
            targetId: loggedInUserUid,
            post_id: commentData.new.post_id,
            message: `${commentWriter.display_name} 님이 새 댓글을 남겼습니다!`,
          };

          await supabase.from("alarm").insert(newPush);

          // 알림 테이블에서 알림 데이터 가져오기
          const { data: alarm } = await supabase
            .from("alarm")
            .select("*")
            .eq("targetId", loggedInUserUid)
            .order("created_at", { ascending: true });
          // 오름차순

          // 가장 최신 데이터를 실시간 알림으로 전달하기
          if (alarm) {
            console.log("댓글달림! : ", alarm[alarm.length - 1].message);
          }
        }
      };

      commentPush();
    }
  }, [commentData, loggedInUserUid]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred</div>;
  }

  return (
    <div>
      <div>commentAlarm</div>
      <div>
        {/* {data?.map((item, index) => (
          <li key={index}>{item}</li>
        ))} */}
      </div>
    </div>
  );
};

export default CommentAlarm;
