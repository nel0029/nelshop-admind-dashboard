
import { useState } from "react"
import Header from "../../components/Header"
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBag';
import LiquorRoundedIcon from '@mui/icons-material/Liquor';
import InventoryRounedIcon from '@mui/icons-material/Inventory';
import Chart from 'chart.js/auto'
import { Bar, Line } from "react-chartjs-2";
import { dummyData } from "../../data/Dummy";
import { CategoryScale } from "chart.js";
import Menu from "../../components/Menu";


Chart.register(CategoryScale);

const Dashboard = () => {
    const iconStyle = {
        fontSize: "40px",
        lineHeight: "42px"
    }

    const [barFilteredData, setBarFilteredData] = useState("All")
    const [lineFilteredData, setLineFilteredData] = useState("All")


    const handleData = (array: any[], filter: any) => {

        const orders = {
            label: "Orders",
            data: array.map((item: any) => item.order),
            backgroundColor: "#118ab2",
            borderColor: "#118ab2"
        }
        const completed = {
            label: "Completed",
            data: array.map((item: any) => item.completed),
            backgroundColor: "#06d6a0",
            borderColor: "#06d6a0"
        }
        const returned = {
            label: "Returned",
            data: array.map((item: any) => item.returned),
            backgroundColor: "#ef476f",
            borderColor: "#ef476f"
        }

        const handleDatasets = () => {
            switch (filter) {
                case "Orders":
                    return [orders]
                case "Completed":
                    return [completed]
                case "Returned":
                    return [returned]
                default:
                    return [
                        orders,
                        completed,
                        returned
                    ]
            }
        }

        return {
            labels: array.map((data: any) => data.day),
            datasets: handleDatasets()
        }
    }


    return (
        <div className="w-full flex flex-col flex-grow gap-y-2">
            <Header>
                Dashboard
            </Header>
            <div className="w-full flex flex-col">
                <div className="w-full flex flex-row px-2 gap-x-2 flex-wrap">
                    <div className="flex-[1] p-2 rounded-lg border flex flex-col justify-between shadow-md" >
                        <div className="flex flex-row items-start justify-between">
                            <div className="text-2xl font-bold">
                                Orders
                            </div>
                            <div className="text-pale-blue p-2 bg-pale-blue bg-opacity-20 rounded-lg">
                                <ShoppingBagRoundedIcon style={iconStyle} />
                            </div>
                        </div>
                        <div>
                            <div className="w-full flex flex-row items-start font-bold gap-x-1 py-2">
                                <div className="text-2xl">
                                    143
                                </div>
                                <div className="text-pale-green">
                                    NEW
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-[1] p-2 rounded-lg border flex flex-col justify-between shadow-md" >
                        <div className="flex flex-row items-start justify-between">
                            <div className="text-2xl font-bold">
                                Products
                            </div>
                            <div className="text-pale-green p-2 bg-pale-green bg-opacity-20 rounded-lg">
                                <LiquorRoundedIcon style={iconStyle} />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="flex flex-row items-end gap-x-1 font-bold py-2">
                                <div className="text-2xl">
                                    20
                                </div>
                                <div className="text-gray-500">
                                    Products
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="flex-[1] p-2 rounded-lg border flex flex-col justify-between shadow-md" >
                        <div className="flex flex-row items-start justify-between">
                            <div className="text-2xl font-bold">
                                Inventory
                            </div>
                            <div className="text-pale-black p-2 bg-pale-black bg-opacity-20 rounded-lg">
                                <InventoryRounedIcon style={iconStyle} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row items-end gap-x-1 font-bold">
                                <div className="text-2xl text-pale-red">
                                    20
                                </div>
                                <div className="text-gray-500">
                                    Low Stock
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="w-full text-xl font-bold py-4 px-2">
                    Weekly Orders
                </div>
                <div className="w-full flex-1 flex flex-row justify-around p-2 overflow-hidden">

                    <div className="max-w-[500px] flex flex-col flex-1 border-2 rounded-lg p-2">
                        <div className="flex flex-row items-center justify-end gap-x-2 py-2">
                            <div>
                                Filter:
                            </div>
                            <Menu
                                option={barFilteredData}
                                setOption={setBarFilteredData}
                                menuOptions={["All", "Orders", "Completed", "Returned"]} />
                        </div>
                        <div className="flex flex-1 ">

                            <Bar
                                datasetIdKey='id'
                                options={{
                                    scales: {
                                        y: {
                                            beginAtZero: true
                                        }
                                    },
                                    maintainAspectRatio: false
                                }}
                                style={{ width: "calc(100% - 20px)" }}
                                data={handleData(dummyData, barFilteredData)} />
                        </div>
                    </div>
                    <div className="max-w-[500px] flex flex-col flex-1 border-2 rounded-lg p-2">
                        <div className="flex flex-row items-center justify-end gap-x-2 py-2">
                            <div>
                                Filter:
                            </div>
                            <Menu
                                option={lineFilteredData}
                                setOption={setLineFilteredData}
                                menuOptions={["All", "Orders", "Completed", "Returned"]} />
                        </div>
                        <div className="flex flex-1 ">

                            <Line
                                datasetIdKey='id'
                                options={{
                                    scales: {
                                        y: {
                                            beginAtZero: true
                                        }
                                    },
                                    maintainAspectRatio: false
                                }}
                                style={{ width: "calc(100% - 20px)" }}
                                data={handleData(dummyData, lineFilteredData)} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard