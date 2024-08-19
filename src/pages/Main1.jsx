import React from "react";
import ImageUploader from "./ImgToMeme_ImageUpload";
import { Context } from "../context/ContextProvider";
import Loader from "@/components/Loader";
import Main2 from "./Main2";
// import Loader from "./Loader";

const Main = () => {
  const { image, setImage, loader, setLoader } = React.useContext(Context);

  const img = "https://i.imgur.com/MYW3C9K.png";
  //   const divStyle = {
  //     backgroundImage: `url(${img})`,
  //     backgroundSize: "cover",
  //     backgroundRepeat: "no-repeat",
  //     backgroundPosition: "top center",
  //     width: "100%",
  //     height: "100%",
  //   };
  return (
    <div className="flex flex-col items-center  bg-[url('https://i.imgur.com/0stY04x.png')] min-h-screen bg-cover bg-center">
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
      {/* <div className=" py-4 flex items-center justify-center ">
        <img
          className="w-[197px] object-cover "
          src="https://i.imgur.com/dblo2am.png"
          alt=""
        />
      </div> */}
      <div>
        <img
          className=" w-[197px] mx-auto"
          src="https://i.imgur.com/dyw05QI.png"
          alt=""
        />
      </div>
      <div
        // style={divStyle}
        className="pb-12 flex flex-col items-center justify-center w-full  min-h-[33.875rem]  "
      >
        {image ? <Main2 /> : <ImageUploader />}
      </div>
      {/* footer */}
      {/* <div className=" h-full w-full flex flex-col items-center justify-center gap-1 py-3">
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
    </div>
  );
};

export default Main;
