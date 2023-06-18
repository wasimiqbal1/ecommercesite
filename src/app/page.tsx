import Image from "next/image";
import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";  
import { urlForImage } from "../../sanity/lib/image";


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
  title: string,
  _id: string,
  description: string,
  price: number,
  image:IImage,
  category: {
    name: string;
  };
}

export default async function Home() {

  const data: Iproducts[] = await getProductData();

  return (
    <div className="grid grid-cols-[repeat(3,auto)] justify-center gap-x-9 ">
      {data.map((item) => (
      <div>
        <Image 
        width={200}
        height={300}
        className="max-h-[200px] object-cover object-top"
        src={urlForImage(item.image).url()} alt="Product"/>
        <h2>{item.title}</h2>
        <h3>${item.price}</h3>
        <button className="border py-2 px-6 rounded bg-blue-700 text-white">Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
