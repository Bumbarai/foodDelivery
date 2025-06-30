import Image from "next/image";
import { Header } from "./_components/Header";
import { HomeMenu } from "./_components/HomeMenu";
import axios from "axios";

export default async function Home() {
  const { data } = await axios.get("http://localhost:8000/foods");

  return (
    <div>
      <div className="bg-[#404040]">
        <div>
          <Header />
        </div>
        <div className="relative w-full h-[570px]">
          <Image
            src="/offer.jpg"
            alt="offer"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <HomeMenu foods={data.foods} />
      </div>
    </div>
  );
}

// type FoodProps = {
//   foodName: string;
//   image: string;
//   ingredients: string;
//   price: number;
//   _id: string;
// };

// type PropsType = {
//   foods: Record<string, FoodProps[]>;
// };

// export const HomeComponent = ({ foods }: PropsType) => {
//   const keys = Object.keys(foods);
//   return (
//     <div>
//       <div className="flex flex-col gap-20">
//         {keys.map((el) => {
//           return (
//             <div key={el}>
//               <h2 className="text-4xl">{el}</h2>
//               {foods[el].slice(0, 6).map((food) => {
//                 return (
//                   <div key={food._id} className="flex flex-col gap-2">
//                     <p>{food._id}</p>
//                     <div>{food.foodName}</div>
//                     <div>{food.image}</div>
//                     <div>{food.ingredients}</div>
//                   </div>
//                 );
//               })}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };
