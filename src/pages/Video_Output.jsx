import React from "react";
import { Context } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "lucide-react";
import Footer from "@/components/Footer";
// import Loader from "./Loader";

const Video_Output = () => {
  const navigate = useNavigate();
  const {
    image,
    setImage,
    result,
    setLoader,
    setResult,
    resultVideo,
    setResultVideo,

    loader,
    context,
    setContext,
  } = React.useContext(Context);

  const handleDownloadClick = async () => {
    try {
      const response = await fetch(result, { mode: "cors" });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const link = document.createElement("a");
      const objectURL = URL.createObjectURL(blob);
      link.href = objectURL;
      link.download = "video.mp4";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectURL);
    } catch (error) {
      console.error("Image download failed:", error);
    }
  };
  const handleImageToMeme = async () => {
    setLoader(true);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("prompt", context);
      console.log(context);

      const response = await axios.post(
        "http://provider.ranchercompute.com:31057/uploadphoto",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response", response.data);

      setResult(response.data.link_preview);
      //   setDownloadLink(response.data.link_download);

      // handleUpload();
      setLoader(false);
      return response.data.link_preview;
    } catch (error) {
      setLoader(false);

      console.error("Error sending POST request:", error);
    }
  };
  const tweetText =
    "This meme has been built by Dopameme platform developed by #Builders";
  //   React.useEffect(() => {
  //     if (!resultVideo) {
  //       navigate("/home");
  //     }
  //   }, [context, result]);

  return (
    <div className="flex flex-col min-h-[90vh] h-screen items-center justify-between bg-[url('https://i.imgur.com/0stY04x.png')] bg-cover bg-center">
      {/* loader */}
      <div
        className={` top-0 left-0 w-full h-full z-40 backdrop-filter backdrop-blur-sm ${
          loader ? "fixed" : "hidden"
        } `}
      >
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center min-h-[70vh] ">
          <Loader run={loader} />
        </div>
      </div>
      {/* loader end*/}
      <div className=" h-max w-full   min-h-[160px] flex items-center justify-center ">
        <img
          className="w-[197px] object-cover "
          src="https://i.imgur.com/dyw05QI.png"
          alt=""
        />
      </div>

      {/* image */}
      <div className="relative ">
        <img
          onClick={() => {
            setResultVideo(null);

            setContext(null);
          }}
          className="absolute z-10  right-5 cursor-pointer w-7 h-7 object-cover top-[-2.5rem]"
          src="https://i.imgur.com/nL1U5kH.png"
          alt=""
        />
        <video
          className="w-[90%] mx-auto relative rounded-xl max-w-full overflow-hidden object-cover"
          controls
          src={resultVideo}
        ></video>
      </div>

      {/* buttons */}
      <div className="grid w-[90%] mx-auto grid-cols-12 pb-12 gap-4 mt-12">
        <div onClick={handleImageToMeme} className=" col-span-6">
          <img
            className=" h-full w-full  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 object-fill"
            src="https://i.imgur.com/nG4osfa.png"
            alt=""
          />
        </div>
        <div
          onClick={handleDownloadClick}
          className=" col-span-6  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200"
        >
          <img
            className=" h-full w-full object-fill"
            src="https://i.imgur.com/yBKN7Cy.png"
            alt=""
          />
        </div>
        {context && (
          <div className={` col-span-12`}>
            <div
              className="w-full relative flex items-center justify-center rounded-md bg-darkslategray border-gray border-[1px] border-solid box-border p-4
         overflow-hidden text-left text-[1.125rem] text-white font-inter"
            >
              <div className=" leading-[1.25rem] flex items-center w-[95%]">
                {context}
              </div>
            </div>
          </div>
        )}
        <div className=" col-span-12">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              tweetText
            )}&url=${encodeURIComponent(resultVideo)}`}
          >
            <img
              className=" h-full w-full object-fill"
              src="https://i.imgur.com/AQkYc3N.png"
              alt=""
            />
          </a>
        </div>
      </div>
      {/* footer */}
      {/* <div className=" h-full bg-black w-full flex flex-col items-center justify-center gap-1 py-3">
        <div className="w-[80%]   mx-auto px-4  flex-row pt-1 bg-black pb-2 flex items-center justify-center h-full relative text-[0.7rem] tracking-[-0.04em] font-semibold font-inter text-left  [filter:drop-shadow(0px_30px_85.6px_#000)] text-white">
          Build by #Builders
        </div>
        <div className="w-[80%] flex justify-center  px-5 mx-auto bg-black  pb-2  relative text-[0.7rem] capitalize font-semibold font-inter text-white text-left ">
          Designed and Developed by Swayam, Shreyash and Vivek
        </div>
        <div className="w-[90%] px-4 mx-auto bg-black pb-7 flex items-center justify-center relative text-[0.7rem] capitalize font-semibold font-inter text-white text-center ">
          © 2024 Dopameme | All rights reserved
        </div>
      </div> */}
      {/* footer  end */}
      <Footer/>
    </div>
  );
};

export default Video_Output;
