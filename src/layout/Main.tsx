import RoutesPage from "./routes/RoutesPage"


const Main = () => {
    const menuWidth = {
        transitionProperty: "width, height",
        transitionTimingFunction: "ease-in-out",
        transitionDuration: "2s"
    }
    return (
        <div
            style={menuWidth}
            className="flex justify-center flex-[1]">
            <RoutesPage />
        </div>
    )
}

export default Main