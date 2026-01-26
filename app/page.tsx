import Image from "next/image";
import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
import Products from "@/components/layout/home/Products";
import Link from "next/link";
import hero_mobile from '@/public/images/home/hero_girl.png'
import Collection from "@/components/layout/home/Collection";
import TrustSection from "@/components/layout/home/TrustSection";
import heroDesktop from '@/public/images/home/heroDesktop.png'

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
        <div className=" bg-yellow-400/60 xl:w-10/12 m-auto  h-22 flex items-center text-black font-bold mt-5 overflow-hidden whitespace-nowrap">
          <div className="infinite-scroll-component flex w-max gap-10  py-2 text-sm md:text-lg lg:text-xl">
            <InfiniteMarquee />
            <InfiniteMarquee />
          </div>
        </div>

        {/* products section */}
        <div className="w-11/12 xl:w-10/12   m-auto ">
          <Products />
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

          <form className="bg-gray-100 p-4 md:p-8 min-h-75 md:min-h-90 flex items-center flex-col justify-center" action="">
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl my-4 text-center px-4">
              Save 20% On Your Purchase Today
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-2xl gap-3 px-4">
              <input
                className="p-3 w-full md:w-auto md:flex-1 rounded-sm border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black"
                type="email"
                placeholder="Enter your email"
                required
              />
              <button
                className="bg-black hover:bg-gray-800 transition-colors cursor-pointer w-full md:w-auto md:px-8 text-white p-3 rounded-sm"
                type="submit"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>




      </main>

    </>


  );
}
