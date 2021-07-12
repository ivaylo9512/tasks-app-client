import CreateTask from '../components/CreateTask'
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import Calendar from '../components/CalendarView';
import styled from 'styled-components';
import TaskView from '../components/TasksView';

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

`
const Section = styled.section`
    height: 100%;
`

const daily = () => {

    return(
        <Section>
            <Container>
                <TaskView />
            </Container>
        </Section>
    )
}
export default daily 