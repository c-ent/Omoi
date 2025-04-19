import React from "react";

const Slider = () => {
  return (
    <div className="md:mt-[-110px] p-6 flex flex-col md:flex-row justify-between items-center w-screen gap-5 overflow-hidden -z-50">
      <div className="w-full h-64 flex flex-col justify-center items-center bg-[#80FF9C] shadow-md transform transition-transform duration-500 rounded-lg p-4 mb-4 md:mb-[350px]">
        <h2 className="font-bold mb-2">Efficient Note-Taking</h2>
        <p>Capture and organize your thoughts effortlessly, allowing seamless management of ideas and tasks to enhance productivity.</p>
      </div>

      <div className="w-full h-64 flex flex-col justify-center items-center bg-[#FFEE73] shadow-md transform transition-transform duration-500 rounded-lg p-4 mb-4 md:mb-[150px]">
        <h2 className="font-bold mb-2">Secure Authentication</h2>
        <p>Ensure your data is protected with embedded authentication, providing peace of mind and confidentiality.</p>
      </div>

      <div className="w-full h-64 flex flex-col justify-center items-center bg-[#FF8181] shadow-md transform transition-transform duration-500 rounded-lg p-4 mb-4 md:mb-0">
        <h2 className="font-bold mb-2">Max Note Organization</h2>
        <p>Organize your notes systematically to streamline your workflow and access information efficiently, ensuring productivity and clarity in your daily tasks.</p>
      </div>

      <div className="w-full h-64 flex flex-col justify-center items-center bg-[#86BCFF] shadow-md transform transition-transform duration-500 rounded-lg p-4 mb-4 md:mb-[150px]">
        <h2 className="font-bold mb-2">Secure Authentication</h2>
        <p>Ensure your data is protected with embedded authentication, providing peace of mind and confidentiality.</p>
      </div>

      <div className="w-full h-64 flex flex-col justify-center items-center bg-[#FFEE73] shadow-md transform transition-transform duration-500 rounded-lg p-4 mb-4 md:mb-[350px]">
        <h2 className="font-bold mb-2">Efficient Note-Taking</h2>
        <p>Capture and organize your thoughts effortlessly, allowing seamless management of ideas and tasks to enhance productivity.</p>
      </div>
    </div>
  );
};

export default Slider;