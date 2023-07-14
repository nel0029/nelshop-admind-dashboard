import React, { useState } from 'react'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

interface MenuProps {
    option: string,
    setOption: React.Dispatch<React.SetStateAction<string>>;
    menuOptions: string[]
}

const Menu: React.FC<MenuProps> = ({ option, setOption, menuOptions }) => {
    const [menuOption, setMenuOption] = useState(false)


    const openMenuOption = () => {
        setMenuOption(!menuOption)

    }

    const handleOption = (option: string) => {
        setOption(option)
        setMenuOption(false)
    }
    return (
        <div className="relative flex border rounded-lg box-border">
            <div
                onClick={openMenuOption}
                className="w-full flex-grow flex flex-row items-center justify-between cursor-pointer z-10 bg-white hover:bg-black hover:bg-opacity-20 px-2 py-1 rounded-lg">
                <div className="">
                    {option}
                </div>
                <div>
                    {menuOption ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
                </div>
            </div>
            <div className={`${menuOption ? "top-[100%] mt-1 opacity-100 translate-y-0" : "translate-y-[-20px] opacity-0 -z-50"} min-w-full flex flex-col flex-grow transition-all ease-in-out duration-100 absolute right-0 border rounded-lg bg-white py-2`}>
                {menuOptions.map((option: any) => (
                    <div
                        key={option}
                        onClick={() => handleOption(option)}
                        className="w-full flex-1 hover:bg-black hover:bg-opacity-20 px-2 cursor-pointer whitespace-nowrap">
                        {option}
                    </div>
                ))}
            </div>
        </div>


    )
}

export default Menu