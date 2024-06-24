"use client"
import Nav from "@components/Nav"
import Sidebar from "@components/Sidebar"
import { useSession, getSession } from "next-auth/react"

export default function Page() {
  const { data: session, status } = useSession()


  if (status === "unauthenticated") {
    return <p>Access Denied</p>
  }

  return (
    <div classname="flex">
      <Sidebar />
        <div className="w-4/6 px-4 md:px-5 lg:px-5 flex-1 ">
        <Nav/>
        <div className="mx-auto">
          {children}
        </div>
        </div> 
    </div>
  )
}