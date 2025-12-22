import React, { useState, useContext } from 'react';
import { userDataContext } from '../context/UserContext.jsx';
// If you don't have react-icons installed, you can remove the icon or use text
import { FaRobot } from "react-icons/fa"; 

function Custmize2() {
    const { userData } = useContext(userDataContext);
    const [assistantName, setAssistantName] = useState(userData?.name || "");
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative w-full min-h-screen bg-[#030712] text-white flex flex-col justify-center items-center overflow-hidden font-sans p-4">

            {/* --- AMBIENT BACKGROUND --- */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none fixed" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />

            {/* --- MAIN CARD --- */}
            <div className="relative z-10 w-full max-w-lg">
                
                {/* Animated Border Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-cyan-500 to-violet-600 rounded-2xl opacity-50 blur-[1px] p-[1px]">
                     <div className="h-full w-full bg-[#0a0a0a] rounded-2xl"></div>
                </div>

                <div className="relative bg-[#0a0a0a]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8 md:p-12 flex flex-col items-center">
                    
                    {/* Decorative Top Line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_10px_cyan]"></div>

                    {/* --- AI CORE VISUALIZATION --- */}
                    <div className="mb-10 relative group">
                        <div className={`absolute inset-0 bg-cyan-500 blur-xl rounded-full transition-opacity duration-500 ${assistantName ? 'opacity-40' : 'opacity-10'}`}></div>
                        <div className="relative w-24 h-24 bg-black border border-cyan-500/30 rounded-full flex items-center justify-center shadow-[inset_0_0_20px_rgba(6,182,212,0.2)]">
                            <FaRobot className={`w-10 h-10 transition-all duration-500 ${assistantName ? 'text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]' : 'text-gray-600'}`} />
                            
                            {/* Orbit Rings */}
                            <div className="absolute inset-0 rounded-full border border-cyan-500/20 border-t-transparent animate-[spin_4s_linear_infinite]"></div>
                            <div className="absolute inset-2 rounded-full border border-violet-500/20 border-b-transparent animate-[spin_3s_linear_infinite_reverse]"></div>
                        </div>
                    </div>

                    {/* --- HEADER --- */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/30 border border-cyan-500/20 mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Identity Protocol</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                            Name Your Assistant
                        </h1>
                        <p className="text-gray-400 text-sm font-mono">
                            // Assign a unique identifier to your Assistant
                        </p>
                    </div>

                    {/* --- INPUT FIELD --- */}
                    <div className="w-full relative mb-8 group">
                        <input
                            type="text"
                            placeholder="Here Buddy..."
                            className="w-full bg-black/50 border-b-2 border-white/10 text-center text-2xl md:text-3xl font-bold text-white py-4 px-4 focus:outline-none focus:border-cyan-500 transition-all duration-300 placeholder-gray-700 font-sans tracking-wide"
                            onChange={(e) => setAssistantName(e.target.value)}
                            value={assistantName}
                            required
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        
                        {/* Glowing Underline Effect */}
                        <div className={`absolute bottom-0 left-0 h-[2px] bg-cyan-500 shadow-[0_0_20px_cyan] transition-all duration-500 ease-out ${isFocused || assistantName ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                        
                        {/* Tech Corner Markers */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/20"></div>
                    </div>

                    {/* --- ACTION BUTTON --- */}
                    <div className="h-16 w-full flex justify-center items-center">
                        {assistantName && (
                            <button className="group relative w-full py-4 bg-transparent overflow-hidden rounded-lg transition-all duration-500 animate-in fade-in zoom-in slide-in-from-bottom-4">
                                
                                {/* Gradient Background */}
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 via-cyan-600 to-violet-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300 bg-[length:200%_auto] animate-gradient"></div>
                                
                                {/* Noise Texture */}
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                                {/* Text & Icon */}
                                <span className="relative z-10 flex items-center justify-center gap-3 text-white font-bold tracking-[0.2em] uppercase text-sm">
                                    Proceed....
                                    {/* <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg> */}
                                </span>
                            </button>
                        )}
                    </div>

                    {/* Footer Status */}
                    <div className="mt-6 flex justify-between w-full text-[10px] font-mono text-gray-600 uppercase">
                        <span>System: {assistantName ? 'Ready' : 'Waiting'}</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Custmize2