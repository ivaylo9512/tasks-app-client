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

    return(
        <form>
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