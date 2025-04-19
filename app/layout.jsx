import '@styles/global.css';
import Nav from '@components/Nav.jsx';
import Provider from '@components/Provider.jsx';
import Sidebar from '@components/Sidebar';


export const metadata = {
    title:"Omoi",
    description:"An intuitive note application for managing and storing your notes seamlessly",
    logo: "/assets/images/logo.svg"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div>
            {children}
          </div>
        </Provider>
      </body>
    </html>
  )
}

