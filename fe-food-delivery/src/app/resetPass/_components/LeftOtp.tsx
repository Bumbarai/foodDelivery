"use client";
import * as Yup from "yup";
import { useFormik, yupToFormErrors } from "formik";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { InputPropsType } from "../page";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export const LeftOtp = ({
  errors,
  values,
  touched,
  onChange,
  onBlur,
  handleNextStep,
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
      setLoading(true);
      const response = await axios.post("http://localhost:8000/reset", {
        email: values.email,
      });
      setLoading(false);
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };
  const [loading, setLoading] = useState(false);

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
      <div>
        (
        <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        )
      </div>
      <form>
        <div className="flex flex-col gap-4">
          <Button
            type="button"
            variant="secondary"
            disabled={!isButtonDisabled}
            onClick={onClick}
          >
            Send link
          </Button>
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
