import { RegisterDocument, RegisterMutation, RegisterMutationVariables, RegisterInput, FieldError } from '../generated/graphql';
import { useState, FormEvent, useMemo, useRef, useEffect, MouseEvent } from 'react';
import useInput from '../hooks/useInput';
import { useQuery } from 'urql';
import InputWithError from '../components/InputWithError';
import Link from 'next/link';
import validateEmail from '../helpers/validateEmail';
import { withUrqlClient } from 'next-urql';
import { createClient } from '../helpers/client';
import useEffectInitial from '../hooks/useEffectInitital';
import { useRouter } from 'next/router';

const Register: React.FC = () => {
    const [registerValues, { usernameInput, passwordInput, repeatPasswordInput, ageInput, emailInput, firstNameInput, lastNameInput }] = useCreateFields(); 
    const registerRef = useRef<RegisterInput>()
    const [registerUser, registerMut] = useQuery<RegisterMutation, RegisterMutationVariables>({ query: RegisterDocument, pause: !registerRef.current, variables: registerRef.current, context: useMemo(() => ({url: 'http://localhost:8056/graphql'}), [])});
    const [errors, setErrors] = useState<{[name: string]: string} | undefined>();
    const [pageCount, setPageCount] = useState(0);
    const router = useRouter();

    const register = async (e: FormEvent) => {
        e.preventDefault();
        if(!validateEmail(registerValues.email)){
            setErrors({ email: 'Invalid email' });
            return;
        }
        const {repeatPassword, ...registerObject} = registerValues;
        registerObject.age = new Date(registerObject.age); 

        registerRef.current = registerObject
        registerMut();
    }

    useEffectInitial(() => {
        if(registerUser.fetching){
            return;
        }

        const errors = registerUser.data?.register.errors;
        const errorObject = errors?.reduce((obj: {[name: string] : string}, err) =>(obj[err.field] = err.message, obj), {});

        if(!errorObject){
            router.push('/');
            return;
        }

        const { username, email, password, repeatPassword } = errorObject;
        if(username || email || password || repeatPassword){
            setPageCount(0);
        }
        setErrors(errorObject);
    },[registerUser])

    const changePage = (event : MouseEvent<HTMLElement> | FormEvent) => {
        event?.preventDefault();
        setPageCount(prev => prev ? 0 : 1)
    }

    return(
        <section>
            {pageCount == 0 ?
                <form onSubmit={changePage}>
                    <InputWithError input={usernameInput} error={errors?.username}  />
                    <InputWithError input={emailInput} error={errors?.email} />      
                    <InputWithError input={passwordInput} error={errors?.password} />
                    <InputWithError input={repeatPasswordInput} />      
                    <button data-page='1'>next</button>
                    <span>Already have an account?<Link href='/login'> Sign in.</Link></span>
                </form>  :
                <form onSubmit={register}>
                    <InputWithError input={firstNameInput} error={errors?.firstName} />
                    <InputWithError input={lastNameInput} error={errors?.lastName} />
                    <InputWithError input={ageInput} error={errors?.age} />
                    <button onClick={changePage} >prev</button>
                    <button type='submit'>register</button>
                </form>
            }
        </section>
    )
}
export default withUrqlClient(createClient)(Register)

type Inputs = {
    usernameInput: JSX.Element 
    passwordInput: JSX.Element 
    repeatPasswordInput: JSX.Element 
    firstNameInput: JSX.Element 
    lastNameInput: JSX.Element 
    emailInput: JSX.Element 
    ageInput: JSX.Element 
}
type Values = {
    username: string 
    password: string 
    repeatPassword: string 
    firstName: string 
    lastName: string 
    email: string 
    age: string | Date 
}
const useCreateFields = (): [Values, Inputs] => {
    const [username, usernameInput] = useInput({
        name: 'username',
        placeholder: 'username',
        autoComplete: 'username',
        validationRules: {
            required: true, 
            minLength: 9, 
            maxLength: 15}
        },
    )

    const [password, passwordInput] = useInput({
        name: 'password',
        type: 'password',
        autoComplete: 'new-password',
        placeholder: 'password',
        validationRules: {
            minLength: 10,
            maxLength: 25,
            required: true
        }
    })

    const [repeatPassword, repeatPasswordInput] = useInput({
        name: 'repeat-password',
        type: 'password',
        autoComplete: 'new-password',
        placeholder: 'repeat',
        validationRules:{
            required: true
        },
        equalValue: password,
        equalName: 'Passwords'
    })

    const [firstName, firstNameInput] = useInput({
        placeholder: 'First name' , 
        name: 'firstName', 
        validationRules: {
            required: true
        } 
    })

    const [lastName, lastNameInput] = useInput({
        placeholder: 'Last name' , 
        name: 'lastName', 
        validationRules: {
            required: true
        } 
    })

    const [age, ageInput] = useInput({
        type: 'date',
        name: 'age', 
        validationRules:{
            required: true,
            min: '1890-01-01',
            max: new Date().toISOString().split('T')[0]
        } 
    })

    const [email, emailInput] = useInput({
        type: 'email',
        placeholder: 'email',
        name: 'email',
        autoComplete: 'email'
    })
    return [{username, password, repeatPassword, firstName, lastName, email, age}, {usernameInput, passwordInput, repeatPasswordInput, firstNameInput, lastNameInput, emailInput, ageInput}]
}   