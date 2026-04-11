import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr");

  try {
    // Ensure VITE_UPLOAD_LINK is set in your .env file
    const res = await axios.post(import.meta.env.VITE_UPLOAD_LINK, data);

    const { url } = res.data;
    return url;
  } catch (err) {
    // Logging the error is good, but throwing it lets the 
    // calling component show an error message to the user.
    console.error("Upload Error:", err);
    throw err; 
  }
};

export default upload;