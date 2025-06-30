"use client";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { InputPropsType } from "../page";
import { useState } from "react";

export const CreatePassword = ({
  errors,
  values,
  touched,
  onChange,
  handleNextStep,
  onBlur,
  handlePrevStep,
  handleSubmit,
}: InputPropsType) => {
  const passwordInputProps = {
    name: "password",
    placeholder: "Password",
    value: values.password,
    onChange: onChange,
    onBlur: onBlur,
  };

  const confirmPasswordInputProps = {
    name: "confirmPassword",
    placeholder: "Confirm",
    value: values.confirmPassword,
    onChange: onChange,
    onBlur: onBlur,
  };

  const isButtonDisabled = !errors.password && !errors.confirmPassword;
  const [show, setShow] = useState(false);
  const handleVisibility = () => {
    setShow((prev) => !prev);
  };
  return (
    <div className="flex flex-col gap-6 justify-center h-full w-[416px]">
      <div className="flex items-center justify-start w-full">
        <Button variant="outline" onClick={handlePrevStep}>
          <ChevronLeft size={16} />
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-2xl font-semibold">Creat a new password</p>
        <p className="text-[16px] font-normal">
          Set a new password with a combination of letters and numbers for
          better security.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Input
              {...passwordInputProps}
              type={`${show ? "text" : "password"}`}
            />
            <div className="text-red-500">
              {touched.password && errors.password}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              {...confirmPasswordInputProps}
              type={`${show ? "text" : "password"}`}
            />
            <div className="text-red-500">
              {touched.confirmPassword && errors.confirmPassword}
            </div>
          </div>
          <div>
            <Checkbox
              id="toggle"
              onCheckedChange={handleVisibility}
              checked={show}
            />
          </div>
          <Button type="submit" disabled={!isButtonDisabled}>
            Create password
          </Button>
        </div>
      </form>
    </div>
  );
};
