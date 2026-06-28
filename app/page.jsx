import Link from "next/link";
import Nav from "@components/layout/Nav";
import Slider from "@components/marketing/Slider";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="home_page">
      <Nav />
      <div id="home" className="home_hero">
        <h1 className="home_title">
          Simplify Your Thoughts,
          <br /> Organize Your Ideas.
        </h1>
        <p className="home_tagline">
          A calm space to capture ideas, color-code what matters, and pick up right where you left off.
        </p>
        <Link href="/notes" className="home_cta">
          Write
        </Link>
        <Slider />
      </div>

      <section className="home_section">
        <p className="home_section_title">&quot;To Remember&quot;</p>
        <p className="home_section_text">
          Omoi comes from the Japanese word <em>omoidasu</em> (思い出す)—to remember. It is a private notebook for the thoughts you do not want to lose.
        </p>
        <Link href="/notes" className="home_section_link">
          Get Started for free
        </Link>

        <Image
          src="/assets/images/astro.webp"
          alt="Omoi illustration"
          width={1920}
          height={400}
          className="home_illustration"
        />
      </section>

      <div className="home_footer">
        <h1 className="home_footer_brand">Omoi</h1>
        <p>© {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
