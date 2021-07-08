import { useState, useMemo, ChangeEvent } from "react"
import DayContainer from "./DayContainer";

const Calendar = ({locales = 'en', format = 'long'} : {locales?: string, format?: 'long' | 'short' }) => {
    const [date, setDate] = useState<Date>(() => new Date());
    const [days, setDays] = useState<Map<string, Day>>(() => {
        const date = new Date();
        setDate(date);
        return generateDays(date.getFullYear(), date.getMonth());
    })

    const monthNames = useMemo(() => getMonthNames(locales, format), [locales, format]);
    const setYear = ({ target: { value } } :  {target: HTMLInputElement }) => {
        const year = Number(value);
        const newDate = new Date(date);
        newDate.setFullYear(year);

        if(Number.isNaN(year) || Number.isNaN(newDate.getFullYear())){
            return;
        }

        setDate(newDate);
        setDays(generateDays(Number(year), date.getMonth()));
    }

    const setMonth = (month: number) => {
        date.setMonth(month);
        setDate(new Date(date))
        setDays(generateDays(date.getFullYear(), month))
    }

    return(
        <div>
            <button onClick={() => setMonth(date.getMonth() - 1)}></button>
            <button>{monthNames[date.getMonth()]}</button>
            <button onClick={() => setMonth(date.getMonth() + 1)}></button>
            <input value={date.getFullYear()} onChange={setYear}></input>
            <div>
                {Array.from(days.values()).map(({date}) =>{
                    <button key={date.toISOString()}>
                        <DayContainer day={date.getDate()} hasEvent={events.has(date.getDate())} />
                    </button>
                })}
            </div>
        </div>
    )
}
export default Calendar

type Day = {
    date: Date,
    className?: string
}

const generateDays = (year: number, month: number) : Map<string, Day> => {
    const [prevYear, prevMonth] = month == 0 ? [year - 1, 11] : [year, month - 1]; 
    const [nextYear, nextMonth] = month == 11 ? [year + 1, 0] : [year, month + 1];

    const monthDays = getDays(year, month + 1);
    const maxDays = 42;

    const prevDaysLength = new Date(year, month, 1).getDay();
    const prevMonthDays = getDays(prevYear, prevMonth + 1);
    const nextDaysLength = maxDays - prevDaysLength - monthDays;

    const days = new Map();
    Array.from({ length: prevDaysLength }).forEach((_, i) => pushDays(prevYear, prevMonth, (prevMonthDays - prevDaysLength) + i + 1, days));
    Array.from({ length: monthDays }).forEach((_, i) => pushDays(year, month, i + 1, days));
    Array.from({ length: nextDaysLength}).forEach((_, i) =>  pushDays(nextYear, nextMonth, i + 1, days, 'grey'));

    return days;
}
const pushDays = (year: number, month: number, day: number, days:Map<string, Day>, className?: string) => {
        const date = new Date(year, month, day);
        const dayObj = { 
            date, 
            className: 'grey'
        }
        days.set(date.toISOString(), dayObj);
}


const getDays = (y: number, m : number) =>  {
    return m===2 ? y & 3 || !(y % 25) && y & 15 ? 28 : 29 : 30 + (m +(m >> 3) & 1);
}

const getMonthNames = (locales: string, format: string) => {
    const formatter = new Intl.DateTimeFormat(locales, {
        month: format
    });
    const year = new Date().getFullYear()
    
    return Array.from({length: 12}, (_, i) => formatter.format(new Date(year, i)));
}