import { getColorClass } from "@lib/note-validation";

const SLIDES = [
  {
    colorKey: "green",
    title: "Jot it down",
    text: "Open a note, write what is on your mind, and come back to it whenever you need.",
  },
  {
    colorKey: "red",
    title: "Color what matters",
    text: "Give each note a color so the ones that matter stand out the moment you open your list.",
  },
  {
    colorKey: "yellow",
    title: "Yours alone",
    text: "Sign in with Google and keep every note private to your account—no sharing, no noise.",
  },
];

export default function Slider() {
  return (
    <div className="home_slider">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.colorKey}
          className={`home_slider_card ${getColorClass(slide.colorKey)} ${
            index !== 1 ? "home_slider_card_offset" : ""
          }`}
        >
          <h2 className="home_slider_card_title">{slide.title}</h2>
          <p className="home_slider_card_text">{slide.text}</p>
        </div>
      ))}
    </div>
  );
}
