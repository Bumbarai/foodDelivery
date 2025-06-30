import { Router } from "express";
import { tokenChecker } from "../middleware/token-checker";
import { createOrder } from "../controller/order/create-order";
import { getOrdersByUserId } from "../controller/order/get-orders-by-userId";

export const OrderRouter = Router();

OrderRouter.post("/createOrder", tokenChecker, createOrder);
OrderRouter.get("/getOrders", tokenChecker, getOrdersByUserId);
