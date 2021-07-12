import { useState } from "react";

import CreateTask from '../components/CreateTask'
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import CalendarView from '../components/CalendarView';
import styled from 'styled-components';
import TaskView from '../components/TasksView';

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

`
const Section = styled.section`
    height: 100%;
    overflow: hidden;
`
const Calendar = () => {
    const [date, setDate] = useState<Date>(() => new Date());

    return(
        <Section>
            <Container>
                <CalendarView date={date} setDate={setDate} />
                <TaskView />
            </Container>
        </Section>
    )
}
export default Calendar 