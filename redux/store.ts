import { configureStore } from '@reduxjs/toolkit'
import productSlice from "./slices/ProductSlice"


const store = configureStore({
    reducer: {
        products: productSlice
    },

})


export default store
export type AppDispatch = typeof store.dispatch