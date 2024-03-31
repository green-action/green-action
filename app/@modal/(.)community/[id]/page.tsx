import React from "react";

const CommunityDetailPage = ({ params }: { params: { id: number } }) => {
  const id = params.id;
  console.log("id", id);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[100px] h-[100px] bg-black"></div>
    </div>
  );
};

export default CommunityDetailPage;
