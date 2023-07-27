import { useState } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';

import Button from '../../components/Button'

//icons
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';


import { registerUser } from '../../../redux/async-actions/UserAsyncActions';

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [contactNumber, setContactNumber] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [emailError, setEmailError] = useState<boolean>(false)
    const [nameError, setNameError] = useState<boolean>(false)
    const [contactNumberError, setContactNumberError] = useState<boolean>(false)
    const [passwordError, setPasswordError] = useState<boolean>(false)
    const [registerErrorMessage, setRegisterErrorMessage] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const goToLogIn = () => {
        navigate('/login')
    }

    const handleRegisterUser = (event: any) => {
        event.preventDefault()
        if (name && email && contactNumber && password) {
            const data = {
                name: name,
                email: email,
                role: "admin",
                contactNumber: contactNumber,
                password: password
            }

            dispatch(registerUser(data))
                .then(() => {
                    setNameError(false)
                    setEmailError(false)
                    setContactNumberError(false)
                    setPasswordError(false)
                    navigate('/login')
                })
                .catch((err: any) => {
                    console.log(err)
                    if (err) {
                        setRegisterErrorMessage("Invalid user credentials")
                    }
                })
        } else {
            if (!name) {
                setNameError(true)
            }
            if (!email) {
                setEmailError(true)
            }
            if (!contactNumber) {
                setContactNumberError(true)
            }
            if (!password) {
                setPasswordError(true)
            }
            setRegisterErrorMessage("Please fill the necessary fields")
        }
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center flex-1 text-black bg-gradient-to-br from-pale-blue to-pale-green">
            <div className='min-w-[350px] flex flex-col items-center border rounded-lg p-2 bg-white gap-y-2 shadow-lg'>
                <div className='text-xl font-bold'>
                    Register an account
                </div>
                <form className='w-full flex flex-col gap-y-2'>
                    <div className={`${nameError ? 'border-2 border-pale-red' : 'border'} w-full flex flex-col rounded-lg p-1`}>
                        <div className='font-bold'>
                            Name
                        </div>
                        <input
                            value={name}
                            onChange={(event: any) => setName(event.target.value)}
                            placeholder='John Doe'
                            type='text'
                            className='flex-1 border-none outline-none' />
                    </div>
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
                    <div className={`${contactNumberError ? 'border-2 border-pale-red' : 'border'} w-full flex flex-col rounded-lg p-1`}>
                        <div className='font-bold'>
                            Contact Number
                        </div>
                        <input
                            value={contactNumber}
                            onChange={(event: any) => setContactNumber(event.target.value)}
                            placeholder='09123******'
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
                    {registerErrorMessage && (
                        <div className='text-sm text-pale-red'>
                            {registerErrorMessage}
                        </div>
                    )}
                    <div className='w-full flex flex-row gap-x-1 text-sm text-gray-500'>
                        Already have an account?
                        <span
                            onClick={goToLogIn}
                            className='text-pale-blue hover:underline cursor-pointer font-semibold'>
                            Log In
                        </span>
                    </div>
                    <div className='w-full flex flex-col items-end p-1'>
                        <div>
                            <Button
                                onClick={(event: any) => handleRegisterUser(event)}
                                label='Register'
                                variant='blue' />
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register