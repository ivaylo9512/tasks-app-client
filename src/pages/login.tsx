import useInput from "../hooks/useInput"
import Link from 'next/link'
import { useRef, useMemo, useEffect, FormEvent } from "react";
import { useQuery } from "urql";
import { LoginDocument, LoginMutation, LoginMutationVariables, UserInput } from "../generated/graphql";
import validateEmail from "../helpers/validateEmail";

const Login: React.FC = () => {
    const loginInput = useRef<UserInput>();
    const [userValues, {usernameOrEmailInput, passwordInput}] = useCreateInputs();
    const [loginValue, loginMut] = useQuery<LoginMutation, LoginMutationVariables>({ query: LoginDocument, pause: !loginInput.current, variables: loginInput.current, context: useMemo(() => ({ url: 'http://localhost:8056/graphql'}), [])})
    
    const login = (e: FormEvent) => {
        e.preventDefault();
        
        const {usernameOrEmail, password} = userValues;

        loginInput.current = { 
            ...validateEmail(usernameOrEmail) ? {email: usernameOrEmail} : { username: usernameOrEmail }, 
            password}
        loginMut();
    }

    useEffect(() => {

    }, [loginValue])

    return (
        <section>
            <form onSubmit={login}>
                {usernameOrEmailInput}
                {passwordInput}
                <div className='errors'>
                    {loginValue.data?.login.errors?.map((err, i) => 
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