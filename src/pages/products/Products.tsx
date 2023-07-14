import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from "../../components/Button"
import Header from "../../components/Header"
import Menu from "../../components/Menu"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { getAllProducts } from '../../../redux/async-actions/ProductsAsyncActions'



const Products = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [category, setCategory] = useState("All")
    const categories = ["All", "Gadgets and Mobiles", "Home Appliances", "Clothing", "Tools and Equipment", "Toys"]

    const newProduct = () => {
        navigate('/products/new')
    }

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    const products = useSelector((state: any) => state.products.products)

    return (
        <div className="w-full flex-grow flex flex-col">
            <Header>
                Products
            </Header>
            <div className='w-full flex flex-col px-2'>
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
                        variant="green" />
                </div>
                <div>
                    {products}
                </div>
            </div>
        </div>
    )
}

export default Products