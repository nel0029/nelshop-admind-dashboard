import { configureStore } from '@reduxjs/toolkit'
import productSlice from "./slices/ProductSlice"
import inventorySlice from "./slices/InventorySlices"
import usersSlice from "./slices/UsersSlice"
import orderSlice from "./slices/OrderSlice"


const store = configureStore({
    reducer: {
        products: productSlice,
        inventory: inventorySlice,
        users: usersSlice,
        orders: orderSlice
    },

})


export default store
export type AppDispatch = typeof store.dispatch