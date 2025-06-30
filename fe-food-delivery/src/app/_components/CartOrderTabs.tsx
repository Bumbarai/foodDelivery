import { AppWindowIcon, CodeIcon, FolderOpenDot } from "lucide-react";

import { Button } from "@/components/ui/button";
import {} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carts } from "./Carts";
import { Orders } from "./Orders";

export const CartOrderTabs = () => {
  return (
    <Tabs className="h-screen gap-[24px]" defaultValue="account">
      <TabsList className="flex w-[480px]">
        <TabsTrigger value="cart">Cart</TabsTrigger>
        <TabsTrigger value="order">Order</TabsTrigger>
      </TabsList>
      <TabsContent value="cart">
        <div className="h-full">
          <Carts />
        </div>
      </TabsContent>
      <TabsContent value="order">
        <Orders />
      </TabsContent>
    </Tabs>
  );
};
