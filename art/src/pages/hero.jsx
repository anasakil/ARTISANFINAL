import React from 'react';
import backgroundVideo from '../assets/background2.mp4'; // Import the background video

export default function Hero() {


  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Use video element instead of img for background */}
      <video autoPlay loop muted className="absolute inset-0 object-cover w-full h-full z-0">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10 flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white z-10 text-center px-4 sm:px-8 lg:px-0">
      Atlas des Artisans 
    </h1>
       
      </div>
    </div>
  );
}