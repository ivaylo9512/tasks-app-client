import styled from "styled-components"
import CreateTask from "./CreateTask"
import TaskList from "./TaskList"

const Section = styled.section`
    flex:1;
`
const TaskView: React.FC = () => {
    return(
        <Section>
            <TaskList />
            <CreateTask />
        </Section>
    )
}
export default TaskView