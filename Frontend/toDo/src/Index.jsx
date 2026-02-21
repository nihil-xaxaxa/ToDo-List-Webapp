import React, { useEffect, useState } from 'react'
import Menu from './components/Menu'
import Navbar from './components/Navbar'
import ViewPort from './components/ViewPort'
import Entry from './components/Entry'
import { icons } from './assets/assets.js'
import TaskViewer from './components/TaskViewer.jsx'
import { AnimatePresence, motion } from 'framer-motion'
import Urgent from './components/Urgent.jsx'
import { data, Form } from 'react-router-dom'
import DataEntry from './components/DataEntry.jsx'
import api from './api.js'
import { authHeader, execOrRetry, jsonAuthHeader } from './Services/AuthService.js'
import useExecOrRetry from './hooks/useExecOrRetry.js'
const Index = () => {


    // const handleToggle = () => {
    //     console.log(statetasks.at(index).isFinished);
    //     statetasks.at(index).isFinished = e.target.checked;
    //     console.log(statetasks.at(index).isFinished);



    // }



    let exec = useExecOrRetry()


    //if the entry's button is delete it sends a delete request , if done it changes the task's status to done sending a request also
    let handleEntryButton = async (id, action) => {
        let task = localTasks.find((item) => item.id === id)
        if (action === 'done') {
            let updatedTask = { ...task, isFinished: true, mode: 'done', completionDate: (new Date()).toISOString().slice(0, 19) };

            let updatedTasks = localTasks.map((item) => item.id === id ? updatedTask : item);
            let prevTasks = structuredClone(localTasks)
            setLocalTasks(updatedTasks);
            setSelectedId(null);


            try {
                await exec(()=>api.putReq(`${api.envApi}/api/tasks/${updatedTask.id}`, updatedTask, jsonAuthHeader()));
            }
            catch (error) {
                console.error("error updating note");
                setLocalTasks(prevTasks);

            }



        }
        else if (action === 'delete') {
            let newTasks = localTasks.filter((item) => item.id != id)
            let prevTasks = structuredClone(localTasks)
            setLocalTasks(newTasks);
            setSelectedId(null);

            try {
                await exec(()=> api.deleteReq(`${api.envApi}/api/tasks/${id}`, authHeader()));
            }
            catch (error) {
                console.error("error deleting note");
                setLocalTasks(prevTasks);

            }

        }
    }

    //empty task (placeholder)
    const emptyTask = {
        id: '',
        task: "Choose a task",
        desc: "",
        dueDate: "",
        creationDate: "",
        isFinished: "",
        mode: "",
        importance: ""
    };
    
    //tasks for testing
    let tasks = [
        {
            id: 1,
            task: "Get groceries",
            desc: "10 am hurry up",
            dueDate: "2025-08-14T10:23:00",
            creationDate: "2025-08-13T09:15:00",
            isFinished: false,
            importance: "low",
            mode: "todo",
            completionDate: null
        },
        {
            id: 2,
            task: "Wedding",
            desc: "Prepare for your friend's wedding, don't be late!!",
            dueDate: "2025-08-20T18:45:00",
            creationDate: "2025-08-13T10:42:00",
            isFinished: false,
            importance: "moderate",
            mode: "todo",
            completionDate: null
        },
        {
            id: 3,
            task: "Homework",
            desc: "Deadline 12:00 Saturday, careful",
            dueDate: "2025-08-16T12:17:00",
            creationDate: "2025-08-13T08:31:00",
            isFinished: false,
            importance: "important",
            mode: "done",
            completionDate: "2025-08-13T14:09:00"
        },
        {
            id: 4,
            task: "Pie",
            desc: "salt\npepper\nflour\nwater\ncornstarch\nnuts",
            dueDate: "2025-08-13T15:38:00",
            creationDate: "2025-08-12T17:22:00",
            isFinished: true,
            importance: "critical",
            mode: "todo",
            completionDate: null
        },
        {
            id: 5,
            task: "Mark at school",
            desc: "Interview at 5, subjects English with some math",
            dueDate: "2025-08-15T17:12:00",
            creationDate: "2025-08-13T11:05:00",
            isFinished: false,
            importance: "low",
            mode: "todo",
            completionDate: null
        }
    ];
    
    //creates or edits the task found in the dataentry modal
    const handleTask = async (data, mode) => {
        switch (mode) {
            case 'create':
                let now = Date.now()
                let newTask = {
                    ...data
                    , creationDate: (new Date()).toISOString().slice(0, 19)
                    , isFinished: false
                    , mode: 'todo'
                    , completionDate: null
                };

                let placeHolder = { ...newTask, temp: now }
                let newTasks = [...localTasks, placeHolder]
                let prevTasksCreate = structuredClone(localTasks)
                setLocalTasks(newTasks);
                setSelectedId(null)

                // submit the new task to the db

                try {
                    console.log("sending");
                    const task = await exec(()=> api.postReq(`${api.envApi}/api/tasks`, newTask, jsonAuthHeader()));
                    setLocalTasks(prevTasks => prevTasks.map((note) => note.temp === now ? task : note))
                }
                catch (error) {
                    console.error("error creating the task");
                    setLocalTasks(prevTasksCreate);

                }

                break;
            case 'edit':
                let updatedTask = data;
                console.log(updatedTask);
                let updatedTasks = localTasks.map((task) => task.id === updatedTask.id ? updatedTask : task);
                let prevTasksEdit = structuredClone(localTasks);
                setLocalTasks(updatedTasks)
                setSelectedId(null)
                try {
                    await exec(()=> api.putReq(`${api.envApi}/api/tasks/${updatedTask.id}`, updatedTask, jsonAuthHeader()));

                }
                catch (error) {
                    console.error("error updating note");
                    setLocalTasks(prevTasksEdit);

                }
                break;
        }

    }

    //Change the mode to edit and selects the Specific Task
    let setEdit = (id) => {
        setDataEntryMode('edit')
        let task = localTasks.find(item => item.id === id)
        setDataEntryObject(task)
        setBackBlur(true)
    }


    //Sets the selected task Id 
    const setSelected = (id) => {

        setSelectedId(id)
        console.log(id);


    }



    let [localTasks, setLocalTasks] = useState([]);
    let [oldTasks, setOldTasks] = useState(null);
    let [selectedId, setSelectedId] = useState(null);
    let [currentTask,setCurrentTask] =useState(emptyTask);
    let [buttonVisible, setbuttonVisible] = useState(true);
    let [backBlur, setBackBlur] = useState(false);
    let [newTask, setNewTask] = useState(null);
    let [dataEntryObj, setDataEntryObject] = useState('');
    let [dataEntryMode, setDataEntryMode] = useState('create')
    let [urgentTaskId, setUrgentTaskId] = useState(null)

    // useEffect(() => {
    //     setInterval(() => {
    //         let now = new Date();
    //         localTasks.reduce((max, task) => (now - (new Date(task.dueDate))), 0)
    //     }, 5000);
    // })

    //checks if the current task is the specific task
    const isSelected = (id) => {
        if (currentTask.id === id)
            return true;
        else return false
    }

    const getMaxId = (array) => {

        var max = array.reduce((max, item) => Math.max(max, item.id), 0);
        return max;

    }

    //fetches the tasks on startup from the specific API 
    useEffect(() => {
        const fetchTasks = async () => {
            // try {
                var tasks=await exec(()=> api.getReq(`${api.envApi}/api/tasks`, authHeader()));
                console.log(tasks);
                
                setLocalTasks(tasks)
                console.log(localTasks);
                
            // }
            // catch {
                // console.error("failed fetching tasks");

            // }
        }
        fetchTasks()
    }, [])

     useEffect(() => {
    console.log("Updated localTasks:", localTasks);
  }, [localTasks]); 

    useEffect(()=>{
        if(selectedId != null)
            {
                setCurrentTask(localTasks.find((task)=> task.id ==selectedId));
            }
        else
            setCurrentTask(emptyTask);
    },[selectedId])
    //sets the urgent task as the null or the actual urgent task if found 
    useEffect(() => {
        setUrgentTaskId(getMostUrgentTask()?.id ?? null)
    }, [localTasks])
    useEffect(()=>console.log(currentTask),[currentTask])

    //checks the local tasks to get the most urgent one , chooses the task with the least amount of time difference with now 
    const getMostUrgentTask = () => {
        if (!localTasks || localTasks.length === 0)
            return null;

        let pendingTasks = localTasks.filter(
            task => task.mode === 'todo' && !task.isFinished && task.dueDate && new Date(task.dueDate).getTime() > Date.now()
        );

        if (pendingTasks.length === 0)
            return null;

        return pendingTasks.reduce((a, b) => new Date(a.dueDate) > new Date(b.dueDate) ? b : a)



    }

    //for testing
    useEffect(() => {
        console.log(currentTask);
    }, [currentTask])

    return (

        <div className={`h-screen relative bg-offWhite  w-screen `}>

            <div className={`w-full h-full absolute flex justify-center items-center z-30  ${backBlur ? '' : 'hidden  '}`}>

                <motion.div className={`   transition-all bg-white  duration-500 rounded-2xl border-2   border-grey   ${backBlur ? 'opacity-100 translate-y-10' : 'opacity-0  hidden'}    z-100 `} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} >
                    <DataEntry obj={dataEntryObj} mode={dataEntryMode} method={setBackBlur} submit={handleTask} />
                </motion.div>
            </div>

            <div className={`relative transition-all  duration-75 flex ${backBlur ? 'blur-[6px]' : 'blur-none'}  flex-col z-10 `}>
                <Navbar />
                <ViewPort >
                    <motion.div layout className='flex mx-auto  flex-col' initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} >
                        <motion.p className='select-none font-bold text-3xl text-grey font-custom mx-4 mb-8'>To do</motion.p>

                        <AnimatePresence mode='popLayout'  >
                            {localTasks ? localTasks.filter((item) => item.mode === 'todo').map((item, index) => {
                                return (
                                    <motion.div layout key={item.id} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} >
                                        <Entry onEdit={setEdit} id={item.id} key={item.id} task={item.task} mode={item.mode} importance={item.importance} method={setSelected} isSelected={isSelected} onAltButton={handleEntryButton} />
                                    </motion.div>
                                )
                            }) : null}
                            <motion.div layout className='cursor-pointer select-none font-custom size- font-medium hover:font-bold text-grey space-x-4 flex justify-center active:text-celadon  hover:text-orange m-2 hover:scale-120 hover:text-shadow-2xs transition-all' onClick={() => { setDataEntryMode('create'), setDataEntryObject(''); setBackBlur(!backBlur) }}>
                                <p>
                                    Add tasks
                                </p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    width="1.75rem"
                                    height="1.75rem "
                                >
                                    <path
                                        fill="currentColor"
                                        d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48m80 224h-64v64a16 16 0 0 1-32 0v-64h-64a16 16 0 0 1 0-32h64v-64a16 16 0 0 1 32 0v64h64a16 16 0 0 1 0 32"
                                    ></path>
                                </svg>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                    <motion.div layout className='flex  p-4 col-span-2 flex-col mx-auto space-y-8' initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} >
                        <div className='flex  w-128 rounded-2xl flex-col   border-4 border-grey bg-white  ring-celadon h-2/3 shadow-2xl '>

                            <TaskViewer id={currentTask.id}
                                task={currentTask.task}
                                desc={currentTask.desc}
                                dueDate={currentTask.dueDate}
                                creationDate={currentTask.creationDate}
                                isFinished={currentTask.isFinished}
                                mode={currentTask.mode}
                                importance={currentTask.importance} />
                        </div>
                        <div className='  w-128 rounded-2xl flex-col  p-8 border-4 border-grey bg-white  ring-celadon  h-2/6 shadow-2xl '>
                            <Urgent task={localTasks ? localTasks.find((task) => task.id === urgentTaskId): null} method={setSelected} />
                        </div>

                    </motion.div>
                    <motion.div layout className='flex mx-auto flex-col' initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                        <motion.p layout className='select-none font-bold text-3xl text-grey font-custom mx-4 mb-8'>Done</motion.p>
                        <AnimatePresence mode='popLayout'>

                            {localTasks ? localTasks.filter((item) => item.mode === 'done').map((item, index) => {
                                return (
                                    <motion.div key={item.id} layout initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} >
                                        <Entry onEdit={setEdit} id={item.id} key={item.id} task={item.task} mode={item.mode} method={setSelected} isSelected={isSelected} onAltButton={handleEntryButton} />
                                    </motion.div>
                                )
                            }):null}
                        </AnimatePresence>
                    </motion.div>



                </ViewPort>




            </div>

        </div>

    )
}

export default Index