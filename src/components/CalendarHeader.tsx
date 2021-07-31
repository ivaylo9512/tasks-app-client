import styled from "styled-components"
import { useMemo, useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

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
}
const CalendarHeader: React.FC<CalendarProps> = ({ locales = 'en', format = 'long' }) => {
    const monthNames = useMemo<string[]>(() => getMonthNames(locales, format), [locales, format]);
    const router = useRouter();
    const [date, setDate] = useState<Date | undefined>();

    const setMonth = (month: number) => {
        const newDate = new Date(date!); 
        newDate.setMonth(month);
        setDateQuery(newDate);
    }

    const setDateQuery = (date: Date) => {
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        router.push({pathname: '/calendar-view', query: { date: date.toISOString().split('T')[0] }});
    } 

    useEffect(() => {
        setDate(new Date(router.query.date as string))
    }, [router.query.date])
    
    const setYear = ({ target: { value } } :  {target: HTMLInputElement }) => {
        const year = Number(value);
        const newDate = new Date(date!);
        newDate.setFullYear(year);

        if(Number.isNaN(year) || Number.isNaN(newDate.getFullYear())){
            return;
        }

        setDateQuery(newDate);
    }

    return(
        <Header>
            {date && 
                <>
                    <button onClick={() => setMonth(date.getMonth() - 1)}><FontAwesomeIcon icon={faCaretLeft} /></button>
                    <MonthContainer>
                        <Month>{monthNames[date.getMonth()]}</Month>
                    </MonthContainer>
                    <button onClick={() => setMonth(date.getMonth() + 1)}><FontAwesomeIcon icon={faCaretRight} /></button>
                    <input value={date.getFullYear()} onChange={setYear}></input>
                </>
            }
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