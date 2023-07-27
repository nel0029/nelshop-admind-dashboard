import { createSlice } from '@reduxjs/toolkit';
import {
    addNewUSer,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserDetails,
    registerUser,
    logInUser,
    getAccountDetails,
    updateAccount,
    getUserAddress
} from '../async-actions/UserAsyncActions';


interface UserDataProps {
    userID: string | null | undefined
    name: string | null | undefined,
    profilePicture: string | null | undefined,
    cartID: string | null | undefined,
    token: string | null | undefined
}

interface MainStateProps {
    userData: UserDataProps,
    users: any[] | [],
    isUsersLoading: boolean,
    userDetails: any | null,
    isUserDetailsLoading: boolean,
    isSomeUserDeleted: boolean,
    accountDetails: any | null,
    updateAccountError: any | null,
    userAddress: any | null,
    regions: string[] | [],
    provinces: string[] | [],
    cityMunicipality: string[] | [],
    barangay: string[] | []
}

const initialState: MainStateProps = {
    userData: {
        userID: localStorage.getItem("userID"),
        name: localStorage.getItem("name"),
        cartID: localStorage.getItem("cartID"),
        profilePicture: localStorage.getItem("profilePicture"),
        token: localStorage.getItem("token"),
    },
    users: [],
    isUsersLoading: false,
    userDetails: null,
    isUserDetailsLoading: false,
    isSomeUserDeleted: false,
    accountDetails: null,
    updateAccountError: null,
    userAddress: null,
    regions: [],
    provinces: [],
    cityMunicipality: [],
    barangay: []
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        resetIsSomeUserDeletedState: (state) => {
            state.isSomeUserDeleted = false
        },
        resetUserDetails: (state) => {
            state.userDetails = null
        },
        resetUpdateAccountError: (state) => {
            state.updateAccountError = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewUSer.fulfilled, (state, action) => {
                const newUser = action.payload
                if (state.users) {
                    state.users = [...state.users, newUser]
                }
            })
            .addCase(getAllUsers.pending, (state) => {
                state.isUsersLoading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                const users = action.payload
                state.isUsersLoading = false
                state.users = users
            })
            .addCase(updateUser.pending, (state) => {
                if (state.userDetails) {
                    state.isUserDetailsLoading = true
                }
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const updatedUser = action.payload
                if (state.users) {
                    const userIndex = state.users.findIndex((user: any) => user._id === updatedUser._id)

                    if (userIndex !== -1) {
                        state.users[userIndex] = {
                            ...state.users[userIndex],
                            ...updatedUser
                        }
                    }

                    if (state.userDetails) {

                        if (state.userDetails._id === updatedUser._id) {
                            state.isUserDetailsLoading = false
                            state.userDetails = {
                                ...state.userDetails,
                                ...updatedUser
                            }
                        }
                    }
                }
            })

            .addCase(deleteUser.fulfilled, (state, action) => {
                const deletedUser = action.payload
                state.userDetails = null
                state.isSomeUserDeleted = true
                if (state.users) {
                    const userIndex = state.users.findIndex((user: any) => user._id === deletedUser._id)

                    if (userIndex !== -1) {
                        state.users[userIndex] = {
                            ...state.users[userIndex],
                            ...deletedUser
                        }
                    }

                }
            })
            .addCase(getUserDetails.pending, (state) => {
                state.isUserDetailsLoading = true
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                const userDetails = action.payload
                state.isUserDetailsLoading = false
                state.userDetails = userDetails
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                const userData = action.payload

                localStorage.setItem("userID", userData.userID)
                localStorage.setItem("name", userData.name)
                localStorage.setItem("cartID", userData.cartID)
                localStorage.setItem("profilePicture", userData.profilePicture.url)
                localStorage.setItem("token", userData.token)
            })
            .addCase(logInUser.fulfilled, (state, action) => {
                const userData = action.payload
                console.log(userData)
                localStorage.setItem("userID", userData.userID)
                localStorage.setItem("name", userData.name)
                localStorage.setItem("cartID", userData.cartID)
                localStorage.setItem("profilePicture", userData.profilePicture.url)
                localStorage.setItem("token", userData.token)
            })
            .addCase(getAccountDetails.fulfilled, (state, action) => {
                const userDetails = action.payload

                state.accountDetails = userDetails

            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                const updatedAccount: any = action.payload
                if (state.accountDetails !== null) {
                    state.accountDetails = { ...state.accountDetails, ...updatedAccount }

                }
            })
            .addCase(updateAccount.rejected, (state, action) => {
                const updateAccountErrorMessage = action.payload
                console.log(updateAccountErrorMessage)
                state.updateAccountError = updateAccountErrorMessage
            })
            .addCase(getUserAddress.fulfilled, (state, action) => {
                const userAddress = action.payload
                state.userAddress = userAddress
            })
    }
})

export const { resetIsSomeUserDeletedState, resetUserDetails, resetUpdateAccountError } = usersSlice.actions
export default usersSlice.reducer