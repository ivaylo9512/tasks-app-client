import React, {useState, useRef, InputHTMLAttributes } from 'react';
import useEffectInitial from './useEffectInitital';

type Hook = (params : {name: string, type?: string,  placeholder?: string, validationRules?: InputHTMLAttributes<HTMLInputElement>, initialValue?: string, equalValue?: string, equalName?: string}) => [string, JSX.Element]

const useInput: Hook = ({name, placeholder, validationRules, type= 'text', initialValue = '', equalValue, equalName}) => {
    const [value, setValue] = useState<string>(initialValue);
    const inputElement = useRef<HTMLInputElement | null>(null);
    
    useEffectInitial(() => {
        validate(value);
    }, [equalValue])

    const validate = (value: string | undefined) => {
        if(equalValue){
            inputElement.current?.setCustomValidity(
                equalValue != value 
                    ? equalName + 'are not equal.'
                    : ''
            )
        }
    }

    const onChange = ({target: { value }} : {target : HTMLInputElement} ) => {
        setValue(value)
        validate(value)
    }

    const input = <input name={name} value={value} type={type} placeholder={placeholder} ref={inputElement} {...validationRules} onChange={onChange}/>

    return [
        value,
        input
    ]
}

export default useInput