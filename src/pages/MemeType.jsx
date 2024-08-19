import React, { useContext, useEffect } from "react";
import {
  useBackButton,
  useClosingBehavior,
  useViewport,
} from "@telegram-apps/sdk-react";
import { useNavigate, useLocation } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Context } from "../context/ContextProvider";
import Footer from "@/components/Footer";


const MemeTemplateDisplay = () => {
  
  const bb = useBackButton();
  const navigate = useNavigate();
    const close = useClosingBehavior(); // will be undefined or ClosingBehavior.
    const viewport = useViewport(); // will be undefined or InitData.
    const location = useLocation();

    useEffect(() => {
      function goBack() {
        navigate(-1); // use navigate(-1) to go back in history
      }

      if (close) {
        close.enableConfirmation();
      }
      if (viewport) {
        viewport.expand();
      }
      if (bb) {
        if (location.pathname === "/") {
          bb.hide();
          return;
        }
        bb.show();
        bb.on("click", goBack);
      }
    }, [bb, navigate, location]);
   const {
  
     setAnimePrompt,
   } = useContext(Context);
  return (
    <div className=" bg-black">
      <div className=" w-full  overflow-hidden r pb-20 mx-auto  text-lg font-semibold text-black bg-[url('https://i.imgur.com/0stY04x.png')] min-h-screen bg-cover bg-center max-w-[480px]">
        <div className="flex flex-col items-center w-[90%] mx-auto">
          <div className="flex w-full justify-between items-center my-6">
            <div>
              <img
                className=" w-[117px] h-[89px] "
                src="https://i.imgur.com/dyw05QI.png"
                alt=""
              />
            </div>
            <div onClick={() => {
              navigate('/explore')
            }} className="w-[168px]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 flex gap-1 items-center justify-center relative rounded-md bg-darkorange-200 border-darkorange-100 border-[1px] border-solid box-border h-[2.25rem] overflow-hidden text-left text-[1.125rem] text-white font-inter">
              <div className=" font-semibold">Explore Memes</div>
              <img
                className=" max-h-full w-[0.938rem]"
                alt=""
                src="https://i.imgur.com/NXt28Wx.png"
              />
            </div>
          </div>
          <div>
            <img
              onClick={() => {
                setAnimePrompt(true);
                navigate("/prompt-to-meme1");
              }}
              className="rounded-lg w-full"
              src="https://i.imgur.com/DFGKZu0.png"
              alt=""
            />
          </div>

          <div className="w-max self-start relative text-[1.625rem] tracking-[-0.04em] font-semibold font-inter text-[#EAEAEA] my-5 text-left inline-block [text-shadow:0px_30px_60px_rgba(0,_0,_0,_0.5)]">
            Explore our features
          </div>
          <div
            onClick={() => {
              setAnimePrompt(false);
              navigate("/imgupload");
            }}
            className="my-[5px]"
          >
            <img src="https://i.imgur.com/3l4MsH3.jpeg" alt="" />
          </div>
          <div
            onClick={() => {
              setAnimePrompt(false);

              navigate("/prompt-to-meme1");
            }}
            className="my-[25px]"
          >
            <img src="https://i.imgur.com/j718lzE.png" alt="" />
          </div>
          <div
            onClick={() => {
              setAnimePrompt(false);

              navigate("/prompt-to-meme1");
            }}
            className="mb-[25px]"
          >
            <img src="https://i.imgur.com/MHMmLUa.png" alt="" />
          </div>
          <div
            onClick={() => {
              setAnimePrompt(false);

              navigate("/vid-input");
            }}
          >
            <img src="https://i.imgur.com/09xvY8V.png" alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MemeTemplateDisplay;
