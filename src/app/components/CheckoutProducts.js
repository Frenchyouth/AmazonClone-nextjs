import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'
import Currency from 'react-currency-formatter'
import { addToBasket, removeFromBasket } from '../slices/basketSlice'
import { useDispatch } from 'react-redux'

export default function CheckoutProducts({id, title, price, rating, description, category,image, hasPrime }) {
    const dispatch = useDispatch();
    
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
    }

        dispatch(addToBasket(products))
    }
    const removeItemFromBasket = () => {
    
            dispatch(removeFromBasket({id}))
        }
    

    return (
        <div className="grid grid-cols-5">
            <Image src={image} height={200} width={200} objectFit="contain" />

        {/* middle */}
        <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
        {Array(rating)
        .fill()
        .map((_, i) => (
            <StarIcon key={i} className="h5 w-5 text-yellow-500" />
        ))
        }
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="USD" />
        {hasPrime&& (
            <div className="flex items-center space-x-2">
                <img loading="lazy"
                className="w-12" alt="jpg"
                src="https://links.papareact.com/fdw"
                />
                <p>FREE Next day delivery!</p>
            </div>
        )}
        </div>

        {/* add & remove btn */}
            <div className="flex flex-col space-x-2 my-auto justify-self-end space-y-2">
                <button onClick={addItemToBasket} className="button">Add to basket</button>
                <button onClick={removeItemFromBasket} className="button">Remove from basket</button>
            </div>
        </div>
    )
}
