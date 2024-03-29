import React from "react";

const Add = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  console.log("id", id);
  return <div>Add</div>;
};

export default Add;
