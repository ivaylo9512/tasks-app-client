import useInput from "../hooks/useInput"
import Link from 'next/link'
import { FormEvent, useState } from "react";
import { useLoginMutation } from "../generated/graphql";
import validateEmail from "../helpers/validateEmail";
import { userClient } from "../helpers/client";
import usePasswordInput from "../hooks/usePasswordInput";

const Login: React.FC = () => {
    const [{usernameOrEmail, password}, {usernameOrEmailInput, passwordInput}] = useCreateInputs();
    const [error, setError] = useState<string | undefined>();
    const [loginMut, { data }] = useLoginMutation({
        client: userClient,
        errorPolicy: 'all'
    })
    
    const login = async(e: FormEvent) => {
        e.preventDefault();
        
        const loginInput = { 
            ...validateEmail(usernameOrEmail) ? {email: usernameOrEmail} : { username: usernameOrEmail }, 
            password}

        const result = await loginMut({ 
            variables:{
                loginInput
            }
        })

        setError(result.errors?.[0].message);
    }

    return (
        <section>
            <form onSubmit={login}>
                {usernameOrEmailInput}
                {passwordInput}
                
                {error && 
                    <span>{error}</span>

                }
                <span>Don't have an account?<Link href="/register"> Sign up.</Link></span>
                <button>login</button>
            </form>
        </section>
    )
}
export default Login

type Inputs = {
    usernameOrEmailInput: JSX.Element,
    passwordInput: JSX.Element
}
type Values = {
    usernameOrEmail: string,
    password: string
}
const useCreateInputs = () : [Values, Inputs]=> {
    const [usernameOrEmail, usernameOrEmailInput] = useInput({
        placeholder: 'username or email', 
        name: 'username',
        validationRules: {
            required: true
        }
    });

    const [password, passwordInput] = usePasswordInput({
        placeholder: 'password', 
        name: 'password', 
        type: 'password',
        validationRules: {
            required: true
        },
        autoComplete: 'current-password',
    });

    return [{usernameOrEmail, password}, {usernameOrEmailInput, passwordInput}]
}