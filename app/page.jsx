import ButtonOutlineBlack from "@components/buttons/ButtonOutlineBlack"
import Nav from "@components/Nav"
import Slider from "@components/Slider"
import Link from "next/link"

export default function Page() {
  return (
    <>
      <Nav/>
      <div className="flex flex-col items-center justify-center  text-center p-6 gap-2 mt-20 overflow-hidden" >
        <h1 className="text-[28px] md:text-[62px] text-center font-semibold">Simplify Your Thoughts,<br/> Organize Your Ideas.</h1>
        <p className="max-w-[605px] text-center text-sm md:text-lg  text-[#8A8A8A] font-medium mb-2">Omoi, derived from the Japanese word "Omoidasu," which means "to remember," is your ultimate tool for capturing and reflecting on your thoughts</p>
        <Link href="/notes">
          <ButtonOutlineBlack text="Write"/>
        </Link>
        <Slider className=""/>
      </div>
    </>
  )
}