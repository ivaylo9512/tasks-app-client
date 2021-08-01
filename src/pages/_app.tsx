import '../styles/globals.css'
import type { AppProps } from 'next/app'
import * as types from 'styled-components/cssprop'
import { useQuery } from '@apollo/client'
import { UserDocument, UserQuery } from '../graphql/cache-queries'
import ProtectedRedirect from '../components/ProtectedRedirect'
import { withApollo } from '../helpers/create-with-apollo'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
    const {data} = useQuery<UserQuery>(UserDocument, {
        fetchPolicy: 'cache-only'
    })
  
    return( 
        <ProtectedRedirect user={data?.user}>
            <Component {...pageProps} />
        </ProtectedRedirect>
    )
}
export default withApollo({ssr: true})(MyApp)
