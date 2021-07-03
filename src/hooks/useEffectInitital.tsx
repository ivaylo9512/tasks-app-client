import { useRef, useEffect, DependencyList } from "react"

type useInitital = (state: DependencyList, callback: Function) => void

const useEffectInitial: useInitital = (dependencies, callback)  => {
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