import Header from "@/components/layout/header";
import MultiStepForm from "@/components/multistep-form/multi-step-form";
import React from "react";

const page = () => {
  return (
    <>
      <Header />
      <div className="my-4">
        <MultiStepForm />
      </div>
    </>
  );
};

export default page;
