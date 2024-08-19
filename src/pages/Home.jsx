import React, { useState, useEffect } from "react";
import BackgroundImageDiv from "../components/BGImageDiv";
import { CoolMode } from "@/components/magicui/cool-mode";
import { Context } from "../context/ContextProvider";

import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

// import MarqueeDemo from "@/components/MagicCarousel";
// import MarqueeDemo, { ImageMarquee } from "@/components/MagicCarousel";
// import DopamemeCarousel, { CarouselDefault } from "@/components/Carousel";

const Home = () => {
  const {
    navActiveBar,
    setNavActiveBar,
    account,
    data,
    loader,
    setReload,
    isRegistered, setIsRegistered,
    read,
  } = React.useContext(Context);
  const navigate = useNavigate();
  const [carouselItems] = useState([
    "Meme 1",
    "Meme 2",
    "Meme 3",
    "Meme 4",
    "Meme 5",
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (!isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isHovered, carouselItems.length]);

  useEffect(() => {
    if (isRegistered) {
      console.log("registered no need to go back to register")
    }
    else
    if (data?.get_user_profile == null && account && read > 0) {
      console.log(data?.get_user_profile == null,account , read,isRegistered );
      navigate("/register");
    }
  }, [data, account, read]);

  return (
    <div className="bg-black">
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
      {/* Register Popup */}
      {/* <div
        className={` top-0 left-0 w-full h-full z-40 backdrop-filter backdrop-blur-sm ${
          data?.get_user_profile == null && account && read > 0
            ? "fixed"
            : "hidden"
        } `}
      >
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center min-h-[70vh] ">
          <RegisterModal reload={setReload} />
        </div>
      </div> */}
      <div className=" bg-black h-full m-0 p-0 overflow-hidden w-full ">
        <div className="relative m-0 p-0 h-[926px] w-full">
          <BackgroundImageDiv
            classs={``}
            imageUrl={`https://i.imgur.com/8HmKrpH.png`}
          >
            <div className="flex items-center justify-center overflow-hidden flex-col mx-auto w-full  ">
              <div className="flex flex-col items-center justify-center pb-20 w-full">
                <div className=" flex justify-between w-full px-4">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d60bf3a649fdca6695ddb981cda7bba4acd63df8089ea095b2623117a869d57?apiKey=b93734ecdcb94378af862d5b2ec71620&&apiKey=b93734ecdcb94378af862d5b2ec71620"
                    className="object-contain  aspect-[1.32] shadow-[0px_4px_4px_rgba(255,255,255,0.01)] w-[161px]"
                    alt="Dopameme Logo"
                  />

                  {account ? (
                    <div className="text-white my-auto ml-auto">
                      {" "}
                      <div
                        onClick={() => {
                          navigate("/profile");
                        }
                      }  className="w-max p-3  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200  flex gap-1 items-center justify-center relative rounded-md bg-darkorange-200 border-darkorange-100 border-[1px] border-solid box-border h-[2.25rem] overflow-hidden text-left text-[1.125rem] text-white font-inter">
                        <div className=" font-semibold">Profile</div>
                        <img
                          className=" max-h-full w-[0.938rem]"
                          alt=""
                          src="https://i.imgur.com/NXt28Wx.png"
                        />
                      </div>
                      {/* <div className="">
                        <DynamicWidget />
                      </div> */}
                    </div>
                  ) : (
                    <div className=" my-auto ml-auto">
                      <DynamicWidget />
                    </div>
                  )}
                </div>
                <div className="flex relative items-center justify-center gap-5 w-full self-start mt-4">
                  {/* <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2b1ca037d608a23629c1c679a818baf696ea82a49e45aeb5a3b71c070fbd09e?apiKey=b93734ecdcb94378af862d5b2ec71620&&apiKey=b93734ecdcb94378af862d5b2ec71620"
                    className="object-contain shrink-0 max-w-full aspect-[0.53] w-[183px]"
                    alt="Image 1"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ea71f84516bd62c814b9d21aa86273bfc1d10a5178dc7274c4a49ca16144691?apiKey=b93734ecdcb94378af862d5b2ec71620&&apiKey=b93734ecdcb94378af862d5b2ec71620"
                    className="object-contain shrink-0 max-w-full rounded-lg aspect-[0.55] w-[189px]"
                    alt="Image 2"
                  /> */}
                  <Carousel />
                  {/* <MarqueeDemo /> */}
                </div>
                <div className="flex flex-col text-[#d8d8d8] items-center justify-center px-7 mt-12 w-full font-semibold">
                  <div className="text-4xl tracking-tighter text-zinc-300">
                    Transform thoughts into{" "}
                    <span className="text-yellow-400">Memes</span> with
                    Dopameme.
                  </div>
                  <div className=" relative text-[1.125rem] font-medium font-inter text-[#8D8D8D] text-left inline-block">{`Make your self laugh on your own thoughts `}</div>
                  {/* <div
                    className="mt-1.5 text-lg font-medium text-neutral-400 overflow-hidden whitespace-nowrap"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <div
                      className="inline-block transition-transform duration-500 ease-in-out"
                      style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                      }}
                    >
                      {carouselItems.map((item, index) => (
                        <span key={index} className="inline-block w-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div> */}

                  <Link to="/choose" className={``}>
                    <div className="relative flex mt-20 justify-center rounded-xl border-[#F9E000] border-[0.7px] border-dashed box-border">
                      <CoolMode
                        options={{
                          particle: "https://i.imgur.com/yQ6d6MG.png",
                        }}
                      >
                        {/* <Button>Click Me!</Button> */}
                        <div
                          style={{ userSelect: "none" }}
                          className="flex relative overflow-hidden flex-col justify-center self-center px-2 py-1.5  w-full text-2xl tracking-tighter text-black rounded-xl max-w-[338px]"
                        >
                          <div
                            // onKeyUpCapture={() => {
                            //   navigate("/choose");
                            // }}
                            // onClick={() => {
                            //   navigate("/choose");
                            // }}
                            style={{ userSelect: "none" }}
                            className="flex relative  items-center justify-center overflow-hidden gap-2.5 px-16 py-4 bg-yellow-400 rounded-lg"
                          >
                            <div className="absolute left-0 top-0  w-[95px]">
                              <img
                                className=" object-contain top-0 left-0"
                                src="https://i.imgur.com/sx6NRfa.png"
                                alt=""
                              />
                            </div>
                            <div
                              style={{ userSelect: "none" }}
                              className="pl-3 w-max"
                            >{`Let's Laugh`}</div>
                            <img
                              style={{ userSelect: "none" }}
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2663d4c751120756e37a02d0711d2d720d0214396bfb9736f2d2a285bf2860dc?apiKey=b93734ecdcb94378af862d5b2ec71620&&apiKey=b93734ecdcb94378af862d5b2ec71620"
                              className="object-contain shrink-0 my-auto aspect-[2.14] w-[30px]"
                              alt="Laugh Icon"
                            />
                          </div>
                        </div>
                      </CoolMode>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </BackgroundImageDiv>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Home;
