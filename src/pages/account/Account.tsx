import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { updateAccount, getAccountDetails, deleteUser } from '../../../redux/async-actions/UserAsyncActions';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { v4 } from "uuid"
import { storage } from '../../firebase/Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header'
import Button from '../../components/Button';
import CircleLoader from '../../components/CircleLoader';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { resetUpdateAccountError } from '../../../redux/slices/UsersSlice';

const Account = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const accountDetails = useSelector((state: any) => state.users.accountDetails)
    const updateAccountError = useSelector((state: any) => state.users.updateAccountError)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [contactNumber, setContactNumber] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false)
    const [newPassword, setNewPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
    const [imageFile, setImageFile] = useState<any>(null)
    const [selectedFile, setSelectedFile] = useState("")
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [isUpdatingUser, setIsUpdatingUser] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => { dispatch(resetUpdateAccountError()) }, 2000)
        const data = {
            userID: localStorage.getItem("userID")
        }
        dispatch(getAccountDetails(data))
            .then(() => {
                setIsLoading(false)
                setName(accountDetails?.name)
                setContactNumber(accountDetails?.contactNumber)
                setEmail(accountDetails?.email)
                setSelectedFile(accountDetails?.profilePicture.url)
            })
    }, [])

    useEffect(() => {
        if (updateAccountError) {
            toast.error(updateAccountError)
            setIsLoading(true)
            const data = {
                userID: localStorage.getItem("userID")
            }
            dispatch(getAccountDetails(data))
                .then(() => {
                    setIsLoading(false)
                    setName(accountDetails?.name)
                    setContactNumber(accountDetails?.contactNumber)
                    setEmail(accountDetails?.email)
                    setSelectedFile(accountDetails?.profilePicture.url)
                })
        }

    }, [updateAccountError])

    const handleUpdateButton = () => {
        setName(accountDetails?.name)
        setContactNumber(accountDetails?.contactNumber)
        setEmail(accountDetails?.email)
        setSelectedFile(accountDetails?.profilePicture.url)
        setIsUpdatingUser(true)
    }


    const resetForm = () => {
        setName("")
        setContactNumber("")
        setEmail("")
        setPassword("")
        setImageFile(null)
        setSelectedFile("")
        setNewPassword("")
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


    const handleUpdateAccount = () => {

        if (accountDetails?.profilePicture.name === "Default") {

            setIsUploading(true)
            const newImageFileName = Date.now().toString() + v4()
            const fileRef = ref(storage, `nelshop/${newImageFileName}`)
            uploadBytes(fileRef, imageFile)
                .then((snapshot: any) => {
                    getDownloadURL(snapshot.ref)
                        .then((url: any) => {
                            const updatedUser = {
                                userID: accountDetails._id,
                                name,
                                contactNumber,
                                email,
                                password,
                                newPassword,
                                profilePicture: {
                                    name: newImageFileName,
                                    url: url
                                }

                            }
                            dispatch(updateAccount(updatedUser))
                                .then((response) => {
                                    console.log(response)
                                    if (response.meta.requestStatus === "fulfilled") {
                                        toast.success("Successfully Updated User Details")
                                        setIsUploading(false)
                                        resetForm()
                                        setIsUpdatingUser(false)

                                    }
                                })

                        })
                })
        } else {
            if (imageFile !== null) {
                setIsUploading(true); // Set uploading state

                const fileRef = ref(storage, `nelshop/${accountDetails?.profilePicture.name}`);

                deleteObject(fileRef)
                    .then(() => {
                        setIsUploading(true)
                        const newImageFileName = Date.now().toString() + v4()
                        const fileRef = ref(storage, `nelshop/${newImageFileName}`)
                        uploadBytes(fileRef, imageFile).then((snapshot: any) => {
                            getDownloadURL(snapshot.ref).then((url: any) => {
                                const updatedUser = {
                                    userID: accountDetails._id,
                                    name,
                                    contactNumber,
                                    email,
                                    password,
                                    newPassword,
                                    profilePicture: {
                                        name: newImageFileName,
                                        url: url
                                    }

                                }
                                dispatch(updateAccount(updatedUser))

                                    .then((response) => {
                                        console.log(response)
                                        if (response.meta.requestStatus === "fulfilled") {
                                            toast.success("Successfully Updated User Details")
                                            setIsUploading(false)
                                            resetForm()
                                            setIsUpdatingUser(false)

                                        }
                                    })

                            })
                        })

                    })

            } else {
                const updatedUser = {
                    userID: accountDetails._id,
                    name,
                    contactNumber,
                    email,
                    password,
                    newPassword,
                    profilePicture: accountDetails?.profilePicture, // Keep the existing image details
                };

                dispatch(updateAccount(updatedUser))
                    .then((response) => {
                        console.log(response)
                        if (response.meta.requestStatus === "fulfilled") {
                            toast.success("Successfully Updated User Details")
                            setIsUploading(false)
                            resetForm()
                            setIsUpdatingUser(false)

                        }
                    })
            }
        }
    }


    return (
        <div className='w-full flex-grow flex flex-col gap-y-2'>
            <Header>
                Account
            </Header>
            <div className='w-full flex-1 flex'>
                {isLoading ? (
                    <div className='flex flex-grow items-center justify-center'>
                        <CircleLoader size='w-10 h-10' />
                    </div>
                ) : (
                    <div className='w-full flex flex-col px-2 gap-y-2'>
                        <div className='w-ful flex flex-row items-cebter justify-end'>
                            {isUpdatingUser && (
                                <div className='flex flex-row items-center gap-x-2'>
                                    <Button
                                        onClick={() => setIsUpdatingUser(false)}
                                        iconStart={<CancelRoundedIcon />}
                                        label="Cancel" />
                                    <Button
                                        disabled={!password && isChangingPassword && !newPassword ? true : !password && isChangingPassword && newPassword ? true : !password && !isChangingPassword ? true : password && isChangingPassword && !newPassword ? true : false}
                                        onClick={handleUpdateAccount}
                                        iconStart={isUploading ? (
                                            <CircleLoader />
                                        ) : (
                                            <SaveRoundedIcon />
                                        )}
                                        label="Save"
                                        variant='green' />
                                </div>
                            )}
                            <Button
                                onClick={handleUpdateButton}
                                iconStart={<EditRoundedIcon />}
                                label='Edit' />
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
                                    {accountDetails?.name}
                                </div>
                            )}
                        </div>
                        <div className='w-full flex flex-row items-center gap-x-2'>
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
                                        {accountDetails?.email}
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
                                        {accountDetails?.contactNumber}
                                    </div>
                                )}
                            </div>
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
                                            src={accountDetails?.profilePicture.url} />
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

                        {isUpdatingUser && (
                            <div className='w-full flex flex-row items-center'>

                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" onChange={(event: any) => setIsChangingPassword(event.target.checked)} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Change Password?</span>
                                </label>

                            </div>
                        )}
                        {isUpdatingUser && (
                            isChangingPassword && (
                                <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                                    <div className='font-bold'>New Password: {isUpdatingUser ? <span className='text-pale-red font-extrabold'>*</span> : null}</div>
                                    <div className='flex-1 flex flex-row items-center gap-x-2'>
                                        <input
                                            autoComplete='new-password'
                                            placeholder='********'
                                            className='flex-1 border-none outline-none'
                                            type={showNewPassword ? 'text' : 'password'}
                                            value={newPassword}
                                            onChange={(event: any) => setNewPassword(event.target.value)}
                                        />
                                        {showPassword ? (
                                            <div
                                                onClick={() => setShowNewPassword(false)}
                                                className='text-pale-red cursor-pointer '>
                                                <VisibilityOffRoundedIcon />
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() => setShowNewPassword(true)}
                                                className='text-pale-blue cursor-pointer '>
                                                <VisibilityRoundedIcon />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                        {isUpdatingUser && (
                            <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                                <div className='font-bold'>Password: {isUpdatingUser ? <span className='text-pale-red font-extrabold'>*</span> : null}</div>
                                <div className='flex-1 flex flex-row items-center gap-x-2'>
                                    <input
                                        autoComplete='new-password'
                                        placeholder='********'
                                        className='flex-1 border-none outline-none'
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(event: any) => setPassword(event.target.value)}
                                    />
                                    {showPassword ? (
                                        <div
                                            onClick={() => setShowPassword(false)}
                                            className='text-pale-red cursor-pointer '>
                                            <VisibilityOffRoundedIcon />
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => setShowPassword(true)}
                                            className='text-pale-blue cursor-pointer '>
                                            <VisibilityRoundedIcon />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <ToastContainer autoClose={1000} />
        </div>
    )
}

export default Account