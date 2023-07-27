import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import Button from "../../../components/Button"
import Menu from "../../../components/Menu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../../components/Header";
import BackButton from "../../../components/BackButton";
import { useParams, useNavigate } from "react-router";
import { deleteProduct, getProductDetails, updateProductDetails } from "../../../../redux/async-actions/ProductsAsyncActions";
import { storage } from '../../../firebase/Firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { v4 } from "uuid"

//icons
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { resetProductDetails } from "../../../../redux/slices/ProductSlice";
import Modal from "../../../components/Modal";
import CircleLoader from "../../../components/CircleLoader";



const ProductDetails = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const productDetails = useSelector((state: any) => state.products.productDetails)
    const isLoading = useSelector((state: any) => state.products.isProductsLoading)

    const [productDesc, setProductDesc] = useState('');
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [file, setFile] = useState<any>(null);
    const [selectedFile, setSelectedFile] = useState("")
    const [updateProduct, setUpdateProduct] = useState(false)
    const [isUploading, setIsUploading] = useState(false);
    const [isProductDeleting, setIsProductDeleting] = useState(false)
    const [isDeletingProduct, setIsDeletingProduct] = useState(false)

    const { productID } = useParams()


    useEffect(() => {
        const data = {
            productID
        }
        dispatch(getProductDetails(data))

        return () => { dispatch(resetProductDetails()) }
    }, [productID])

    useEffect(() => {
        setProductDesc(productDetails?.desc || '');
        setProductName(productDetails?.productName || '');
        setProductCategory(productDetails?.category || '');
        setProductPrice(productDetails?.price || '');

    }, [productDetails?.productName]);


    const categories = ["Gadgets and Mobiles", "Home Appliances", "Clothing", "Tools and Equipment", "Toys"]

    const goBack = () => {
        dispatch(resetProductDetails())
        navigate(-1)
    }

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



    const successUpdatingProductDetails = () => {

        setUpdateProduct(!updateProduct)
        toast.success("Successfully added new product")
    }

    const handleUpdateProductDetails = async (fileName: string) => {
        if (file !== null) {
            setIsUploading(true); // Set uploading state

            const fileRef = ref(storage, `nelshop/${fileName}`);

            deleteObject(fileRef)
                .then(() => {
                    const newFileName = Date.now().toString() + v4();
                    const newFileRef = ref(storage, `nelshop/${newFileName}`);
                    uploadBytes(newFileRef, file)
                        .then((snapshot: any) => {
                            getDownloadURL(snapshot.ref)
                                .then((url: any) => {
                                    const updatedProduct = {
                                        productID: productID,
                                        productName: productName,
                                        category: productCategory,
                                        desc: productDesc,
                                        price: productPrice,
                                        image: {
                                            name: newFileName,
                                            url: url,
                                        },
                                    };
                                    dispatch(updateProductDetails(updatedProduct))
                                        .then((response) => {
                                            if (response.meta.requestStatus === "fulfilled") {
                                                successUpdatingProductDetails();

                                                setIsUploading(false);
                                            }
                                        })

                                })

                        })

                })

        } else {
            const updatedProduct = {
                productID: productID,
                productName: productName,
                category: productCategory,
                desc: productDesc,
                price: productPrice,
                image: productDetails.image, // Keep the existing image details
            };

            dispatch(updateProductDetails(updatedProduct))
                .then((response) => {
                    if (response.meta.requestStatus === "fulfilled") {
                        successUpdatingProductDetails();

                    }
                })

        }
    };


    const handeleDeleteProduct = (fileName: string, productID: string) => {
        setIsProductDeleting(true)
        const fileRef = ref(storage, `nelshop/${fileName}`);
        deleteObject(fileRef).then(() => {
            const data = {
                productID: productID
            }
            dispatch(deleteProduct(data))
            navigate('/products')

        })

    }

    return (
        <div className="w-full flex-grow flex flex-col gap-y-2">
            <Header>
                <BackButton
                    onClick={goBack}
                />
                Product Details
            </Header>
            {isLoading ? (
                <div className="flex-1 flex justify-center items-center">
                    <CircleLoader
                        size="w-8 h-8" />
                </div>
            ) : (
                <div className='w-full flex flex-col gap-y-2 flex-1 px-2'>
                    <div className='w-full py-2 flex flex-row items-center justify-end gap-x-1'>

                        {updateProduct ? (

                            <div className="flex flex-row items-center gap-x-1">
                                <Button
                                    onClick={() => setUpdateProduct(!updateProduct)}
                                    iconStart={<CancelRoundedIcon />}
                                    label="Cancel" />
                                <Button
                                    iconStart={isUploading ? (
                                        <CircleLoader />
                                    ) :
                                        (<SaveRoundedIcon />)}
                                    variant='green'
                                    label='Save'
                                    onClick={() => handleUpdateProductDetails(productDetails?.image[0].name)}
                                />
                            </div>

                        ) : (
                            <Button
                                onClick={() => setUpdateProduct(!updateProduct)}
                                iconStart={<EditRoundedIcon />}
                                label="Edit" />
                        )}



                        <Button
                            onClick={() => setIsDeletingProduct(true)}
                            iconStart={<DeleteRoundedIcon />}
                            variant="red"
                            label="Delete" />



                    </div>
                    <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                        <div className="font-bold">Product Name:</div>
                        {updateProduct ? (
                            <input
                                placeholder='Type here'
                                className='border-none rounded-lg outline-none'
                                type='text'
                                value={productName}
                                onChange={(event) => setProductName(event.target.value)}
                            />
                        ) : (
                            <div className="flex-1 flex justify-start items-center ">
                                {productName}
                            </div>
                        )}
                    </div>

                    <div className='w-full flex flex-row flex-1 gap-x-2'>
                        <div className='flex flex-col gap-y-2 flex-1'>
                            <div className='w-full flex flex-row justify-start gap-x-2 border rounded-lg p-2'>
                                <div className="font-bold">Category:</div>
                                {updateProduct ? (
                                    <div className='flex-1'>
                                        <Menu
                                            option={productCategory}
                                            setOption={setProductCategory}
                                            menuOptions={categories} />
                                    </div>
                                ) : (
                                    <div className="flex-1 flex justify-start items-center">
                                        {productCategory}
                                    </div>
                                )}
                            </div>
                            <div className='flex flex-col justify-start gap-x-2 border rounded-lg p-2 flex-1'>
                                <div className="font-bold">Product Description:</div>
                                {updateProduct ? (
                                    <textarea
                                        value={productDesc}
                                        onChange={(event) => setProductDesc(event.target.value)}
                                        placeholder='Type here'
                                        className='flex-1 border rounded-lg outline-none resize-none overflow-auto p-2'
                                    />
                                ) : (
                                    <div className="flex-1 flex justify-start ">
                                        {productDesc}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='flex flex-col gap-y-2 flex-1'>
                            <div className={`w-full flex flex-row justify-start gap-x-2 border rounded-lg p-2`}>
                                <div className="font-bold">Price:</div>
                                <div className='flex-1 flex flex-row items-center'>
                                    {updateProduct ? (
                                        <input
                                            readOnly={!updateProduct}
                                            placeholder={`${updateProduct ? "Type Here" : ""}`}
                                            className='flex-1 border-none rounded-lg outline-none'
                                            type='number'
                                            value={productPrice}
                                            onChange={(event) => setProductPrice(event.target.value)}
                                        />
                                    ) : (
                                        <div className="flex-1 flex justify-start items-center">
                                            {productPrice}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {updateProduct && (
                                <div className='w-full flex flex-row justify-start gap-x-2 border rounded-lg p-2'>
                                    <div className="font-bold">Image:</div>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={handleFileChange}
                                    />
                                </div>
                            )}
                            <div className='h-full flex flex-1 justify-center items-center border rounded-lg p-2'>
                                <div className='flex-1 flex justify-center'>
                                    {updateProduct ? (
                                        <img
                                            className='w-[300px] h-auto object-cover overflow-hidden'
                                            src={selectedFile ? selectedFile : productDetails?.image[0].url} />
                                    ) : (
                                        <img
                                            className='w-[300px] h-auto object-cover overflow-hidden'
                                            src={productDetails?.image[0].url} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
            <ToastContainer
                autoClose={2000} />
            {isDeletingProduct && (
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
                                onClick={() => setIsDeletingProduct(false)}
                                iconStart={<CancelRoundedIcon />}
                                label="Cancel" />
                            <Button
                                onClick={() => handeleDeleteProduct(productDetails.image[0].name, productDetails?._id)}
                                iconStart={isProductDeleting ? (
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

export default ProductDetails