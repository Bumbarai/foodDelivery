import { Request, Response } from "express";
import { UserModel } from "../../model/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const isEmailExisted = await UserModel.findOne({ email });
  if (!isEmailExisted) {
    response.status(401).send({ message: "Email or password not matching" });
    return;
  }
  const hashedPassword = await bcrypt.compareSync(
    password,
    isEmailExisted.password!
  );
  const tokenKey = "foodDelivery";
  const token = jwt.sign({ userid: isEmailExisted._id }, tokenKey);

  if (hashedPassword) {
    response.send({ message: "successfully logged in", token });
    return;
  } else {
    response.status(401).send({ message: "Email or password not matching" });
    return;
  }
};
