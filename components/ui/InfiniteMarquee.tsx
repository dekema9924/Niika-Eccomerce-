import React from 'react'

export default function InfiniteMarquee() {
    return (
        <>
            <div className=" bg-yellow-400/60 xl:w-10/12 m-auto h-22 my-10 flex items-center text-black font-bold  overflow-hidden whitespace-nowrap">
                <div className="infinite-scroll-component flex w-max gap-10  py-2 text-sm md:text-lg lg:text-xl">
                    <p>NEW SEASON</p>+
                    <p>UP TO 50% OFF</p>+
                    <p>FREE SHIPPING WORLDWIDE</p>+
                    <p>NEW SEASON</p>+
                    <p>UP TO 50% OFF</p>+
                    <p>FREE SHIPPING WORLDWIDE</p>+
                </div>
            </div>

        </>
    )
}
