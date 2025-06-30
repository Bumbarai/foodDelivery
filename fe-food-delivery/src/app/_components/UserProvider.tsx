"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  useContext,
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type UserData = {
  userId: string;
};
type AuthContextType = {
  user: UserData | null;
  tokenChecker: (_token: string) => Promise<void>;
  carts?: FoodProps[];
  setCarts: Dispatch<SetStateAction<FoodProps[]>>;
};
type FoodProps = {
  _id: string;
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  addCount: number;
  quantity: number;
};
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [carts, setCarts] = useState<FoodProps[]>([]);

  const tokenChecker = async (token: string) => {
    try {
      const response = await axios.post("http://localhost:8000/verify", {
        token: token,
      });
      setUser({ userId: response.data.destructToken.userId });
    } catch (err) {}
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenChecker(token);
    } else {
    }
  }, []);
  console.log(carts, "FROM context");

  return (
    <AuthContext.Provider value={{ user, tokenChecker, carts, setCarts }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext<AuthContextType>(AuthContext);
