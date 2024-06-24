"use client"
import Nav from "@components/Nav"
import Sidebar from "@components/Sidebar"
import { useSession, getSession } from "next-auth/react"
import Link from "next/link"

export default function Page() {
  const { data: session, status } = useSession()


  // if (status === "unauthenticated") {
  //   return <p>Access Denied</p>
  // }

  return (
    <div classname="flex">
     <h1>test</h1>
     <Link href="/notes">Notes</Link>
    </div>
  )
}