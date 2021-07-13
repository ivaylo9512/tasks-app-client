import styled from "styled-components"
import TaskView from "../components/TasksView"

const Goals = () => {
    const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

`
const Section = styled.section`
    height: 100%;
`
    return(
        <Section>
            <Container>
                <TaskView />
            </Container>
        </Section>
    )
}
export default Goals