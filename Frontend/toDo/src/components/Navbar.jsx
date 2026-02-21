import { useNavigate } from "react-router-dom";
import Logo from '../components/Logo.jsx'
import { deleteCookie } from "../Services/TokenService.js";
import { useContext } from "react";
import { authContext } from "../contexts/AuthProvider.jsx";

const Navbar = () => {

    const nav = useNavigate()
    let[loggedIn,setLoggedIn] = useContext(authContext);

    //Handles the navigation to the different pages
    const handleNavClick = (event) => {
        const target = event.target.innerHTML;
        console.log(target)
        switch (target) {

            case 'Log out':
                localStorage.removeItem("Authorization")
                setLoggedIn(false);
                nav('/login')
                break
            case 'Notes':
                nav('/notes')
                break
            case 'Tasks':
                nav('/')
                break

        }
    }

    const navBarComponents = ['Log out', 'Tasks', 'Notes', 'Test']
    
    return (

        <div className='flex w-full   relative top-0  h-16 '>

            <div className=' justify-center items-center h-16 w-40 max-sm:hidden flex '>
                <Logo size={2} />
            </div>

            <div className='flex justify-center items-center w-[100vw] absolute top-1/2 -translate-y-4 transform-translate-x-1/2'>

                <div className='flex  h-10 justify-center items-center w-120  ring-grey rounded-2xl bg-tea  shadow-celadon shadow-xs space-x-8'>
                    {navBarComponents.map((item, index) => { return (<div onClick={handleNavClick} key={index} className='select-none cursor-pointer font-custom flex  justify-center items-center  hover:bg-grey hover:text-cream hover:scale-120 font-semibold text-grey rounded-2xl    w-20 transition-all ease-in duration-200  hover:shadow-2xl '>{item}</div>) })}
                </div>
            </div>
        </div>



    )
}

export default Navbar