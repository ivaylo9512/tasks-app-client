import styled from "styled-components"
import { useMemo } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'

const Header = styled.header`
    display: flex;
    margin: 0.5vw 0;
    width: 100%;
    justify-content: center;
    button{
        font: bold 0.9vw Mukta;
    }
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
    setDate: React.Dispatch<React.SetStateAction<Date>>
}
const CalendarHeader: React.FC<CalendarProps> = ({ locales = 'en', format = 'long', date, setDate }) => {
    const monthNames = useMemo(() => getMonthNames(locales, format), [locales, format]);

    const setMonth = (month: number) => {
        const newDate = new Date(date); 
        newDate.setMonth(month);
        setDate(newDate);
    }
    
    const setYear = ({ target: { value } } :  {target: HTMLInputElement }) => {
        const year = Number(value);
        const newDate = new Date(date);
        newDate.setFullYear(year);

        if(Number.isNaN(year) || Number.isNaN(newDate.getFullYear())){
            return;
        }

        setDate(newDate);
    }

    return(
        <Header>
            <button onClick={() => setMonth(date.getMonth() - 1)}><FontAwesomeIcon icon={faCaretLeft} /></button>
            <MonthContainer>
                <Month>{monthNames[date.getMonth()]}</Month>
            </MonthContainer>
            <button onClick={() => setMonth(date.getMonth() + 1)}><FontAwesomeIcon icon={faCaretRight} /></button>
            <input value={date.getFullYear()} onChange={setYear}></input>
        </Header>
    )
}
export default CalendarHeader
const getMonthNames = (locales: string, format: string) => {
    const formatter = new Intl.DateTimeFormat(locales, {
        month: format
    });
    const year = new Date().getFullYear()
    
    return Array.from({length: 12}, (_, i) => formatter.format(new Date(year, i)));
}