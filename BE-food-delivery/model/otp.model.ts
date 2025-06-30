import { model, Schema } from "mongoose";
import { User } from "./users.model";

export type Otp = {
  userId: Schema.Types.ObjectId;
  code: string;
  createdAt: Date;
};
export type OtpPopulated = {
  userId: User;
};

const Otp = new Schema<Otp>({
  code: { type: String, require: true },
  userId: { type: Schema.ObjectId, require: true, ref: "Users" },
  createdAt: { type: Date, default: Date.now, expires: 60 },
});

export const OtpModel = model<Otp>("Otps", Otp);
