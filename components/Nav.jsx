"use client";
import Link from 'next/link';    //To use Link tags
import Image from 'next/image'; //To optimize images
import { useState, useEffect } from 'react'; //To use state and effect hooks
import { signIn, signOut , useSession, getProviders} from 'next-auth/react'; //To use next-auth

const Nav = () => {
    // const isUserLoggedIn = true;

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
    <nav className="flex-between w-full mb-6 pt-3">
        {/* Logo */}
        <Link href="/" className="flex gap-2 flex-center">
            <Image 
                src="/assets/icons/note.svg"
                alt="Logo"
                width={30}
                height={30}
                className="object-contain"
            />
            <p className="logo_text">Notes</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="sm:flex hidden ">



            {session?.user ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="create-prompt" className="black_btn" >
                        Create Note
                    </Link>

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


        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
            {session?.user ? (
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
                                <Link
                                    href="/profile"s
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>

                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>

                                <button type="button" onClick={()=> {
                                    setToggleDropdown(false);
                                    signOut();
                                    className="mt-5 w-full black_btn"
                                }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
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