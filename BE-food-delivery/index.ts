import express, { Request, Response } from "express";
import mongoose, { Schema, SchemaType, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import nodemailer from "nodemailer";
import { UserRouter } from "./router/user.route";
import { CategoryRouter } from "./router/category.route";
import { FoodRouter } from "./router/food.route";
import { OrderRouter } from "./router/order.route";
import { AdminRouter } from "./router/admin.route";

const server = express();
server.use(cors());
server.use(express.json());
const databaseConnenct = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://bbi:64659988@fooddelivery.jst8oz6.mongodb.net/FoodDelivery"
    );
    console.log("success db connected");
  } catch (err) {
    console.log(err);
  }
};

databaseConnenct();

server.use(UserRouter);
server.use(CategoryRouter);
server.use(FoodRouter);
server.use(OrderRouter);
server.use(AdminRouter);

server.listen(8000, () => {
  console.log(`running on http://localhost:8000`);
});
