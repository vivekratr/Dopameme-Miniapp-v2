import * as React from "react";
// import MemeCard from "./MemeCard";
import './css/MemeTrending.css'
import MemeGrid from "./MemeGrid";
const trendingMemes = [
  { size: "h-[287px]", width: "w-full" },
  { size: "h-[179px]", width: "w-[179px]" },
  { size: "h-[104px]", width: "w-full" },
  { size: "h-[179px]", width: "w-[179px]" },
  { size: "h-[179px]", width: "w-[179px]" },
  { size: "h-[211px]", width: "w-full" },
];

function MemeCard({ size, width }) {
  return (
    <div
      className={`flex shrink-0 mt-2.5 bg-white rounded-2xl ${size} ${width}`}
    />
  );
}

function TrendingMemes() {
    const memes = [
      { url: "https://i.imgur.com/VeJF7Zo.png" },
      { url: "https://i.imgur.com/VeJF7Zo.png" },
      { url: "https://i.imgur.com/VeJF7Zo.png" },
      { url: "https://i.imgur.com/VeJF7Zo.png" },
      { url: "https://i.imgur.com/VeJF7Zo.png" },
      { url: "https://i.imgur.com/VeJF7Zo.png" },
      { url: "https://i.imgur.com/VeJF7Zo.png" },
      { url: "https://i.imgur.com/VeJF7Zo.png" },
      { url: "https://i.imgur.com/VeJF7Zo.png" },
      // Add more memes here
    ];
  return (
    <div className=" bg-black">
      <div className=" w-full  overflow-hidden r pb-72 mx-auto  text-lg font-semibold text-black bg-[url('https://i.imgur.com/0stY04x.png')] min-h-screen bg-cover bg-center max-w-[480px]">
        <div className="flex flex-col items-center w-[90%] mx-auto">
          <div>
            <img
              className=" w-[117px] h-[89px] "
              src="https://i.imgur.com/dyw05QI.png"
              alt=""
            />
          </div>
          {/* search bar */}
          <div className="relative my-6">
            <form className="form">
              <label htmlFor="search">
                <input
                  className="input"
                  type="text"
                  required=""
                  placeholder="Search twitter"
                  id="search"
                />
                <div className="fancy-bg"></div>
                <div className="search">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr"
                  >
                    <g>
                      <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
                  </svg>
                </div>
                <button className="close-btn" type="reset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </label>
            </form>
          </div>

          {/* filter */}
          <div className="w-full mb-[30px] flex items-center justify-evenly">
            <div className="w-[128px] relative flex items-center  justify-center rounded-[81px] bg-[#9f9f9f] border-[#9f9f9f] border-[1px] border-solid box-border h-[2.563rem] overflow-hidden text-center text-[1.25rem] text-white font-inter">
              <div className=" leading-[1.25rem] font-medium">Web 3.0</div>
            </div>
            <div className="w-[128px] relative flex items-center  justify-center rounded-[81px] bg-[#9f9f9f] border-[#9f9f9f] border-[1px] border-solid box-border h-[2.563rem] overflow-hidden text-center text-[1.25rem] text-white font-inter">
              <div className=" leading-[1.25rem] font-medium">Upset</div>
            </div>
            <div className="w-[128px] relative flex items-center  justify-center rounded-[81px] bg-[#9f9f9f] border-[#9f9f9f] border-[1px] border-solid box-border h-[2.563rem] overflow-hidden text-center text-[1.25rem] text-white font-inter">
              <div className=" leading-[1.25rem] font-medium">Happy</div>
            </div>
          </div>

          {/* layout */}

          <div className="min-h-screen bg-black text-white">
            <MemeGrid memes={memes} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingMemes;
