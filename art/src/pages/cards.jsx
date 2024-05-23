import React, { useEffect } from 'react';
import MoroccoMap from '../Map/MoroccoMap';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Cards = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-[#97644E] flex flex-col sm:flex-row p-4 sm:p-[60px_32px_100px_32px]" data-aos="fade-up-right">
      <div className="flex flex-col sm:w-1/2" style={{ zIndex: 0 }}> 
        <MoroccoMap/>
      </div>
      <div className="flex flex-col sm:w-1/2 items-center" data-aos="fade-up">
        <div className="m-[0_0_20px_0] font-bold text-xl sm:text-3xl leading-1.333 text-white">
          Have a Look at Our <br/>
          Unique Selling Proportions
        </div>
        <div className="flex justify-center lg:justify-start">
          <button className="bg-black py-3 px-8 text-white text-lg font-semibold rounded-full hover:bg-orange-900 transition duration-300 ease-in-out">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;