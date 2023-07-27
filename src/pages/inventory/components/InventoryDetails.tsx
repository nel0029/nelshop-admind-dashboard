import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router'
import { AppDispatch } from '../../../../redux/store'
import { getInventoryItemDetails, updateInventoryItemdDetails } from '../../../../redux/async-actions/InventoryActions'
import Header from '../../../components/Header'
import BackButton from '../../../components/BackButton'
import Button from '../../../components/Button'
import { resetInventorItemDetails } from '../../../../redux/slices/InventorySlices'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//icons
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Modal from '../../../components/Modal'

const InventoryDetails = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const inventoryItemDetails = useSelector((state: any) => state.inventory.inventoryItemDetails)

    const { inventoryID } = useParams()

    const [addNewStock, setAddNewStock] = useState<boolean>(false)
    const [removeStock, setRemoveStock] = useState<boolean>(false)
    const [updateStockQuantity, setUpdateStockQuantity] = useState<boolean>(false)

    const [newStock, setNewStock] = useState<number>(0)
    const [removedStock, setRemovedStock] = useState<number>(0)
    const [newStockQuantity, setNewStockQuantity] = useState<number>(0)


    useEffect(() => {
        const data = {
            inventoryID
        }
        dispatch(getInventoryItemDetails(data))
    }, [])

    const goBack = () => {
        dispatch(resetInventorItemDetails())
        navigate(-1)
    }

    const handleAddNewStock = () => {
        const data = {
            inventoryItemID: inventoryID,
            quantity: newStock
        }
        dispatch(updateInventoryItemdDetails(data))
            .then((response) => {
                if (response.meta.requestStatus === "fulfilled") {
                    toast.success("Successfull added new stock")
                    setNewStock(0)
                    setAddNewStock(false)
                }
            })
    }

    const handleRemoveStock = () => {
        const data = {
            inventoryItemID: inventoryID,
            quantity: -removedStock
        }
        dispatch(updateInventoryItemdDetails(data))
            .then((response) => {
                if (response.meta.requestStatus === "fulfilled") {
                    toast.success("Successfull removed stock")
                    setRemovedStock(0)
                    setRemoveStock(false)
                }
            })
    }

    const handleUpdateStockQuantity = () => {
        const data = {
            inventoryItemID: inventoryID,
            newQuantity: newStockQuantity
        }
        dispatch(updateInventoryItemdDetails(data))
            .then((response) => {
                if (response.meta.requestStatus === "fulfilled") {
                    toast.success("Successfull Update Stock Quantity")
                    setNewStockQuantity(0)
                    setUpdateStockQuantity(false)
                }
            })
    }


    return (
        <div className="w-full flex-grow flex flex-col gap-y-2">
            <Header>
                <BackButton
                    onClick={goBack}
                />
                Inventory Item Details
            </Header>

            <div className='w-full flex flex-col gap-y-2 flex-1 px-2'>
                <div className='w-full flex flex-row items-center justify-end gap-x-1'>
                    <Button
                        onClick={() => setUpdateStockQuantity(!updateStockQuantity)}
                        iconStart={<EditRoundedIcon />}
                        label="Edit Stock" />
                    <Button
                        onClick={() => setAddNewStock(!addNewStock)}
                        iconStart={<AddRoundedIcon />}
                        label="Add New Stock"
                        variant='blue' />
                    <Button
                        onClick={() => setRemoveStock(!removeStock)}
                        iconStart={<DeleteRoundedIcon />}
                        variant='red'
                        label="Remove Stock" />

                </div>
                <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                    <div className="font-bold whitespace-nowrap">
                        Product Name:
                    </div>

                    <div className="flex-1 flex justify-start items-center ">
                        {inventoryItemDetails?.productName}
                    </div>

                </div>
                <div className='w-full flex flex-row gap-x-2'>
                    <div className='flex-1 flex flex-col gap-y-2'>
                        <div className='w-full flex flex-row justify-start gap-x-2 border rounded-lg p-2'>
                            <div className="font-bold whitespace-nowrap">
                                Category:
                            </div>

                            <div className="flex-1 flex justify-start items-center">
                                {inventoryItemDetails?.category}
                            </div>

                        </div>
                        <div className='w-full flex flex-row justify-start gap-x-2 border rounded-lg p-2'>
                            <div className="font-bold whitespace-nowrap">
                                Product ID:
                            </div>

                            <div className="flex-1 flex justify-start items-center">
                                {inventoryItemDetails?.productID}
                            </div>

                        </div>
                    </div>

                    <div className='flex-1 flex flex-col gap-y-2'>
                        <div className={`w-full flex flex-row justify-start gap-x-2 border rounded-lg p-2`}>
                            <div className="font-bold whitespace-nowrap">
                                Price:
                            </div>
                            <div className='flex-1 flex flex-row items-center'>

                                <div className="flex-1 flex justify-start items-center">
                                    {inventoryItemDetails?.price}
                                </div>

                            </div>

                        </div>
                        <div className={`w-full flex flex-row justify-start gap-x-2 border-2 border-pale-green rounded-lg p-2`}>
                            <div className='flex-1 flex flex-row justify-start items-start gap-x-2'>
                                <div className="font-bold whitespace-nowrap">
                                    Quantity:
                                </div>
                                <div className='flex-1 flex flex-row items-center'>
                                    <div className="flex-1 flex justify-start items-center">
                                        {inventoryItemDetails?.quantity}
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>




                </div>
                <div className='w-full flex flex-row flex-1 gap-x-2'>
                    <div className='flex flex-col gap-y-2 flex-1'>

                        <div className='flex flex-col justify-start gap-x-2 border rounded-lg p-2 flex-1'>
                            <div className="font-bold whitespace-nowrap">
                                Product Description:
                            </div>

                            <div className="flex-1 flex justify-start ">
                                {inventoryItemDetails?.desc}
                            </div>

                        </div>
                    </div>

                    <div className='flex flex-col gap-y-2 flex-1'>

                        <div className='h-full flex flex-1 justify-center items-center border rounded-lg p-2'>
                            <div className='flex-1 flex justify-center'>

                                <img
                                    className='w-[300px] h-auto object-cover overflow-hidden'
                                    src={inventoryItemDetails?.image[0].url} />

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <ToastContainer
                autoClose={1500} />
            {addNewStock && (
                <Modal>
                    <div className='bg-white p-2 rounded-lg min-w-[300px] flex flex-col gap-y-2'>
                        <div className='w-full font-bold flex justify-center text-xl'>
                            Add New Stock
                        </div>
                        <div className='w-full px-2 flex flex-row items-start gap-x-2'>
                            <div className='font-bold'>
                                Quantity:
                            </div>
                            <input
                                placeholder='Type here'
                                className='flex-1 border outline-none px-2 py-1 rounded-lg'
                                type='number'
                                min={0}
                                value={newStock}
                                onChange={(event: any) => setNewStock(event.target.value)}
                            />
                        </div>
                        <div className='w-full flex flex-row justify-end gap-x-1'>
                            <Button
                                onClick={() => setAddNewStock(!addNewStock)}
                                iconStart={<CancelRoundedIcon />}
                                label="Close" />
                            <Button
                                onClick={handleAddNewStock}
                                iconStart={<SaveRoundedIcon />}
                                label='Save'
                                variant='green' />
                        </div>
                    </div>
                </Modal>
            )}

            {removeStock && (
                <Modal>
                    <div className='bg-white p-2 rounded-lg min-w-[300px] flex flex-col gap-y-2'>
                        <div className='w-full font-bold flex justify-center text-xl'>
                            Remove Stock
                        </div>
                        <div className='w-full px-2 flex flex-row items-start gap-x-2'>
                            <div className='font-bold'>
                                Quantity:
                            </div>
                            <input
                                placeholder='Type here'
                                className='flex-1 border outline-none px-2 py-1 rounded-lg'
                                type='number'
                                min={0}
                                value={removedStock}
                                onChange={(event: any) => setRemovedStock(event.target.value)}
                            />
                        </div>
                        <div className='w-full flex flex-row justify-end gap-x-1'>
                            <Button
                                onClick={() => setRemoveStock(!removeStock)}
                                iconStart={<CancelRoundedIcon />}
                                label="Close" />
                            <Button
                                onClick={handleRemoveStock}
                                iconStart={<SaveRoundedIcon />}
                                label='Save'
                                variant='green' />
                        </div>
                    </div>
                </Modal>
            )}

            {updateStockQuantity && (
                <Modal>
                    <div className='bg-white p-2 rounded-lg min-w-[300px] flex flex-col gap-y-2'>
                        <div className='w-full font-bold flex justify-center text-xl'>
                            Update Stock
                        </div>
                        <div className='w-full px-2 flex flex-row items-start gap-x-2'>
                            <div className='font-bold'>
                                Quantity:
                            </div>
                            <input
                                placeholder='Type here'
                                className='flex-1 border outline-none px-2 py-1 rounded-lg'
                                type='number'
                                min={0}
                                value={newStockQuantity}
                                onChange={(event: any) => setNewStockQuantity(event.target.value)}
                            />
                        </div>
                        <div className='w-full flex flex-row justify-end gap-x-1'>
                            <Button
                                onClick={() => setUpdateStockQuantity(!updateStockQuantity)}
                                iconStart={<CancelRoundedIcon />}
                                label="Close" />
                            <Button
                                onClick={handleUpdateStockQuantity}
                                iconStart={<SaveRoundedIcon />}
                                label='Save'
                                variant='green' />
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default InventoryDetails