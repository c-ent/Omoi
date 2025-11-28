import '@styles/global.css';
import Nav from '@components/Nav.jsx';
import Provider from '@components/Provider.jsx';
import Sidebar from '@components/Sidebar';


export default function NotesLayout({
  children, // will be a page or nested layout
}) {
  return (
    <Provider>
      <div className="w-full px-4 md:px-5 lg:px-5 flex relative">
        {/* Sidebar overlays on mobile, pushes on desktop */}
        <div className="fixed inset-y-0 left-0 z-30 md:static md:z-auto">
          <Sidebar />
        </div>
        <div className="flex-1 mx-auto ml-[50px] md:w-[90%] md:ml-0 md:pl-0 pl-0">
          <Nav />
          {children}
        </div>
      </div>
    </Provider>
  )
}

