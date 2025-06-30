"use client";
import { useRouter } from "next/navigation";
import { Right } from "../signup/_components/Right";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { userAgent } from "next/server";
import { LeftReset } from "./_components/LeftReset";
import { LeftOtp } from "./_components/LeftOtp";
import { CreatePassword } from "./_components/CreatePassword";

const validationSchema = Yup.object({
  email: Yup.string()
    .required()
    .test(
      "email",
      "Invalid email. Use a format like example@email.com",
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      }
    ),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "password must match"),
});
type TouchedType = {
  email?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
};
type FormilValues = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};
type Errors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};
export type InputPropsType = {
  values: FormilValues;
  onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (_event: React.FocusEvent<HTMLInputElement>) => void;
  touched: TouchedType;
  handlePrevStep: () => void;
  handleNextStep: () => void;
  errors: Errors;
  handleSubmit: () => void;
  loading: boolean;
};

const ResetPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const Components = [LeftReset, LeftOtp, CreatePassword];
  const [step, setStep] = useState<number>(0);

  const Stepper = Components[step];

  const handleNextStep = () => {
    step !== 1 && setStep((prev) => prev + 1);
  };
  const handlePrevStep = () => {
    step !== 0 && setStep((prev) => prev - 1);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post("http://localhost:8000/reset", {
          email: values.email,
          password: values.password,
        });

        router.push("/");
      } catch (err: any) {
        alert(err.response.data.message);
        setLoading(false);
      }
    },
  });

  const inputProps = {
    values: formik.values,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    touched: formik.touched,
    errors: formik.errors,
    handleNextStep: handleNextStep,
    handlePrevStep: handlePrevStep,
    handleSubmit: formik.handleSubmit,
    loading: loading,
  };

  //  if (user.userId) {
  //    router.push("/");
  // }
  return (
    <div className="flex h-screen p-5">
      <div className="flex flex-1/5 justify-center">
        <Stepper {...inputProps} />
      </div>
      <div className="flex-2/5">
        <Right />
      </div>
    </div>
  );
};
export default ResetPage;
