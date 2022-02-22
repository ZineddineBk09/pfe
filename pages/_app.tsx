import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { StateProvider } from '../React-Context-Api/basketContext'
import reducer, { initialState } from '../React-Context-Api/reducer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </StateProvider>
  )
}

export default MyApp
