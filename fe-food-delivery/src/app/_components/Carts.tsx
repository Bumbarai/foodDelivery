"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./UserProvider";
import { CartSheetComp, FoodProps } from "./CartSheetComp";
import axios from "axios";
import { Button } from "@/components/ui/button";

export const Carts = () => {
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
    <div className="flex flex-col gap-8 h-4/5">
      <div className="flex w-[480px] flex-col items-center h-2/3 bg-white pb-4 rounded-[20px] justify-between">
        <div className="mt-4 flex flex-col gap-4 p-[32px]">
          {cartData.length === 0 ? (
            <p className="text-sm text-muted-foreground">Cart is empty.</p>
          ) : (
            cartData?.map((item: FoodProps, index: number) => (
              <CartSheetComp
                key={index}
                deleteOrder={deleteOrder}
                _id={item._id}
                ingredients={item.ingredients}
                price={item.price}
                quantity={item.quantity}
                foodName={item.foodName}
                image={item.image}
              />
            ))
          )}
        </div>
        <div className="w-[439px] h-[116px] bg-white gap-2">
          <h4 className="w-[439px]">Delivery location</h4>
          <div className="w-[439px] h-[80px]">
            <input
              className="w-[439px] h-[80px] p-3 border-b-gray-600"
              placeholder="Please share your complete address"
            ></input>
          </div>
        </div>
      </div>
      <div className=" rounded-[20px] w-[480px] h-1/3 p-4 gap-5 bg-white flex flex-col">
        <h3 className="text-[20px] bg-blue-400">Payment info</h3>
        <div className=" flex flex-col gap-2">
          <div className="flex justify-between">
            <p>Items</p>
            <p>${totalPrice}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>${shipping}</p>
          </div>
        </div>
        <div>
          <p>Total : ${totalPrice + shipping}</p>
        </div>
        <Button className="h-[44px] bg-red-500" onClick={checkout}>
          Checkout
        </Button>
      </div>
    </div>
  );
};
