import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({
    reducer: {

    },

})


export default store
export type AppDispatch = typeof store.dispatch