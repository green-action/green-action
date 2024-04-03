"use client";
import CustomConfirm from "../_components/customConfirm/CustomConfirm";

const TestPage = () => {
  const testFunction = () => {
    console.log("test");
  };
  return (
    <>
      <CustomConfirm
        text={`수정하시겠습니까?`}
        buttonName={`수정`}
        okFunction={testFunction}
      />
    </>
  );
};

export default TestPage;
