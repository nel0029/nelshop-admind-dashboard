import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../../components/Header';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { addNewProduct } from '../../../../redux/async-actions/ProductsAsyncActions';
import { AppDispatch } from '../../../../redux/store';

const NewProduct = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [productDesc, setProductDesc] = useState('');
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };



    return (
        <div className='w-full flex flex-col flex-grow'>
            <Header>
                <BackButton />
                New Product
            </Header>
            <div className='w-full px-2 flex flex-col gap-y-2 flex-1'>
                <div className='w-full flex flex-col gap-y-2 flex-1'>
                    <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                        <div>Product Name</div>
                        <input
                            placeholder='Type here'
                            className='border-none rounded-lg outline-none'
                            type='text'
                            value={productName}
                            onChange={(event) => setProductName(event.target.value)}
                        />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                        <div>Category</div>
                        <input
                            placeholder='Type here'
                            className='border-none rounded-lg outline-none'
                            type='text'
                            value={productCategory}
                            onChange={(event) => setProductCategory(event.target.value)}
                        />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2 flex-1'>
                        <div>Product Description</div>
                        <textarea
                            value={productDesc}
                            onChange={(event) => setProductDesc(event.target.value)}
                            placeholder='Type here'
                            className='flex-1 border-none rounded-lg outline-none resize-none overflow-auto'
                        />
                    </div>
                    <div className={`w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2`}>
                        <div>Price</div>
                        <input
                            placeholder='Type here'
                            className='border-none rounded-lg outline-none'
                            type='text'
                            value={productPrice}
                            onChange={(event) => setProductPrice(event.target.value)}
                        />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-x-2 border rounded-lg p-2'>
                        <div>Image Upload</div>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className='w-full py-2'>
                        <Button
                            iconStart={<AddRoundedIcon />}
                            variant='blue'
                            label='Add New Product'
                        //onClick={handleUpload}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProduct;
