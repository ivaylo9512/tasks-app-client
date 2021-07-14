
type InputProps = {
    error?: string;
    classname?: string;
    input: JSX.Element;
}
const InputWithError: React.FC<InputProps> = ({error, classname = '', input} : InputProps) => {

    return(
        <div className={(error ? 'error ' : '') + classname}>
            {input}
            {error && 
                <div>
                    {error}
                </div>
            }
        </div>
    )
}

export default InputWithError