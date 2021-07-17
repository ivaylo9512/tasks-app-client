import styled, { css } from "styled-components"
import { TaskFragment } from "../generated/graphql"
import Task from "./Task"
import { memo } from "react"

const Container = styled.div<{isHidden: boolean}>`
    height: 100%;
    overflow-y: scroll;
    padding-top: 1vh;
    transition: 1.5s height 1.5s;
    -ms-overflow-style: none; 
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }

    ${props => props.isHidden && css`
        height: 80%;
    `}
`
const TaskInfo = styled.span`
    height: 11vh;
    flex-shrink: 0;
    width: 70%;
    margin: 0.5vh auto;
    background: #000000;
    border-style: groove;
    border-color: white;
    box-shadow: 0 0 0.2vw 0.05vw rgb(0 0 0);
    display: flex;
    border-radius: 1.9vw;
    align-items: center;
    justify-content: center;
    color: white;
`
type TaskListProps = {
    tasks?: TaskFragment[],
    isHidden: boolean
}
const TaskList: React.FC<TaskListProps> = memo(({ tasks = [], isHidden }) => {
    return(
        <Container isHidden={isHidden}>
            {tasks.map(task => 
                <Task key={task.id} task={task} />
            )}
            {tasks.length == 0 && <TaskInfo>No tasks for selected date.</TaskInfo>}
        </Container>
    )
})
export default TaskList