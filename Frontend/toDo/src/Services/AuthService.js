import { useNavigate } from "react-router-dom";
import api from "../api";
import { setToken } from "./TokenService";
import { TokenExpiredError } from "../errors/TokenExpiredError";
import { ApiError } from "../errors/ApiError";

//refreshes the token by sending a post request to the refresh endpoint returns true if successsful / false otherwise
export const refreshToken = async () => {


  //todo examine this again
  try {
    console.log("refreshing");
    
    var newToken = await api.getReq(`${api.envApi}/api/auth/refresh`);
    console.log(`new token -> ${newToken}`);
    setToken(newToken.token);
    return true;
  } 
  catch {
    return false;
  }

};

//returns the header with a token
export const authHeader= ()=> {
 return{
  Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
 }
};

//returns the full header
export const jsonAuthHeader=()=> {
 return{
   "Content-Type": "application/json",
   Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
 }
};


//TODOOOOOOOOOOOOOOOOOO CHANGE THE ERROR THROWING IN API REQUESTS TO CHANGE THE ERROR HANDLING OF THIS DAMNED MODULE
//excecutes the code , if not successful it tries to refresh the token and tries the function again , else it navigates to the login page
export const execOrRetry = async (promptedfunction) => {
  try {
    return await promptedfunction();
  } catch (error){

    if(error instanceof ApiError && error.status===401){
      let succeeded = await refreshToken();
      if (succeeded) return await promptedfunction(); 
      else
        {
          console.log("execOrRetry threw a TokenExpired");
          throw new TokenExpiredError()
        } 
    }

    throw error

  }
};
