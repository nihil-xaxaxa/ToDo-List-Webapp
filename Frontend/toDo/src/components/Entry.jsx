import React, { Fragment, useState } from 'react'
import { icons } from '../assets/assets.js'
import { motion, AnimatePresence } from 'motion/react'
const Entry = ({ id, task, desc, importance, mode, method, isSelected, onEdit, onAltButton }) => {

    //truncates the string to a desired length
    const truncateString = (sentence, limit = 30) => {
        if (sentence.length <= limit) return (sentence);
        let lim = sentence.slice(0, limit).lastIndexOf(" ");
        return (sentence.slice(0, lim));
    }

    let bgColor =
    {
        critical: 'bg-critical ',
        important: 'bg-important ',
        moderate: 'bg-moderate ',
        low: 'bg-low '
    }

    let [buttonVisible, setbuttonVisible] = useState(false);

    //toggles the visibility of the buttons
    const toggleVisibility = (state) => {
        setbuttonVisible(state);
        console.log(state)
    }


    // let buttonStyle = (isSelected, importance, buttonVisible) => {

    //     if (isSelected === true && buttonVisible)
    //         return ''

    // }



    return (

        <motion.div className={`cursor-pointer select-none flex w-80 mx-auto p-4 text-grey justify-between  hover:shadow-2xl transition-all font-custom   rounded-2xl    border-grey   hover:border-none font-notable hover:ring-2  m-2 active:shadow-grey active:shadow-2xl active:border-none active:ring-4 active:ring-grey  ${isSelected(id) ? ' border-none bg-emerald text-white hover:ring-celadon ' : 'bg-tea hover:ring-emerald'} `} onMouseEnter={() => { toggleVisibility(true) }} onMouseLeave={() => { toggleVisibility(false) }} onClick={() => { method(id) }}  >
            <motion.div className=' w-full h-full'>

                <div className='  text-xl font-semibold    flex justify-center '>
                    {task || truncateString(desc, 4)}
                </div>
                {desc ?
                    <div className='  '>
                        {desc.split("\n").map((sent) => {
                            return (
                                <> {sent} <br /> </>)
                        })
                        }
                    </div > : ""}

            </motion.div>

            <motion.div layout transition={{ type: 'tween', duration: 0.075 }} className='flex justify-between space-x-1'>
                <motion.div layout transition={{ type: 'tween', duration: 0.075 }} className='flex items-center justify-center'>

                    <motion.div layout onClick={(e) => { e.stopPropagation(); if (mode === 'todo') onAltButton(id, 'done'); else onAltButton(id, 'delete') }} className={` ${mode != 'todo' && mode != 'done' ? '' : ''}  my-auto  bg-cream  flex justify-center items-center duration-100  transition-all z-20 ease-in-out   ${isSelected(id) ? ' border-none ' : 'border-grey'}    ${importance && !buttonVisible ? `${bgColor[importance]} rounded-2xl  w-8 h-8 border  transition-all` : buttonVisible ? " bg-celadon  hover:shadow-lg  hover:ring-4 hover:shadow-tea hover:scale-105 hover:ring-tea rounded-xl   w-8 h-8 " : "hidden"}   `} transition={{ type: 'tween' }}>
                        <motion.img src={mode === 'todo' ? icons.check : mode === 'done' ? icons.delete_icon : ''} alt="" className={`w-6 h-6 ${buttonVisible ? 'opacity-100' : 'opacity-0'} duration-75 ease-in-out transition-all `} />
                    </motion.div>

                </motion.div>
                <AnimatePresence>
                    {buttonVisible && <motion.div onClick={(e) => { e.stopPropagation(); onEdit(id) }} layout className={`my-auto  bg-cream flex justify-center items-center   transition-all z-20 ease-in-out   ${isSelected(id) ? ' border-none ' : 'border-grey'}     ${importance && !buttonVisible ? `${bgColor[importance]} rounded-2xl  w-8 h-8 border  transition-all` : buttonVisible ? " bg-celadon  hover:shadow-lg  hover:ring-4 hover:shadow-tea hover:scale-105 hover:ring-tea rounded-xl   w-8 h-8 " : ""}   `} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'tween', duration: 0.075 }}>

                        <motion.img src={icons.edit_icon} alt="" className={`w-6 h-6 ${buttonVisible ? 'opacity-100' : 'opacity-0'} duration-75 ease-in-out transition-all `} />


                    </motion.div>}
                </AnimatePresence>
            </motion.div>



        </motion.div>
    )
}

export default Entry