import useInput from "../hooks/useInput"
import Link from 'next/link'
import { useRef, useMemo, useEffect, FormEvent } from "react";
import { useQuery } from "urql";
import { LoginDocument, LoginMutation, LoginMutationVariables, UserInput } from "../generated/graphql";
import validateEmail from "../helpers/validateEmail";

const Login = () => {
    const loginInput = useRef<UserInput>();
    const [usernameOrEmail, usernameOrEmailInput] = useInput({
        placeholder: 'username or email', 
        name: 'username'
    });
    const [password, passwordInput] = useInput({placeholder: 'password', name: 'password', type: 'password'});
    const [loginValue, loginMut] = useQuery<LoginMutation, LoginMutationVariables>({ query: LoginDocument, pause: !loginInput.current, variables: loginInput.current, context: useMemo(() => ({ url: 'http://localhost:8056/graphql'}), [])})
    
    const login = (e: FormEvent) => {
        e.preventDefault();
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
                    {loginValue.data?.login.errors?.map(err => 
                        <span>{err.message}</span>
                    )}
                </div>
                <span>Don't have an account?<Link href="/register"> Sign up.</Link></span>
                <button>login</button>
            </form>
        </section>
    )
}
export default Login