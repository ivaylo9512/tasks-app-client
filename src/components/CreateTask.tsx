import useInput from "../hooks/useInput"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

const CreateTask = () => {
    const [note, noteInput] = useInput({
        name: 'note',
        placeholder: 'note',
    })
    const [from, fromInput] = useInput({
        name: 'from',
        initialValue: '00:00',
        placeholder: 'from',
    })
    const [top, toInput] = useInput({
        name: 'to',
        initialValue: '23:00',
    })
    return(
        <div>
            {noteInput}

            <FontAwesomeIcon icon={faBell} />
        </div>
    )
}
export default CreateTask