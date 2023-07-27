import { createSlice } from '@reduxjs/toolkit';
import {
    getAllProducts,
    getProductDetails,
    updateProductDetails,
    deleteProduct
} from '../async-actions/ProductsAsyncActions'

const initialState = {
    isProductsLoading: false,
    isProductDeleted: false,
    products: [],
    productDetails: null
}

const productSlice: any = createSlice({
    name: "products",
    initialState,
    reducers: {
        resetProductDetails: (state) => {
            state.productDetails = null
        },
        resetProductDeletedState: (state) => {
            state.isProductDeleted = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isProductsLoading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                const products = action.payload
                state.products = products
                state.isProductsLoading = false

            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                const productDetails = action.payload
                state.productDetails = productDetails
            })
            .addCase(updateProductDetails.fulfilled, (state, action) => {
                const updatedProduct = action.payload
                state.productDetails = updatedProduct
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const deletedProduct = action.payload
                state.productDetails = null
                state.isProductDeleted = true

                if (state.products !== null) {
                    state.products = state.products.filter((product: any) => product._id !== deletedProduct._id)
                }
            })
    }
})

export const {
    resetProductDetails,
    resetProductDeletedState
} = productSlice.actions
export default productSlice.reducer