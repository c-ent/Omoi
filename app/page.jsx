"use client"
import ButtonOutlineBlack from "@components/buttons/ButtonOutlineBlack"
import Nav from "@components/Nav"
import Sidebar from "@components/Sidebar"
import Slider from "@components/Slider"
import { useSession, getSession } from "next-auth/react"
import Link from "next/link"

export default function Page() {
  const { data: session, status } = useSession()


  // if (status === "unauthenticated") {
  //   return <p>Access Denied</p>
  // }

  return (
    
    <>
     <Nav/>
     <div className="flex flex-col items-center justify-center  text-center gap-2 mt-20 overflow-hidden" >
      <h1 className="text-[62px] text-center font-semibold">Simplify Your Thoughts,<br/> Organize Your Ideas.</h1>
      <p className="max-w-[605px] text-center  text-[#8A8A8A] font-medium mb-2">Omoi, derived from the Japanese word "Omoidasu," which means "to remember," is your ultimate tool for capturing and reflecting on your thoughts</p>
      <Link href="/notes">
        <ButtonOutlineBlack text="Write"/>
      </Link>
      <Slider className=""/>
    </div>
    </>
   
  )
}