import { useEffect } from "react"
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../components/Header"
import Button from "../../components/Button"

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { getAllUsers } from "../../../redux/async-actions/UserAsyncActions";
import { resetIsSomeUserDeletedState } from "../../../redux/slices/UsersSlice"
import CircleLoader from "../../components/CircleLoader";


const Users = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const users = useSelector((state: any) => state.users.users)
    const isUsersLoading = useSelector((state: any) => state.users.isUsersLoading)
    const isSomeUserDeleted = useSelector((state: any) => state.users.isSomeUserDeleted)


    useEffect(() => {
        dispatch(getAllUsers())
    }, [])


    const addNewUser = () => {
        navigate('/users/new')
    }

    const goToUserDetails = (userID: string) => {
        navigate(`/users/details/${userID}`)
    }

    useEffect(() => {
        if (isSomeUserDeleted) {

            toast.success("Successfully delete a user")
            setTimeout(() => {
                dispatch(resetIsSomeUserDeletedState())
            }, 2000);

        }
    }, [isSomeUserDeleted])

    return (
        <div className="w-full flex-grow flex flex-col">
            <Header>
                Users
            </Header>
            <div className="w-full flex-1 flex flex-col px-2 gap-y-1">
                <div className="w-full flex flex-row items-center justify-end">
                    <Button
                        onClick={addNewUser}
                        label="Add New User"
                        variant="blue"
                        iconStart={<AddRoundedIcon />} />
                </div>
                <div className="w-full flex flex-col">
                    <table className="w-full ">
                        <thead>
                            <tr className='flex items-center justify-start border-y-2 border-black '>
                                <th className='p-2 flex-1 flex justify-start'>
                                    Image
                                </th>
                                <th className='p-2 flex-1 flex justify-start'>
                                    Name
                                </th>
                                <th className='p-2 flex-1 flex justify-start'>
                                    Contact Number
                                </th>
                                <th className='p-2 flex-1 flex justify-start'>
                                    Email
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {isUsersLoading ? (
                                <tr>
                                    <td colSpan={5} className='w-full flex justify-center items-center p-2'>
                                        <CircleLoader />
                                    </td>
                                </tr>
                            ) : (
                                users?.length > 0 ? (
                                    users?.map((user: any, index: number) => (
                                        <tr
                                            key={index}
                                            onClick={() => goToUserDetails(user._id)}
                                            className="w-full flex justify-around items-center border-y hover:bg-black hover:bg-opacity-20 cursor-pointer">
                                            <td className="flex-1 flex flex-row justify-start items-center flex-nowrap overflow-hidden p-2 gap-x-1">

                                                <img
                                                    className='h-[50px]'
                                                    src={user.profilePicture.url}
                                                />


                                            </td>

                                            <td className="flex-1 flex flex-row justify-start items-center flex-nowrap overflow-hidden p-2 gap-x-1">
                                                {user.name}
                                            </td>

                                            <td className="flex-1 flex flex-row justify-start items-center flex-nowrap overflow-hidden p-2 gap-x-1">
                                                {user.contactNumber}
                                            </td>
                                            <td className="flex-1 flex flex-row justify-start items-center flex-nowrap overflow-hidden p-2 gap-x-1">
                                                {user.email}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className='w-full flex justify-center items-center p-2'>No users found</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer
                autoClose={1000} />
        </div>
    )
}

export default Users