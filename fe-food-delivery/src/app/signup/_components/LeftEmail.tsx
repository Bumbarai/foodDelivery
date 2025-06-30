"use client";
import * as Yup from "yup";
import { useFormik, yupToFormErrors } from "formik";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { InputPropsType } from "../page";

export const LeftEmail = ({
  errors,
  values,
  touched,
  onChange,
  onBlur,
  handleNextStep,
}: InputPropsType) => {
  const emailInputProps = {
    name: "email",
    placeholder: "Enter your email",
    value: values.email,
    onChange: onChange,
    onBlur: onBlur,
  };

  const isButtonDisabled = !errors.email && values.email;
  return (
    <div className="flex flex-col gap-6 justify-center h-full w-[416px]">
      <div className="flex items-center justify-start w-full">
        <Button variant="outline">
          <ChevronLeft size={16} />
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-2xl font-semibold">Creat your account</p>
        <p className="text-[16px] font-normal">
          Sign up to explore your favorite dishes,
        </p>
      </div>
      <form>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Input {...emailInputProps} />
            <div className="text-red-500">{touched.email && errors.email}</div>
          </div>
          <Button
            type="button"
            onClick={handleNextStep}
            disabled={!isButtonDisabled}
          >
            Let's go
          </Button>
        </div>
      </form>
      <div className="text-[16px] flex gap-1 items-center justify-center">
        <p className="text-gray-400">Already have an account?</p>
        <Button variant="ghost" className="text-blue-600">
          Log in
        </Button>
      </div>
    </div>
  );
};
