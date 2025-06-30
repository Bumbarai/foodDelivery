import { model, models, Schema, Model } from "mongoose";

type foodOrderItemModelType = {
  food: Schema.Types.ObjectId;
  quantity: number;
};
enum FoodOrderStatus {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}
type FoodOrderModelType = {
  user: Schema.Types.ObjectId;
  totalPrice: Number;
  foodOrderItems: foodOrderItemModelType[];
  status: FoodOrderStatus;
};
const FoodOrderItemSchema = new Schema<foodOrderItemModelType>({
  food: { type: Schema.Types.ObjectId, require: true, ref: "Foods" },
  quantity: { type: Number, require: true },
});

const FoodOrderSchema = new Schema<FoodOrderModelType>(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    totalPrice: { type: Number, required: true },
    foodOrderItems: { type: [FoodOrderItemSchema], require: true },
    status: {
      type: String,
      enum: Object.values(FoodOrderStatus),
      default: FoodOrderStatus.PENDING,
      required: true,
    },
  },
  { timestamps: true }
);
export const FoodOrderModel: Model<FoodOrderModelType> =
  models["FoodOrders"] ||
  model<FoodOrderModelType>("FoodOrders", FoodOrderSchema);
