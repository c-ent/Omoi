import React from "react";

const Slider = () => {
  return (
    <div className="md:mt-[-50px] p-6 flex flex-col md:flex-row mx-auto gap-5 items-center justify-center max-w-7xl overflow-hidden -z-50">
      <div className="w-[350px] min-h-[250px] flex flex-col items-start bg-[#66FF88] shadow-md transform transition-transform duration-500 rounded-lg p-8 mb-4 md:mb-[200px]">
        <h2 className="text-[24px] text-start  font-bold mb-2">Efficient Note-Taking</h2>
        <p className="text-start">Capture and organize your thoughts effortlessly, allowing seamless management of ideas and tasks to enhance productivity.</p>
      </div>

      <div className="w-[350px] min-h-[250px] flex flex-col items-start bg-[#FF7676] shadow-md transform transition-transform duration-500 rounded-lg p-8 mb-4 md:mb-0">
        <h2 className="text-[24px] text-start  font-bold mb-2">Max Note Organization</h2>
        <p className="text-start">Organize your notes systematically to streamline your workflow and access information efficiently, ensuring productivity and clarity in your daily tasks.</p>
      </div>

      <div className="w-[350px] min-h-[250px] flex flex-col items-start bg-[#FFEA4F] shadow-md transform transition-transform duration-500 rounded-lg p-8 mb-4 md:mb-[200px]">
        <h2 className="text-[24px] text-start  font-bold mb-2">Secure Authentication</h2>
        <p className="text-start">Ensure your data is protected with embedded authentication, providing peace of mind and confidentiality.</p>
      </div>
    </div>
  );
};

export default Slider;