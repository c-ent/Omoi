import ButtonOutlineBlack from "@components/buttons/ButtonOutlineBlack"
import Nav from "@components/Nav"
import Slider from "@components/Slider"
import Link from "next/link"
import Image from 'next/image';
export default function Page() {
  return (
    <>
      <Nav/>
      <div id="home" className="flex flex-col items-center justify-center  text-center p-6 gap-2 mt-20 overflow-hidden" >
        <h1 className="text-[28px] md:text-[62px] text-center font-bold">Simplify Your Thoughts,<br/> Organize Your Ideas.</h1>
        <p className="max-w-[605px] text-center text-sm md:text-lg  text-[#8A8A8A] font-medium mb-2">Omoi, derived from the Japanese word "Omoidasu," which means "to remember," is your ultimate tool for capturing and reflecting on your thoughts</p>
        <Link href="/notes">
          <ButtonOutlineBlack text="Write"/>
        </Link>
        <Slider className=""/>
      </div>

      <section className="flex flex-col  items-center justify-center max-w-[700px] mx-auto">
        <p className="font-bold text-[40px]"> “To Remember”</p>
        <p className="text-center text-sm md:text-lg  text-[#8A8A8A] font-medium mb-2">Omoi, derived from the Japanese word "Omoidasu," which means "to remember," is your ultimate tool for capturing and reflecting on your thoughts and ideas. </p>
        <Link href="#" className="font-semibold underline text-lg">Get Started for free</Link>
      
        <Image 
            src="/assets/images/astro.webp"
            alt="astro"
            width={1920}
            height={400}
            className="w-full object-contain mt-[-50px] md:mt-[-180px] -z-50"
        />
      </section>

      <div className='flex items-center justify-between border-t border-black dark:border-gray-800 pace-between w-full px-6  '>
        <h1 className='font-bold text-lg'>Omoi</h1>
        <p>© 2024</p>
    </div>
    </>
  )
}