import { model, Schema } from "mongoose";

export type FoodCategoryType = {
  categoryName: String;
  createdAt: Date;
  updatedAt: Date;
};
const FoodCategorySchema = new Schema({
  categoryName: { type: String, required: true },

  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});
FoodCategorySchema.index({ categoryName: 1 }, { unique: true });

export const CategoryModel = model<FoodCategoryType>(
  "foodCategories",
  FoodCategorySchema
);
