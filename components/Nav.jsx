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
    <nav className={`justify-between flex w-full mb-6 pt-5 ${currentPage === '/' ? 'px-6' : ''}` }>
        <Link href="/notes" className="flex gap-2 items-center ">
            <Image 
                src="/assets/images/logo.svg"
                alt="Logo"
                width={30}
                height={30}
                className="object-contain"
            />
            <p className="logo_text">Omoi</p>
        </Link>
        <div>

            {session?.user ? (
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
            ): (
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