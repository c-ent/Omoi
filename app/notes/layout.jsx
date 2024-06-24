import '@styles/global.css';
import Nav from '@components/Nav.jsx';
import Provider from '@components/Provider.jsx';
import Sidebar from '@components/Sidebar';


export default function NotesLayout({
  children, // will be a page or nested layout
}) {
  return (
    <>
       <Sidebar />
               <div className="w-4/6 px-4 md:px-5 lg:px-5 flex-1 ">
                <Nav/>
                <div className="mx-auto">
                  {children}
                </div>
              </div> 
    </>

  )
}

