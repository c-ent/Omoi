import '@styles/global.css';
import Nav from '@components/Nav.jsx';
import Provider from '@components/Provider.jsx';
import Sidebar from '@components/Sidebar';


export const metadata = {
    title:"Notes",
    description:"This is my app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="flex">
            <Sidebar />
       
            {/* h-screen flex-1 p-7
            w-5/6 px-10 ml-auto max-w-screen-2xl */}
              
              {/* <div className="w-5/6 px-10 flex-1 mx-auto">
                <Nav/>
                {children}
              </div> */}

               <div className="w-4/6 px-4 md:px-5 lg:px-5 flex-1 ">
                <Nav/>
                <div className="mx-auto">
                  {children}
                </div>
              </div> 
            </div>
       
        </Provider>
      </body>
    </html>
  )
}

