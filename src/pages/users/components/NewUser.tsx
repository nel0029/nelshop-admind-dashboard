import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { addNewUSer } from '../../../../redux/async-actions/UserAsyncActions';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"
import { storage } from '../../../firebase/Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../../components/Header'
import BackButton from '../../../components/BackButton'
import Button from '../../../components/Button';

//icons
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import CircleLoader from '../../../components/CircleLoader';


const NewUser = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [name, setName] = useState<string>("")
    const [contactNumber, setContactNumber] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [imageFile, setImageFile] = useState<any>(null)
    const [selectedFile, setSelectedFile] = useState("")
    const [isUploading, setIsUploading] = useState<boolean>(false)


    const goback = () => {
        navigate(-1)
        setName("")
        setContactNumber("")
        setEmail("")
        setImageFile(null)
        setSelectedFile("")
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

    const handleAddNewUser = () => {
        if (imageFile !== null) {
            setIsUploading(true)
            const newImageFileName = Date.now().toString() + v4()
            const fileRef = ref(storage, `nelshop/${newImageFileName}`)
            uploadBytes(fileRef, imageFile).then((snapshot: any) => {
                getDownloadURL(snapshot.ref).then((url: any) => {
                    const newUser = {
                        name,
                        contactNumber,
                        email,
                        role: "admin",
                        profilePicture: {
                            name: newImageFileName,
                            url: url
                        }

                    }
                    dispatch(addNewUSer(newUser)).then((response) => {
                        if (response.meta.requestStatus === "fulfilled") {
                            toast.success("Successfully Added New User")
                            setIsUploading(false)
                            setName("")
                            setContactNumber("")
                            setEmail("")
                            setImageFile(null)
                            setSelectedFile("")
                        }
                    })
                })
            })
        } else {
            return toast.warn("No Image is selected")
        }
    }

    return (
        <div className="w-full flex-grow flex flex-col">
            <Header>
                <BackButton
                    onClick={goback} />
                <div>
                    New User
                </div>
            </Header>
            <div className='w-full px-2 flex flex-col gap-y-2'>
                <div className='w-full flex flex-row items-center justify-between'>
                    <div className='text-xl font-bold'>
                        User Information
                    </div>

                    <div>
                        <Button
                            onClick={handleAddNewUser}
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
                </div>
                <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                    <div>Name: <span className='text-pale-red font-extrabold'>*</span></div>
                    <input
                        autoComplete='new-name'
                        placeholder='Type here'
                        className='border-none px-2 py-1 outline-none'
                        type='text'
                        value={name}
                        onChange={(event: any) => setName(event.target.value)}
                    />
                </div>
                <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                    <div>Email: <span className='text-pale-red font-extrabold'>*</span></div>
                    <input
                        autoComplete='new-email'
                        placeholder='Type here'
                        className='border-none px-2 py-1 outline-none'
                        type='text'
                        value={email}
                        onChange={(event: any) => setEmail(event.target.value)}
                    />
                </div>
                <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                    <div>Conatct Number: <span className='text-pale-red font-extrabold'>*</span></div>
                    <input
                        autoComplete='new-contact-number'
                        placeholder='Type here'
                        className='border-none px-2 py-1 outline-none'
                        type='text'
                        value={contactNumber}
                        onChange={(event: any) => setContactNumber(event.target.value)}
                    />
                </div>
                <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                    <div>Password: <span className='text-pale-red font-extrabold'>*</span></div>
                    <div className='flex-1 flex flex-row items-center gap-x-2'>

                    </div>
                </div>
                <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                    <div>Profile Picture: <span className='text-pale-red font-extrabold'>*</span></div>
                    <input
                        className='cursor-pointer'
                        type='file'
                        accept='image/*'
                        onChange={handleFileChange}
                    />
                </div>
                {selectedFile && (
                    <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                        <div className='w-[300px]'>
                            <img
                                className='w-full h-auto object-cover overflow-hidden'
                                src={selectedFile} />
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer
                autoClose={1000} />
        </div>
    )
}

export default NewUser