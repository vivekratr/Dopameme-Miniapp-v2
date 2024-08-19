import React, { useContext, useState } from "react";
import { Context } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";

const Video_Meme_Input = () => {
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const {
    image,
    setImage,
    setLoader,
    genAi,
    imgView,
    setImgView,
    setResult,
    resultVideo,
    setResultVideo,
    context,
    setContext,
    loader,
    setDownloadLink,
  } = useContext(Context);

  const handleImageToMeme = async () => {
    setLoader(true);
    let _link;

    try {
      const formData = new FormData();
      console.log(context);
      // formData.append("image", image);
      formData.append("prompt", context);
      if (activeButton == "prompt") {
        const response = await axios.post(
          "http://provider.ranchercompute.com:31132/video",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response", response.data);

        //   setResult('lvda');
        setResultVideo(response.data.link_preview);

        //   setDownloadLink('lvda');
        setDownloadLink(response.data.link_download);
        _link = response.data.link_preview;
        setResultVideo(_link);

        // handleUpload();
      } else {
        //   const _formData = new FormData();
        formData.append("video", video);
        console.log("cl", formData);
        const response = await axios.post(
          "http://provider.ranchercompute.com:31132/uploadvideo_meme",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("response", response.data);

        //   setResult('lvda');
        setResultVideo(response.data.link_preview);

        //   setDownloadLink('lvda');
        setDownloadLink(response.data.link_download);
        _link = response.data.link_preview;
        setResultVideo(_link);
        // handleUpload();
      }

      setLoader(false);
      return _link;
    } catch (error) {
      setLoader(false);

      console.error("Error sending POST request:", error);
    }
  };

  const [activeButton, setActiveButton] = useState("video");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  React.useEffect(() => {
    setContext("");
    setResult("");
    setImage("");
  }, []);

  return (
    <>
      <div className="flex flex-col items-center bg-[url('https://i.imgur.com/0stY04x.png')] h-screen pb-10 bg-cover bg-center">
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
        <div className=" w-full  flex flex-col items-center justify-center ">
          <div className="w-[90%]  flex items-center justify-start p-1 gap-2 mx-auto relative rounded-md bg-black border-white border-[1px] border-solid box-border h-[3.188rem] overflow-hidden text-center text-[1.25rem] text-black font-inter">
            <button
              className={`flex items-center justify-center rounded-[3px] w-[50%] h-[2.563rem] overflow-hidden ${
                activeButton === "video" ? "bg-white text-black" : "text-white"
              }`}
              onClick={() => handleButtonClick("video")}
            >
              <div className="w-full h-full flex items-center justify-center leading-[1.25rem] font-medium">
                Video
              </div>
            </button>

            <button
              className={`flex items-center justify-center rounded-[3px] w-[50%] h-[2.563rem] overflow-hidden ${
                activeButton === "prompt" ? "bg-white text-black" : "text-white"
              }`}
              onClick={() => handleButtonClick("prompt")}
            >
              <div className="w-full h-full flex items-center justify-center leading-[1.25rem] font-medium">
                Prompt
              </div>
            </button>
          </div>

          <div className={`${activeButton == "prompt" ? "flex" : "flex"}`}>
            <input
              value={context}
              onChange={(e) => {
                setContext(e.target.value);
              }}
              placeholder="Describe Your Meme"
              className="mt-[50px] w-[328px] leading-[1.25rem] font-medium relative rounded-md bg-[#444] box-border h-[61px] overflow-hidden px-1 text-center text-[1.238rem] text-white placeholder:text-[#606060] font-inter border-[1px] border-solid border-[#828282]"
              type="text"
            />
          </div>

          <div
            className={`${
              activeButton != "prompt" ? "flex" : "hidden"
            } flex items-center justify-center `}
          >
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="my-[50px] w-[328px] leading-[1.25rem] font-medium relative rounded-md p-7  bg-[#444] box-border h-[101px] overflow-hidden px-4 text-center text-[1.238rem] text-white placeholder:text-[#606060] font-inter border-[1px] border-solid border-[#828282]"
            />
          </div>

          <div className="mt-[73px] cursor-pointer">
            <div
              onClick={async () => {
                setLoader(true);

                let cc = await genAi();
                if (cc) {
                  let c = await handleImageToMeme();
                  console.log("c", c);
                  setLoader(false);

                  navigate("/vid-output");
                }
                  setLoader(false);

              }}
              className="w-[225px] flex items-center justify-center relative rounded-md bg-white box-border h-[3.75rem] overflow-hidden text-center text-[1.438rem] text-black font-inter border-[1px] border-solid border-white"
            >
              <div className=" leading-[1.25rem] font-medium">
                Generate Meme
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-max">
        <Footer />
      </div>
    </>
  );
};

export default Video_Meme_Input;
