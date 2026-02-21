import { motion, AnimatePresence, millisecondsToSeconds } from 'motion/react';
import React, { useEffect, useState } from 'react'
//urgent card displaying the time to the nearest task
const Urgent = ({ task, method }) => {

    if (!task) {
        return (<div className="flex  w-full h-full flex-col">

            <h1 className='text-2xl font-custom font-semibold text-grey' >Most Urgent:</h1>
            <div className=' text-grey flex  justify-between font-custom bg-lightGrey rounded-2xl  text-xl flex-1 items-center p-4 m-4 hover:border-celadon hover:border-4 active:border-orange transition-all duration-75 cursor-pointer' >
                <div className='mx-auto my-auto'>
                    U have no urgent tasks !!
                </div>
            </div>
        </div >



        )
    }
    //truncate string to a desired length
    const truncateString = (sentence, limit = 30) => {
        if (sentence.length <= limit) return (sentence);
        let lim = sentence.slice(0, limit).lastIndexOf(" ");
        return (sentence.slice(0, lim));
    }
    //formats the number with a zero padding
    let formatNumber = (number) => {
        if (number >= 10)
            return number;

        return '0' + number.toString();

    }
    //returns the difference between 2 times
    let calcDifference = (time1, time2) => {

        let x = Math.abs(time1.getTime() - time2.getTime());

        var
            days = Math.floor(x / (1000 * 60 * 60 * 24)),
            milliseconds = Math.floor((x % 1000) / 100),
            seconds = Math.floor((x / 1000) % 60),
            minutes = Math.floor((x / (1000 * 60)) % 60),
            hours = Math.floor((x / (1000 * 60 * 60)) % 24);


        return { milliseconds, seconds, minutes, hours, days };

    }

    let [time, setTime] = useState(new Date(task.dueDate));
    let [currentTime, setCurrentTime] = useState(new Date());
    let [timer, setTimer] = useState(calcDifference(time, currentTime))


    //changers the time every second
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
            setTimer(calcDifference(time, now));
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    return (

        <div className="flex  w-full h-full flex-col">

            <h1 className='text-2xl font-custom font-semibold text-grey' >Most Urgent:</h1>
            <div className=' text-grey flex  justify-between font-custom bg-lightGrey rounded-2xl  text-xl flex-1 items-center p-4 m-4 hover:border-celadon hover:border-4 active:border-orange transition-all duration-75 cursor-pointer' onClick={() => { task.id? method(task.id) :null}}>
                <div>
                    {truncateString(task.task)}
                </div>
                <motion.div
                    layout
                    className=" flex  bg-celadon rounded-2xl pr-4 pl-4 border-grey border text-2xl text-center text-grey font-semibold cursor-pointer"
                    onClick={() => setTime(time + 1)}

                >
                    <AnimatePresence mode="poplayout">
                        {timer.days !== 0 ? <motion.div
                            key={timer.days}
                            layout
                            initial={{ opacity: 0.5, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.05 }}>

                            {formatNumber(timer.days)}:
                        </motion.div> : null



                        }
                        <motion.div
                            key={timer.hours}
                            layout
                            initial={{ opacity: 0.5, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.05 }} >

                            {formatNumber(timer.hours)}:
                        </motion.div>

                        <motion.div
                            key={timer.minutes}
                            layout
                            initial={{ opacity: 0.5, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.05 }}>

                            {formatNumber(timer.minutes)}:
                        </motion.div>


                        <motion.div
                            key={timer.seconds}
                            layout
                            initial={{ opacity: 0.5, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.05 }} >

                            {formatNumber(timer.seconds)}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

            </div>
        </div >


    )
}

export default Urgent