import { createSlice } from '@reduxjs/toolkit';
import {
    getAllInventoryItems,
    getInventoryItemDetails,
    updateInventoryItemdDetails,
    searchInventoryItem
} from '../async-actions/InventoryActions';

interface InventoryItemDetailsProps {
    _id: string,
    productID: string,
    quantity: number,
    productName: string,
    desc: string,
    category: string,
    price: number,
    image: {
        name: string,
        url: string
    }
}

interface MainStateProps {
    inventoryItems: any[],
    inventoryItemDetails: InventoryItemDetailsProps | null,
    filteredInventoryItems: any[] | [],
    isInventoryItemsLoading: boolean,
    isFilteredInventoryItemsLoading: boolean
}


const initialState: MainStateProps = {
    inventoryItems: [],
    inventoryItemDetails: null,
    filteredInventoryItems: [],
    isInventoryItemsLoading: false,
    isFilteredInventoryItemsLoading: false
}

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        resetInventorItemDetails: (state) => {
            state.inventoryItemDetails = null
        },
        resetFilteredInventoryItems: (state) => {
            state.filteredInventoryItems = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllInventoryItems.pending, (state) => {
                state.isInventoryItemsLoading = true
            })
            .addCase(getAllInventoryItems.fulfilled, (state, action) => {
                const allInventoryItems = action.payload
                state.isInventoryItemsLoading = false
                state.inventoryItems = allInventoryItems
            })
            .addCase(getInventoryItemDetails.fulfilled, (state, action) => {
                const inventoryItemDetails = action.payload
                state.inventoryItemDetails = inventoryItemDetails
            })
            .addCase(updateInventoryItemdDetails.fulfilled, (state, action) => {
                const updatedInventoryItemDetails = action.payload
                if (state.inventoryItemDetails !== null) {
                    if (state.inventoryItemDetails._id === updatedInventoryItemDetails._id) {
                        state.inventoryItemDetails = { ...state.inventoryItemDetails, ...updatedInventoryItemDetails }

                    }
                }

            })
            .addCase(searchInventoryItem.pending, (state) => {
                state.isFilteredInventoryItemsLoading = true
            })
            .addCase(searchInventoryItem.fulfilled, (state, action) => {
                const inventoryItems = action.payload
                state.isFilteredInventoryItemsLoading = false
                state.filteredInventoryItems = inventoryItems
            })
    },
})

export const { resetInventorItemDetails, resetFilteredInventoryItems } = inventorySlice.actions
export default inventorySlice.reducer