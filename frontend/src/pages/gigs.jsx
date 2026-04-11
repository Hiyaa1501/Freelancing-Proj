import React, { useEffect, useRef, useState } from "react";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value || 0}&max=${maxRef.current.value || 99999}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1400px] py-[30px] px-0 flex flex-col gap-[15px]">
        {/* .breadcrumbs */}
        <span className="font-light uppercase text-[13px] text-[#555]">
          Liverr &gt; Graphics & Design &gt;
        </span>
        
        <h1 className="text-3xl font-bold">AI Artists</h1>
        
        {/* p */}
        <p className="text-[#999] font-light">
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>

        {/* .menu */}
        <div className="flex items-center justify-between mb-5">
          {/* .left */}
          <div className="flex items-center gap-[10px] text-[#555] font-light">
            <span>Budget</span>
            <input 
              ref={minRef} 
              type="number" 
              placeholder="min" 
              className="p-[5px] border border-lightgray rounded-[5px] outline-none placeholder:text-[#999]"
            />
            <input 
              ref={maxRef} 
              type="number" 
              placeholder="max" 
              className="p-[5px] border border-lightgray rounded-[5px] outline-none placeholder:text-[#999]"
            />
            <button 
              onClick={apply}
              className="py-[5px] px-[10px] bg-[#1dbf73] text-white border-none font-medium rounded-[5px] cursor-pointer"
            >
              Apply
            </button>
          </div>

          {/* .right */}
          <div className="relative flex items-center gap-[10px]">
            <span className="text-[#555] font-light">Sort by</span>
            <span className="font-medium text-gray-800">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img 
              src="./img/down.png" 
              alt="" 
              className="w-[15px] cursor-pointer" 
              onClick={() => setOpen(!open)} 
            />
            {open && (
              /* .rightMenu */
              <div className="absolute top-[30px] right-0 p-5 bg-white border border-lightgray rounded-[5px] flex flex-col gap-5 text-[#555] z-[9] shadow-sm min-w-[120px]">
                {sort === "sales" ? (
                  <span className="cursor-pointer" onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span className="cursor-pointer" onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span className="cursor-pointer" onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>

        {/* .cards */}
        <div className="flex justify-between flex-wrap gap-y-8">
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;