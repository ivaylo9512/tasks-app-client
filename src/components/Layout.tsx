import Header from "./Header"
import { NextComponentType } from "next"
import { ComponentClass } from "react"
import Calendar from "./Calendar"

const Layout = ({children} : any) => {

return(
    <div className="layout">
        <Header />
        <Calendar></Calendar>
        {children}
    </div>
)
}
export default Layout