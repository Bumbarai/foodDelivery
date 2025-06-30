"use client";
import * as Yup from "yup";
import { useFormik, yupToFormErrors } from "formik";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LoaderPinwheel } from "lucide-react";
import { Input } from "@/components/ui/input";
import { InputPropsType } from "@/app/resetPass/page";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LeftReset = ({
  errors,
  values,
  touched,
  onChange,
  onBlur,
  handleNextStep,
  loading,
}: InputPropsType) => {
  const emailInputProps = {
    name: "email",
    placeholder: "Example@gmail.com",
    value: values.email,
    onChange: onChange,
    onBlur: onBlur,
  };
  const router = useRouter();
  const isButtonDisabled = !errors.email && values.email;
  const onClick = async () => {
    try {
      const response = await axios.post(
        "https://fooddelivery-5hmy.onrender.com/reset",
        {
          email: values.email,
        }
      );
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 justify-center h-full w-[416px]">
      <div className="flex items-center justify-start w-full">
        <Button variant="outline">
          <ChevronLeft size={16} />
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-2xl font-semibold">Reset your password</p>
        <p className="text-[16px] font-normal">
          Enter your email to receive a password reset link.
        </p>
      </div>
      <form>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Input {...emailInputProps} />
            <div className="text-red-500">{touched.email && errors.email}</div>
          </div>
          {!loading ? (
            <Button type="submit" disabled={!isButtonDisabled}>
              Send link
            </Button>
          ) : (
            <Button type="submit" disabled={true} onClick={handleNextStep}>
              Send link <LoaderPinwheel className="animate-spin" />
            </Button>
          )}
        </div>
      </form>
      <div className="text-[16px] flex gap-1 items-center justify-center">
        <p className="text-gray-400">Don't have an account?</p>
        <Button variant="ghost" className="text-blue-600">
          Sign Up
        </Button>
      </div>
    </div>
  );
};
