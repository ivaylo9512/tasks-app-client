import styled from 'styled-components';
import CalendarHeader from './CalendarHeader';
import DaysContainer from './DaysContainer';

const Section = styled.section`
    width: 90%;
    height: 70%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    font: bold 0.9vw Mukta;
`
type CalendarProps = {
    date: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const Calendar: React.FC<CalendarProps> = ({date, setDate}) => {

    return(
        <Section>
            <CalendarHeader date={date} setDate={setDate}/>
            <DaysContainer date={date} setDate={setDate}/>
        </Section>
    )
}
export default Calendar