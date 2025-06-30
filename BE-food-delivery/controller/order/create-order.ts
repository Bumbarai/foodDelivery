import { Request, Response } from "express";
import { FoodOrderModel } from "../../model/foodOrder.model";

export const createOrder = async (Req: Request, Res: Response) => {
  const { totalPrice, foodOrderItems } = Req.body;
  const { userId } = Res.locals;

  try {
    await FoodOrderModel.create({ user: userId, totalPrice, foodOrderItems });
    Res.status(200).send({ message: "Successfully created order" });
  } catch (err) {
    console.log(err);

    Res.status(400).send({ message: "Order uusgehed aldaa garlaa" });
  }
};
