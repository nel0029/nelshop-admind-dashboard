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



const LeftSideBar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [activeTab, setActiveTab] = useState(location.pathname)
    const iconStyle = {
        fontSize: "24px",
        lineHeight: "32px"
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

    return (
        <div className="max-w-[200px] flex flex-col flex-grow gap-y-2 border-r bg-pale-blue text-white text-opacity-[87%]">
            <div className='flex flex-row items-center p-2 gap-x-2'>
                <div className=''>
                    <MenuRoundedIcon />
                </div>
                <span className='font-bold text-2xl'>
                    Nel Shop
                </span>
            </div>
            <div className="flex flex-col flex-grow gap-y-2 ">

                {routes.map((route: any, index: number) => (
                    <div
                        onClick={() => goToPages(route.path)}
                        key={index}
                        className={`${activeTab === route.path ? "bg-white bg-opacity-10" : ""} flex flex-row items-center gap-x-2 cursor-pointer p-2`}>
                        {route.icon}
                        <span className='text-xl'>
                            {route.title}
                        </span>
                    </div>
                ))}

                <div className='flex flex-row items-center gap-x-2 cursor-pointer p-2'>
                    <LogoutRoundedIcon
                        style={{
                            fontSize: "24px",
                            lineHeight: "32px"
                        }} />
                    <span className='text-xl'>
                        Log Out
                    </span>
                </div>
            </div>

        </div>


    )
}

export default LeftSideBar