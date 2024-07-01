import '@styles/global.css';
import Nav from '@components/Nav.jsx';
import Provider from '@components/Provider.jsx';
import Sidebar from '@components/Sidebar';


export default function NotesLayout({
  children, // will be a page or nested layout
}) {
  return (
    <>
              <Provider>

               {/* <div className="w-4/6 px-4 md:px-5 lg:px-5 flex-1 ">
               <Sidebar />
                <Nav/>
                <div className="mx-auto">
                  
                  {children}
                </div>
              </div>  */}
              
              <div className='w-full px-4 md:px-5 lg:px-5 flex'>
                
                <div className='w-[10%]'>
                  <Sidebar />
                  
                </div>
             
                <div className="mx-auto w-[90%]">  
                <Nav/>
                  {children}
                </div>
              </div>
              </Provider>
    </>

  )
}

