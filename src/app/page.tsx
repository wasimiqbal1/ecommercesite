import Image from "next/image";
import { client } from "@/lib/sanityClient";

export const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"][1]`)
  return res
}

export default async function Home() {
  const data = await getProductData();
  console.log(data);

  return 
  <div>
    
  </div>;
}
