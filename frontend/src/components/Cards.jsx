import React, { useContext } from 'react';
import { userDataContext } from '../context/UserContext.jsx';

function Cards({ image }) {
  const { selectedImage, setSelectedImage , frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,  } = useContext(userDataContext);

  // Helper boolean to check if this specific card is selected
  const isSelected = selectedImage === image;

  return (
    <div 
      className={`group relative w-[240px] h-[340px] bg-[#0a0a0a] rounded-xl overflow-hidden cursor-pointer transition-all duration-500 
      ${isSelected 
        ? 'border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.6)] scale-[1.02] -translate-y-2' // Selected State
        : 'border-white/5 hover:border-cyan-500/50 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(8,145,178,0.4)]' // Idle/Hover State
      } border`}
      
      onClick={() => {
        setSelectedImage(image);
        setFrontendImage(null);
        setBackendImage(null);
      }}
    >
      
      {/* --- BACKGROUND GLOW (Internal) --- */}
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyan-900/20 transition-opacity duration-500 z-10 
        ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} 
      />

      {/* --- IMAGE --- */}
      <img 
        src={image} 
        alt="assistant-avatar" 
        className={`w-full h-full object-cover transition-all duration-700 ease-out
        ${isSelected 
          ? 'opacity-100 grayscale-0 scale-110' // Selected: Full Color, Zoomed
          : 'opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110' // Idle
        }`}
      />

      {/* --- UI OVERLAY --- */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 pointer-events-none">
        
        {/* Top: Tech Status */}
        <div className={`flex justify-between items-start transition-all duration-300 transform
           ${isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0'}`}>
           
           <div className={`px-2 py-1 backdrop-blur-md border rounded text-[10px] font-mono uppercase tracking-widest
             ${isSelected 
               ? 'bg-cyan-500 text-black border-cyan-400 font-bold' // Selected Badge
               : 'bg-cyan-950/80 text-cyan-400 border-cyan-500/30' // Idle Badge
             }`}>
              {isSelected ? 'SELECTED' : 'ONLINE'}
           </div>
           
           {/* Animated Dot */}
           <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_#22d3ee] 
             ${isSelected ? 'bg-white animate-none shadow-[0_0_15px_white]' : 'bg-cyan-400 animate-pulse'}`}>
           </div>
        </div>

        {/* Bottom: Action Text */}
        <div className={`w-full transition-transform duration-300
           ${isSelected ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}>
           
           <div className={`h-[1px] w-full mb-3 transition-opacity duration-300
             ${isSelected ? 'bg-cyan-400 opacity-100' : 'bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100'}`}>
           </div>
           
           <p className={`text-center font-mono text-xs tracking-[0.2em] uppercase transition-opacity duration-300
             ${isSelected ? 'text-cyan-300 opacity-100 font-bold' : 'text-white opacity-0 group-hover:opacity-100'}`}>
              {isSelected ? 'System Locked' : 'Select Avatar'}
           </p>
        </div>
      </div>

      {/* --- DECORATIVE TECH CORNERS --- */}
      {/* Corners become solid Cyan when selected */}
      <div className={`absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 transition-colors duration-300 z-30
        ${isSelected ? 'border-cyan-400' : 'border-white/20 group-hover:border-cyan-400'}`}></div>
      
      <div className={`absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 transition-colors duration-300 z-30
        ${isSelected ? 'border-cyan-400' : 'border-white/20 group-hover:border-violet-400'}`}></div>

      {/* --- SCANNING LINE ANIMATION --- */}
      {/* Hide scan line when selected (looks cleaner), show on hover */}
      {!isSelected && (
        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,1)] opacity-0 group-hover:opacity-100 group-hover:animate-scan z-40 pointer-events-none"></div>
      )}
    </div>
  );
}

export default Cards;