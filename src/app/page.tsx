import Image from "next/image";
import { client } from "@/lib/sanityClient";

export const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"]{
    title, 
    description
  }`);
  return res
}

interface Iproducts {
  title:string,
  description:string
}


export default async function Home() {
  const data:Iproducts[] = await getProductData();
  console.log(data);

  return 
  <div>
    
  </div>;
}
