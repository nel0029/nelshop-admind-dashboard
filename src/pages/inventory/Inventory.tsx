import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { AppDispatch } from "../../../redux/store"
import { getAllInventoryItems, searchInventoryItem } from "../../../redux/async-actions/InventoryActions"
import Header from "../../components/Header"
import Menu from "../../components/Menu"
import useDebounce from "../../hooks/UseDebounce"

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import InventoryRounedIcon from '@mui/icons-material/Inventory';
import { resetFilteredInventoryItems } from "../../../redux/slices/InventorySlices"
import CircleLoader from "../../components/CircleLoader"


const Inventory = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const inventoryItems = useSelector((state: any) => state.inventory.inventoryItems)
    const isInventoryItemsLoading = useSelector((state: any) => state.inventory.isInventoryItemsLoading)
    const filteredInventoryItems = useSelector((state: any) => state.inventory.filteredInventoryItems)
    const isFilteredInventoryItemsLoading = useSelector((state: any) => state.inventory.isFilteredInventoryItemsLoading)

    const [category, setCategory] = useState("All")
    const [keyword, setKeyword] = useState<string>("")

    const categories = ["All", "Gadgets and Mobiles", "Home Appliances", "Clothing", "Tools and Equipment", "Toys"]

    const searchKeyword = useDebounce(keyword, 1000)

    useEffect(() => {
        dispatch(getAllInventoryItems())
    }, [])

    const handleFilteredInventoryItems = (category: string) => {
        let newFilteredInventoryItems: any[] = []
        if (inventoryItems) {
            if (category !== "All") {
                newFilteredInventoryItems = inventoryItems.filter((product: any) => product.category === category)
            } else {
                newFilteredInventoryItems = inventoryItems
            }
        }
        return newFilteredInventoryItems;
    };

    const inventoryItemDetails = (id: string) => {
        navigate(`/inventory/${id}`)
    }

    useEffect(() => {

        if (searchKeyword) {
            const data = {
                keyword: searchKeyword
            }
            dispatch(searchInventoryItem(data))

            if (!keyword) {
                dispatch(resetFilteredInventoryItems())
            }
        }

    }, [searchKeyword, dispatch])

    return (
        <div className="w-full flex-1 flex flex-col">
            <Header>
                Inventory
            </Header>
            <div className="w-full px-2 flex-grow flex flex-col gap-y-2">
                <div className="w-full flex flex-row items-center justify-between">

                    <div className="flex flex-row items-end gap-x-2">
                        <div className="flex flex-row border rounded-lg px-2 py-1">
                            <input
                                onChange={(event: any) => setKeyword(event.target.value)}
                                placeholder="Search..."
                                className="border-none outline-none flex-1"
                                type="text" />
                            <div className="">
                                <SearchRoundedIcon />
                            </div>
                        </div>
                        {searchKeyword.length > 0 ? (
                            <div className="flex flex-row gap-x-1 text-xl">
                                <span className="font-bold">
                                    {filteredInventoryItems.length}
                                </span>
                                <span className="text-gray-500">
                                    {filteredInventoryItems.length > 1 ? "results" : "result"}
                                </span>
                            </div>
                        ) : null}
                    </div>
                    <div className="flex flex-row items-start gap-x-1">
                        <div className="font-bold">
                            Filter:
                        </div>
                        <Menu
                            option={category}
                            setOption={setCategory}
                            menuOptions={categories}
                        />
                    </div>
                </div>

                <table className='w-full border-b flex-grow'>

                    <tbody>
                        <tr className='flex items-center justify-start border-y-2 border-black '>
                            <th className='p-2 flex justify-start'>
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
                            <th className='p-2 flex-1 flex justify-start'>
                                Quantity
                            </th>

                        </tr>

                        {isInventoryItemsLoading ? (
                            <tr>
                                <td colSpan={5} className='w-full flex justify-center items-center p-2'>
                                    <CircleLoader />
                                </td>
                            </tr>

                        ) : (
                            isFilteredInventoryItemsLoading ? (
                                <tr>
                                    <td colSpan={5} className='w-full flex justify-center items-center p-2'>
                                        <CircleLoader
                                            size="w-8 h-8" />
                                    </td>
                                </tr>
                            ) : (
                                filteredInventoryItems.length > 0 ? (
                                    filteredInventoryItems.length > 0 ? (
                                        filteredInventoryItems.map((product: any, index: number) => (
                                            <tr
                                                onClick={() => inventoryItemDetails(product._id)}
                                                key={index}
                                                className="w-full flex justify-around items-center border-y hover:bg-black hover:bg-opacity-20 cursor-pointer">
                                                <td className=" flex flex-row justify-start items-center flex-nowrap overflow-hidden p-2 gap-x-1">

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
                                                <td className="flex-1 flex flex-row justify-start items-center flex-nowrap overflow-hidden p-2 gap-x-1 font-bold ">
                                                    <div className="p-1 bg-pale-blue bg-opacity-20 rounded-lg text-pale-blue">
                                                        <InventoryRounedIcon />
                                                    </div>
                                                    <div>
                                                        {product.quantity}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className='w-full flex justify-center items-center p-2'>No products found</td>
                                        </tr>
                                    )) : (handleFilteredInventoryItems(category).length > 0 ? (
                                        handleFilteredInventoryItems(category).map((product: any, index: number) => (
                                            <tr
                                                onClick={() => inventoryItemDetails(product._id)}
                                                key={index}
                                                className="w-full flex justify-around items-center border-y hover:bg-black hover:bg-opacity-20 cursor-pointer">
                                                <td className=" flex flex-row justify-start items-center flex-nowrap overflow-hidden p-2 gap-x-1">

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
                                                <td className="flex-1 flex flex-row justify-start items-center flex-nowrap overflow-hidden p-2 gap-x-1 font-bold text-base">
                                                    <div className="p-1 bg-pale-blue bg-opacity-20 rounded-lg text-pale-blue">
                                                        <InventoryRounedIcon />
                                                    </div>
                                                    <div>
                                                        {product.quantity}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className='w-full flex justify-center items-center p-2'>No products found</td>
                                        </tr>
                                    ))
                            )
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Inventory