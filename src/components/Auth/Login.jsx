import { useState } from 'react'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import Spline from '@splinetool/react-spline';
import PropTypes from 'prop-types';

const Login = ({ handleLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        handleLogin(email, password)
        setEmail("")
        setPassword("")
    }

    return (
        <div className='flex h-screen w-screen bg-[#000000] text-white'>
            <div className='flex-1 flex items-center justify-center'>
                <Spline
                    scene="https://prod.spline.design/dfu0Yl11AJ-t70ae/scene.splinecode" 
                />
            </div>

            <div className='flex-1 flex items-center justify-center bg-black h-screen'>
                <div className='border-2 rounded-xl border-emerald-600 p-10 w-[400px] shadow-lg'>
                    <h1 className='text-3xl font-extrabold text-center font-serif mb-8 tracking-wide'>
                        ETMS LOGIN PORTAL
                    </h1>

                    <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                        <div className='flex items-center border-2 border-emerald-600 rounded-full px-4 py-2 bg-transparent'>
                            <FaEnvelope className='text-emerald-400 mr-3' />
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className='bg-transparent outline-none w-full text-white placeholder:text-gray-400'
                                type='email'
                                placeholder='Enter your email'
                            />
                        </div>

                        <div className='flex items-center border-2 border-emerald-600 rounded-full px-4 py-2 bg-transparent'>
                            <FaLock className='text-emerald-400 mr-3' />
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className='bg-transparent outline-none w-full text-white placeholder:text-gray-400'
                                type='password'
                                placeholder='Enter password'
                            />
                        </div>

                        <button
                            type='submit'
                            className='mt-4 text-white font-semibold bg-emerald-600 hover:bg-emerald-700 py-2 rounded-full w-full'
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
}

export default Login