import '../styles/globals.css'
import type { AppProps } from 'next/app'
import * as types from 'styled-components/cssprop'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return( 
      <Component {...pageProps} />
  )
}
export default MyApp
