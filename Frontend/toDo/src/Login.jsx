import React, { use, useContext, useRef } from 'react'
import { useState } from "react";
import Pattern from "./assets/LogInPattern.png";
import "./App.css";
import logo from './assets/logo.svg';
import Navbar from "./components/Navbar";
import Logo from './components/Logo.jsx'
import { motion, AnimatePresence } from 'motion/react';
import api from './api.js';
import { useNavigate } from 'react-router-dom';
import { setToken } from './Services/TokenService.js';
import { authHeader } from './Services/AuthService.js';
import { authContext } from './contexts/AuthProvider.jsx';
const Login = () => {

  let [loggedIn,setLoggedIn] = useContext(authContext)
  let [mode, setMode] = useState('signup');
  
  //states that change on each input change
  let [username, setUsername] = useState();
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  
  //toggles the mode of the page
  const handleMode = () => {
    mode === 'login' ? setMode('signup') : setMode('login');

    setEmail("");
  }

  
  let usernameRef = useRef();
  let emailRef = useRef();
  let passwordRef = useRef();


  /////////////
  ////////////
  //////////
  ////////
  ///
  //
  ////
  //////
  ////////
  /////////
  ////////////

  let nav = useNavigate();

  //handles the submit of the user , activates when the submit button is pressed
  const handleSubmit = async () => {

    console.log(username);
    console.log(email);
    console.log(password);

    //if login send a post request to the login endpoint , set the response token in storage , go to home page
    if (mode === "login") {
      try {

        let user = { username, password }
        var response = (await api.postReq(api.envApi + "/api/auth/login", user));
        setLoggedIn(true);

        setToken(response.token);
        nav("/");
      }
      catch {
        console.log("login failed");
      }


    }
    //if signUp make a post request to the register endpoint , and get back the token and save it , go to home page
    else {

      try {

        let user = {username, email, password };
        var response = await api.postReq(api.envApi + "/api/auth/register", user, {"Content-Type": "application/json"});
        setLoggedIn(true);
        setToken(response.token);
        nav("/");
      }
      catch {
        console.log("signup failed");
      }

    }

  }

  const clearAllForms = () => {

  }

  return (

    <div className="h-screen max-md:bg-[url(M:\demo\Frontend\toDo\src\assets\LogInPattern.png)]   flex items-center justify-center md:bg-white  max-md:shadow-2xs max-md:shadow-celadon " >

      <motion.div className=" shadow-2xl  md:ring-1 h-[33.75rem] w-[50rem] ring-grey  flex items-center justify-center bg-white overflow-hidden shadow-zinc-300/50 rounded-xl     inset-shadow-grey-950 ">
        <motion.img src={Pattern} className="hidden h-[100%] object-none w-1/2 md:block " alt="" />




        <motion.form
          action="sumbit"
          className=" h-[100%]  flex  w-1/2 items-center justify-center "
          layout
        >
          <motion.div layout className="grid gap-2 ">

            <div className="flex justify-end items-start h-1/3">
              <Logo size={4} />
            </div>
            <p className="text-fern font-bold font-custom text-4xl">{mode === 'login' ? 'Log  in' : 'Sign up'}</p>


            <motion.div layout className=" rounded  items-center justify-center">



              <motion.div layout>


                <label className={` justify-start text-fern font-bold  font-custom`} htmlFor="userName"  >
                  Username
                </label>

                <br />
                <input
                  className={`  font-custom appearance-none p-1 w-80 h-9 border-b-2 border-celadon focus:ring-2 focus:ring-celadon text-fern bg-cream  hover:ring-2 hover:ring-celadon focus:outline-none active:ring-2 active:ring-celadon focus:inset-ring-celadon focus:inset-ring-xl  active:inset-shadow-tea active:inset-shadow-sm hover:ring-xl rounded transition-all ease-in-out font-medium`}
                  type="userName"
                  name="userName"
                  id="1"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value) }}
                />

                <br />
                <br />

              </motion.div>


              <AnimatePresence mode='popLayout'>

                {mode === "signup" && <motion.div layout initial={{ opacity: 0.5, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0.2, scale: 0.2 }}>
                  <label className=" font-custom justify-start text-fern font-bold  " htmlFor="email"  >
                    Email
                  </label>

                  <br />
                  <input
                    className="font-custom appearance-none p-1 w-80 h-9 border-b-2 border-celadon focus:ring-2 focus:ring-celadon text-fern bg-cream  hover:ring-2 hover:ring-celadon focus:outline-none active:ring-2 active:ring-celadon focus:inset-ring-celadon focus:inset-ring-xl  active:inset-shadow-tea active:inset-shadow-sm hover:ring-xl rounded transition-all ease-in-out font-medium"
                    type="email"
                    name="email"
                    id="2"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                  <br />
                  <br />
                </motion.div>
                }
              </AnimatePresence>

              <motion.div layout>

                <label className="justify-start text-fern font-bold font-custom  " htmlFor="password">
                  Password
                </label>

                <br />

                <input
                  className="font-custom appearance-none p-1 w-80 h-9 border-b-2 focus:ring-2 focus:ring-celadon border-celadon text-fern bg-cream hover:ring-2 hover:ring-celadon focus:outline-none active:ring-2 active:ring-celadon focus:inset-ring-celadon focus:inset-ring-xl  active:inset-shadow-tea active:inset-shadow-sm hover:ring-xl rounded transition-all ease-in-out font-medium"
                  type="password"
                  name="password"
                  id="3"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                />

                <br />
                <br />
              </motion.div>
              <motion.div layout className="text-fern font-bold font-custom ">{mode === 'login' ? "Don't have an account ?" : "Already have an account ?"}<div onClick={() => handleMode()} className="text-fern font-bold font-custom cursor-pointer underline">{mode === 'login' ? 'Sign Up' : 'Log In'} </div> </motion.div>

            </motion.div>
            <motion.div className="flex justify-end items-center">

              <button type="submit" className="active:bg-orange active:text-white duration-75 text-cream w-20 h-10 font-bold font-custom rounded hover:ring-xl   hover:scale-120 hover:bg-celadon hover:text-grey  transition-all ease-in-out  bg-grey" onClick={(e) => { e.preventDefault(); handleSubmit() }} >
                Submit
              </button>
            </motion.div>

          </motion.div>
        </motion.form>

      </motion.div >


    </div >
  );
}

export default Login