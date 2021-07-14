import { useMemo, ChangeEvent, Dispatch, SetStateAction } from "react"
import styled from 'styled-components';
import WeekDays from "./WeekDays";
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DaysContainer from "./DaysContainer";

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

const Calendar: React.FC<CalendarProps> = ({locales = 'en', format = 'long', date, setDate}) => {

    const monthNames = useMemo(() => getMonthNames(locales, format), [locales, format]);
    const setYear = ({ target: { value } } :  {target: HTMLInputElement }) => {
        const year = Number(value);
        const newDate = new Date(date);
        newDate.setFullYear(year);

        if(Number.isNaN(year) || Number.isNaN(newDate.getFullYear())){
            return;
        }

        setDate(newDate);
    }

    const setMonth = (month: number) => {
        date.setMonth(month);
        setDate(new Date(date))
    }

    return(<div>
        <Container>
            <Buttons>
                <button onClick={() => setMonth(date.getMonth() - 1)}><FontAwesomeIcon icon={faCaretLeft} /></button>
                <MonthContainer>
                    <Month>{monthNames[date.getMonth()]}</Month>
                </MonthContainer>
                <button onClick={() => setMonth(date.getMonth() + 1)}><FontAwesomeIcon icon={faCaretRight} /></button>
                <input value={date.getFullYear()} onChange={setYear}></input>
            </Buttons>
            <DaysContainer date={date} setDate={setDate}/>
        </Container>
        </div>
    )
}
export default Calendar

const getMonthNames = (locales: string, format: string) => {
    const formatter = new Intl.DateTimeFormat(locales, {
        month: format
    });
    const year = new Date().getFullYear()
    
    return Array.from({length: 12}, (_, i) => formatter.format(new Date(year, i)));
}