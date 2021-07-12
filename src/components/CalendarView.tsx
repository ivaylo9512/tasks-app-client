import { useState, useMemo, ChangeEvent, Dispatch, SetStateAction } from "react"
import Day from "./Day";
import { Task } from "../types";
import styled from 'styled-components';
import WeekDays from "./WeekDays";
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
    width: 90%;
    height: 70%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    font: bold 0.9vw Mukta;
    button{
        font: bold 0.9vw Mukta;
    }
`
const Days = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    border-radius: 2vw;
`
const Buttons = styled.div`
    display: flex;
    margin: 0.5vw 0;
    width: 100%;
    justify-content: center;
`
const Month = styled.button`
    border-radius: 1vw;
    margin-right: 0.3vw;
    margin-bottom: 0.3vw;
    box-shadow: 0 0 0.2vw 0.05vw rgb(0 0 0);
    background: #000000;
    color: white;
    padding: 0.4vw 0.7vw;
    padding: 0.4vw 0.9vw;
`
const MonthContainer = styled.div`
    width: 25%;
    display: flex;
    justify-content: center;
`

type CalendarProps = {
    locales?: string; 
    format?: 'long' | 'short'; 
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>
}

const CalendarView = ({locales = 'en', format = 'long', date, setDate} : CalendarProps) => {
    const [days, setDays] = useState<Map<string, Day>>(() => {
        const date = new Date();
        setDate(date);
        return generateDays(date.getFullYear(), date.getMonth());
    });

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
        <Container>
            <Buttons>
                <button onClick={() => setMonth(date.getMonth() - 1)}><FontAwesomeIcon icon={faCaretLeft} /></button>
                <MonthContainer>
                    <Month>{monthNames[date.getMonth()]}</Month>
                </MonthContainer>
                <button onClick={() => setMonth(date.getMonth() + 1)}><FontAwesomeIcon icon={faCaretRight} /></button>
                <input value={date.getFullYear()} onChange={setYear}></input>
            </Buttons>
            <Days>
                <WeekDays />
                {Array.from(days.values()).map(day =>
                    <Day setDate={() => setDate(day.date)} key={day.date.toISOString()} day={day.date.getDate()} hasEvent={!!day.tasks && day.tasks.length > 0} />
                )}
            </Days>
        </Container>
    )
}
export default CalendarView

type Day = {
    date: Date,
    className?: string,
    tasks?: Task[]
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
    days.set(date.toISOString().split('T')[0], dayObj);
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