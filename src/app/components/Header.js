import Image from "next/image";
import { Bars3Icon, ShoppingCartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react"
// import Star from "@heroicons/react"
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { selectItems } from "../slices/basketSlice";



function Header() {
    const {data: session} = useSession(); 
    const router = useRouter();
    const items = useSelector(selectItems);


    useEffect(() => {
     
    }, [items])

    return (
        <header className="sticky top-0 z-50">
            {/* Top */}
            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
            <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                <Image 
                onClick={() => router.push('/')}
                src="https://links.papareact.com/f90"
                width={150}
                height={40}
                objectFit="contain"
                className="cursor-pointer"
                />
            </div>
            {/* Search Bar */}
            <div className="hidden sm:flex items-center h-10 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500 cursor-pointer">
                <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text" />
                <MagnifyingGlassIcon className="h-12 p-4" />
            </div>
            {/* After input field */}
            <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                <div onClick={!session ? signIn : signOut} className="cursor-pointer link">
                    <p className="hover:underline">
                       {session ? `Hello, ${session.user.name}` : 'Sign in'}
                    </p>
                    <p className="font-extrabold md:text-sm">Account & Lists</p>
                </div>

                <div onClick={() => router.push('/orders')}  className="link">
                <p>Returns</p>
                <p className="font-extrabold md:text-sm">Orders</p>
                </div>

                <div onClick={() => router.push('/checkout')} className="relative link flex items-center">
                    <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 rounded-full text-black text-center">
                      {items.length}
                    </span>
                    <ShoppingCartIcon  className="h-10"/>
                    <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
                </div>
            </div>

            </div>

            {/* Bottom */}
            <div className=" flex items-center space-x-3 bg-amazon_blue-light text-white text-sm">
                <p className="link flex items-center">
                    <Bars3Icon className="h-6 mr-1" />
                    All
                    </p>
                    <p className="link">Prime Video</p>
                    <p className="link">Amazon Business</p>
                    <p className="link">Today's Deals</p>
                    <p className="link hidden lg:inline-flex">Electronics</p>
                    <p className="link hidden lg:inline-flex">Food & Category</p>
                    <p className="link hidden lg:inline-flex">Prime</p>
                    <p className="link hidden lg:inline-flex">Buy Again</p>
                    <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
                    <p className="link hidden lg:inline-flex">Health & Personal Care</p>
            </div>
        </header>
    )
}

export default Header;


