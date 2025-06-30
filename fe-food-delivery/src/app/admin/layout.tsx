import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin",
  description: "admin",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col gap-20 w-[200px] h-screen bg-red-300">
          <p>logo</p>
          <Link href={"/admin/menu"}>Food menu</Link>
          <Link href={"/admin/orders"}>Orders</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
