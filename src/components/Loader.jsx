import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 border-b-pink-500 animate-spin"></div>

        <div className="absolute inset-2 bg-zinc-100 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;