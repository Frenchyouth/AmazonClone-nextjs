import React, { useState } from 'react'
import Image from 'next/image'
import { useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import Currrency from "react-currency-formatter"
import {useDispatch} from 'react-redux'
import {addToBasket} from '../slices/basketSlice'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


    const MIN_RATING = 1;
const MAX_RATING = 5;
export default function Products({id, title, price, description, category, image}) {


    const [rating, setRating] = useState(1);
    const [hasPrime, setHasPrime] = useState(true);
    // const [rating] = useState( Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
    // const [hasPrime] = useState(Math.random() < 0.5);
    const dispatch = useDispatch();

    useEffect(() => {
        setRating(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
        setHasPrime(Math.random() < 0.5);
        // return () => {
        //     cleanup
        // }
    }, [])


   const addItemToBasket = () => {
      const products = {
          id,
          title,
          price,
          rating,
          description,
          category,
          image,
          hasPrime
      };
      //sending product to store
      dispatch(addToBasket(products))
   }


  const notify = () => {
    const product = {
      id,
      title,
    }
    toast.success(
      <div>
        <p className="font-semibold">Product Added Successfully !!</p>
        <p className="text-xs text-gray-400 line-clamp-1">{product.title}</p>
      </div>,
      {
        position: 'top-center',
        autoClose: 3000,
        // hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      }
    )
  }

    return (
        <div className="relative flex flex-col m-5 bg-white z-30 p-10">
           
           <p className="absolute top-2 right-2 text-xs italic">{category}</p>

           <Image src={image} height={200} width={200} objectFit="contain" />
           <h4 className="my-3">{title}</h4>

           <div className="flex">
            {Array(rating)
            .fill()
            .map((_, i) => (
                <StarIcon className="h-5 text-yellow-500" />
            ))
            }
            {/* random fill between 1 and 5 inclusive */}
           </div>
                <p className="text-xs my-2 line-clamp-2">{description}</p>
            <div className="mb-5">
                <Currrency quantity={price} currency="USD" />
            </div>

            {hasPrime && (
                <div className="flex items-center space-x-2 -mt-5">
                    <img className="w-12" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKygLHjtZc7dh-M-zo7VNVXx9ZmORx5f8UBA&usqp=CAU" alt="icon" />
                    <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                </div>
            )}
            {/* only display this if a product has prime */}

                <button onClick={() => {
                addItemToBasket()
                notify()
              }}
             className="mt-auto button">Add to Basket</button>
        </div>
    )
}
