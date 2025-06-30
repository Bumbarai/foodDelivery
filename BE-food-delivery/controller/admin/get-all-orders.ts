import { Request, Response } from "express";
import { FoodOrderModel } from "../../model/foodOrder.model";

export const getAllOrders = async (_req: Request, res: Response) => {
  const allOrders = await FoodOrderModel.find({}).populate({
    path: "foodOrderItems",
    populate: {
      path: "food",
      model: "Foods",
    },
  });
  res.status(200).send({ orders: allOrders });
};
