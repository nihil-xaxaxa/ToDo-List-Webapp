import React, { use, useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import { motion, AnimatePresence, color } from 'motion/react';
import { icons } from './assets/assets';
import api from './api.js'
import { authHeader, execOrRetry, jsonAuthHeader } from './Services/AuthService.js';
import useExecOrRetry from './hooks/useExecOrRetry.js';
 

const Notes = () => {

    let exec = useExecOrRetry()


    let bgColor =
    {
        melon: 'bg-melon',
        teaLight: 'bg-teaLight',
        peach: 'bg-peach',
        mist: 'bg-mist',
        lavender: 'bg-lavender'
    }

//local notes for testing purposes
    const notes = [
        {
            id: 1,
            title: "Get groceries",
            desc: "10 am hurry up",
            creationDate: "2025-02-01T09:00:00",
            color: "melon",
        },
        {
            id: 2,
            title: "Finish project report",
            desc: "Due by EOD",
            creationDate: "2025-01-30T08:30:00",
            color: "teaLight",
        },
        {
            id: 3,
            title: "Doctor appointment",
            desc: "Bring insurance card",
            creationDate: "2025-01-25T14:00:00",
            color: "teaLight",
        },
        {
            id: 4,
            title: "Call Mom",
            desc: "Wish her happy birthday",
            creationDate: "2025-02-03T19:00:00",
            color: "peach",
        },
        {
            id: 5,
            title: "Team meeting",
            desc: "Prepare slides",
            creationDate: "2025-02-02T09:00:00",
            color: "peach",
        },
        {
            id: 6,
            title: "Workout session",
            desc: "Leg day",
            creationDate: "2025-01-29T18:30:00",
            color: "peach",
        },
        {
            id: 7,
            title: "Book flight tickets",
            desc: "Vacation planning",
            creationDate: "2025-01-20T12:00:00",
            color: "mist",
        },
        {
            id: 8,
            title: "Client call",
            desc: "Discuss contract",
            creationDate: "2025-08-10T01:00:00",
            color: "lavender",
        },
        {
            id: 9,
            title: "Grocery shopping",
            desc: "Buy fruits and veggies im like todsay and not tomorrow gurllllll you understand what im sayng ?",
            creationDate: "2024-01-27T15:00:00",
            color: "melon",
        },
        {
            id: 10,
            title: "Read a book",
            desc: "Finish chapter 5",
            creationDate: "2025-01-31T20:00:00",
            color: "lavender",
        },
    ];


    //get the notes from the backend service by a get request associated with a auth token
    const fetchNotes = async () => {
            try {
                let notes = await exec(()=> api.getReq(`${api.envApi}/api/notes`, authHeader()));
                setLocalNotes(notes);
            }
            catch (error) {
                console.error("failed loading data");
                setLocalNotes([])
            }
        }
    
    
    //get the note whose id is selected
    const findSelected = () => {
        if (selectedId != null)
            return localNotes.find(note => note.id === selectedId);
        else
            return null;
    }



    //on loadup get the notes 
    useEffect(() => {
        fetchNotes()
    }, [])

    let [localNotes, setLocalNotes] = useState([]);
    let [selectedId, setSelectedId] = useState(null);
    const selectedNote = findSelected()
    let [updatedNote, setUpdatedNote] = useState(null);
    let [oldNote, setOldNote] = useState(null);
    let [oldNotes, setOldNotes] = useState(localNotes);
    let [filter, setFilter] = useState('');
    let [mode, setMode] = useState('view');
    let [color, setColor] = useState('');
   
    //for testing
    useEffect(() => {
        console.log(mode);
    }, [mode])





    useEffect(()=>console.log(`updated notes ${localNotes}`) ,[localNotes]
    )


    //truncates the string to a specified length
    const truncateString = (sentence, limit = 30) => {
        if (sentence.length <= limit) return (sentence);
        let lim = sentence.slice(0, limit).lastIndexOf(" ");
        return (sentence.slice(0, lim));
    }

    //formats the date
    let formatDateCasual = (date) => {
        let x = new Date(date), today = new Date();
        let duration = today - x;
        let oneDay = 1000 * 60 * 60 * 24;

        let todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        let yesterdayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        yesterdayMidnight.setDate(yesterdayMidnight.getDate() - 1);




        if (x.toDateString() === today.toDateString())
            return x.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })


        if (x >= yesterdayMidnight && x < todayMidnight)
            return 'yesterday'

        if (x.getFullYear() === today.getFullYear())
            return x.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })


        return (x.toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' }));
    }

    //another format function for date
    let formatDateFormal = (date) => {
        let x = new Date(date);
        return (x.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', minute: '2-digit', hour: 'numeric' }));
    }
    
    //get the max id in a specific array
    const getMaxId = (array) => {

        var max = array.reduce((max, item) => Math.max(max, item.id), 0);
        return max;

    }

    //deletes a note locally optimistcally ,and sends a delete request , if failed rollback the change
    const deleteNote = async (id) => {

        const prevNotes = structuredClone(localNotes)
        let updatedNotes = localNotes.filter((item) => item.id !== id)
        setLocalNotes(updatedNotes);
        //api delete request + rollback
        try {
           await exec(()=> api.deleteReq(`${api.envApi}/api/notes/${id}`, authHeader()));
        }
        catch (error) {
            console.error("Error deleting note");

            setLocalNotes(prevNotes);

        }
    }

    //handles the creation or modification of a note / creates the note or modifiews it locally , and sends a request , if failes rollsback
    const submitForm = async (e, mode, selectedNote) => {

        e.preventDefault();
        if (mode === 'create') {
            let time = Date.now()
            let newNote =
            {
                temp: time,
                title: e.target.title.value,
                desc: e.target.desc.value,
                creationDate: (new Date()).toISOString().slice(0, 19),
                color: color || 'teaLight',
            }
            console.log(newNote);



            // let updatedNotes = [...localNotes, newNote]
            setOldNotes(structuredClone(localNotes));
            setLocalNotes(prevNote => [...prevNote, newNote]);
            setMode('view');

            //api req
            try {

                updatedNote = await exec(()=> api.postReq(`${api.envApi}/api/notes`, newNote, jsonAuthHeader()));
                // updatedNotes = [...localNotes, updatedNote]
                setLocalNotes(prev => prev.map((note) => note.temp === time ? updatedNote : note))
            }
            catch (error) {
                console.error("failed to create new note");
                setLocalNotes(oldNotes);
            }

        }
        else if (mode === 'edit') {

            let updatedNote =
            {
                ...selectedNote,

                title: e.target.title.value,
                desc: e.target.desc.value,

            }
            console.log(selectedNote);

            console.log(oldNote);
            // setOldNote({ ...selectedNote });
            console.log(oldNote);
            setUpdatedNote(updatedNote);
            const updatedNotes = localNotes.map((note) => note.id === updatedNote.id ? updatedNote : note)
            console.log(updatedNotes);
            // setOldNotes([...localNotes]);
            setLocalNotes(updatedNotes);


            //api req
            try {

                await exec(()=> api.putReq(`${api.envApi}/api/notes/${updatedNote.id}`, updatedNote, jsonAuthHeader()));


            }
            catch (error) {
                console.error("error updating the note");
                setLocalNotes(localNotes.map((note) => note.id === selectedNote.id ? selectedNote : note));


            }
            console.log(oldNote);
        }




    }

    //handles the call for submitForm() method (helper only)
    const handleSubmit = (e) => {

        if (mode === 'create') {
            submitForm(e, 'create');
            setMode('view');
        }
        else if (mode === 'edit') {
            submitForm(e, 'edit', selectedNote);
            setMode('view');
            setSelectedId(null);
        }

    }

    return (
        <div className='w-screen h-screen text-grey font-custom '>
            <Navbar />
            <div className='flex w-full h-full'>

                <div className=' w-20   border-r-2 border-lightGrey'>
                    <div className='flex flex-col   justify-start items-center p-4'>

                        <motion.div className='rounded-xl bg-tea text-grey  active:scale-80 active:bg-orange active:text-white  hover:scale-120 transition-all duration-75 ease-in-out  p-2' onClick={() => { setMode('create') }} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                width="1.75rem"
                                height="1.75rem "
                                className='mx-auto my-auto '
                            >
                                <path
                                    fill="currentColor"
                                    d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48m80 224h-64v64a16 16 0 0 1-32 0v-64h-64a16 16 0 0 1 0-32h64v-64a16 16 0 0 1 32 0v64h64a16 16 0 0 1 0 32"
                                ></path>
                            </svg>
                        </motion.div>

                        <div className="flex flex-col justify-center items-center p-4">
                            <motion.div className={`bg-melon rounded-2xl   transition-all duration-75 ${filter === 'melon' ? 'size-8' : 'size-4'} m-4 shadow-xs  `} onClick={() => { setFilter(filter === 'melon' ? '' : 'melon') }} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}></motion.div>
                            <motion.div className={`bg-teaLight rounded-2xl   transition-all duration-75 ${filter === 'teaLight' ? 'size-8' : 'size-4'} m-4 shadow-xs `} onClick={() => { setFilter(filter === 'teaLight' ? '' : 'teaLight') }} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}></motion.div>
                            <motion.div className={`bg-peach rounded-2xl   transition-all duration-75 ${filter === 'peach' ? 'size-8' : 'size-4'} m-4 shadow-xs `} onClick={() => { setFilter(filter === 'peach' ? '' : 'peach') }} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}></motion.div>
                            <motion.div className={`bg-lavender rounded-2xl   transition-all duration-75 ${filter === 'lavender' ? 'size-8' : 'size-4'} m-4 shadow-xs `} onClick={() => { setFilter(filter === 'lavender' ? '' : 'lavender') }} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}></motion.div>
                            <motion.div className={`bg-mist rounded-2xl  transition-all duration-75  ${filter === 'mist' ? 'size-8' : 'size-4'} m-4 shadow-xs `} onClick={() => { setFilter(filter === 'mist' ? '' : 'mist') }} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}></motion.div>


                        </div>

                    </div>

                </div>
                <div className='flex-auto grid  grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-4 p-8 self-start align-center justify-items-center'>
                    <AnimatePresence mode='popLayout'>
                        {localNotes? localNotes.filter((note) => note.id != selectedId).map((note) => {
                            if (filter === '' || note.color === filter)
                                return (
                                    <motion.div layout className={`cursor-pointer select-none flex flex-col border border-lightGrey shadow-2xs inset-shadow-2xs  rounded-xl w-50 h-40 m-2 p-4 ${bgColor[note.color]}`} layoutId={note.id} key={note.id} onClick={() => { setSelectedId(note.id) }} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>

                                        <motion.div className=' text-pretty  font-semibold'>
                                            {note.title}
                                        </motion.div>

                                        <div className='flex flex-col justify-between flex-auto'>

                                            <motion.div className=' p-2'>
                                                {truncateString(note.desc, 23)}
                                            </motion.div>
                                            <motion.div className='flex justify-between items-center'>

                                                <motion.div className='flex justify-start items-end  text-xs'>
                                                    {formatDateCasual(note.creationDate)}
                                                </motion.div>

                                                <motion.div layout onClick={(e) => { e.stopPropagation(); deleteNote(note.id) }} className={` backdrop-contrast-125  my-auto    flex justify-center items-center   transition-all z-20 ease-in-out    w-8 h-8     hover:shadow-lg  hover:scale-105  rounded-xl `} transition={{ type: 'tween' }}>
                                                    <img src={icons.delete_icon} alt="" className={`w-6 h-6  duration-75 ease-in-out transition-all `} />
                                                </motion.div>
                                            </motion.div>
                                        </div>


                                    </motion.div>)
                        }):null}
                    </AnimatePresence>

                </div>
                <AnimatePresence>
                    {(selectedId || mode === 'create') &&
                        <>
                            <motion.div className=' fixed top-0 h-full w-full bg-black/30   ' onClick={() => { setMode('view'); setSelectedId(null); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}></motion.div>

                            <motion.div className='ring-2 ring-grey p-4 fixed top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 rounded-2xl bg-cream h-[50vh] w-[60vw] z-50 text-grey   ' layoutId={selectedId} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>

                                <form action="" className='w-full h-full ' onSubmit={(e) => { handleSubmit(e) }}>
                                    <motion.div className='flex flex-col w-full h-full '>


                                        <motion.div className='flex justify-between items-center ' >
                                            <motion.input className='p-2 font-bold text-xl' defaultValue={mode === 'create' ? '' : selectedId && selectedNote.title} name='title' readOnly={mode === 'view'} placeholder={'Title'}>

                                            </motion.input>



                                            <motion.div>
                                                <svg width="1.5rem" onClick={(e) => { setMode('view'); setSelectedId(null); }} height="1.5rem" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" className='text-grey hover:text-orange active:text-celadon transition-all hover:scale-120 active:scale-80'>
                                                    <path fill="currentcolor" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" />
                                                </svg>
                                            </motion.div>


                                        </motion.div>

                                        <motion.div className='flex justify-between flex-col   w-full  flex-auto'>
                                            <motion.textarea className='mx-auto resize-none font-medium bg-lightGrey rounded-xl p-2 m-2 w-full h-full ' name='desc' defaultValue={
                                                mode === 'create' ? '' : selectedId && selectedNote.desc} readOnly={mode === 'view'} placeholder={'Write the description'}>

                                            </motion.textarea>


                                            <motion.div className='flex justify-between items-center p-2'>

                                                <div>

                                                    {(mode === 'edit' || mode === 'view') &&
                                                        <div  >

                                                            created at:
                                                            {selectedId && <p>{formatDateFormal(selectedNote.creationDate)} </p>}
                                                        </div>
                                                    }
                                                </div>

                                                {mode === 'create' && <motion.div className="flex  justify-center items-center p-4" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>

                                                    <motion.div className='font-semibold' initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>Choose a color: </motion.div>

                                                    <motion.div className={`bg-melon rounded-2xl   transition-all duration-75 ${color === 'melon' ? 'size-8' : 'size-4'} m-4 shadow-xs  `} onClick={() => { setColor(color === 'melon' ? '' : 'melon') }} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}></motion.div>
                                                    <motion.div className={`bg-teaLight rounded-2xl   transition-all duration-75 ${color === 'teaLight' ? 'size-8' : 'size-4'} m-4 shadow-xs `} onClick={() => { setColor(color === 'teaLight' ? '' : 'teaLight') }} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}></motion.div>
                                                    <motion.div className={`bg-peach rounded-2xl   transition-all duration-75 ${color === 'peach' ? 'size-8' : 'size-4'} m-4 shadow-xs `} onClick={() => { setColor(color === 'peach' ? '' : 'peach') }} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}></motion.div>
                                                    <motion.div className={`bg-lavender rounded-2xl   transition-all duration-75 ${color === 'lavender' ? 'size-8' : 'size-4'} m-4 shadow-xs `} onClick={() => { setColor(color === 'lavender' ? '' : 'lavender') }} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}></motion.div>
                                                    <motion.div className={`bg-mist rounded-2xl  transition-all duration-75  ${color === 'mist' ? 'size-8' : 'size-4'} m-4 shadow-xs `} onClick={() => { setColor(color === 'mist' ? '' : 'mist') }} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}></motion.div>


                                                </motion.div>}

                                                <motion.div className='flex justify-center space-x-2 items-center'>
                                                    <AnimatePresence>

                                                        {mode === 'view' && <motion.div className="select-none z-0 active:bg-orange  active:text-white duration-75 text-cream w-10 h-10 font-bold font-custom rounded hover:ring-xl   hover:scale-110 hover:bg-celadon hover:text-grey flex items-center justify-center transition-all ease-in-out  bg-grey" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} onClick={() => { deleteNote(selectedId); setMode('view'); setSelectedId(null) }} >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" >
                                                                <path d="M8 1.5V2.5H3C2.44772 2.5 2 2.94772 2 3.5V4.5C2 5.05228 2.44772 5.5 3 5.5H21C21.5523 5.5 22 5.05228 22 4.5V3.5C22 2.94772 21.5523 2.5 21 2.5H16V1.5C16 0.947715 15.5523 0.5 15 0.5H9C8.44772 0.5 8 0.947715 8 1.5Z" fill="currentcolor" />
                                                                <path d="M3.9231 7.5H20.0767L19.1344 20.2216C19.0183 21.7882 17.7135 23 16.1426 23H7.85724C6.28636 23 4.98148 21.7882 4.86544 20.2216L3.9231 7.5Z" fill="currentcolor" />
                                                            </svg>
                                                        </motion.div>}
                                                    </AnimatePresence>
                                                    <motion.button type='submit' initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="select-none z-10 active:bg-orange  active:text-white duration-75 text-cream w-20 h-10 font-bold font-custom rounded hover:ring-xl   hover:scale-120 hover:bg-celadon hover:text-grey flex items-center justify-center transition-all ease-in-out  bg-grey" onClick={(e) => { if (mode === 'view') e.preventDefault(); setMode('edit') }} >
                                                        {(mode === 'create' || mode === 'edit') ? 'Submit' : 'Edit'}
                                                    </motion.button>
                                                </motion.div>



                                            </motion.div>

                                        </motion.div>


                                    </motion.div>


                                </form>





                            </motion.div>
                        </>}
                </AnimatePresence>


            </div >
        </div >


    )
}

export default Notes