import { ReactNode } from "react"

interface HeaderProps {
    children: ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <div className="flex flex-row items-centerflex-grow font-bold text-2xl p-2 gap-x-2">
            {children}
        </div>
    )
}

export default Header