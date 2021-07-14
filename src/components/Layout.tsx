import Header from "./Header"
import { NextComponentType } from "next"
import { ComponentClass } from "react"
import Calendar from "./CalendarView"

const Layout: React.FC = ({children} : any) => {

return(
    <div className="layout">
        <Header />
        {children}
    </div>
)
}
export default Layout