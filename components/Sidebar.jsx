"use client"
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    let timer;
    if (open) {
      timer = setTimeout(() => setShowText(true), 300);
      const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    } else {
      setShowText(false);
    }
  }, [open]);

  return (
    <div
      ref={sidebarRef}
      className={`
        h-screen flex flex-col bg-white
        py-6
        transition-all duration-300 px-4
        ${open ? 'w-32 md:w-30' : 'w-16 md:w-20'}
      `}
    >
      <ul>
        <li className={`flex items-center mb-12 ${open ? 'gap-4' : ''}`}>
          <Image
            src="/assets/icons/sidemenu.svg"
            className={`cursor-pointer w-7 transition-transform duration-300`}
            alt="Logo"
            width={40}
            height={40}
            onClick={() => setOpen(!open)}
          />
        </li>
        <div>
          <li>
            <Link href="/notes" className={`flex items-center mb-8 ${open ? 'gap-2' : ''}`}>
              <Image 
                src="/assets/icons/note.svg"
                alt="Logo"
                width={30}
                height={30}
                className="object-contain"
              />
              {showText && (
                <p className="sidebar_text transition-opacity duration-300 opacity-100">
                  Notes
                </p>
              )}
            </Link>
          </li>
          <li>
            <Link href="notes/deletednotes" className={`flex items-center ${open ? 'gap-2' : ''}`}>
              <Image 
                src="/assets/icons/trash.svg"
                alt="Logo"
                width={30}
                height={30}
                className="object-contain"
              />
              {showText && (
                <p className="sidebar_text transition-opacity duration-300 opacity-100">
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