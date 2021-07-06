
const InputWithError = ({error, classname = '', input} : {error?: string, classname? : string, input : JSX.Element}) => {

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