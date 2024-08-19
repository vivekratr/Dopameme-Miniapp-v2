import BackgroundImageDiv from "@/components/BGImageDiv";
import Footer from "@/components/Footer";
import React, { useEffect } from "react";
import {
  useBackButton,
  useClosingBehavior,
  useViewport,
} from "@telegram-apps/sdk-react";
import { useNavigate, useLocation } from "react-router-dom";
// import { ConnectButton } from "@rainbow-me/rainbowkit";


const Choose = () => {
   const bb = useBackButton();
   const close = useClosingBehavior(); // will be undefined or ClosingBehavior.
   const viewport = useViewport(); // will be undefined or InitData.
   const navigate = useNavigate();
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
  const logoImage =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/e3ee107b406cfa4d85e602cf317db9b31c57c7ef1f7062354cd44e8deed63b1d?apiKey=b93734ecdcb94378af862d5b2ec71620&&apiKey=b93734ecdcb94378af862d5b2ec71620";
  const backgroundImage =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/881238852a3c44c125b6abe60103ba0d6d04edc472027755ae14c64abbf73d38?apiKey=b93734ecdcb94378af862d5b2ec71620&&apiKey=b93734ecdcb94378af862d5b2ec71620";
  const arrowIcon =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/2324ed6bbee2710bf8ec1e4425792e8424cf8e24a89b8c8c4b79c889876dc6f0?apiKey=b93734ecdcb94378af862d5b2ec71620&&apiKey=b93734ecdcb94378af862d5b2ec71620";

  const ContentCard = ({ title, nav, link }) => (
    <div
      onClick={() => {
        navigate(nav);
      }}
      className="flex overflow-hidden flex-col mt-10 bg-white rounded-xl"
    >
      <div className="flex relative flex-col pt-2.5 pr-4 pb-5 pl-2.5 w-full aspect-[1.54]">
        <img
          loading="lazy"
          src={link}
          className="object-cover absolute inset-0 size-full"
        />
        <div className="relative text-2xl font-bold tracking-tighter">
          {title}
        </div>
        <div className="w-[242px]  -bottom-32 relative self-center rounded-lg bg-[#070707C7] flex items-center justify-center h-[3.125rem] overflow-hidden text-left text-[1.375rem] text-white font-inter">
          <b className=" tracking-[-0.04em] [text-shadow:0px_30px_60px_rgba(0,_0,_0,_0.5)]">
            LAUGH NOW
          </b>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative flex md:h-full mx-auto h-[950px]  max-w-[480px]">
      <BackgroundImageDiv imageUrl={`https://i.imgur.com/0stY04x.png`}>
        <div className="flex overflow-hidden h-[900px] flex-col mx-auto w-full text-white  max-w-[480px]">
          <div className="flex overflow-hidden max-w-[480px] mx-auto flex-col px-3.5 pt-8 pb-36 w-full">
            <img
              loading="lazy"
              src={logoImage}
              className="object-contain max-w-full aspect-[1.31] shadow-[0px_4px_4px_rgba(255,255,255,0.01)] w-[117px] mx-auto"
            />
            <div className="self-start mt-10 mx-auto text-2xl font-semibold tracking-tighter text-[#B9B9B9]">
              A One stop Fun Platform
            </div>
            {/* <div className="ml-auto flex items-center">
              <ConnectButton accountStatus={"avatar"} chainStatus={"icon"} />
            </div> */}
            <ContentCard
              nav={`/type`}
              title="Memes"
              link="https://i.imgur.com/GZjiXeN.png"
            />
            <ContentCard
              nav={`/game`}
              link={"https://i.imgur.com/G4Gkut2.png"}
              title="Games"
            />
          </div>
        </div>
        <Footer />
      </BackgroundImageDiv>
    </div>
  );
};

export default Choose;
