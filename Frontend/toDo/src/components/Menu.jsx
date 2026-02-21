import React from 'react'
import { icons } from '../assets/assets.js'
//not used 
const Menu = () => {
    let MenuProps =
        [
           {
                id: 1,
                desc: "create a new task",
                icon: icons.add_icon

            },

            {
                id: 2,
                desc: "delete a task",
                icon: icons.delete_icon
            },

            {
                id: 3,
                desc: "modify a task",
                icon: icons.edit_icon

            }
        ]

    const handleClick = (item) => {
        if (item.icon === icons.add_icon)
            console.log('errrm');


    }
    return (

        <div className='flex items-center justify-center space-x-10  w-full '>
            {MenuProps.map((item) => {
                return (<div className='rounded-xl ring-1 ring-grey bg-radial from-tea  to-cream h-15 w-15 flex justify-center items-center hover:shadow-lg  hover:ring-4 hover:shadow-tea hover:scale-105 hover:ring-tea  transition-all z-20 ease-in-out'><img className='size-7' src={item.icon} alt="" onClick={handleClick} /></div>)
            })}
        </div>
    )
}

export default Menu