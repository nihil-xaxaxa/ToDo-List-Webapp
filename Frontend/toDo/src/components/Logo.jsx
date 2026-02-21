//returns the LOGO component
const Logo = ({ size }) => {



    if (size >= 1 && size <= 7) {
        return (



            <div className={`select-none font-logo font-bold text-grey text-${size}xl `}>ToDo<span className={`text-celadon font-extrabold text-${size + 1}xl`}>.</span></div>
        )
    }

    return (
        <div className='select-none font-logo font-bold text-grey text-xl'>ToDo<span className='text-celadon font-extrabold text-2xl'>.</span></div>

    )
}

export default Logo