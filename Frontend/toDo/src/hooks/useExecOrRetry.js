import { useNavigate } from "react-router-dom";
import { execOrRetry } from "../Services/AuthService";
import { TokenExpiredError } from "../errors/TokenExpiredError";
import { useContext } from "react";
import { authContext } from "../contexts/AuthProvider";


//TODOOOO FIX THE ERROR PATHWAY TO ALLOW ERROR TO GET OUT OF THE FUNCTION
export default function useExecOrRetry(fn) {
    const nav = useNavigate()
    let [loggedIn , setLoggedIn] = useContext(authContext)
    
    const exec = async (fn) =>
    {
        try{
            return await execOrRetry(fn)
        }
        catch(e)
        {   

            if (e instanceof TokenExpiredError)
            {   
                console.log("useExecOrRetry catched a tokenExpiredError");
                
                localStorage.removeItem("Authorization");
                setLoggedIn(false);
                nav("/login");
            }

            
            else {
                console.log("UseExecOrRetry threw another error (not TokenExpired)");
                throw e
            }
        }
    }
    return exec
}