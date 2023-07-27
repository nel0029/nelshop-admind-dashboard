import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from "../../components/Button"
import Header from "../../components/Header"
import Menu from "../../components/Menu"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { getAllProducts } from '../../../redux/async-actions/ProductsAsyncActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetProductDeletedState } from '../../../redux/slices/ProductSlice'
import CircleLoader from '../../components/CircleLoader'



const Products = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [category, setCategory] = useState("All")

    const categories = ["All", "Gadgets and Mobiles", "Home Appliances", "Clothing", "Tools and Equipment", "Toys"]
    const products = useSelector((state: any) => state.products.products)
    const isProductsLoading = useSelector((state: any) => state.products.isProductsLoading)
    const isSomeProductDeleted = useSelector((state: any) => state.products.isProductDeleted)

    const newProduct = () => {
        navigate('/products/new')
    }
    const productDetails = (id: string) => {
        navigate(`/products/${id}`)
    }

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    let filteredProducts: any[] = []
    const handleFilteredProducts = (category: string) => {
        let newFilteredProducts: any[] = []
        if (products) {
            if (category !== "All") {
                newFilteredProducts = products.filter((product: any) => product.category === category)
            } else {
                newFilteredProducts = products
            }
        }
        return newFilteredProducts;
    };

    useEffect(() => {

        filteredProducts = handleFilteredProducts(category)

    }, [category])

    useEffect(() => {
        if (isSomeProductDeleted) {
            toast.success("Successfully Deleted")

            setTimeout(() => {
                dispatch(resetProductDeletedState())
            }, 2000);
        }
    }, [isSomeProductDeleted])


    return (
        <div className="w-full flex-grow flex flex-col">
            <Header>
                Products
            </Header>
            <div className='w-full flex-grow flex flex-col px-2 gap-y-2'>
                <div className='w-full flex flex-row items-center justify-end gap-x-2'>
                    <div className='flex flex-row items-center justify-end gap-x-2'>
                        <div>
                            Category:
                        </div>
                        <Menu
                            option={category}
                            setOption={setCategory}
                            menuOptions={categories} />
                    </div>

                    <Button
                        onClick={newProduct}
                        iconStart={
                            <div>
                                <AddRoundedIcon />
                            </div>
                        }
                        label="New Product"
                        variant="blue" />
                </div>
                <div className='w-full flex-1 flex flex-col'>
                    <table className='w-full flex-1'>
                        <tbody>
                            <tr className='flex items-center justify-start border-y-2 border-black '>
                                <th className='p-2 flex-1 flex justify-start'>
                                    Image
                                </th>

                                <th className='p-2 flex-1 flex justify-start'>
                                    Product Name
                                </th>
                                <th className='p-2 flex-1 flex justify-start'>
                                    Decription
                                </th>
                                <th className='p-2 flex-1 flex justify-start'>
                                    Category
                                </th>

                                <th className='p-2 flex-1 flex justify-start'>
                                    Price
                                </th>

                            </tr>

                            {isProductsLoading ? (
                                <tr>
                                    <td colSpan={5} className='w-full flex justify-center items-center p-2'>
                                        <CircleLoader
                                            size="w-8 h-8" />
                                    </td>
                                </tr>
                            ) : (
                                handleFilteredProducts(category).length > 0 ? (
                                    handleFilteredProducts(category).map((product: any, index: number) => (
                                        <tr
                                            onClick={() => productDetails(product._id)}
                                            key={index}
                                            className="w-full flex justify-around items-center border-y hover:bg-black hover:bg-opacity-20 cursor-pointer">
                                            <td className="flex-1 flex flex-row justify-start items-center flex-nowrap overflow-hidden p-2 gap-x-1">

                                                <img
                                                    className='h-[50px]'

                                                    src={product.image[0].url}
                                                />


                                            </td>

                                            <td className="flex-1 flex flex-row justify-start items-center flex-nowrap overflow-hidden p-2 gap-x-1">
                                                {product.productName}
                                            </td>

                                            <td className="flex-1 flex flex-row justify-start items-center flex-nowrap overflow-hidden p-2 gap-x-1">
                                                {product.desc}
                                            </td>
                                            <td className="flex-1 flex flex-row justify-start items-center flex-nowrap overflow-hidden p-2 gap-x-1">
                                                {product.category}
                                            </td>

                                            <td className="flex-1 flex flex-row justify-start items-center flex-nowrap overflow-hidden p-2 gap-x-1">
                                                {product.price}
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className='w-full flex justify-center items-center p-2'>No products found</td>
                                    </tr>
                                )
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Products