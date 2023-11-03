import '@styles/global.css';
import Nav from '@components/Nav.jsx';
import Provider from '@components/Provider.jsx';


export const metadata = {
    title:"Notes",
    description:"This is my app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
        
          <div className="main">
                <div className="" />
          </div>
          <main className="app">
          <Nav />
        
              {children}
    
          </main>
        </Provider>
      </body>
    </html>
  )
}

