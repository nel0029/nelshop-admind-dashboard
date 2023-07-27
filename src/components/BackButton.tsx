import React from 'react';
import { useNavigate } from 'react-router-dom'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

interface BackButtonProps {
    onClick?: (val?: any) => void
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }
    return (
        <div
            onClick={onClick ? onClick : goBack}
            className='p-1 rounded-full cursor-pointer border flex justify-center items-center hover:bg-black hover:bg-opacity-20'>
            <ArrowBackRoundedIcon />
        </div>
    )
}

export default BackButton