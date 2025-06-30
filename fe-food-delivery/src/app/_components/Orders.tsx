"use client";
import axios from "axios";
import { useEffect, useState } from "react";

type FoodProps = {
  _id: string;
  user: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  foodOrderItems: foodOrderItem[];
};
type foodOrderItem = {
  _id: string;
  food: { foodName: string };
  quantity: number;
};
export const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    const myOrders = async () => {
      const orderData = await axios.get(
        "https://fooddelivery-5hmy.onrender.com/getOrders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(orderData.data.orders);
    };

    myOrders();
  }, []);

  console.log("Orders", orders);
  //   const totalPrice = orders.map((el: FoodProps) => {
  //     return el.totalPrice;
  //   });
  return (
    <div className="bg-amber-200 w-[480px] p-4 gap-5 rounded-[20px] h-8/10">
      <div>
        <h3 className="text-[20px] font-semibold">Order history</h3>
      </div>
      <div className="flex flex-col gap-5">
        {orders.map((el: FoodProps) => {
          return (
            <div>
              <div className="flex justify-between items-centers">
                <p className="font-semibold">${el.totalPrice}</p>
                <p className="border text-[12pxs] border-red-500 rounded-[20px] pt-1 pb-1 pr-2.5 pl-2.5">
                  {el.status}
                </p>
              </div>
              <div>
                {el.foodOrderItems.map((item) => {
                  return (
                    <div className="flex justify-between">
                      <p>{item.food.foodName}</p> <p>{item.quantity}</p>
                    </div>
                  );
                })}

                <p>{el.createdAt}</p>
                <p>hayag</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
