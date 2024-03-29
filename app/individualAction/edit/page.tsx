import React from "react";

const page = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  return <div>{id && <>dsjkadjlsa</>}</div>;
};

export default page;
