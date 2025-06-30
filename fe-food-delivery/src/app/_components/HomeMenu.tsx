"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { AddCard } from "./AddCard";

export type FoodProps = {
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  _id: string;
};

type PropsType = {
  foods: Record<string, FoodProps[]>;
};

export const HomeMenu = ({ foods }: PropsType) => {
  const keys = Object.keys(foods);
  console.log(foods);

  return (
    <div className="flex flex-col gap-[20px] justify-center items-center">
      {keys.sort().map((el) => {
        return (
          <div key={el} className="">
            <h2 className="text-[30px] text-white">{el}</h2>
            <div className="grid grid-cols-3 gap-4">
              {foods[el].slice(0, 6).map((food) => {
                return (
                  <div
                    key={food._id}
                    className="w-[397px] h-[342px] bg-white p-4 flex gap-1 rounded-[20px] "
                  >
                    <div key={food._id} className="flex flex-col gap-2">
                      <div className="w-[365px] h-[210px] relative">
                        <Image
                          className="rounded-[20px]"
                          src={food.image}
                          alt="image1"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                        <AddCard
                          foodName={food.foodName}
                          image={food.image}
                          ingredients={food.ingredients}
                          price={food.price}
                          _id={food._id}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-[24px] text-[#ef4444]">
                          {food.foodName}
                        </div>
                        <div>${food.price}</div>
                      </div>
                      <div>{food.ingredients}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
