import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (input.trim()) {
      navigate(`/gigs?search=${input}`);
    }
  };

  return (
    /* .featured */
    <div className="h-[600px] flex justify-center bg-[#013914] text-white">
      
      {/* .container */}
      <div className="w-[1400px] flex items-center">
        
        {/* .left */}
        <div className="flex flex-col gap-[30px]">
          
          {/* h1 */}
          <h1 className="text-[50px] font-bold">
            Find the perfect <span className="italic font-light">freelance</span> services for your business
          </h1>

          {/* .search */}
          <div className="bg-white rounded-[5px] flex items-center justify-between overflow-hidden">
            
            {/* .searchInput */}
            <div className="flex items-center gap-[10px]">
              <img src="./img/search.png" alt="" className="w-5 h-5 m-[10px]" />
              <input
                type="text"
                placeholder='Try "building mobil app"'
                className="border-none outline-none text-black placeholder:text-gray-500"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            
            {/* search button */}
            <button 
              onClick={handleSubmit}
              className="w-[120px] h-[50px] bg-[#1dbf73] text-white cursor-pointer border-none"
            >
              Search
            </button>
          </div>

          {/* .popular */}
          <div className="flex items-center gap-[10px]">
            <span className="w-max">Popular:</span>
            <button className="w-max text-white border border-white px-[10px] py-[5px] rounded-[20px] bg-transparent text-[14px] cursor-pointer hover:bg-white hover:text-[#013914] transition-all">
              Web Design
            </button>
            <button className="w-max text-white border border-white px-[10px] py-[5px] rounded-[20px] bg-transparent text-[14px] cursor-pointer hover:bg-white hover:text-[#013914] transition-all">
              WordPress
            </button>
            <button className="w-max text-white border border-white px-[10px] py-[5px] rounded-[20px] bg-transparent text-[14px] cursor-pointer hover:bg-white hover:text-[#013914] transition-all">
              Logo Design
            </button>
            <button className="w-max text-white border border-white px-[10px] py-[5px] rounded-[20px] bg-transparent text-[14px] cursor-pointer hover:bg-white hover:text-[#013914] transition-all">
              AI Services
            </button>
          </div>
        </div>

        {/* .right */}
        <div className="h-full">
          <img 
            src="./img/man.png" 
            alt="" 
            className="h-full object-contain" 
          />
        </div>

      </div>
    </div>
  );
}

export default Featured;