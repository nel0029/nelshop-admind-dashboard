import { createSlice } from '@reduxjs/toolkit';
import { addNewOrder, getOrders, getOrderDetails } from "../async-actions/OrdersAsyncActions"

interface MainStateProps {
    orders: any[] | [],
    orderDetails: any | null
}


const initialState: MainStateProps = {
    orders: [],
    orderDetails: null
}


const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.fulfilled, (state, action) => {
                const orders = action.payload
                state.orders = orders
            })
            .addCase(addNewOrder.fulfilled, (state, action) => {
                const newOrder = action.payload
                if (state.orders) {
                    state.orders = [...state.orders, newOrder]
                }
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                const orderDetails = action.payload
                state.orderDetails = orderDetails
            })
    }
})

export default orderSlice.reducer