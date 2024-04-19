const PrivateChatPage = ({ params }: { params: { id: string } }) => {
  return (
    // 임시

    <div className="flex justify-center">
      <div className="flex flex-col">
        <div className="mb-10 font-bold text-3xl">채팅</div>
        <div className="m-3">
          <div>닉네임</div>
          <div>메시지</div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default PrivateChatPage;
