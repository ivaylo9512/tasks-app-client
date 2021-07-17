import useInput from "../hooks/useInput"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

const CreateTask: React.FC = () => {
    const [values, {nameInput, timeInput, alertAtInput}] = createInputs();
    const [isAlertAtView, setIsAlertAtView] = useState<boolean>(false);
    const setView = () => {
        setIsAlertAtView(!isAlertAtView);
    }
    return(
        <div>
            {isAlertAtView ? <>
                {timeInput}
                {alertAtInput} 
                <button>back</button>
            </> : <>
                {nameInput}
                <button>add</button>
                <button onClick={setView}>
                    <FontAwesomeIcon icon={faBell} />
                </button>
            </>}
        </div>
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
export default CreateTask