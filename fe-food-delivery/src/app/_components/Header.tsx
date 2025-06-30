"use client";

import { Input } from "@/components/ui/input";
import { ChevronRight, MapPin, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import { CartSheet } from "./CartSheet";

export const Header = () => {
  return (
    <div className="w-screen h-[172px] bg-black flex justify-between items-center py-3 px-22">
      <div className="flex w-[156px] h-fit max-h-[44px] space-x-3 justify-center items-center">
        <div>
          <Image
            src="/headerLogo.png"
            alt="header logo"
            width={46}
            height={32}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <h4 className="text-white text-[20px]">Nom</h4>
            <h4 className="text-red-500 text-[20px]">Nom</h4>
          </div>
          <p className="text-white">Swift Delivery</p>
        </div>
      </div>
      <div className="flex gap-[13px] items-center">
        <div>
          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow w-fit gap-2">
            <MapPin className="text-red-500" size={20} />
            <p className="text-red-500 font-medium">Delivery address:</p>
            <p className="text-gray-500">Add Location</p>
            <ChevronRight className="text-gray-400" size={18} />
          </div>
        </div>
        <div className="flex pt-2 pb-2 pl-4 pr-4 gap-[13px]">
          <div className="flex field-sizing-fixed bg-white rounded-[20px] items-center justify-center">
            <CartSheet />
          </div>
          <div className="flex field-sizing-fixed w-9 h-9 bg-white rounded-full items-center justify-center">
            <User className="" />
          </div>
        </div>
      </div>
    </div>
  );
};
