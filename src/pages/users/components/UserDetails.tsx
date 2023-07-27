import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { updateUser, getUserDetails, deleteUser } from '../../../../redux/async-actions/UserAsyncActions';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { v4 } from "uuid"
import { storage } from '../../../firebase/Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../../components/Header'
import BackButton from '../../../components/BackButton'
import Button from '../../../components/Button';
import CircleLoader from '../../../components/CircleLoader';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { resetUserDetails } from '../../../../redux/slices/UsersSlice';
import Modal from '../../../components/Modal';




const UserDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { userID } = useParams()
    const userDetails = useSelector((state: any) => state.users.userDetails)

    const [name, setName] = useState<string>("")
    const [contactNumber, setContactNumber] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    //const [showPassword, setShowPassword] = useState<boolean>(false)
    const [imageFile, setImageFile] = useState<any>(null)
    const [selectedFile, setSelectedFile] = useState("")
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [isUpdatingUser, setIsUpdatingUser] = useState<boolean>(false)
    const [isDeletingUser, setIsDeletingUser] = useState<boolean>(false)
    const [isUserDeleting, setIsUserDeleting] = useState<boolean>(false)


    const resetForm = () => {
        setName("")
        setContactNumber("")
        setEmail("")
        setPassword("")
        setImageFile(null)
        setSelectedFile("")
    }

    const goback = () => {
        navigate(-1)
        resetForm()
    }

    const handleUpdateUserButton = () => {
        setIsUpdatingUser(!isUpdatingUser)
        if (userDetails) {
            setName(userDetails.name)
            setContactNumber(userDetails.contactNumber)
            setEmail(userDetails.email)
            setSelectedFile(userDetails.profilePicture.url)
        }
    }


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        setImageFile(selectedFile);

        if (selectedFile) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setSelectedFile(fileReader.result as string);
            };
            fileReader.readAsDataURL(selectedFile);
        } else {
            setSelectedFile("");
        }
    };

    const handleUpdateUser = () => {

        if (userDetails.profilePicture.name === "Default") {

            setIsUploading(true)
            const newImageFileName = Date.now().toString() + v4()
            const fileRef = ref(storage, `nelshop/${newImageFileName}`)
            uploadBytes(fileRef, imageFile)
                .then((snapshot: any) => {
                    getDownloadURL(snapshot.ref)
                        .then((url: any) => {
                            const updatedUser = {
                                userID: userDetails._id,
                                name,
                                contactNumber,
                                email,
                                password,
                                profilePicture: {
                                    name: newImageFileName,
                                    url: url
                                }

                            }
                            dispatch(updateUser(updatedUser))
                                .then((response) => {

                                    if (response.meta.requestStatus === "fulfilled") {
                                        toast.success("Successfully Updated User Details")
                                        setIsUploading(false)
                                        resetForm()
                                        setTimeout(() => {
                                            navigate(-1)
                                        }, 2000);
                                    }
                                })
                        })
                })
        } else {
            if (imageFile !== null) {
                setIsUploading(true); // Set uploading state

                const fileRef = ref(storage, `nelshop/${userDetails?.profilePicture.name}`);

                deleteObject(fileRef)
                    .then(() => {
                        setIsUploading(true)
                        const newImageFileName = Date.now().toString() + v4()
                        const fileRef = ref(storage, `nelshop/${newImageFileName}`)
                        uploadBytes(fileRef, imageFile).then((snapshot: any) => {
                            getDownloadURL(snapshot.ref).then((url: any) => {
                                const updatedUser = {
                                    userID: userDetails._id,
                                    name,
                                    contactNumber,
                                    email,
                                    password,
                                    profilePicture: {
                                        name: newImageFileName,
                                        url: url
                                    }

                                }
                                dispatch(updateUser(updatedUser)).then((response) => {
                                    if (response.meta.requestStatus === "fulfilled") {
                                        toast.success("Successfully Updated User Details")
                                        setIsUploading(false)
                                        resetForm()
                                        setTimeout(() => {
                                            navigate(-1)
                                        }, 2000);
                                    }
                                })
                            })
                        })

                    })

            } else {
                const updatedUser = {
                    userID: userDetails._id,
                    name,
                    contactNumber,
                    email,
                    password,
                    profilePicture: userDetails?.profilePicture, // Keep the existing image details
                };

                dispatch(updateUser(updatedUser))
                    .then((response) => {
                        if (response.meta.requestStatus === "fulfilled") {
                            toast.success("Successfully Updated User Details")
                            setIsUploading(false)
                            resetForm()
                            setTimeout(() => {
                                navigate(-1)
                            }, 2000);

                        }
                    })

            }
        }
    }

    const handleDeleteUser = () => {
        if (userDetails) {
            setIsUserDeleting(true)
            if (userDetails.profilePicture.name !== "Default") {
                const fileRef = ref(storage, `nelshop/${userDetails.profilePicture.name}`);
                deleteObject(fileRef)
            }

            const data = {
                userID: userID
            }
            dispatch(deleteUser(data))

            navigate('/users')
            setIsUserDeleting(false)

        }
    }

    useEffect(() => {

        const data = {
            userID: userID
        }
        dispatch(getUserDetails(data))


        return () => {
            dispatch(resetUserDetails())
        }
    }, [userID])

    return (
        <div className="w-full flex-grow flex flex-col">
            <Header>
                <BackButton
                    onClick={goback} />
                <div>
                    User Details
                </div>
            </Header>
            <div className='w-full px-2 flex flex-col gap-y-2'>
                <div className='w-full flex flex-row items-center justify-between'>
                    <div className='text-xl font-bold'>
                        User Information
                    </div>

                    <div>
                        {isUpdatingUser ? (
                            <div className='flex flex-row items-center gap-x-1'>
                                <Button
                                    onClick={handleUpdateUserButton}
                                    iconStart={<CancelRoundedIcon />}
                                    label='Cancel' />
                                <Button
                                    onClick={handleUpdateUser}
                                    disabled={name && email && contactNumber && selectedFile ? false : true}
                                    iconStart={
                                        isUploading ? (
                                            <CircleLoader />
                                        ) : (
                                            <SaveRoundedIcon />
                                        )}
                                    label='Save'
                                    variant='green' />
                            </div>
                        ) : (
                            <div className='flex flex-row items-center gap-x-1'>
                                <Button
                                    onClick={handleUpdateUserButton}
                                    iconStart={<EditRoundedIcon />}
                                    label='Edit User'
                                    variant='blue' />
                                <Button
                                    onClick={() => setIsDeletingUser(true)}
                                    iconStart={<DeleteRoundedIcon />}
                                    label='Delete User'
                                    variant='red' />
                            </div>
                        )}
                    </div>
                </div>
                <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                    <div className='font-bold'>Name: {isUpdatingUser ? <span className='text-pale-red font-extrabold'>*</span> : null}</div>
                    {isUpdatingUser ? (
                        <input
                            autoComplete='new-name'
                            placeholder='Type here'
                            className='border-none px-2 py-1 outline-none'
                            type='text'
                            value={name}
                            onChange={(event: any) => setName(event.target.value)}
                        />
                    ) : (
                        <div>
                            {userDetails?.name}
                        </div>
                    )}
                </div>
                <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                    <div className='font-bold'>Email: {isUpdatingUser ? <span className='text-pale-red font-extrabold'>*</span> : null}</div>
                    {isUpdatingUser ? (
                        <input
                            autoComplete='new-email'
                            placeholder='Type here'
                            className='border-none px-2 py-1 outline-none'
                            type='text'
                            value={email}
                            onChange={(event: any) => setEmail(event.target.value)}
                        />
                    ) : (
                        <div>
                            {userDetails?.email}
                        </div>
                    )}
                </div>
                <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                    <div className='font-bold'>Contact Number: {isUpdatingUser ? <span className='text-pale-red font-extrabold'>*</span> : null}</div>
                    {isUpdatingUser ? (
                        <input
                            autoComplete='new-contact-number'
                            placeholder='Type here'
                            className='border-none px-2 py-1 outline-none'
                            type='text'
                            value={contactNumber}
                            onChange={(event: any) => setContactNumber(event.target.value)}
                        />
                    ) : (
                        <div>
                            {userDetails?.contactNumber}
                        </div>
                    )}
                </div>

                <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                    <div className='font-bold'>Profile Picture: {isUpdatingUser ? <span className='text-pale-red font-extrabold'>*</span> : null}</div>
                    {isUpdatingUser ? (
                        <input
                            className='cursor-pointer'
                            type='file'
                            accept='image/*'
                            onChange={handleFileChange}
                        />
                    ) : (
                        <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                            <div className='w-[150px]'>
                                <img
                                    className='w-full h-auto object-cover overflow-hidden'
                                    src={userDetails?.profilePicture.url} />
                            </div>
                        </div>
                    )}
                </div>
                {isUpdatingUser && (
                    selectedFile && (
                        <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                            <div className='w-[150px]'>
                                <img
                                    className='w-full h-auto object-cover overflow-hidden'
                                    src={selectedFile} />
                            </div>
                        </div>
                    )
                )}
            </div>
            <ToastContainer
                autoClose={1000} />
            {isDeletingUser && (
                <Modal>
                    <div className=' bg-white p-4 rounded-lg min-w-[300px] flex flex-col'>
                        <div className="w-full flex flex-row items-center text-xl font-bold justify-center">
                            Deleting a product
                        </div>
                        <div className="w-full py-4">
                            Are you sure you want to delete this product?
                        </div>
                        <div className="w-full flex flex-row items-center justify-end gap-x-2">
                            <Button
                                onClick={() => setIsDeletingUser(false)}
                                iconStart={<CancelRoundedIcon />}
                                label="Cancel" />
                            <Button
                                onClick={handleDeleteUser}
                                iconStart={isUserDeleting ? (
                                    <CircleLoader />
                                ) :
                                    (<DeleteRoundedIcon />)}
                                label="Delete"
                                variant="red" />
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default UserDetails