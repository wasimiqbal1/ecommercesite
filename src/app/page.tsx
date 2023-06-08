import Image from "next/image";
import { client } from "@/lib/sanityClient";

export const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"]{
    price,
      _id,
      title,
      image, 
      category -> {
        name
      }
  }`);
  return res;
};

interface Iproducts {
  title: string;
  _id: string;
  description: string;
  price: number;
  // image:IImage,
  category: {
    name: string;
  };
}

export default async function Home() {
  const data: Iproducts[] = await getProductData();
  console.log(data);

  return (
    <div>
      {data.map((item) => (
        <h1>{item.title}</h1>
      ))}
    </div>
  );
}
