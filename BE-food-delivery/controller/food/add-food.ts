import { Request, Response } from "express";
import { FoodModel } from "../../model/food.model";

export const addFood = async (request: Request, response: Response) => {
  try {
    const { foodName, price, category, image, ingredients } = request.body;
    await FoodModel.create({ foodName, price, category, ingredients, image });
    response.send({ message: "successfully added food" });
  } catch (err) {
    response.status(404).send({ message: "Hoolnii ner davhtsahgui" });
  }
};
