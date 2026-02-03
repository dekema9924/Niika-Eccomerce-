import Image from "next/image";
import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
import Products from "@/components/layout/home/Products";
import Link from "next/link";
import hero_mobile from '@/public/images/home/hero_girl.png'
import Collection from "@/components/layout/home/Collection";
import TrustSection from "@/components/layout/home/TrustSection";
import heroDesktop from '@/public/images/home/heroDesktop.png'
import SubscribeForm from "@/components/layout/SubscribeForm";
import { fakeProductsData } from "./helpers/fakeProductData";

export default function Home() {
  return (
    <>
      <main className="min-h-screen   ">
        <Image
          src={hero_mobile}
          alt="hero image"
          width={1200}
          height={1200}
          loading="lazy"
          className="
    w-full xl:w-10/12 m-auto
    h-125 lg:h-175 xl:h-200
    object-cover
    object-center
    xl:hidden
  "
          sizes="(max-width: 1024px) 100vw, 80vw"
        />

        <Image
          src={heroDesktop}
          alt="hero image"
          width={1600}
          height={1600}
          className="
    hidden xl:block
    w-full xl:w-10/12 m-auto
    h-175 xl:h-200
    object-cover
    object-[center_40%]
  "

        />



        {/* infinite marquee section */}
        <InfiniteMarquee />


        {/* products section */}
        <div className="w-11/12 xl:w-10/12   m-auto ">
          <Products heading="Products" products={fakeProductsData} />
        </div>

        <Link className="border p-2 flex items-center justify-center rounded-sm w-40 font-semibold m-auto" href={'/products'}>
          see all products
        </Link>


        {/* //collection section */}
        <section className="mt-10 w-full">
          <div className="flex items-center justify-between w-11/12 m-auto mb-5">
            <p className="text-[2em] font-bold">New Collection</p>
            <span>SOON</span>
          </div>
          <Collection />


        </section>

        {/* trust section */}
        <div>
          <TrustSection />
          <SubscribeForm />
        </div>




      </main>

    </>


  );
}
