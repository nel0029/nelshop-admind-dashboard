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

export const getAllProducts = createAsyncThunk<any>('getAllProducts', async () => {
    try {
        const response = await axios.get('/products/all')

        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const getProductDetails = createAsyncThunk('getProductDetails', async (data: any) => {
    try {
        const { productID } = data
        const response = await axios.get(`/products/details/${productID}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateProductDetails = createAsyncThunk('updateProduct', async (data: any) => {
    try {
        const response = await axios.put('/products/update', data)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const deleteProduct = createAsyncThunk('deleteProduct', async (data: any) => {
    try {
        const { productID } = data
        const response = await axios.delete(`/products/delete/${productID}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})