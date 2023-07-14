import { ReactNode } from "react"

interface HeaderProps {
    children: ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <div className="w-full flex flex-row items-center font-bold text-2xl p-2 gap-x-2 sticky top-0 bg-white">
            {children}
        </div>
    )
}

export default Header