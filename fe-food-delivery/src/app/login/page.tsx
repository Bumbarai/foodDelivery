"use client";

import { redirect, useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik, yupToFormErrors } from "formik";
import axios from "axios";

import { useState } from "react";
import { useAuth } from "../_components/UserProvider";

import { LeftLogin } from "./_components/Left";
import { Right } from "../signup/_components/Right";

const validationSchemaLogin = Yup.object({
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
  requestErr: string;
};
const LogInPage = () => {
  const { user, tokenChecker } = useAuth();
  const [loading, setLoading] = useState(false);
  const [requestErr, setRequestErr] = useState("");
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchemaLogin,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post("http://localhost:8000/login", {
          email: values.email,
          password: values.password,
        });

        localStorage.setItem("token", response.data.token);
        setLoading(false);
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
    handleNextStep: () => {},
    handlePrevStep: () => {},
    handleSubmit: formik.handleSubmit,
    loading: loading,
    requestErr: requestErr,
  };
  if (user) {
    redirect("/");
  }

  return (
    <div className="flex h-screen p-5">
      <div className="flex flex-1/5 justify-center">
        <LeftLogin {...inputProps} />
      </div>
      <div className="flex-2/5">
        <Right />
      </div>
    </div>
  );
};
export default LogInPage;
