import React, { useContext, useRef } from "react";
import Cards from "../components/Cards.jsx";
import { MdDriveFolderUpload } from "react-icons/md";
import { userDataContext } from "../context/UserContext.jsx";
import image from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image4.png";
import image4 from "../assets/image5.png";
import image5 from "../assets/image6.jpeg";
import image6 from "../assets/image7.jpeg";
import { useNavigate } from "react-router-dom";

function Custmize() {
  const inputImage = useRef(null);

  const {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage
  } = useContext(userDataContext);

  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
      setSelectedImage("input"); // Auto-select when uploading
    }
  };

  const isUploadSelected = selectedImage === "input";

  return (
    <div className="relative w-full min-h-screen bg-[#030712] text-white flex flex-col items-center overflow-x-hidden font-sans">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none fixed" />
      <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-violet-900/20 to-transparent blur-3xl pointer-events-none" />

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 w-full max-w-7xl px-4 py-12 md:py-16 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 relative w-full px-2">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-1 bg-cyan-500/50 blur-lg"></div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-cyan-100 to-cyan-900 tracking-tighter mb-4">
            INTERFACE SELECTION
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-xs md:text-sm font-mono text-cyan-500/60 uppercase tracking-widest">
            <span className="hidden md:block">--- System Configuration ---</span>
            <span className="px-3 py-1 border border-cyan-500/20 rounded bg-cyan-500/5 text-cyan-300">
               Choose Your Pilot
            </span>
          </div>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 perspective-1000 place-items-center w-full">
          <Cards image={image} />
          <Cards image={image2} />
          <Cards image={image3} />
          <Cards image={image4} />
          <Cards image={image5} />
          <Cards image={image6} />

          {/* --- UPLOAD CARD --- */}
          <label 
            onClick={() => { setSelectedImage("input"); }}
            className={`group relative w-[240px] h-[340px] bg-[#0a0a0a]/40 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 flex flex-col items-center justify-center gap-4 border-2
            ${isUploadSelected 
              ? 'border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.6)] bg-cyan-950/20 scale-[1.02] -translate-y-2' // Selected Design
              : 'border-dashed border-cyan-500/20 hover:border-cyan-400/80 hover:bg-cyan-950/10 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]' // Idle Design
            }`}
          >
            
            {/* Icon Container */}
            <div 
              onClick={(e) => { 
                // Only trigger file input if clicked directly on icon, otherwise just select card
                if(!frontendImage) {
                   inputImage.current.click(); 
                }
              }} 
              className={`relative p-6 rounded-full transition-all duration-500 group-hover:scale-110 border 
              ${isUploadSelected 
                ? 'bg-cyan-500/20 border-cyan-400 scale-110' 
                : 'bg-cyan-500/5 group-hover:bg-cyan-500/10 border-transparent group-hover:border-cyan-500/30'
              }`}
            >
               {!frontendImage && <MdDriveFolderUpload className={`w-10 h-10 transition-colors duration-300 ${isUploadSelected ? 'text-cyan-300' : 'text-gray-500 group-hover:text-cyan-400'}`} />}
               
               {/* Show uploaded image if exists */}
               {frontendImage && <img src={frontendImage} alt="uploaded-avatar" className="w-16 h-16 object-cover rounded-full" />}
               
               <div className={`absolute inset-0 rounded-full border-t border-cyan-400/50 animate-spin ${isUploadSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
            </div>

             <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              ref={inputImage}
              onChange={handleImageUpload}
            />

            {/* Text Content */}
            <div className="text-center z-10">
               <h3 className={`font-bold text-lg transition-colors tracking-wide ${isUploadSelected ? 'text-cyan-300' : 'text-gray-400 group-hover:text-cyan-300'}`}>
                 {isUploadSelected ? 'CUSTOM ACTIVE' : 'UPLOAD CUSTOM'}
               </h3>
               <p className={`text-[10px] font-mono tracking-widest uppercase mt-2 ${isUploadSelected ? 'text-cyan-500' : 'text-gray-600 group-hover:text-cyan-500/70'}`}>
                  {isUploadSelected ? '// System_Ready' : '// Import_New_Model'}
               </p>
            </div>

            {/* Tech Corners */}
            <div className={`absolute top-2 left-2 w-3 h-3 border-l border-t transition-colors ${isUploadSelected ? 'border-cyan-400' : 'border-gray-600 group-hover:border-cyan-400'}`}></div>
            <div className={`absolute bottom-2 right-2 w-3 h-3 border-r border-b transition-colors ${isUploadSelected ? 'border-cyan-400' : 'border-gray-600 group-hover:border-cyan-400'}`}></div>
            
            {/* Background Animation */}
            <div className={`absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-no-repeat transition-opacity duration-700 pointer-events-none group-hover:animate-[shine_2s_infinite]
              ${isUploadSelected ? 'opacity-100 animate-[shine_2s_infinite]' : 'opacity-0 group-hover:opacity-100'}`}></div>
          </label>
        </div>

        {/* --- NEXT BUTTON SECTION --- */}
        <div className="mt-16 mb-8 w-full flex justify-center">
            {selectedImage && <button className="group relative px-10 py-4 bg-transparent overflow-hidden rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] active:scale-95 cursor-pointer " onClick={()=> {navigate("/custmize2")}}>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 via-cyan-600 to-violet-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300 bg-[length:200%_auto] animate-gradient"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <span className="relative z-10 flex items-center gap-3 text-white font-bold tracking-[0.2em] uppercase text-sm md:text-base">
              Initialize System
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
          </button> }
          
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center gap-2 text-gray-600 font-mono text-[10px] md:text-xs">
           <div className={`w-2 h-2 rounded-full ${selectedImage ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-green-500 animate-pulse'}`}></div>
           {selectedImage ? 'PILOT SELECTION LOCKED' : 'SYSTEM ONLINE // WAITING FOR SELECTION'}
        </div>
      </div>
    </div>
  );
}

export default Custmize;