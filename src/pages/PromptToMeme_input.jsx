import React, { useContext, useState } from "react";
import { Context } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";

const PromptToMeme_input = () => {
  const navigate = useNavigate();
  const {
    image,
    setImage,
    setLoader,
    imgView,
    setImgView,
    setResult,
    downloadLink,
    context,
    setContext,
    loader,
    setDownloadLink,
    setAnimePrompt,
    animePrompt,
  } = useContext(Context);
  const handleImageToMeme = async () => {
    setLoader(true);
    let _link;

    try {
      const formData = { prompt: context };
      console.log(context);
      // formData.append("image", image);
      // formData.append("prompt", context);
      if (activeButton == "template") {
        const response = await axios.post(
          "http://provider.ranchercompute.com:31132/template",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response", response.data);

        //   setResult('lvda');
        setResult(response.data.link_preview);

        //   setDownloadLink('lvda');
        setDownloadLink(response.data.link_download);
        _link = response.data.link_preview;
        // handleUpload();
      }
      if (animePrompt) {
        const response = await axios.post(
          "http://provider.ranchercompute.com:31132/imgen1",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setAnimePrompt(false);
        console.log("response", response.data);

        //   setResult('lvda');
        setResult(response.data.link_preview);

        //   setDownloadLink('lvda');
        setDownloadLink(response.data.link_download);
        _link = response.data.link_preview;

        // handleUpload();
      } else {
        const response = await axios.post(
          "http://provider.ranchercompute.com:31132/imgen",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response", response.data);

        //   setResult('lvda');
        setResult(response.data.link_preview);

        //   setDownloadLink('lvda');
        setDownloadLink(response.data.link_download);
        _link = response.data.link_preview;

        // handleUpload();
      }

      setLoader(false);
      return _link;
    } catch (error) {
      setLoader(false);

      console.error("Error sending POST request:", error);
    }
  };

  const [activeButton, setActiveButton] = useState("aiMagic");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  React.useEffect(() => {
    setContext("");
    setResult("");
    setImage("");
  }, []);

  return (
    <div className="flex flex-col items-center justify-start bg-[url('https://i.imgur.com/0stY04x.png')] min-h-screen bg-cover bg-center">
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
        <div
          className={`w-[90%]  flex items-center justify-start p-1 gap-2 mx-auto relative rounded-md bg-black border-white border-[1px] border-solid box-border  overflow-hidden text-center text-[1.25rem] text-black font-inter ${
            animePrompt ? "hidden" : "flex h-[3.188rem]"
          }`}
        >
          <button
            className={`flex items-center justify-center rounded-[3px] w-[50%] h-[2.563rem] overflow-hidden ${
              activeButton === "aiMagic" ? "bg-white text-black" : "text-white"
            }`}
            onClick={() => handleButtonClick("aiMagic")}
          >
            <div className="w-full h-full flex items-center justify-center leading-[1.25rem] font-medium">
              AI Magic
            </div>
          </button>

          <button
            className={`flex items-center justify-center rounded-[3px] w-[50%] h-[2.563rem] overflow-hidden ${
              activeButton === "template" ? "bg-white text-black" : "text-white"
            } `}
            onClick={() => handleButtonClick("template")}
          >
            <div className="w-full h-full flex items-center justify-center leading-[1.25rem] font-medium">
              Template
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
            className="my-[80px] w-[328px] leading-[1.25rem] font-medium relative rounded-md bg-[#444] box-border h-[101px] overflow-hidden px-4 text-center text-[1.238rem] text-white placeholder:text-[#606060] font-inter border-[1px] border-solid border-[#828282]"
            type="text"
          />
        </div>

        <div className="mt-[73px] cursor-pointer">
          <div
            onClick={async () => {
              setLoader(true);

              let c = await handleImageToMeme();
              console.log("c", c);
              setLoader(false);

              navigate("/output");
            }}
            className="w-[225px] flex items-center justify-center relative rounded-md bg-white box-border h-[3.75rem] overflow-hidden text-center text-[1.438rem] text-black font-inter border-[1px] border-solid border-white"
          >
            <div className=" leading-[1.25rem] font-medium">Generate Meme</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PromptToMeme_input;
