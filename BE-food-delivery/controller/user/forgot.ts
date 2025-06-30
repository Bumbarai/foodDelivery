import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { OtpModel, OtpPopulated } from "../../model/otp.model";
import { UserModel } from "../../model/users.model";
import bcrypt from "bcrypt";

export const sendOtp = async (request: Request, response: Response) => {
  const { email } = request.body;
  const isEmailExisted = await UserModel.findOne({ email });
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const generateOtp = () => {
    let otp = "";
    for (let i = 0; i < 4; i++) {
      otp += numbers[Math.floor(Math.random() * numbers.length)];
    }
    return otp;
  };
  if (!isEmailExisted) {
    response.status(404).send({ message: "User not found" });
    return;
  }
  const code = generateOtp();
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "bumbarai.t@gmail.com",
      pass: "kgihoymtznnezfye",
    },
  });

  const options = {
    from: "bumbarai.t@gmail.com",
    to: "mor4list@gmail.com",
    subject: "hey hello",
    text: `${code}`,
  };
  await OtpModel.create({ code: code, userId: isEmailExisted._id });
  await transport.sendMail(options);
  response.send("Otp sent");
};

export const checkOtp = async (request: Request, response: Response) => {
  const { code, email } = request.body;

  try {
    const isOtpExisting = await OtpModel.findOne({
      code: code,
    }).populate<OtpPopulated>("userId");

    if (!isOtpExisting) {
      response.status(400).send("wrong code");
      return;
    }
    if (email === isOtpExisting.userId.email) {
      response.status(200).send({ message: "success", isOtpExisting });
      return;
    }
    response.status(400).send("wrong code");
    return;
  } catch (err) {
    response.status(400).send("wrong Otp");
  }
};
export const updatePassword = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const isEmailExisted = await UserModel.findOne({ email });
  if (!isEmailExisted) {
    response.status(400).send({ message: "User not found" });
    return;
  }
  const hashedPassword = await bcrypt.hashSync(password, 10);
  await UserModel.findOneAndUpdate({ email }, { password: hashedPassword });
  response.send({ message: "Successfully updated password" });
};
