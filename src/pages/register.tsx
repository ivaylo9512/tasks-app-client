import { useRegisterMutation } from '../generated/graphql';
import { useState, FormEvent, MouseEvent } from 'react';
import useInput from '../hooks/useInput';
import InputWithError from '../components/InputWithError';
import Link from 'next/link';
import validateEmail from '../helpers/validateEmail';
import useEffectInitial from '../hooks/useEffectInitital';
import { useRouter } from 'next/router';
import { userClient } from '../helpers/client';
import usePasswordInput from '../hooks/usePasswordInput';

const Register: React.FC = () => {
    const [registerValues, { usernameInput, passwordInput, repeatPasswordInput, birthInput, emailInput, firstNameInput, lastNameInput }] = useCreateFields(); 
    const [error, setError] = useState<RegisterError>({});

    const [registerMut, { data: registerUser }] = useRegisterMutation({
        client: userClient,
        errorPolicy: 'all'
    }) 
    const [pageCount, setPageCount] = useState(0);
    const router = useRouter();

    const register = async (e: FormEvent) => {
        e.preventDefault();
        if(!validateEmail(registerValues.email)){
            setError({ email: 'Invalid email' });
            return;
        }
        const {repeatPassword, ...registerObject} = registerValues;

        const res = await registerMut({
            variables: {
                registerInput: {
                    ...registerObject
                }
            }
        });

        setError(res.errors?.[0].extensions || {});
    }

    useEffectInitial(() => {
        const { username, password, email } = error; 
        if(username || email || password){
            setPageCount(0);
        }
    }, [error])

    const changePage = (event : MouseEvent<HTMLElement> | FormEvent) => {
        event?.preventDefault();
        setPageCount(prev => prev ? 0 : 1)
    }

    return(
        <section>
            {pageCount == 0 ?
                <form onSubmit={changePage}>
                    <InputWithError input={usernameInput} error={error.username}  />
                    <InputWithError input={emailInput} error={error.email} />      
                    <InputWithError input={passwordInput} error={error.password} />
                    <InputWithError input={repeatPasswordInput} />      
                    <button data-page='1'>next</button>
                    <span>Already have an account?<Link href='/login'> Sign in.</Link></span>
                </form>  :
                <form onSubmit={register}>
                    <InputWithError input={firstNameInput} error={error.firstName} />
                    <InputWithError input={lastNameInput} error={error.lastName} />
                    <InputWithError input={birthInput} error={error.age} />
                    <button onClick={changePage} >prev</button>
                    <button type='submit'>register</button>
                </form>
            }
        </section>
    )
}
export default Register

type RegisterError = {
    username?: string,
    email?: string,
    password?: string,
    birth?: string,
    firstName?: string,
    lastName?: string,
    age?: string
}

type Inputs = {
    usernameInput: JSX.Element 
    passwordInput: JSX.Element 
    repeatPasswordInput: JSX.Element 
    firstNameInput: JSX.Element 
    lastNameInput: JSX.Element 
    emailInput: JSX.Element 
    birthInput: JSX.Element 
}
type Values = {
    username: string 
    password: string 
    repeatPassword: string 
    firstName: string 
    lastName: string 
    email: string 
    birth: string
}
const useCreateFields = (): [Values, Inputs] => {
    const [username, usernameInput] = useInput({
        name: 'username',
        placeholder: 'username',
        autoComplete: 'username',
        validationRules: {
            required: true, 
            minLength: 8, 
            maxLength: 20}
        },
    )

    const [password, passwordInput] = usePasswordInput({
        name: 'password',
        type: 'password',
        autoComplete: 'new-password',
        placeholder: 'password',
        validationRules: {
            minLength: 10,
            maxLength: 22,
            required: true
        }
    })

    const [repeatPassword, repeatPasswordInput] = usePasswordInput({
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

    const [birth, birthInput] = useInput({
        type: 'date',
        name: 'birth', 
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
    
    return [{username, password, repeatPassword, firstName, lastName, email, birth}, {usernameInput, passwordInput, repeatPasswordInput, firstNameInput, lastNameInput, emailInput, birthInput}]
}   