import { useState, useMemo, ChangeEvent } from "react"

const Calendar = ({locales = 'en', format = 'long'} : {locales?: string, format?: 'long' | 'short' }) => {
    const [date, setDate] = useState<Date>(new Date());
    const [days, setDays] = useState(() => {
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

    const generateDays = (year: number, month: number) => {
        const [prevYear, prevMonth] = month == 0 ? [year - 1, 11] : [year, month - 1]; 
        const [nextYear, nextMonth] = month == 11 ? [year + 1, 0] : [year, month + 1];

        const monthDays = getDays(year, month + 1);
        const maxDays = 42;

        const prevDaysLength = new Date(year, month, 1).getDay();
        const prevMonthDays = getDays(prevYear, prevMonth + 1);
        const nextDaysLength = maxDays - prevDaysLength - monthDays;

        const days = Array.from({ length: prevDaysLength }, (_, i) => ({ day: prevMonthDays - i, month: prevMonth, year: prevYear, className: 'grey'})) as {day: number, month: number, year: number, className?: string}[];
        Array.from({ length: monthDays }).forEach((_, i) => days.push({ day: i + 1, month, year }));
        Array.from({ length: nextDaysLength}).forEach((_, i) => days.push({ day: i + 1, month: nextMonth, year: nextYear, className: 'grey'}));

        return days;
    }

    return(
        <div>
            <button onClick={() => setMonth(date.getMonth() - 1)}></button>
            <button>{monthNames[date.getMonth()]}</button>
            <button onClick={() => setMonth(date.getMonth() + 1)}></button>
            <input value={date.getFullYear()} onChange={setYear}></input>
            {}
        </div>
    )
}
export default Calendar

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