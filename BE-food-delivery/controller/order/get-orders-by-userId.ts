import { Request, Response } from "express";
import { FoodOrderModel } from "../../model/foodOrder.model";

export const getOrdersByUserId = async (_req: Request, res: Response) => {
  const { userId } = res.locals;
  try {
    const allOrdersByUserId = await FoodOrderModel.find({
      user: userId,
    }).populate({
      path: "foodOrderItems",
      populate: {
        path: "food",
        model: "Foods",
      },
    });

    res.status(200).send({ orders: allOrdersByUserId });
  } catch (err) {
    res.status(400).send({ message: "Cannot Get Orders" });
  }
};
