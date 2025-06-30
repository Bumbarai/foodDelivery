import { model, Schema } from "mongoose";

type FoodType = {
  _id: Schema.Types.ObjectId;
  foodName: String;
  price: number | string;
  image: String;
  ingredients: String;
  category: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
const FoodSchema = new Schema<FoodType>({
  foodName: { type: String, require: true },
  price: { type: Number, require: true },
  image: { type: String, require: true },
  ingredients: { type: String, require: true },
  category: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "foodCategories",
  },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});
FoodSchema.index({ foodName: 1 }, { unique: true });
export const FoodModel = model<FoodType>("Foods", FoodSchema);
