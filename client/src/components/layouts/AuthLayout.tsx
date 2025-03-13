import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex h-screen">
      {/* Left side banner */}
      <div className="hidden md:flex md:w-1/2 bg-[#2563EB] items-center justify-center">
        <div className="text-center text-white p-8">
          <h1 className="text-4xl font-bold mb-4">MathGenius</h1>
          <p className="text-xl">
            Your personal AI tutor for mastering mathematics
          </p>
          <div className="mt-8">
            <img 
              src="/tutor-logo.svg" 
              alt="MathGenius Logo" 
              className="w-32 h-32 mx-auto" 
            />
          </div>
        </div>
      </div>
      
      {/* Right side auth form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
        <Outlet />
      </div>
    </div>
  );
}
