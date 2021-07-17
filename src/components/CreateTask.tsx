import useInput from "../hooks/useInput"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { useCreateTaskMutation, TasksByDateDocument, TasksByDateQuery } from "../generated/graphql";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from 'next/router'

const Container = styled.div`
    height: 11vh;
    width: 87%;
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

const CreateTask: React.FC = () => {
    const {route} = useRouter();
    const [values, {nameInput, timeInput, alertAtInput}] = createInputs();
    const [isAlertAtView, setIsAlertAtView] = useState<boolean>(false);
    
    const setView = () => {
        setIsAlertAtView(!isAlertAtView);
    }

    return(
        <Container>
            {isAlertAtView ? <>
                {timeInput}
                {alertAtInput} 
                <button onClick={setView}>back</button>
            </> : <>
                {nameInput}
                <button>add</button>
                {route == 'calendar-view' && 
                    <button onClick={setView}>
                        <FontAwesomeIcon icon={faBell} />
                    </button>
                }
            </>}
        </Container>
    )
}
type Values = {
    name: string,
    time: string,
    alertAt: string
}
type Inputs = {
    nameInput: JSX.Element,
    timeInput: JSX.Element,
    alertAtInput: JSX.Element
}

const createInputs = (): [Values, Inputs] => {
    const [name, nameInput] = useInput({
        name: 'name',
        placeholder: 'name',
    })
    const [time, timeInput] = useInput({
        name: 'time',
        initialValue: '00:00',
        type: 'time'
    })
    const [alertAt, alertAtInput] = useInput({
        name: 'alertAt',
        type: 'date'
    })

    return [{name, time, alertAt}, {nameInput, timeInput, alertAtInput}]
}
export default CreateTask;