import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AuthProvider, useAuth } from "./UserProvider";

type FoodProps = {
  _id: string;
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
};
type FoodStorage = {
  _id: string;
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  qty: number;
};
export const AddCard = ({
  _id,
  foodName,
  image,
  ingredients,
  price,
}: FoodProps) => {
  const [addCount, setAddCount] = useState(1);
  const { setCarts } = useAuth();
  const addfood = () => {
    setAddCount((prev) => prev + 1);
  };

  const Minusfood = () => {
    setAddCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const deleteCount = () => {
    setAddCount((prev) => (prev = 1));
  };
  const storageKey = "foodCart";

  const [foodsInCart, setFoodsInCart] = useState<any>([]);

  const saveData = (food: any) => {
    const existingData = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setFoodsInCart(existingData);
    setCarts(foodsInCart);
    console.log(foodsInCart, "FROM ADD");

    const isFoodExisting = existingData.some((el: any) => el._id === food._id);

    if (existingData.length === 0) {
      const updatedData = [...existingData, { ...food, quantity: addCount }];
      localStorage.setItem(storageKey, JSON.stringify(updatedData));
      setFoodsInCart(updatedData);
      setCarts(foodsInCart);
      console.log(foodsInCart, "FROM ADD");
    }

    if (!isFoodExisting) {
      const updatedData = [...existingData, { ...food, quantity: addCount }];
      localStorage.setItem(storageKey, JSON.stringify(updatedData));
      setFoodsInCart(updatedData);
      setCarts(foodsInCart);
      console.log(foodsInCart, "FROM ADD");

      return;
    }
  };

  const food = {
    _id,
    foodName,
    ingredients,
    image,
    price,
    quantity: addCount,
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="icon"
          className="absolute mt-[146px] ml-[301px] w-[44px] h-[44px] bg-white rounded-full cursor-pointer"
        >
          <Plus className="text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="!w-[826px] !max-w-[862px] h-[412px]">
        <DialogHeader className="">
          <DialogClose asChild>
            <Button
              onClick={deleteCount}
              className="absolute top-2 right-2 bg-white hover:bg-blue-200"
            >
              <X className="text-black" />
            </Button>
          </DialogClose>
          <div className="flex w-full h-full gap-8 ">
            <div className="w-1/2 h-full relative">
              <Image
                src={image}
                alt="gg"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-[20px]"
              />
            </div>
            <div className="mt-10 w-1/2 flex flex-col justify-between">
              <div className="gap-4">
                <DialogTitle className="text-red-500 text-3xl">
                  {foodName}
                </DialogTitle>
                <DialogDescription>{ingredients}</DialogDescription>
              </div>
             
              <div>
                <div className="flex justify-between p-2">
                  <div>
                    <p className=" ">${addCount * price}</p>
                    <p className="text-2xl">${price}</p>
                  </div>
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
                </div>
                <div className="rounded-2xl flex">
                  <DialogClose className="w-full">
                    <Button
                      className="w-full"
                      type="button"
                      onClick={() => saveData(food)}
                    >
                      Add to cart
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
