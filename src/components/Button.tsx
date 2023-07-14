import React, { ReactNode } from 'react'

interface ButtonProps {
    onClick?: (val?: any) => void,
    iconStart?: ReactNode
    iconEnd?: ReactNode
    label?: string
    variant?: string
}

const Button: React.FC<ButtonProps> = ({ onClick, iconStart, iconEnd, label, variant }) => {
    return (
        <button
            onClick={onClick}
            className={`${iconStart ? 'pr-3 pl-1' : iconEnd ? 'pr-1 pl-3' : 'px-2'} ${variant === "green" ? "bg-pale-green hover:bg-opacity-80 text-white" : variant === "red" ? "bg-pale-red hover:bg-opacity-80 text-white" : variant === "yellow" ? "bg-pale-yellow hover:bg-opacity-80 text-white" : variant === "blue" ? "bg-pale-blue hover:bg-opacity-80 text-white" : "hover:bg-black hover:bg-opacity-30"} py-1 border flex flex-row items-center gap-x-1 rounded-lg `}>
            {iconStart ? iconStart : null}
            <div className={`${label ? 'flex' : 'hidden'}`}>
                {label ? label : null}
            </div>
            {iconEnd ? iconEnd : null}
        </button>
    )
}

export default Button