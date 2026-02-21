import React from 'react'
//viewport that renders some content inside
const ViewPort = ({ children }) => {
    return (
        <div className='   flex justify-center  border-grey w-[100vw]   h-[85vh]  overflow-hidden  p-4  max-sm:flex-col '>
            {children}
        </div>
    )
}

export default ViewPort