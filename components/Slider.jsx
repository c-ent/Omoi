import React from "react";

const cards = [
  {
    title: "Efficient Note-Taking 1",
    content: "Capture and organize your thoughts effortlessly, allowing seamless management of ideas and tasks to enhance productivity.",
    bgColor: "bg-[#80FF9C]"
  },
  {
    title: "Secure Authentication 2",
    content: "Ensure your data is protected with embedded authentication, providing peace of mind and confidentiality.",
    bgColor: "bg-[#FFEE73]"
  },
  {
    title: "Max Note Organization 3",
    content: "Organize your notes systematically to streamline your workflow and access information efficiently, ensuring productivity and clarity in your daily tasks.",
    bgColor: "bg-[#FF8181]"
  },
  {
    title: "Secure Authentication 4",
    content: "Ensure your data is protected with embedded authentication, providing peace of mind and confidentiality.",
    bgColor: "bg-[#86BCFF]"
  },
  {
    title: "Efficient Note-Taking 5",
    content: "Capture and organize your thoughts effortlessly, allowing seamless management of ideas and tasks to enhance productivity.",
    bgColor: "bg-[#FFEE73]"
  }
];

const Slider = () => {
  return (
    <div className="flex justify-between items-center w-screen gap-5 overflow-hidden">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`w-full h-64 flex flex-col justify-center items-center ${card.bgColor} shadow-md transform transition-transform duration-500 rounded-lg p-4 ${
            index === 0 ? 'mb-[500px]' :
            index === 1 ? 'mb-[250px]' :
            index === 3 ? 'mb-[250px]' :
            index === 4 ? 'mb-[500px]' :
            ''
          }`}
        >
          <h2 className="font-bold mb-2">{card.title}</h2>
          <p>{card.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Slider;
