import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



export const addNewProduct = createAsyncThunk('addNewProduct', async (data: any) => {
    try {
        const response = await axios.post('/products/new', data)

        return response.data
    } catch (error) {
        console.log(error)
    }

})

export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
    try {
        const response = await axios.get('/products/all')

        return response.data
    } catch (error) {
        console.log(error)
    }
})
