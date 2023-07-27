import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const addNewOrder = createAsyncThunk("addNewOrder", async (data: any) => {
    try {
        const response = await axios.post('orders/new', data)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const getOrders = createAsyncThunk("getOrders", async () => {
    try {
        const response = await axios.get('/orders/all')
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const getOrderDetails = createAsyncThunk("getOrderDetails", async (data: any) => {
    try {
        const { orderID } = data
        const response = await axios.get(`/orders/details/${orderID}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})