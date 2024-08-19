import RegisterModal from "@/components/RegisterModal";
import SearchComponent from "@/components/Search_Explore";
import React from "react";
import { Context } from "../context/ContextProvider";


const Explore = () => {

       const {
         setNavActiveBar,
         setLoader,
         likePost,
         savePost,
         setReload,
         account,
         read,
         data,
         loader,
       } = React.useContext(Context);
  const logoImage =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/e3ee107b406cfa4d85e602cf317db9b31c57c7ef1f7062354cd44e8deed63b1d?apiKey=b93734ecdcb94378af862d5b2ec71620&&apiKey=b93734ecdcb94378af862d5b2ec71620";

  return (
    <div className="flex flex-col items-center  bg-[url('https://i.imgur.com/n8gBxXu.png')] min-h-screen bg-cover bg-center">
      <img
        loading="lazy"
        src={logoImage}
        className="object-contain max-w-full aspect-[1.31] mb-[98px] shadow-[0px_4px_4px_rgba(255,255,255,0.01)] w-[117px] mx-auto"
      />

      <div className=" max-w-[100%]">
        <div className=" w-[90%] mx-auto">
          <SearchComponent />
        </div>

        <div>
          <div
            className="grid px-[25px]
        
        grid-cols-12 gap-5 my-6"
          >
            {data?.view_all_posts &&
              // Array.isArray(data.view_all_posts[0]) &&
              data.view_all_posts.map((_data, _index) => {
                console.log("inside explore post", _data, _index);
                return (
                  <div key={_index} className=" col-span-6">
                    <div className="flex flex-col gap-5">
                      <img
                        className=" w-[410px] rounded-xl object-cover"
                        src={_data[2]}
                        alt=""
                      />
                      <div className=" flex gap-6 px-7 justify-end">
                        <img
                          onClick={async () => {
                            setLoader(true);
                            await savePost(_index);
                            setLoader(false);
                          }}
                          className=" cursor-pointer h-[26px] object-cover"
                          src="https://i.imgur.com/Yr9KWwO.png"
                          alt="saved  post"
                        />
                        <img
                          onClick={async () => {
                            setLoader(true);
                            await likePost(_index);
                            setLoader(false);
                          }}
                          className=" cursor-pointer h-[26px] object-cover"
                          src="https://i.imgur.com/32UBNkm.png"
                          alt="Like"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
