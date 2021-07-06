import { NextPage } from "next"
import useInput from "../../hooks/useInput"

const ChangePassword: NextPage<{token: string}> = ({ token }) => {
    const [password, passwordInput] = useInput({
        name: 'newPassword',
        type: 'password',
        autoComplete: 'new-password',
        placeholder: 'new-password',
        validationRules: {
            minLength: 10,
            maxLength: 25,
            required: true
        }
    })

    const [repeatPassword, repeatPasswordInput] = useInput({
        name: 'repeatPassword',
        type: 'password',
        autoComplete: 'new-password',
        placeholder: 'repeat',
        validationRules:{
            required: true
        },
        equalValue: password,
        equalName: 'Passwords'
    })

    const changePassword = () => {

    }

    return(
        <section>
            <form onSubmit={changePassword}>
                {passwordInput}
                {repeatPasswordInput}
                <button>Send</button>
            </form>
        </section>
    )
}

ChangePassword.getInitialProps = ({ query }) => {
    return {
        token: query.token as string
    }
}
export default ChangePassword