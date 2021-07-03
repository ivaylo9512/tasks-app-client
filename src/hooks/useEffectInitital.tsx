import { useRef, useEffect, DependencyList } from "react"

type useInitital = (callback: Function, state: DependencyList) => void

const useEffectInitial: useInitital = (callback, dependencies)  => {
    const isInitial = useRef(true);

    useEffect(() => {
        if(isInitial.current){
            isInitial.current = false;
            return;
        }
        callback();
    }, dependencies);

}

export default useEffectInitial