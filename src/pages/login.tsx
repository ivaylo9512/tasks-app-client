import useInput from "../hooks/useInput"
import Link from 'next/link'
import { useRef, useMemo, useEffect, FormEvent } from "react";
import { UserInput, useLoginMutation } from "../generated/graphql";
import validateEmail from "../helpers/validateEmail";
import { userClient } from "../helpers/client";

const Login: React.FC = () => {
    const loginInput = useRef<UserInput>();
    const [{usernameOrEmail, password}, {usernameOrEmailInput, passwordInput}] = useCreateInputs();

    const [loginMut, { data }] = useLoginMutation({
        client: userClient
    })
    
    const login = (e: FormEvent) => {
        e.preventDefault();
        
        const variables = { 
            ...validateEmail(usernameOrEmail) ? {email: usernameOrEmail} : { username: usernameOrEmail }, 
            password}
        loginMut({
            variables
        })
    }

    return (
        <section>
            <form onSubmit={login}>
                {usernameOrEmailInput}
                {passwordInput}
                
                <div className='errors'>
                    {data?.login.errors?.map((err, i) => 
                        <span key={i}>{err.message}</span>
                    )}
                </div>
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
        name: 'username'
    });
    const [password, passwordInput] = useInput({
        placeholder: 'password', 
        name: 'password', 
        type: 'password',
        autoComplete: 'current-password',
    });
    return [{usernameOrEmail, password}, {usernameOrEmailInput, passwordInput}]
}