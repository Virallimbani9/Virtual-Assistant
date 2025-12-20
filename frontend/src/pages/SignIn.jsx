import React, { useContext, useState } from "react";
import axios from "axios";
// We don't need the static bg image anymore, we will create a CSS grid background
// import bg from "../assets/authBg.png"; 
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";

export const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { serverUrl } = useContext(userDataContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/logIn`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log("Result---------------------", result);
      setLoading(false);
      // Logic preserved as requested
      // if (result.status === 200) {
      //   navigate("/home");
      // }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#030712] text-white flex justify-center items-center overflow-hidden font-sans">
      
      {/* --- AMBIENT BACKGROUND EFFECTS --- */}
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] pointer-events-none" />

      {/* --- LOGIN CARD --- */}
      <div className="relative z-10 w-full max-w-md p-1">
        {/* Animated Border Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500 rounded-2xl opacity-75 blur-[2px] animate-spin-slow" />
        
        <form
          className="relative w-full bg-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          onSubmit={handleSignIn}
        >
          {/* Tech Decorative Lines */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-violet-500/20 to-transparent rounded-tl-full" />

          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center px-3 py-1 mb-4 border border-cyan-500/30 rounded-full bg-cyan-500/10 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping mr-2"></span>
                <span className="text-xs font-mono text-cyan-300 tracking-widest uppercase">System Secure</span>
              </div>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 tracking-tight mb-2">
                Welcome Buddy
              </h2>
              <p className="text-sm text-gray-500 font-mono">Initialize authentication sequence</p>
            </div>

            {/* Email Field */}
            <div className="mb-6 group">
              <label
                htmlFor="email"
                className="block text-xs font-mono text-cyan-400/80 mb-2 ml-1 tracking-wider uppercase group-focus-within:text-cyan-300 transition-colors"
              >
              Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <div className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-8 group">
              <label
                htmlFor="password"
                className="block text-xs font-mono text-cyan-400/80 mb-2 ml-1 tracking-wider uppercase group-focus-within:text-cyan-300 transition-colors"
              >
              Passcode
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] pr-12"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors duration-200"
                >
                  {showPassword ? (
                     // Modern Eye Icon
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  ) : (
                     // Modern Closed Eye Icon
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7c.44 0 .87-.03 1.28-.09"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error.length > 0 && (
              <div className="mb-6 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2 animate-shake">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-lg text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-violet-600 transition-all duration-300 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
              <span className="relative flex items-center gap-2 uppercase tracking-widest" disable={loading}>
                 {loading? "Loading......." : "Initiate Log In"}
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </span>
            </button>

            {/* Footer Links */}
            <div className="mt-8 flex items-center justify-between text-xs font-mono text-gray-500">
               <a href="#" className="hover:text-cyan-400 transition-colors">
                Forgot_Password?
               </a>
               <div className="h-4 w-[1px] bg-gray-700"></div>
               <a 
                href="#"
                onClick={() => navigate("/signup")}
                className="hover:text-cyan-400 transition-colors"
               >
                Create Account
               </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};