"use client";
import CustomAlert from "../_components/customAlert/CustomAlert";

const TestPage = () => {
  const testFunction = () => {
    console.log("test");
  };
  return (
    <>
      <CustomAlert
        text={`수정하시겠습니까?`}
        buttonName={`수정`}
        okFunction={testFunction}
      />
    </>
  );
};

export default TestPage;
