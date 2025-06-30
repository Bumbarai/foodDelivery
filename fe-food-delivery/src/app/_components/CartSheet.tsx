"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Trigger } from "@radix-ui/react-dialog";
import { ShoppingCart } from "lucide-react";

import { CartSheetComp } from "./CartSheetComp";
import { useEffect, useState } from "react";
import { useAuth } from "./UserProvider";
import axios from "axios";
import { CartOrderTabs } from "./CartOrderTabs";

type FoodProps = {
  _id: string;
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  addCount: number;
  quantity: number;
};
export const CartSheet = () => {
  const { carts } = useAuth();

  const [cartData, setCartData] = useState<FoodProps[]>([]);

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("foodCart") || "[]");
    setCartData(existingData);
  }, [carts]);
  const shipping = 0.99;
  const totalPrice = cartData.reduce((acc, item) => {
    return (acc += item.price * item.quantity);
  }, 0);

  const deleteOrder = (orderId: string) => {
    const remaining = cartData.filter((el) => el._id != orderId);
    setCartData(remaining);
    localStorage.setItem("foodCart", JSON.stringify(remaining));
  };

  const checkout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("log in hiine uu");
      return;
    }
    const readyData = cartData.map((item) => ({
      food: item._id,
      quantity: item.quantity,
    }));

    await axios.post(
      "http://localhost:8000/createOrder",
      {
        totalPrice: totalPrice,
        foodOrderItems: readyData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Cart{cartData.length}</Button>
      </SheetTrigger>
      <SheetContent className="!w-[535px] !max-w-[600px] p-8 gap-6 bg-[#404040]">
        <SheetHeader>
          <SheetTitle className="flex gap-2">
            <ShoppingCart className="text-white" />
            <p className="text-white">Order detail</p>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div>
          <CartOrderTabs />
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
