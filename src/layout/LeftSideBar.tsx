import { useState } from "react"
import { useNavigate, useLocation } from 'react-router';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboard';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBag';
import LiquorRoundedIcon from '@mui/icons-material/Liquor';
import InventoryRounedIcon from '@mui/icons-material/Inventory';
import LogoutRoundedIcon from '@mui/icons-material/Logout';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';


const LeftSideBar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [activeTab, setActiveTab] = useState(location.pathname)
    const [expandSideBar, setExpandSideBar] = useState<boolean>(false)


    const iconStyle = {
        fontSize: "24px",
    }

    const menuIconStyle = {
        fontSize: "24px",
    }

    const routes = [
        {
            title: "DashBoard",
            icon: <SpaceDashboardRoundedIcon style={iconStyle} />,
            path: "/"
        },
        {
            title: "Orders",
            icon: <ShoppingBagRoundedIcon style={iconStyle} />,
            path: "/orders"
        },
        {
            title: "Products",
            icon: <LiquorRoundedIcon style={iconStyle} />,
            path: "/products"
        },
        {
            title: "Inventory",
            icon: <InventoryRounedIcon style={iconStyle} />,
            path: "/inventory"
        },
        {
            title: "Users",
            icon: <PeopleRoundedIcon style={iconStyle} />,
            path: "/users"
        },
        {
            title: "Account",
            icon: <ManageAccountsRoundedIcon style={iconStyle} />,
            path: "/account"
        },
    ]

    const goToPages = (path: string) => {
        setActiveTab(path)
        navigate(path)
    }

    const logOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        localStorage.removeItem("cartID")
        localStorage.removeItem("profilePicture")
        localStorage.removeItem("userID")
        navigate('/login')
    }

    const handleExpandSideBar = () => {
        setExpandSideBar(!expandSideBar)
    }
    return (
        <div className={` menu-expanded z-[50] h-[100dvh] sticky top-0 bottom-0 left-0 flex flex-col gap-y-1 border-r bg-pale-blue text-white text-opacity-[87%]`}>
            <div className='flex flex-row items-center p-2 gap-x-2'>

                <div
                    className=' py-2'>
                    <MenuRoundedIcon
                        style={menuIconStyle} />
                </div>


                <span className='font-bold text-2xl whitespace-nowrap'>
                    Nel Shop
                </span>

            </div>
            <div className="flex flex-col flex-grow gap-y-2 transition-colors ease-in-out duration-300">

                {routes.map((route: any, index: number) => (
                    <div

                        onClick={() => goToPages(route.path)}
                        key={index}
                        className={`${activeTab === route.path ? "bg-white bg-opacity-30 font-bold" : ""} flex flex-row items-center gap-x-2 cursor-pointer p-2 hover:bg-white hover:bg-opacity-10`}>
                        <div className="py-2">
                            {route.icon}
                        </div>

                        <span

                            className='text-xl whitespace-nowrap'>
                            {route.title}
                        </span>

                    </div>
                ))}

                <div

                    onClick={logOut}
                    className='flex flex-row items-center gap-x-2 cursor-pointer p-2'>
                    <LogoutRoundedIcon
                        style={{
                            fontSize: "24px",
                            lineHeight: "32px"
                        }} />

                    <span className='text-base'>
                        Log Out
                    </span>

                </div>
            </div>

        </div>


    )
}

export default LeftSideBar