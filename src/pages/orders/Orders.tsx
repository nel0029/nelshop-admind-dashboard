import { useState } from "react"
import { useNavigate } from "react-router"
import Header from "../../components/Header"
import Menu from "../../components/Menu"
import { orders } from "../../data/DummyOrders"
import Button from "../../components/Button"


import AddRoundedIcon from '@mui/icons-material/AddRounded';

const Orders = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("All")
    const [ordersFilteredData, setOrdersFilteredData] = useState("All")

    const goToTab = (tab: string) => {
        setActiveTab(tab)
    }

    const tabs = [
        {
            title: "All",
            path: ""
        },
        {
            title: "New Orders",
            path: ""
        },
        {
            title: "Completed",
            path: ""
        },
        {
            title: "Returned",
            path: ""
        },
    ]

    const orderStatus = ["All", "Pending", "Preparing", "Shipped", "Delivered", "Received", "Cancelled", "Returned"]

    const newOrder = () => {
        navigate('/orders/new')
    }
    return (
        <div className="flex flex-col flex-grow gap-y-2">
            <Header>
                Orders
            </Header>
            <div className="w-full flex flex-col px-2">

                <div className="w-full ">
                    <div className="w-full flex flex-row items-center justify-end py-2 gap-x-2">
                        <Menu
                            menuOptions={orderStatus}
                            option={ordersFilteredData}
                            setOption={setOrdersFilteredData} />
                        <Button
                            onClick={newOrder}
                            label="New Order"
                            iconStart={<AddRoundedIcon />}
                            variant="blue" />
                    </div>
                    <table className="w-full border-b">
                        <tr className="flex justify-around items-center border-y-2 border-black">
                            <th className="flex-1 flex flex-row justify-start items-center p-2">
                                Order ID
                            </th>
                            <th className="flex-1 flex flex-row justify-start items-center p-2">
                                Customer Name
                            </th>
                            <th className="flex-1 flex flex-row justify-start items-center p-2">
                                Items
                            </th>
                            <th className="flex-1 flex flex-row justify-start items-center p-2">
                                Status
                            </th>
                        </tr>
                        {orders.map((order: any, index: number) => (
                            <tr
                                key={index}
                                className="flex justify-around items-center border-t hover:bg-black hover:bg-opacity-20 cursor-pointer">
                                <td className="flex-1 flex flex-row justify-start items-center flex-nowrap overflow-hidden p-2 gap-x-1">
                                    {order.orderID}
                                </td>
                                <td className="flex-1 flex flex-row justify-start items-center flex-nowrap overflow-hidden p-2 gap-x-1">
                                    {order.customerName}
                                </td>
                                <td className="flex-1 flex flex-row justify-start items-center flex-nowrap overflow-hidden p-2 gap-x-1">
                                    {order.items.map((item: any, index: number) => (
                                        <div key={index}>
                                            {item.productName}
                                        </div>
                                    ))}
                                </td>
                                <td className="flex-1 flex flex-row justify-start items-center flex-nowrap overflow-hidden p-2 gap-x-1">
                                    <div className={`${order.status === "Returned" || order.status === "Cancelled" ? "bg-pale-red" : order.status === "Pending" ? "bg-pale-green" : order.status === "Packed" || order.status === "Shipped" ? "bg-pale-yellow" : "bg-pale-blue"} px-2 py-1 rounded-full text-white`}>
                                        {order.status}
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </table>
                </div>
            </div>
        </div>
    )
}

export default Orders