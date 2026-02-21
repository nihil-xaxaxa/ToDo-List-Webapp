import { createContext, useContext } from "react";
import { useState } from "react";


export const authContext=createContext();

export default function AuthProvider({children}){
    

      let [loggedIn , setLoggedIn]=useState(()=>{ return localStorage.getItem("LoggedIn")==="true"});




    return(

        <authContext.Provider value={[loggedIn,setLoggedIn]}>
         {children}
        </authContext.Provider>
    )

    
}