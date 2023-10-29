import '../styles/globals.css'
import Layout from './layout'
import { SessionProvider } from 'next-auth/react'
import { UserContextProvider } from "../context/UserContext";
import { ToastContainer } from "react-toastify";
import { StyledEngineProvider } from '@mui/material/styles';
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        <StyledEngineProvider>
            <ToastContainer
              pauseOnHover={false}
              pauseOnFocusLoss={false}
              position={"bottom-right"}
            />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StyledEngineProvider>
      </UserContextProvider>
    </SessionProvider>
  )
}

export default MyApp
