"use client";

import { SessionProvider } from 'next-auth/react'; // https://next-auth.js.org/getting-started/client


const Provider = ({children, session}) => {
  
  return (
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
  )
}

export default Provider