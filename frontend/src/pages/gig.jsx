import React from "react";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => res.data),
    enabled: !!userId,
  });

  return (
    <div className="flex justify-center">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="w-[1400px] py-[30px] px-0 flex gap-[50px]">
          
          {/* Left Section */}
          <div className="flex-[2] flex flex-col gap-[20px]">
            <span className="font-light uppercase text-[13px] text-[#555]">
              Fiverr {">"} Graphics & Design {">"}
            </span>
            <h1 className="text-3xl font-bold">{data.title}</h1>
            
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="flex items-center gap-[10px]">
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span className="text-[14px] font-medium">{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="flex items-center gap-[5px]">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((_, i) => (
                        <img src="/img/star.png" alt="" key={i} className="h-[14px] w-[14px]" />
                      ))}
                    <span className="text-[14px] font-bold text-[#ffc108]">
                      {Math.round(data.totalStars / data.starNumber)}
                    </span>
                  </div>
                )}
              </div>
            )}

            <Slider slidesToShow={1} arrowsScroll={1} className="bg-[#F5F5F5] rounded-md overflow-hidden">
              {data.images.map((img) => (
                <img key={img} src={img} alt="" className="max-h-[500px] object-contain w-full" />
              ))}
            </Slider>

            <h2 className="font-normal text-xl mt-4">About This Gig</h2>
            <p className="font-light leading-[25px] text-[#555]">{data.desc}</p>

            {/* Seller Section */}
            {!isLoadingUser && dataUser && (
              <div className="mt-[50px] flex flex-col gap-[20px]">
                <h2 className="font-normal text-xl">About The Seller</h2>
                <div className="flex items-center gap-[20px]">
                  <img 
                    src={dataUser.img || "/img/noavatar.jpg"} 
                    alt="" 
                    className="w-[100px] h-[100px] rounded-full object-cover"
                  />
                  <div className="flex flex-col gap-[10px]">
                    <span className="text-[14px] font-medium">{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="flex items-center gap-[5px]">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((_, i) => (
                            <img src="/img/star.png" alt="" key={i} className="h-[14px] w-[14px]" />
                          ))}
                        <span className="text-[14px] font-bold text-[#ffc108]">
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button className="bg-white rounded-[5px] border border-gray-400 p-[10px] cursor-pointer hover:bg-gray-50 transition-colors">
                      Contact Me
                    </button>
                  </div>
                </div>

                <div className="border border-gray-300 rounded-[5px] p-[20px] mt-[20px]">
                  <div className="flex justify-between flex-wrap">
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-light">From</span>
                      <span className="font-medium">{dataUser.country}</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-light">Member since</span>
                      <span className="font-medium">Aug 2022</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-light">Avg. response time</span>
                      <span className="font-medium">4 hours</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-light">Last delivery</span>
                      <span className="font-medium">1 day</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-light">Languages</span>
                      <span className="font-medium">English</span>
                    </div>
                  </div>
                  <hr className="h-0 border-t-[0.5px] border-gray-300 mb-[20px]" />
                  <p className="font-light leading-[25px] text-[#555]">{dataUser.desc}</p>
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>

          {/* Right Section (Sticky Box) */}
          <div className="flex-1 border border-gray-300 p-[20px] rounded-[5px] flex flex-col gap-[20px] h-max max-h-[500px] sticky top-[150px]">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{data.shortTitle}</h3>
              <h2 className="font-light text-2xl">$ {data.price}</h2>
            </div>
            <p className="text-gray-500 my-[10px] mx-0">{data.shortDesc}</p>
            <div className="flex items-center justify-between text-[14px]">
              <div className="flex items-center gap-[10px]">
                <img src="/img/clock.png" alt="" className="w-[20px]" />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="flex items-center gap-[10px]">
                <img src="/img/recycle.png" alt="" className="w-[20px]" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="flex flex-col gap-[5px]">
              {data.features.map((feature) => (
                <div className="flex items-center gap-[10px] font-light text-gray-500" key={feature}>
                  <img src="/img/greencheck.png" alt="" className="w-[14px]" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`}>
              <button className="bg-[#1dbf73] p-[10px] text-white font-medium border-none text-[18px] cursor-pointer hover:bg-[#19a463] transition-colors">
                Continue
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;