import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from "react-icons/fa"
import { auth, googleProvider, facebookProvider } from "../config/firebase"
import { signInWithPopup } from "firebase/auth"
import { toast } from 'react-toastify'

import logo from '../assets/logo-full.png'
import { useStore } from '../store/stored'
import Spinner from '../components/Spinner'
import { addUser } from '../data/database'
import Title from '../components/Title'

const Login = () => {
    const navigate = useNavigate()
    const { loading, setLoading } = useStore(state => state)

    const handleLogin = async (req) => {
        setLoading(true)
        try {
            const { _tokenResponse, user } = await signInWithPopup(auth, req)
            const { displayName, email, photoURL, uid } = user
            
            if (_tokenResponse.isNewUser) {
                await addUser({ displayName, email, photoURL, uid })
            }
            navigate(-1 || '/', { replace: true })
            setLoading(false)
        } catch (error) {
            toast.error(error.message);
            setLoading(false)
        }
    }  

    if (loading) return <Spinner message="LOGIN" />

    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <Title title='Login' />
            <div className="relative w-full h-full">
                <img src="https://www.cantechletter.com/wp-content/uploads/Netflix.jpg" alt="bg"
                    className="w-full h-full object-cover"/>

                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src={logo} width="150px" alt="logo" />
                    </div>

                    <div className="shadow-2xl">
                        <div>
                            <button
                                onClick={() => handleLogin(facebookProvider)}
                                className="flex items-center text-gray-50 p-2 rounded-lg bg-[#2D88FF] w-full mb-4"
                            >
                                <FaFacebookF className="w-6 h-6 mr-4" /> Sign in with Facebook
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => handleLogin(googleProvider)}
                                className="flex items-center text-black bg-white p-2 rounded-lg w-full"
                            >
                                <FcGoogle className="w-6 h-6 mr-4" /> Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login