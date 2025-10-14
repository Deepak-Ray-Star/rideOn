import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY

    const [showLogin , setShowLogin] = useState(false)
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const [pickupDate, setPickupDate] = useState('')
    const [returnDate, setReturnDate] = useState('')

    const [cars, setCars] = useState([])

    // function to check if user is logged in 
    const fetchUser = async () => {
        try {
            const {data} = await axios.get('/api/user/data')
            if(data.success){
                setUser(data.user)
                setIsOwner(data.user.role === 'owner')
            }
            else{
                navigate('/')
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    // func to fetch all cars from the server
    const fetchCars = async () =>{
        try {
            const {data} = await axios.get('/api/user/cars')
            if(data.success){
                setCars(data.cars)
            }
            else{
                toast.error(data.message)
            }
            //data.success ? setCars(data.cars) : toast.error(data.message) -> is same as above 
            
        } catch (error) {
            toast.error(error.message) 
        }
    }

    // func to log out the user
    const logout = () =>{
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsOwner(false)
        axios.defaults.headers.common['token'] = ''
        toast.success('You have been logged out') 
    }
    
    // useeffect to retrieve token from localstorage
    useEffect(()=>{
        const token = localStorage.getItem('token')
        setToken(token)
        fetchCars()
    },[])

    useEffect(()=>{
        if(token){
            axios.defaults.headers.common['token'] = `${token}` // authorisation
            fetchUser()
        }
    },[token])

    const value = {
        showLogin, setShowLogin, 
        navigate, currency, axios, user, setUser, 
        token, setToken, isOwner, setIsOwner, fetchUser, logout, fetchCars, cars,setCars,
        pickupDate, setPickupDate, returnDate, setReturnDate,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}