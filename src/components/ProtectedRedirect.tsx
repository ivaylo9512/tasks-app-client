import { useRef, ReactElement, memo } from "react"
import { UserFragment } from "../generated/graphql"
import { NextComponentType } from "next"
import { useRouter } from "next/router"

type RedirectProps = {
    user: UserFragment | undefined,
    children: ReactElement
} 
const ProtectedRedirect: React.FC<RedirectProps> = memo(({ user, children }) => {
    const router = useRouter();
    const routes = useRef(new Map([
        ['/goals', true],
        ['/daily', true],
        ['/calendar-view', true],
        ['/', true],
        ['/login', false],
        ['/register', false]
    ]))

    const route = routes.current.get(router.pathname);

    if(!user && typeof window != 'undefined' && routes.current.get(router.pathname) != false){
        router.push('/login');

        return <div>
            loading
        </div>
    }

    if(route == undefined && typeof window != 'undefined'){
        router.push('/')

        return <div>
            loading
        </div>
    }

    return children
})
export default ProtectedRedirect