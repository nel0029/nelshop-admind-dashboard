import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const getAllInventoryItems = createAsyncThunk('getAllInventoryItems', async () => {
    try {
        const response = await axios.get('/inventory/all')
        return response.data
    } catch (error) {
        console.log(error)
    }

})

export const getInventoryItemDetails = createAsyncThunk('getInventoryDetails', async (data: any) => {
    try {
        const { inventoryID } = data
        const response = await axios.get(`/inventory/details/${inventoryID}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateInventoryItemdDetails = createAsyncThunk('updateInventoryItemDetails', async (data: any) => {
    try {
        const response = await axios.put('/inventory/update', data)

        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const searchInventoryItem = createAsyncThunk('searchInventoryItem', async (data: any) => {
    try {
        const { keyword } = data
        const response = await axios.get(`/inventory/search?keyword=${keyword}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
})