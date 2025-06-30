import { Schema, model } from "mongoose";

export enum UserRoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type User = {
  _id: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  role?: UserRoleEnum;
  createdAt: Date;
  updatedAt: Date;
};

const Users = new Schema<User>({
  email: { type: String, require: true },
  password: { type: String, require: true },
  phoneNumber: { type: String, require: false },
  address: { type: String, require: false },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});
Users.index({ email: 1 }, { unique: true });
export const UserModel = model<User>("Users", Users);
