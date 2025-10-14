import React, { useContext, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'

const Login = () => {

  const {setShowLogin, axios, setToken, navigate} = useContext(AppContext)

   const [state, setState] = useState('login')
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

  //  const [Image, setImage] = useState(false)

  const onSubmitHandler= async (e)=>{
      try {
        e.preventDefault()
        const {data} = await axios.post(`/api/user/${state}`, {name, email, password})
        if(data.success){
          navigate('/')
          setToken(data.token)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
  }


  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-100 backdrop-blur-sm bg-black/30 flex justify-center items-center '>
        <form onSubmit={onSubmitHandler} onClick={(e)=> e.stopPropagation()}  className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium '>User {state} </h1>
            <p className='text-sm mb-3'>Welcome back! Please sign in to continue</p>
            { state === 'signup' && (
              <div className='w-full mb-3'>
                <p>Name</p>
                <input onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder='enter name' required className='border border-gray-200 rounded w-full outline-none mt-1 p-2' />
              </div>
            )}

            <div className='w-full mb-3'>
              <p>Email</p>
              <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" placeholder='enter email' required className='border border-gray-200 rounded w-full outline-none mt-1 p-2' />
            </div>
            <div className='w-full mb-3'>
              <p>Password</p>
              <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" placeholder='enter password' required className='border border-gray-200 rounded w-full outline-none mt-1 p-2' />
            </div>

            {state === 'signup' ? (
              <p className='mt-2 text-sm font-medium'> Already have an account ? <span onClick={e=> setState('login')} className='text-blue-600 cursor-pointer'>login</span></p>
            ): (
              <p className='mt-2 text-sm font-medium'> Create account ? <span onClick={e=> setState('signup')} className='text-blue-600 cursor-pointer'>signup</span></p>
            )}

            <button type='submit' onClick={e=> navigate('/')} className='bg-blue-500 text-white hover:bg-blue-600 rounded-md cursor-pointer py-2 w-full mt-2'>
              {state === 'signup' ? 'create account':'login'}
            </button>
            
            
            <img onClick={e=> setShowLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.close_icon} alt="" />
        
        </form>
    </div>
  )
}

export default Login
