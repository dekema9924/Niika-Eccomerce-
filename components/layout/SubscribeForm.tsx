
export default function SubscribeForm() {
    return (
        <>
            <form className="bg-gray-300 p-4 md:p-8 min-h-75 md:min-h-90 flex items-center flex-col justify-center" action="">
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
        </>
    )
}
