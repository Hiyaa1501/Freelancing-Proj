import React from "react";
import { Link } from "react-router-dom";

function CatCard({ card }) {
  return (
    <Link to="/gigs?cat=design">
      {/* Container: .catCard */}
      <div className="relative w-[252px] h-[344px] text-white rounded-[5px] cursor-pointer overflow-hidden">
        
        {/* Image: img */}
        <img 
          src={card.img} 
          alt={card.title} 
          className="w-full h-full object-cover"
        />

        {/* Description: .desc */}
        <span className="absolute top-[15px] left-[15px] font-light">
          {card.desc}
        </span>

        {/* Title: .title */}
        <span className="absolute top-[40px] left-[15px] text-[24px] font-medium">
          {card.title}
        </span>

      </div>
    </Link>
  );
}

export default CatCard;