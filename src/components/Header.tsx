import Nav from "./Nav";
import { useState } from "react";

const Header: React.FC = () => {
    const [isTranlsate, setIsTranslate] = useState<boolean>(); 
    const translateHeader = () => {
        setIsTranslate(!isTranlsate);
    }
    const arr = [5, (() => Math.random())()];
    console.log(arr[1])
    console.log(arr[1])
    return (
        <header className={isTranlsate ? 'translate' : ''}>
            <button onClick={translateHeader}></button>
            <Nav />
        </header>
    )
}
export default Header;