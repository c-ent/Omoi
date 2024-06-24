"use client"
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
    //lg for large screen, md for meduium screen and below, 
        className={`lg:px-4 md:px-2 px-2 py-6 h-screen flex flex-col bg-white `}
      >
      <ul>
        <li className='flex items-center gap-4 mb-12 '>
          <Image
            src="/assets/icons/sidemenu.svg"
            className={` cursor-pointer  w-7 ${!open && "rotate-180"}`}
            alt="Logo"
            width={40}
            height={40}
            onClick={() => setOpen(!open)}
          />
            <Link href="/notes" className="flex gap-2 items-center absolute left-16">
                <Image 
                    src="/assets/images/logo.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                />
                <p className="logo_text">Omoi</p>
            </Link>
        </li>
        <div>
        <li>
          <Link href="/notes" className="flex gap-2 mb-8 items-center mx-auto">
                <Image 
                    src="/assets/icons/note.svg"
                    alt="Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                 {open && (
            <p className="sidebar_text ">
              Notes
            </p>
          )}
            </Link>
        </li>
        <li>
          <Link href="notes/deletednotes" className="flex gap-2 items-center">
                <Image 
                    src="/assets/icons/trash.svg"
                    alt="Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                {open && (
            <p className="sidebar_text ">
              Trash
            </p>
          )}
          </Link>
        </li>
        </div>
      </ul>
    </div>
    
  )
}

export default Sidebar