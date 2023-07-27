import React, { ReactNode } from 'react'

interface ButtonProps {
    onClick?: (val?: any) => void,
    iconStart?: ReactNode
    iconEnd?: ReactNode
    label?: string
    variant?: string
    disabled?: boolean,
    bgGradient?: string
}

const Button: React.FC<ButtonProps> = ({ onClick, iconStart, iconEnd, label, variant, disabled, bgGradient }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${iconStart ? 'pr-3 pl-1' : iconEnd ? 'pr-1 pl-3' : 'px-2'} ${variant === "green" ? "bg-pale-green text-white" : variant === "red" ? "bg-pale-red text-white" : variant === "yellow" ? "bg-pale-yellow text-white" : variant === "blue" ? "bg-pale-blue text-white" : "hover:bg-gray-300 "} ${disabled ? "cursor-not-allowed bg-opacity-20" : "cursor-pointer hover:bg-opacity-80"} ${bgGradient ? bgGradient : ""} py-1 border flex flex-row items-center gap-x-1 rounded-lg `}>
            {iconStart ? iconStart : null}
            <div className={`${label ? 'flex' : 'hidden'}`}>
                {label ? label : null}
            </div>
            {iconEnd ? iconEnd : null}
        </button>
    )
}

export default Button