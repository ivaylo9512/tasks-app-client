import styled from "styled-components"
import CreateTask from "./CreateTask"
import TaskList from "./TaskList"
import { TaskFragment } from "../generated/graphql"

const Section = styled.section`
    flex:1;
    overflow: hidden;
    position:relative;
`
const ToggleButton = styled.button`
    position: absolute;
    right: 0;
`
type TaskViewProps = {
    tasks?: TaskFragment[];
    toggleCalendar: () => void,
    isHidden: boolean
}
const TaskView: React.FC<TaskViewProps> = ({ isHidden, tasks, toggleCalendar }) => {
    return(
        <Section>
            <ToggleButton onClick={toggleCalendar}>toggle</ToggleButton>
            <TaskList isHidden={isHidden} tasks={tasks}/>
            <CreateTask />
        </Section>
    )
}
export default TaskView