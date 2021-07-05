
const InputWithError = ({error, classname = '', name, input} : {error?: string , classname? : string , name : string, input : JSX.Element}) => {

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