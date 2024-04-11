"use client";
import CustomConfirm from "../_components/customConfirm/CustomConfirm";

const TESTPage = () => {
  const temp = () => {
    console.log("test");
  };
  return (
    <>
      <CustomConfirm text="test" buttonName="test" okFunction={temp} />
    </>
  );
};

export default TESTPage;
