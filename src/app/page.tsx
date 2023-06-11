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
    <div className="grid grid-cols-3">
      {data.map((item) => (
      <div>
        <Image 
        width={300}
        height={300}
        src={urlForImage(item.image).url()} alt="Product"/>
      </div>
      ))}
    </div>
  );
}
