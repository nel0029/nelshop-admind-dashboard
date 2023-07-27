import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import Button from '../../components/Button'
import CircleLoader from '../../components/CircleLoader';

import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { logInUser } from '../../../redux/async-actions/UserAsyncActions';



const LogIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [emailError, setEmailError] = useState<boolean>(false)
    const [passwordError, setPasswordError] = useState<boolean>(false)
    const [logInErrorMessage, setLogInErrorMessage] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isLogInLoading, setIsLogInLoading] = useState<boolean>(false)


    const goToRegister = () => {
        navigate('/register')
    }

    const handleLogInUser = () => {
        setIsLogInLoading(true)
        if (email && password) {
            const data = {
                email: email,
                password: password
            }
            dispatch(logInUser(data))
                .then(() => {
                    setIsLogInLoading(false)
                    setEmailError(false)
                    setPasswordError(false)
                    setLogInErrorMessage("")
                    navigate('/')
                })
                .catch(() => {
                    setIsLogInLoading(false)
                    setLogInErrorMessage("Invalid Email or Password")
                })
        } else {
            setLogInErrorMessage("Please fill all the necessary fields")
            if (!email) {
                setIsLogInLoading(false)
                setEmailError(true)
            }
            if (!password) {
                setIsLogInLoading(false)
                setPasswordError(true)
            }
        }
    }
    return (
        <div className="h-screen flex flex-col items-center justify-center flex-1 text-black bg-gradient-to-br from-pale-blue to-pale-green">
            <div className='min-w-[350px] flex flex-col items-center border rounded-lg p-2 bg-white gap-y-2 shadow-lg'>
                <div className='text-xl font-bold'>
                    Log In
                </div>
                <div className='w-full flex flex-col gap-y-2'>
                    <div className={`${emailError ? 'border-2 border-pale-red' : 'border'} w-full flex flex-col rounded-lg p-1`}>
                        <div className='font-bold'>
                            Email
                        </div>
                        <input
                            value={email}
                            onChange={(event: any) => setEmail(event.target.value)}
                            placeholder='someone@email.com'
                            type='text'
                            className='flex-1 border-none outline-none' />
                    </div>
                    <div className={`${passwordError ? 'border-2 border-pale-red' : 'border'} w-full flex flex-col rounded-lg p-1`}>
                        <div className='font-bold'>
                            Password
                        </div>
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
                    {logInErrorMessage && (
                        <div className='text-sm text-pale-red'>
                            {logInErrorMessage}
                        </div>
                    )}
                    <div className='w-full flex flex-row gap-x-1 text-sm text-gray-500'>
                        Need an account?
                        <span
                            onClick={goToRegister}
                            className='text-pale-blue hover:underline cursor-pointer font-semibold'>
                            Register
                        </span>
                    </div>
                    <div className='w-full flex flex-col items-end p-1'>
                        <div className='flex flex-row gap-x-1'>
                            {isLogInLoading && (
                                <CircleLoader size='w-7 h-7' />
                            )}
                            <Button
                                onClick={handleLogInUser}
                                label='Log In'
                                variant='blue' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn