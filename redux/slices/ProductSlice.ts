import { createSlice } from '@reduxjs/toolkit';
import { getAllProducts } from '../async-actions/ProductsAsyncActions'

const initialState = {
    products: [],
    productvariants: []
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.fulfilled, (state, action) => {
                const products = action.payload
                state.products = products
                console.log(products)
            })
    }
})


export default productSlice.reducer