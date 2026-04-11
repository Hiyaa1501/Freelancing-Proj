import React, { useReducer, useState } from "react";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      navigate("/mygigs");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
  };

  // Reusable Tailwind classes to keep the JSX clean
  const inputBase = "p-5 border border-gray-200 outline-none rounded-sm";
  const labelBase = "text-gray-500 text-[18px]";
  const buttonBase = "border-none p-5 text-white font-medium text-[18px] bg-[#1dbf73] cursor-pointer";

  return (
    <div className="flex justify-center">
      <div className="w-[1400px] py-[50px] px-0">
        <h1 className="w-max mb-[30px] text-gray-500 font-light text-3xl">Add New Gig</h1>
        
        <div className="flex justify-between gap-[100px]">
          
          {/* .info section */}
          <div className="flex-1 flex flex-col gap-[10px] justify-between">
            <label className={labelBase}>Title</label>
            <input
              className={inputBase}
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            
            <label className={labelBase}>Category</label>
            <select className={inputBase} name="cat" id="cat" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>

            <div className="flex items-center gap-[20px]">
              <div className="flex flex-col gap-[20px]">
                <label className={labelBase}>Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label className={labelBase}>Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button 
                className={`${buttonBase} rounded-md`} 
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>

            <label className={labelBase}>Description</label>
            <textarea
              className={inputBase}
              name="desc"
              placeholder="Brief descriptions to introduce your service to customers"
              rows="16"
              onChange={handleChange}
            ></textarea>
            
            <button className={buttonBase} onClick={handleSubmit}>Create</button>
          </div>

          {/* .details section */}
          <div className="flex-1 flex flex-col gap-[10px] justify-between">
            <label className={labelBase}>Service Title</label>
            <input
              className={inputBase}
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            
            <label className={labelBase}>Short Description</label>
            <textarea
              className={inputBase}
              name="shortDesc"
              onChange={handleChange}
              placeholder="Short description of your service"
              rows="10"
            ></textarea>
            
            <label className={labelBase}>Delivery Time (e.g. 3 days)</label>
            <input className={inputBase} type="number" name="deliveryTime" onChange={handleChange} />
            
            <label className={labelBase}>Revision Number</label>
            <input
              className={inputBase}
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />
            
            <label className={labelBase}>Add Features</label>
            <form className="flex justify-between" onSubmit={handleFeature}>
              <input 
                className={`${inputBase} w-[80%]`} 
                type="text" 
                placeholder="e.g. page design" 
              />
              <button className={buttonBase} type="submit">add</button>
            </form>

            <div className="flex gap-[20px]">
              {state?.features?.map((f) => (
                <div key={f}>
                  <button
                    className="h-[30px] text-[12px] font-normal bg-transparent text-red-500 border border-red-500 flex items-center gap-[20px] p-[20px]"
                    onClick={() => dispatch({ type: "REMOVE_FEATURE", payload: f })}
                  >
                    {f}
                    <span className="font-bold">X</span>
                  </button>
                </div>
              ))}
            </div>
            
            <label className={labelBase}>Price</label>
            <input className={inputBase} type="number" onChange={handleChange} name="price" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;