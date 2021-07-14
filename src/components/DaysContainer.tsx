import Day from "./Day"
import WeekDays from "./WeekDays"
import styled from "styled-components"
import { useState, useEffect } from "react"
import { Task } from "../types"

const Days = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    border-radius: 2vw;
`
type DayType = {
    date: Date,
    className?: string,
    tasks?: Task[]
}
type DaysContainerProps = {
    date: Date,
    setDate: React.Dispatch<React.SetStateAction<Date>>
}

const DaysContainer: React.FC<DaysContainerProps> = ({ date, setDate }) => {
    const [days, setDays] = useState<Map<string, DayType>>(new Map());

    useEffect(() => {
        setDays(generateDays(date.getFullYear(), date.getMonth()));
    }, [date]);

    return(
        <Days>
            <WeekDays />
            {Array.from(days.values()).map(day =>
                <Day setDate={() => setDate(day.date)} key={day.date.toISOString()} day={day.date.getDate()} hasEvent={!!day.tasks && day.tasks.length > 0} />
            )}
        </Days>
    )

}
export default DaysContainer

const generateDays = (year: number, month: number) : Map<string, DayType> => {
    const [prevYear, prevMonth] = month == 0 ? [year - 1, 11] : [year, month - 1]; 
    const [nextYear, nextMonth] = month == 11 ? [year + 1, 0] : [year, month + 1];

    const monthDays = getMonthDays(year, month + 1);
    const maxDays = 42;

    const prevDaysLength = new Date(year, month, 1).getDay();
    const prevMonthDays = getMonthDays(prevYear, prevMonth + 1);
    const nextDaysLength = maxDays - prevDaysLength - monthDays;

    const days = new Map();
    Array.from({ length: prevDaysLength }).forEach((_, i) => pushDays(prevYear, prevMonth, (prevMonthDays - prevDaysLength) + i + 1, days));
    Array.from({ length: monthDays }).forEach((_, i) => pushDays(year, month, i + 1, days));
    Array.from({ length: nextDaysLength}).forEach((_, i) =>  pushDays(nextYear, nextMonth, i + 1, days, 'grey'));

    return days;
}
const pushDays = (year: number, month: number, day: number, days:Map<string, DayType>, className?: string) => {
    const date = new Date(year, month, day);
    const dayObj = { 
        date, 
        className: 'grey'
    }
    days.set(date.toISOString().split('T')[0], dayObj);
}


const getMonthDays = (y: number, m : number) =>  {
    return m===2 ? y & 3 || !(y % 25) && y & 15 ? 28 : 29 : 30 + (m +(m >> 3) & 1);
}

