//most functions usually include in the header format of the body (content type)  

import { ApiError } from "./errors/ApiError";

export default {

  //get request with optional headers
  getReq: async (apiUrl, headers = {}) => {
    try {
      let response = await fetch(apiUrl, {
        method: "GET",
        headers: headers,
        credentials: "include",
      });
      if (!response.ok) {
        throw new ApiError(response.status)
      }
      let result = await response.json();
      return result;
    } catch (error) {
      if(error instanceof TypeError)
       throw new ApiError(0);
      throw error
    }
  },
  //post request with optional headers
  postReq: async (apiUrl,object,headers = { "Content-Type": "application/json" }) => {
    try {
      let response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        credentials: "include",
        body: JSON.stringify(object),
      });
      if (!response.ok) {
        throw new ApiError(response.status)
      }
      let result = await response.json();
      return result;
    } catch (error) {
         if(error instanceof TypeError)
           throw new ApiError(0);
           throw error
    }
  },

  //put request with optional headers
  putReq: async (apiUrl,object,headers = { "Content-Type": "application/json" }) => {
    try {
      let response = await fetch(apiUrl, {
        method: "PUT",
        headers: headers,
        credentials: "include",
        body: JSON.stringify(object),
      });
      if (!response.ok) {
       throw new ApiError(response.status)
 }
      let result = await response.json();
      return result;
    } catch (error) {
        if(error instanceof TypeError)
         throw new ApiError(0);
        throw error
    }
  },
  //delete request with optional headers
  deleteReq: async (apiUrl, headers = {}) => {
    try {
      let response = await fetch(apiUrl, {
        method: "DELETE",
        headers: headers,
        credentials: "include",
      });
      if (!response.ok) {
       throw new ApiError(response.status)
 }
    } catch (error) {
      if(error instanceof TypeError)
         throw new ApiError(0);
        throw error
    }
  },

  //the environment api url
  envApi: import.meta.env.VITE_API_URL,
};
