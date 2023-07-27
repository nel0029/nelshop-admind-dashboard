import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../../components/Header';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import { addNewProduct } from '../../../../redux/async-actions/ProductsAsyncActions';
import { AppDispatch } from '../../../../redux/store';
import { storage } from '../../../firebase/Firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from '../../../components/Menu';

import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import CircleLoader from '../../../components/CircleLoader';


const NewProduct = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [productDesc, setProductDesc] = useState('');
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [file, setFile] = useState<any>(null);
    const [selectedFile, setSelectedFile] = useState("")
    const categories = ["Gadgets and Mobiles", "Home Appliances", "Clothing", "Tools and Equipment", "Toys"]
    const [isUploadingFile, setIsUploadingFile] = useState(false)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        setFile(selectedFile);

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


    const successAddNewProduct = () => {
        toast.success("Successfully added new product")
    }

    const handleUploadImage = () => {
        if (file !== null) {
            setIsUploadingFile(true)
            const newFileName = Date.now().toString() + v4()
            const fileRef = ref(storage, `nelshop/${newFileName}`)
            uploadBytes(fileRef, file).then((snapshot: any) => {
                getDownloadURL(snapshot.ref).then((url: any) => {
                    const newProduct = {
                        productName: productName,
                        category: productCategory,
                        desc: productDesc,
                        price: productPrice,
                        image: {
                            name: newFileName,
                            url: url
                        }

                    }
                    dispatch(addNewProduct(newProduct)).then((response) => {
                        if (response.meta.requestStatus === "fulfilled") {
                            successAddNewProduct()
                            setIsUploadingFile(false)
                            setProductDesc("")
                            setProductCategory("")
                            setProductName("")
                            setProductPrice("")
                            setFile(null)
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
        <div className='w-full flex flex-col flex-grow'>
            <Header>
                <BackButton />
                New Product
            </Header>
            <div className='w-full px-2 flex flex-col gap-y-2 flex-1'>
                <div className='w-full flex flex-col gap-y-2 flex-1'>
                    <div className='w-full flex flex-row items-center justify-end py-2 gap-x-1'>
                        {isUploadingFile && (
                            <CircleLoader />
                        )}
                        <Button
                            disabled={productName && productDesc && productCategory && productPrice && selectedFile ? false : true}
                            iconStart={<SaveRoundedIcon />}
                            variant='green'
                            label='Save'
                            onClick={handleUploadImage}
                        />

                    </div>
                    <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                        <div>Product Name: <span className='text-pale-red font-extrabold'>*</span></div>
                        <input
                            placeholder='Type here'
                            className='border-none rounded-lg outline-none'
                            type='text'
                            value={productName}
                            onChange={(event) => setProductName(event.target.value)}
                        />
                    </div>

                    <div className='w-full flex flex-row flex-1 gap-x-2'>
                        <div className='flex flex-col gap-y-2 flex-1'>
                            <div className='w-full flex flex-row justify-start gap-x-2 border rounded-lg p-2'>
                                <div>Category: <span className='text-pale-red font-extrabold'>*</span></div>
                                <div className='flex-1'>
                                    <Menu
                                        option={productCategory}
                                        setOption={setProductCategory}
                                        menuOptions={categories} />
                                </div>
                            </div>
                            <div className='flex flex-col justify-start gap-x-2 border rounded-lg p-2 flex-1'>
                                <div>Product Description: <span className='text-pale-red font-extrabold'>*</span></div>
                                <textarea
                                    value={productDesc}
                                    onChange={(event) => setProductDesc(event.target.value)}
                                    placeholder='Type here'
                                    className='flex-1 border rounded-lg outline-none resize-none overflow-auto p-2'
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-y-2 flex-1'>
                            <div className={`w-full flex flex-row justify-start gap-x-2 border rounded-lg p-2`}>
                                <div>Price: <span className='text-pale-red font-extrabold'>*</span></div>
                                <div className='flex-1 flex flex-row items-center'>
                                    <input
                                        placeholder='Type here'
                                        className='flex-1 border-none rounded-lg outline-none'
                                        type='number'
                                        value={productPrice}
                                        onChange={(event) => setProductPrice(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='w-full flex flex-row justify-start gap-x-2 border rounded-lg p-2'>
                                <div>Image: <span className='text-pale-red font-extrabold'>*</span></div>
                                <input
                                    className='cursor-pointer'
                                    type='file'
                                    accept='image/*'
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className='h-full flex flex-1 justify-center items-center border rounded-lg p-2'>
                                <div className='flex-1'>
                                    <img
                                        className='w-full h-auto object-cover overflow-hidden'
                                        src={selectedFile} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer
                autoClose={2000} />
        </div>
    );
};

export default NewProduct;
