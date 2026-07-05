const SLIDES = [
  {
    colorKey: "#66FF88",
    title: "Jot it down",
    text: "Open a note, write what is on your mind, and come back to it whenever you need.",
  },
  {
    colorKey: "#FF7676",
    title: "Color what matters",
    text: "Give each note a color so the ones that matter stand out the moment you open your list.",
  },
  {
    colorKey: "#FFEA4F",
    title: "Yours alone",
    text: "Sign in with Google and keep every note private to your account-no sharing, no noise.",
  },
];

export default function Slider() {
  return (
    <div className="home_slider">
      {SLIDES.map((slide, index) => (
        <div
          key={`${slide.colorKey}-${index}`}
          className={`home_slider_card ${
            index !== 1 ? "home_slider_card_offset" : ""
          }`}
          style={{ backgroundColor: slide.colorKey }}
        >
          <h2 className="home_slider_card_title">{slide.title}</h2>
          <p className="home_slider_card_text">{slide.text}</p>
        </div>
      ))}
    </div>
  );
}
