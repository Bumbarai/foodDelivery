"use client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export type FoodProps = {
  _id: string;
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  quantity: number;
  deleteOrder: (_orderId: string) => void;
};
export const CartSheetComp = ({
  _id,
  image,
  foodName,
  ingredients,
  price,
  quantity,
  deleteOrder,
}: FoodProps) => {
  const [addCount, setAddCount] = useState(quantity);

  const addfood = () => {
    const existingData = JSON.parse(localStorage.getItem("foodCart") || "[]");
    const updatedAdd = existingData.map((item: FoodProps) => {
      if (item._id === _id) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });
    setAddCount((prev) => prev + 1);
    localStorage.setItem("foodCart", JSON.stringify(updatedAdd));
  };

  const Minusfood = () => {
    const existingData = JSON.parse(localStorage.getItem("foodCart") || "[]");
    const updatedAdd = existingData.map((item: FoodProps) => {
      if (item._id === _id) {
        return { ...item, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    });
    setAddCount((prev) => prev - 1);
    localStorage.setItem("foodCart", JSON.stringify(updatedAdd));
  };

  //   const deleteCount = () => {
  //     setAddCount((prev: any) => (prev = 1));
  //   };

  return (
    <div className="flex gap-2 pb-2">
      <div className="flex w-[439px] gap-[10px] bg-white ">
        <div className="w-[124px] h-[120px] relative">
          <Image
            src={image}
            alt="gg"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-[20px]"
          />
        </div>
        <div className="flex flex-col w-[305px] h-[120px] gap-3 ">
          <div className="flex">
            <div className="flex-1  ">
              <p className="font-semibold text-red-400">{foodName}</p>
              <p>{ingredients}</p>
            </div>
            <div>
              <X onClick={() => deleteOrder(_id)} />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2  items-center justify-between">
              <Button
                onClick={Minusfood}
                className="rounded-full bg-white text-black hover:bg-primary-none border border-gray-300"
                size="icon"
              >
                -
              </Button>
              <p>{addCount}</p>
              <Button
                onClick={addfood}
                className="rounded-full bg-white  text-black hover:bg-primary-none border border-gray-300"
                size="icon"
              >
                +
              </Button>
            </div>
            <p className="font-semibold">${price * addCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
