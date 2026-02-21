import "./App.css";
import { Route, Routes } from 'react-router-dom'
import Login from "./Login";
import Index from "./Index";
import Notes from "./Notes";
import { createContext, useContext, useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { authContext } from "./contexts/AuthProvider";

function App() {


  let[loggedIn,setLoggedIn]=useContext(authContext)

  useEffect(()=>{
    localStorage.setItem("LoggedIn",loggedIn)
    console.log("LocalStorage Loggeed in Updated");
    
  },[loggedIn])

  useEffect(()=>console.log(`logged in -> ${loggedIn}`) , [loggedIn]
  )
  return (
    <>

      <Routes>
        
        <Route path="/login" element={<Login/>}/>

        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Index/>}/>
          <Route path="/notes" element={<Notes/>}/>
          <Route path="*" element={<Index/>}/>
        </Route>
     
      </Routes>

    </>
  );
}

export default App;
