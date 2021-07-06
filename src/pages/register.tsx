import { RegisterDocument, RegisterMutation, RegisterMutationVariables, RegisterInput } from '../generated/graphql';
import { useState, FormEvent, useMemo, useRef, useEffect, MouseEvent } from 'react';
import useInput from '../hooks/useInput';
import { useQuery } from 'urql';
import InputWithError from '../components/InputWithError';
import Link from 'next/link';
import validateEmail from '../helpers/validateEmail';
import { withUrqlClient } from 'next-urql';
import { createClient } from '../helpers/client';
import { useRouter } from 'next/router';

const Register: React.FC = () => {
    const registerInput = useRef<RegisterInput>()
    const [registerValue, registerMut] = useQuery<RegisterMutation, RegisterMutationVariables>({ query: RegisterDocument, pause: !registerInput.current, variables: registerInput.current, context: useMemo(() => ({url: 'http://localhost:8056/graphql'}), [])});
    const [errors, setErrors] = useState<{[name: string]: string} | undefined>();
    const [pageCount, setPageCount] = useState(0);

    const [username, usernameInput] = useInput({
        name: 'username',
        placeholder: 'username', 
        validationRules: {
            required: true, 
            minLength: 9, 
            maxLength: 15}
        },
    )

    const [password, passwordInput] = useInput({
        name: 'password',
        type: 'password',
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
        name: 'email'
    })

    const register = async (e: FormEvent) => {
        e.preventDefault();
        if(!validateEmail(email)){
            setErrors({ email: 'Invalid email' });
            return;
        }
        registerInput.current = {username, password, email, firstName, lastName, age: new Date(age)};
        registerMut();
    }

    useEffect(() => {
        const errors = registerValue.data?.register.errors;
        const errorObject = errors?.reduce((obj: {[name: string] : string}, err) =>(obj[err.field] = err.message, obj), {});
        setErrors(errorObject);
    },[registerValue])

    const changePage = () => {
        event?.preventDefault();
        setPageCount(event?.currentTarget.dataset.page)
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