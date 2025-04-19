"use client";
import Link from 'next/link'; 
import Image from 'next/image'; 
import { useState, useEffect } from 'react'; 
import { signIn, signOut , useSession, getProviders} from 'next-auth/react';
import { usePathname  } from 'next/navigation';

const Nav = () => {
    const currentPage = usePathname();
    const { data: session,status } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }

        setUpProviders();
    },[])

    return (
    <nav className="flex-end w-full mb-6 pt-5 h-fit ">
        {/* Desktop Navigation */}
        <div className={`
            ${currentPage === '/' ? 'justify-between' : 'justify-end'} 
            space-between w-full px-6 sm:flex hidden `
            }>
    
        {currentPage === '/' && (
            <Link href="/notes" className="flex gap-2 items-center ">
            <Image 
                src="/assets/images/logo.svg"
                alt="Logo"
                width={40}
                height={40}
                className="object-contain"
            />
            <p className="font-bold text-[32px]">Omoi</p>
            </Link>
        )}
    
            {/* Only show auth buttons if NOT on home page */}
            {currentPage !== '/' && session?.user ? (
                <div className="flex gap-3 md:gap-5">
                    <button type="button" onClick={signOut} className="outline_btn">
                        Sign Out
                    </button>

                    <Link href="/profile" className="black-btn" >
                        <Image 
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                        />
                    </Link>
                </div>
            ): currentPage !== '/' && (
                <>
                    {providers &&
                    Object.values(providers).map((provider)=>(
                        <button
                            type="button"
                            key="provider.name"
                            onClick = {() => signIn(provider.id)}
                            className= "black_btn"
                        >
                            Sign in
                        </button>
                    ))}
                </>
            )}
        </div>


        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
            {/* Only show auth components if NOT on home page */}
            {currentPage !== '/' && session?.user ? (
                <div className="flex">
                    <Image 
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        />

                        { toggleDropdown && (
                            <div className="dropdown">
                                <button type="button" onClick={()=> {
                                    setToggleDropdown(false);
                                    signOut();
                                }}
                                className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                </div>
            ): currentPage !== '/' && (
                <>
                {providers &&
                    Object.values(providers).map((provider)=>(
                        <button
                            type="button"
                            key="provider.name"
                            onClick = {() => signIn(provider.id)}
                            className= "black_btn"
                        >
                            Sign in
                        </button>
                    ))}
                </>
            )}
        </div> 
    </nav>
)
}

export default Nav