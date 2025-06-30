import { NextFunction, Request, Response } from "express";
import { UserModel, UserRoleEnum } from "../model/users.model";

export const isadmin = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = res.locals;
  try {
    const user = await UserModel.findById({ _id: userId });
    console.log(user, "useeer");

    if (!user) {
      res.status(404).send({ message: "User does not exist" });
      return;
    }
    if (user.role === UserRoleEnum.ADMIN) {
      next();
      return;
    }
    res.status(401).send({ message: "Unauthorized user" });
    return;
  } catch (err) {
    res.status(404).send({ message: "Something went wrong" });
    return;
  }
};
