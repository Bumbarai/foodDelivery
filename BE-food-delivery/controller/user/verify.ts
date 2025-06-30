import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verify = async (request: Request, response: Response) => {
  const { token } = request.body;
  const tokenPassword = "foodDelivery";
  try {
    const isValid = jwt.verify(token, tokenPassword);

    if (isValid) {
      const destructToken = jwt.decode(token);
      response.send({ destructToken });
      return;
    } else {
      response.status(401).send({ message: "token is not valid" });
      return;
    }
  } catch (err) {
    response.status(401).send({ message: "token is not valid" });
    return;
  }
};
