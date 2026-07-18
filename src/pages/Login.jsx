// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

// Import images so Vite processes them correctly
import bg1 from '../assets/bg1.png';
import bg2 from '../assets/bg2.png';
import bg3 from '../assets/bg3.png';

const backgrounds = [bg1, bg2, bg3];

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [bgIndex, setBgIndex] = useState(0);

  // Background Slider Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // If already logged in, redirect
  if (user) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#1C1C24] font-sans">
      {/* Left Pane - Image Background Carousel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#1C1C24]">
        {/* Images wrapper */}
        {backgrounds.map((bg, index) => (
          <div
            key={bg}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === bgIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
            style={{ backgroundImage: `url(${bg})` }}
          />
        ))}
        
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        
        <div className="relative z-20 p-12 flex flex-col justify-between h-full w-full">
          {/* Header */}
          <div className="flex items-center justify-between w-full">
            <div className="text-white font-bold text-2xl tracking-widest flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              CRM LITE
            </div>
            <Link to="/" className="text-white/80 hover:text-white flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-all duration-200">
              Back to website <ArrowRight size={14} />
            </Link>
          </div>
          
          {/* Tagline */}
          <div className="mb-12">
            <h1 className="text-5xl font-light text-white tracking-wide leading-tight">
              Capturing Moments,<br />
              <span className="font-medium">Creating Memories</span>
            </h1>
            
            {/* Dynamic Slider Dots */}
            <div className="flex gap-2 mt-8 items-center">
              {backgrounds.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setBgIndex(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === bgIndex ? 'w-12 bg-white' : 'w-8 bg-white/40 cursor-pointer hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 z-30 bg-[#1C1C24]">
        <div className="w-full max-w-md">
          <h2 className="text-[32px] font-semibold text-white mb-3">Welcome back</h2>
          <p className="text-[#8F8F9D] text-sm mb-10">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#8E75FF] hover:text-[#7A61E6] underline underline-offset-4 transition-colors">
              Register here
            </Link>
          </p>
          
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full px-4 py-3.5 bg-[#252530] border border-[#353542] rounded-xl text-white placeholder-[#6B6B78] focus:outline-none focus:border-[#8E75FF] focus:ring-1 focus:ring-[#8E75FF] transition-all duration-200"
              />
            </div>

            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3.5 bg-[#252530] border border-[#353542] rounded-xl text-white placeholder-[#6B6B78] focus:outline-none focus:border-[#8E75FF] focus:ring-1 focus:ring-[#8E75FF] transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#7B5EE4] hover:bg-[#6A4DD4] disabled:opacity-70 text-white rounded-xl font-medium transition-all duration-200 mt-2 flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Login to account'
              )}
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-[#353542]"></div>
            <span className="text-[#8F8F9D] text-xs font-medium uppercase tracking-wider">Or login with</span>
            <div className="flex-1 h-px bg-[#353542]"></div>
          </div>
          
          <div className="mt-6 flex gap-4">
            <button 
              type="button" 
              onClick={() => toast('Google login coming soon!', { icon: '🚀' })}
              className="flex-1 flex items-center justify-center gap-3 py-3 border border-[#353542] rounded-xl text-white hover:bg-[#252530] transition-colors text-sm font-medium"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button 
              type="button" 
              onClick={() => toast('Apple login coming soon!', { icon: '🍎' })}
              className="flex-1 flex items-center justify-center gap-3 py-3 border border-[#353542] rounded-xl text-white hover:bg-[#252530] transition-colors text-sm font-medium"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.05 20.28c-.98.14-2.14.15-3.14.15s-2.16-.01-3.14-.15c-.95-.13-1.98-.37-2.92-.79-1.63-.73-3.08-1.95-4.13-3.41-1.35-1.89-2.26-4.32-2.26-6.93 0-2.48.88-4.82 2.37-6.52C5.35 1.05 7.42 0 9.77 0c1.03 0 2.06.24 3.03.68.86.39 1.68.9 2.45 1.5.76-.6 1.58-1.11 2.45-1.5.97-.44 2-.68 3.03-.68 2.35 0 4.42 1.05 5.94 2.63 1.49 1.7 2.37 4.04 2.37 6.52 0 2.61-.91 5.04-2.26 6.93-1.05 1.46-2.5 2.68-4.13 3.41-.94.42-1.97.66-2.92.79H17.05z" fill="currentColor"/>
              </svg>
              Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
