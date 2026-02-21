import React, { use, useState, useEffect } from 'react'
import { animate, motion, AnimatePresence, scale } from 'motion/react'
//views the tasks with the importance and content + countdown
const TaskViewer = ({ id, task, desc, creationDate, dueDate, isFinished, importance }) => {

    let padNb = (num) => { 
        if (num.toString().length >= 2)
             return (num.toString()); 
        return (num.toString().padStart(2, '0')) 
    }

    let bgColor =
    {
        critical: 'bg-critical text-cream',
        important: 'bg-important text-cream',
        moderate: 'bg-moderate text-grey',
        low: 'bg-low text-grey'
    }

    let [timer, setTimer] = useState()

    useEffect(() => {

        if (!isFinished) {

            const interval = setInterval(() => {
                let now = new Date();
                setTimer(calcDifference(new Date(dueDate), now))
            }, 1000);
            return () => clearInterval(interval)
        }




    }, [creationDate, dueDate, isFinished])

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const now = new Date();
    //         setCurrentTime(now);
    //         setTimer(calcDifference(time, now));
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [time]);


    //formats the date
    let formatDateFormal = (date) => {
        let x = new Date(date);
        return (x.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', minute: '2-digit', hour: 'numeric' }));
    }


    //gets difference between 2 times
    const calcDifference = (time1, time2) => {

        let x = Math.abs(time1.getTime() - time2.getTime());








        var
            days = Math.floor(x / (1000 * 60 * 60 * 24)),

            milliseconds = Math.floor((x % 1000) / 100),
            seconds = Math.floor((x / 1000) % 60),
            minutes = Math.floor((x / (1000 * 60)) % 60),
            hours = Math.floor((x / (1000 * 60 * 60)) % 24);



        return { milliseconds, seconds, minutes, hours, days };

    }

    return (
        <div className='p-8 flex-col text-grey h-full w-full flex'>
            <div className='h-4/6'>
                <div className='flex  items-center justify-between '>
                    <p className='text-3xl font-custom font-bold text-grey p-4'>{task}</p>
                    {importance &&
                        <motion.div className={`${bgColor[importance]} select-none rounded-2xl p-2  font-semibold min-w-24  transition-all  font-custom text-center border border-grey`}>
                            <motion.div key={importance} intial={{ scale: 0.5, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0.5 }}>
                                {importance}
                            </motion.div>
                        </motion.div>}
                </div>
                <br />

                {desc ?
                    <motion.div layout className=' text-grey font-custom bg-lightGrey rounded-2xl  p-4'>
                        <AnimatePresence mode='popLayout'>
                            <motion.div key={desc} layout >
                                {desc.split("\n").map((sent) => {
                                    return (
                                        <> {sent} <br /> </>)
                                })
                                }
                            </motion.div>
                        </AnimatePresence>
                    </motion.div > : ""}
            </div>
            <div className='flex w-full p-2 h-2/6 items-end'>

                <div className='w-1/2 text-xs'>

                    {creationDate && <>
                        <p>created at:</p>
                        {formatDateFormal(creationDate)}
                    </>
                    }

                    {dueDate ?
                        <>
                            <p>deadline:</p>
                            {formatDateFormal(dueDate)}
                        </>
                        : ""
                    }

                    {(creationDate && dueDate && !isFinished) && <>
                        <p>remaining: </p>
                        {`${padNb(timer.days.toString())}:${padNb(timer.hours).toString()}:${padNb(timer.minutes).toString()}:${padNb(timer.seconds).toString()}`}
                    </>}
                </div>

                {isFinished ? <div className='w-1/2 flex space-x-2 justify-end'>
                    <p className='select-none text-celadon text-shadow-2xs font-semibold my-auto'>
                        Done
                    </p>
                    <svg width="2.05rem" height="2.05rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM15.7071 9.29289C16.0976 9.68342 16.0976 10.3166 15.7071 10.7071L12.0243 14.3899C11.4586 14.9556 10.5414 14.9556 9.97568 14.3899L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929C8.68342 10.9024 9.31658 10.9024 9.70711 11.2929L11 12.5858L14.2929 9.29289C14.6834 8.90237 15.3166 8.90237 15.7071 9.29289Z" fill="currentcolor" />
                    </svg>

                </div>
                    : isFinished === false ?
                        <div className='w-1/2 flex space-x-2 justify-end'>
                            <p className='select-none text-orange text-shadow-2xs font-semibold'>
                                Pending
                            </p>
                            <svg width="1.75rem" height="1.75rem" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">


                                <g id="Page-1" stroke="none" stroke-width="1" fill="currentcolor" fill-rule="evenodd" sketch:type="MSPage">
                                    <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-570.000000, -1089.000000)" fill="currentcolor">
                                        <path d="M591.657,1109.24 C592.048,1109.63 592.048,1110.27 591.657,1110.66 C591.267,1111.05 590.633,1111.05 590.242,1110.66 L586.006,1106.42 L581.74,1110.69 C581.346,1111.08 580.708,1111.08 580.314,1110.69 C579.921,1110.29 579.921,1109.65 580.314,1109.26 L584.58,1104.99 L580.344,1100.76 C579.953,1100.37 579.953,1099.73 580.344,1099.34 C580.733,1098.95 581.367,1098.95 581.758,1099.34 L585.994,1103.58 L590.292,1099.28 C590.686,1098.89 591.323,1098.89 591.717,1099.28 C592.11,1099.68 592.11,1100.31 591.717,1100.71 L587.42,1105.01 L591.657,1109.24 L591.657,1109.24 Z M586,1089 C577.163,1089 570,1096.16 570,1105 C570,1113.84 577.163,1121 586,1121 C594.837,1121 602,1113.84 602,1105 C602,1096.16 594.837,1089 586,1089 L586,1089 Z" id="cross-circle" sketch:type="MSShapeGroup">

                                        </path>
                                    </g>
                                </g>
                            </svg>

                        </div> : null}
            </div>

        </div>
    )
}

export default TaskViewer