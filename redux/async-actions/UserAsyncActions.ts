import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const addNewUSer = createAsyncThunk("addNewUser", async (data: any) => {
    try {
        const response = await axios.post("/users/new", data)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
    try {
        const response = await axios.get('/users/all')
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateUser = createAsyncThunk("updateUser", async (data: any) => {
    try {
        const response = await axios.put("/users/update", data)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const deleteUser = createAsyncThunk("deleteUser", async (data: any) => {
    try {
        const { userID } = data
        const response = await axios.delete(`/users/delete/${userID}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const getUserDetails = createAsyncThunk("getUserDetails", async (data: any) => {
    try {
        const { userID } = data
        const response = await axios.get(`/users/details/${userID}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const registerUser = createAsyncThunk('registerUser', async (data: any) => {
    try {
        const response = await axios.post('/users/register', data)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const logInUser = createAsyncThunk('logInUser', async (data: any) => {
    try {
        const response = await axios.post('/users/login', data)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const getAccountDetails = createAsyncThunk("getAccountDetails", async (data: any) => {
    try {
        const { userID } = data
        const response = await axios.get(`/users/account/details/${userID}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateAccount = createAsyncThunk("updateAccount", async (data: any, { rejectWithValue }) => {
    try {
        const response = await axios.put("/users/account/update", data)

        return response.data
    } catch (error: any) {
        console.log(error)
        if (error.response && error.response.status === 401) {
            return rejectWithValue(error.response.data.message);
        }
    }
})

export const getUserAddress = createAsyncThunk('getUserAddress', async (data: any) => {
    try {
        const { userID } = data
        const response = await axios.get(`/users/address/${userID}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

