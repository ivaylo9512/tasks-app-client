import { useState } from "react"

const Calendar = (locales: string = 'en', format: 'long' | 'short' = 'long' ) => {
    const [date, setDate] = useState<Date>(new Date());

    const changeYear = (year: number) => {
        date.setFullYear(year)
        setDate(new Date(date))
        console.log(date.getMonth())
    }
    return(
        <div>
            <button onClick={() => changeYear(date.getFullYear() - 1)}></button>
            <button>{date.getFullYear()}</button>
            <button onClick={() => changeYear(date.getFullYear() + 1)}></button>
        </div>
    )
}
export default Calendar

const isLeapYear = (year: number) =>  {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

const getMonthNames = (locales : string, format: string) => {
    
}