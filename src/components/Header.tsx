import Nav from "./Nav";
import { useState } from "react";

const Header = () => {
    const [isTranlsate, setIsTranslate] = useState<boolean>(); 
    const translateHeader = () => {
        setIsTranslate(!isTranlsate);
    }

    return (
        <header className={isTranlsate ? 'translate' : ''}>
            <button onClick={translateHeader}></button>
            <Nav />
        </header>
    )
}
export default Header;