import React, { useState, useRef, useEffect } from 'react'
//data entry module pop up
const DataEntry = ({ obj, mode, method, submit }) => {
    //uses the method passed to submit the task 
    const handleSubmit = (e) => {
        e.preventDefault();
        let task =
        {
            id: obj.id || null,
            task: e.target.task.value,
            desc: e.target.desc.value,
            dueDate: e.target.date.value,
            importance: importance,
            creationDate: obj.creationDate || null,
            mode: obj.mode || null,
            isFinished: obj.isFinished || null,
            completionDate: obj.completionDate || null
        }



        submit(task, mode);
        e.target.reset();
        setImportance('')
        method(false);

    }


    let formRef = useRef('');
    let [importance, setImportance] = useState(obj.importance || '')

    //set importance or empty
    useEffect(() => { setImportance(obj.importance || '') }, [obj])

    //get the now time formatted
    const getNowTime = () => {

        let now = new Date();

        return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}T${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    }


    return (
        <div className='p-8 text-grey  font-custom' >
            <form ref={formRef} onSubmit={handleSubmit}>
                <div className='flex justify-between items-center'>
                    <h1 className='text-2xl font-bold'>
                        {mode === 'create' ? 'New Task' : 'Edit Task'}
                    </h1>
                    <svg width="1.5rem" onClick={(e) => { formRef.current.reset(); setImportance(""); method(false) }} height="1.5rem" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" className='text-grey hover:text-orange active:text-celadon transition-all hover:scale-120 actve:scale-80'>
                        <path fill="currentcolor" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" />
                    </svg>
                </div>

                <div className='bg-lightGrey m-4 p-4 rounded-2xl flex flex-col space-y-4' >
                    <div>

                        <label htmlFor="1" className='font-semibold text-xl'>Title:</label>
                        <br />
                        <input
                            className="font-custom appearance-none p-1 w-80 h-9 border-b-2 focus:ring-2 focus:ring-celadon border-celadon text-fern bg-cream hover:ring-2 hover:ring-celadon focus:outline-none active:ring-2 active:ring-celadon focus:inset-ring-celadon focus:inset-ring-xl  active:inset-shadow-tea active:inset-shadow-sm hover:ring-xl rounded transition-all ease-in-out font-medium"
                            type='text'
                            name="task"
                            id="1"
                            defaultValue={obj.task}


                        />
                    </div>
                    <div>

                        <label htmlFor="2" className='font-semibold text-xl' >Description</label>
                        <br />
                        <textarea
                            className="font-custom h-30 appearance-none p-1 w-80  border-b-2 focus:ring-2 focus:ring-celadon border-celadon text-fern bg-cream hover:ring-2 hover:ring-celadon focus:outline-none active:ring-2 active:ring-celadon focus:inset-ring-celadon focus:inset-ring-xl  active:inset-shadow-tea active:inset-shadow-sm hover:ring-xl rounded transition-all ease-in-out font-medium"
                            type='desc'
                            name="desc"
                            id="2"
                            required
                            defaultValue={obj.desc}
                        />
                    </div>
                    <div>

                        <label htmlFor="3" className='font-semibold text-xl'>Due Date:</label>
                        <br />
                        <input
                            className="font-custom appearance-none p-1 w-80 h-9 border-b-2 focus:ring-2 focus:ring-celadon border-celadon text-fern bg-cream hover:ring-2 hover:ring-celadon focus:outline-none active:ring-2 active:ring-celadon focus:inset-ring-celadon focus:inset-ring-xl  active:inset-shadow-tea active:inset-shadow-sm hover:ring-xl rounded transition-all ease-in-out font-medium"
                            type='datetime-local'
                            name="date"
                            id="3"
                            min={getNowTime()}
                            defaultValue={obj.dueDate}
                        />

                    </div>
                    <div>

                        <p className='font-semibold text-xl'>Importance: </p>
                        <br />
                        <div className='flex justify-between p-4 '>
                            <div className={`rounded-2xl border-2  border-grey size-8  hover:ring-4 hover:ring-celadon transition-all ease-in-out active:ring-orange hover:shadow-2xl hover:scale-120  bg-critical ${importance === "critical" ? 'ring-4 ring-orange ' : ''} `} onClick={() => { if (importance === 'critical') { setImportance(''); return } setImportance("critical") }}></div>
                            <div className={`rounded-2xl border-2  border-grey size-8  hover:ring-4 hover:ring-celadon transition-all ease-in-out active:ring-orange hover:shadow-2xl hover:scale-120  bg-important ${importance === "important" ? 'ring-4 ring-orange ' : ''} `} onClick={() => { if (importance === 'important') { setImportance(''); return } setImportance("important") }}></div>
                            <div className={`rounded-2xl border-2  border-grey size-8  hover:ring-4 hover:ring-celadon transition-all ease-in-out active:ring-orange hover:shadow-2xl hover:scale-120  bg-moderate ${importance === "moderate" ? 'ring-4 ring-orange ' : ''} `} onClick={() => { if (importance === 'moderate') { setImportance(''); return } setImportance("moderate") }}></div>
                            <div className={`rounded-2xl border-2  border-grey size-8  hover:ring-4 hover:ring-celadon transition-all ease-in-out active:ring-orange hover:shadow-2xl hover:scale-120  bg-low ${importance === "low" ? 'ring-4 ring-orange ' : ''} `} onClick={() => { if (importance === 'low') { setImportance(''); return } setImportance("low") }}></div>
                        </div>
                    </div>

                </div>
                <div className='flex justify-end items-center m-4'>

                    <button type="submit" className="active:bg-orange  active:text-white duration-75 text-cream w-20 h-10 font-bold font-custom rounded hover:ring-xl   hover:scale-120 hover:bg-celadon hover:text-grey  transition-all ease-in-out  bg-grey" >
                        Submit
                    </button>
                </div>
            </form>
        </div >
    )
}

export default DataEntry