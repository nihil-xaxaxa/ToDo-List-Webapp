import { useContext, useEffect } from "react"
import { authContext } from "./contexts/AuthProvider"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute =()=>{


    let[loggedIn,setLoggedIn]=useContext(authContext)



    if (loggedIn)
        return <Outlet/> 
    return(<Navigate to="/login" />)
        

}

export default ProtectedRoute