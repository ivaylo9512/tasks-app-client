import { useRegisterMutation, RegisterDocument, RegisterMutation, RegisterMutationVariables } from "../generated/graphql";
import { useState, FormEvent, useMemo, useRef, useEffect } from "react";
import useInput from "../hooks/useInput";
import { useQuery } from "urql";

interface registerProps{

}

interface FieldError {
    field: string,
    message: string
  }

const Register: React.FC<registerProps> = () => {
    let registerInput = useRef<{username: string, password: string, firstName:string, lastName: string, age: Date}>()
    const [registerValue, registerMut] = useQuery<RegisterMutation, RegisterMutationVariables>({ query: RegisterDocument, pause: !registerInput.current, variables: registerInput.current, context: useMemo(() => ({url: 'http://localhost:8056/graphql'}), [])});
    const [errors, setErrors] = useState<{[name: string]: string} | undefined>();

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

    const register = async (e: FormEvent) => {
        e.preventDefault();
        
        registerInput.current = {username, password, firstName, lastName, age: new Date(age)};
        console.log(registerInput.current);
        registerMut();
    }

    useEffect(() => {
        const errors = registerValue.data?.register.errors;
        const errorObject = errors?.reduce((obj: {[name: string] : string}, err) =>(obj[err.field] = err.message, obj), {});
        setErrors(errorObject);
    },[registerValue])

    return(
        <form onSubmit={register}>
            {usernameInput}
            {passwordInput}
            {repeatPasswordInput}
            {firstNameInput}
            {lastNameInput}
            {ageInput}
            <button>register</button>
        </form>
    )
}
export default Register