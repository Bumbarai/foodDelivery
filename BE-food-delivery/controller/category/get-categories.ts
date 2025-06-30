import { Request, Response } from "express";
import { CategoryModel } from "../../model/category.model";

export const getCategories = async (_request: Request, response: Response) => {
  try {
    const allCategories = await CategoryModel.find();
    response.send({ categories: allCategories });
  } catch (err) {
    response.status(400).send({ message: "database holboltond aldaa garlaa" });
  }
};
