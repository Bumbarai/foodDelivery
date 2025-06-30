import { Router } from "express";
import { tokenChecker } from "../middleware/token-checker";
import { createCategory } from "../controller/category/create-category";
import { getCategories } from "../controller/category/get-categories";
import { isadmin } from "../middleware/authorization";
import { getAllOrders } from "../controller/admin/get-all-orders";
import { updateOrderStatus } from "../controller/admin/update-order-status";

export const AdminRouter = Router();

AdminRouter.get("/admin/getAllOrders", [tokenChecker, isadmin], getAllOrders);
AdminRouter.put(
  "/admin/order/update",
  [tokenChecker, isadmin],
  updateOrderStatus
);
