"use client";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LoaderPinwheel } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { InputPropsType } from "@/app/login/page";

export const LeftLogin = ({
  errors,
  values,
  touched,
  onChange,
  handleNextStep,
  onBlur,
  handlePrevStep,
  handleSubmit,
  loading,
}: InputPropsType) => {
  const emailInputProps = {
    name: "email",
    placeholder: "Enter your email address",
    value: values.email,
    onChange: onChange,
    onBlur: onBlur,
  };

  const passwordInputProps = {
    name: "password",
    placeholder: "Password",
    value: values.password,
    onChange: onChange,
    onBlur: onBlur,
  };

  const isButtonDisabled = !errors.password;
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
        <p className="text-2xl font-semibold">Log in</p>
        <p className="text-[16px] font-normal">
          Log in to enjoy your favorite dishes.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Input {...emailInputProps} />
            <div className="text-red-500">{touched.email && errors.email}</div>
          </div>
          <div className="flex flex-col gap-1">
            <Input {...passwordInputProps} />
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
          {!loading ? (
            <Button type="submit" disabled={!isButtonDisabled}>
              Let's go
            </Button>
          ) : (
            <Button type="submit" disabled={true}>
              Let's go <LoaderPinwheel className="animate-spin" />
            </Button>
          )}
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
