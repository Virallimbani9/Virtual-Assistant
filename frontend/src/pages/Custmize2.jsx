import React, { useState, useContext } from "react";
import { userDataContext } from "../context/UserContext.jsx";
import { FaRobot, FaArrowLeft } from "react-icons/fa"; // Added FaArrowLeft
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Added useNavigate

function Custmize2() {
  const { userData, setUserData, serverUrl, backendImage, selectedImage } =
    useContext(userDataContext);
  const [assistantName, setAssistantName] = useState(userData?.name || "");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async () => {
    if (!assistantName) return;

    setIsLoading(true);

    try {
      const fomData = new FormData();
      fomData.append("assistantName", assistantName);
      if (backendImage) {
        fomData.append("assistantImage", backendImage);
      } else {
        fomData.append("imageUrl", selectedImage);
      }

      const result = await axios.put(
        `${serverUrl}/api/users/updateAssistant`,
        fomData,
        { withCredentials: true }
      );

      console.log("Assistant updated:", result.data);
      setUserData(result.data);

      // Navigate to home/dashboard after success
      // navigate('/home');
    } catch (error) {
      console.error("Error updating assistant:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
          {/* --- BACK BUTTON --- */}
          {/* Positioned absolute top-left of the card */}
          <button
            onClick={() => navigate(-1)} // Goes back to the previous page
            className="absolute top-6 left-6 text-gray-500 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group/back z-20"
            disabled={isLoading}
          >
            <FaArrowLeft className="w-3 h-3 group-hover/back:-translate-x-1 transition-transform duration-300" />
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-70 group-hover/back:opacity-100">
              Back
            </span>
          </button>

          {/* Decorative Top Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_10px_cyan]"></div>

          {/* --- AI CORE VISUALIZATION --- */}
          <div className="mb-10 relative group mt-4">
            <div
              className={`absolute inset-0 bg-cyan-500 blur-xl rounded-full transition-all duration-500 ${
                isLoading
                  ? "opacity-70 scale-125"
                  : assistantName
                  ? "opacity-40"
                  : "opacity-10"
              }`}
            ></div>

            <div className="relative w-24 h-24 bg-black border border-cyan-500/30 rounded-full flex items-center justify-center shadow-[inset_0_0_20px_rgba(6,182,212,0.2)]">
              <FaRobot
                className={`w-10 h-10 transition-all duration-500 ${
                  assistantName || isLoading
                    ? "text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                    : "text-gray-600"
                }`}
              />

              {/* Orbit Rings */}
              <div
                className={`absolute inset-0 rounded-full border border-cyan-500/20 border-t-transparent ${
                  isLoading
                    ? "animate-[spin_1s_linear_infinite]"
                    : "animate-[spin_4s_linear_infinite]"
                }`}
              ></div>
              <div
                className={`absolute inset-2 rounded-full border border-violet-500/20 border-b-transparent ${
                  isLoading
                    ? "animate-[spin_0.7s_linear_infinite_reverse]"
                    : "animate-[spin_3s_linear_infinite_reverse]"
                }`}
              ></div>
            </div>
          </div>

          {/* --- HEADER --- */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/30 border border-cyan-500/20 mb-3">
              <span
                className={`w-1.5 h-1.5 rounded-full bg-cyan-400 ${
                  isLoading ? "animate-ping" : "animate-pulse"
                }`}
              ></span>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                {isLoading ? "Establishing Connection..." : "Identity Protocol"}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
              Name Your Assistant
            </h1>
            <p className="text-gray-400 text-sm font-mono">
              // Assign a unique identifier to your Assistant
            </p>
          </div>

          {/* --- INPUT FIELD --- */}
          <div
            className={`w-full relative mb-8 group transition-opacity duration-300 ${
              isLoading ? "opacity-50 pointer-events-none" : "opacity-100"
            }`}
          >
            <input
              type="text"
              placeholder="Here Buddy..."
              disabled={isLoading}
              className="w-full bg-black/50 border-b-2 border-white/10 text-center text-2xl md:text-3xl font-bold text-white py-4 px-4 focus:outline-none focus:border-cyan-500 transition-all duration-300 placeholder-gray-700 font-sans tracking-wide"
              onChange={(e) => setAssistantName(e.target.value)}
              value={assistantName}
              required
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            <div
              className={`absolute bottom-0 left-0 h-[2px] bg-cyan-500 shadow-[0_0_20px_cyan] transition-all duration-500 ease-out ${
                isFocused || assistantName
                  ? "w-full opacity-100"
                  : "w-0 opacity-0"
              }`}
            />

            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/20"></div>
          </div>

          {/* --- ACTION BUTTON --- */}
          <div className="h-16 w-full flex justify-center items-center">
            {assistantName && (
              <button
                disabled={isLoading}
                className={`group relative w-full py-4 bg-transparent overflow-hidden rounded-lg transition-all duration-500 animate-in fade-in zoom-in slide-in-from-bottom-4 
                                ${
                                  isLoading
                                    ? "cursor-not-allowed opacity-90"
                                    : "cursor-pointer"
                                }`}
                onClick={handleSubmit}
              >
                <div
                  className={`absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 via-cyan-600 to-violet-600 transition-opacity duration-300 bg-[length:200%_auto] 
                                    ${
                                      isLoading
                                        ? "opacity-100 animate-gradient"
                                        : "opacity-90 group-hover:opacity-100"
                                    }`}
                ></div>

                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                <span className="relative z-10 flex items-center justify-center gap-3 text-white font-bold tracking-[0.2em] uppercase text-sm">
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Initializing...
                    </>
                  ) : (
                    "Finalize Assistant"
                  )}
                </span>
              </button>
            )}
          </div>

          {/* Footer Status */}
          <div className="mt-6 flex justify-between w-full text-[10px] font-mono text-gray-600 uppercase">
            <span>
              System:{" "}
              {isLoading ? "UPLOADING..." : assistantName ? "Ready" : "Waiting"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Custmize2;
