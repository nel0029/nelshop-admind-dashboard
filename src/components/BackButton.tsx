import { useNavigate } from 'react-router-dom'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const BackButton = () => {
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }
    return (
        <div
            onClick={goBack}
            className='p-1 rounded-full cursor-pointer border flex justify-center items-center hover:bg-black hover:bg-opacity-20'>
            <ArrowBackRoundedIcon />
        </div>
    )
}

export default BackButton