import { Request, Response } from "express";
import { CategoryModel } from "../../model/category.model";

export const createCategory = async (request: Request, response: Response) => {
  try {
    const { categoryName } = request.body;

    await CategoryModel.create({ categoryName });
    response.send({ message: "successfully created category" });
  } catch (err) {
    response.status(400).send({ message: "category ner davhardah bolomjgui" });
  }
};
