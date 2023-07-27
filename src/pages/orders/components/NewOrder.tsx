import React, { useState, useEffect } from 'react'
import Header from '../../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../../redux/store'
import { getAllProducts } from '../../../../redux/async-actions/ProductsAsyncActions'
import Button from '../../../components/Button'

import AddRoundedIcon from '@mui/icons-material/AddRounded';


const NewOrder = () => {
    const dispatch = useDispatch<AppDispatch>()
    const products = useSelector((state: any) => state.products.products)
    const [contactNumber, setContactNumber] = useState("")

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])
    return (
        <div className='w-full flex-grow flex flex-col'>
            <Header>
                New Order
            </Header>
            <div className='w-full flex flex-col px-2 flex-grow gap-y-2'>
                <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                    <div className='font-bold'>Orders: </div>



                </div>


                <div className='w-full flex flex-col gap-y-2'>
                    {products && (
                        products.map((product: any) => (
                            <div
                                key={product._id}
                                className='max-w-[200px] border rounded-lg overflow-hidden p-2'>
                                <div className='w-full object-cover'>
                                    <img
                                        className='w-full object-cover'
                                        src={product.image[0].url} />
                                </div>
                                <div className='text-xl font-bold uppercase'>
                                    {product.productName}
                                </div>
                                <div className='line-clamp-3 text-sm text-gray-500'>
                                    {product.desc}
                                </div>
                                <div className='font-bold text-pale-blue'>
                                    $ {product.price}
                                </div>
                                <div className='w-full flex flex-row'>
                                    <Button
                                        iconStart={<AddRoundedIcon />}
                                        label="Add" />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewOrder