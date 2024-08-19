import ProfileCard from "@/components/ProfileCard";
import RegisterModal from "@/components/RegisterModal";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import React, { useState, useEffect } from "react";
import { Context } from "../context/ContextProvider";
import BuyCoin from "@/components/BuyCoin";
import Loader from "@/components/Loader";


const Profile = () => {
  const [userPost, setUserPost] = useState(null);
  const [savedPost, setSavedPost] = useState(null);
  const [buyCoinModal, setBuyCoinModal] = useState(false);



    const {
      setNavActiveBar,
      setLoader,
      likePost,
      savePost,
      reload,
      setReload,
      account,
      read,
      data,
      loader,
    } = React.useContext(Context);
  const [activeButton, setActiveButton] = useState("public");

  const logoImage =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/e3ee107b406cfa4d85e602cf317db9b31c57c7ef1f7062354cd44e8deed63b1d?apiKey=b93734ecdcb94378af862d5b2ec71620&&apiKey=b93734ecdcb94378af862d5b2ec71620";

    function handleActiveButton(button) {
      setActiveButton(button);
    }
      useEffect(() => {
          setNavActiveBar("profile");
          console.log("data type of userpost",typeof(userPost),userPost);
          console.log();
        // setReload((prev) => prev + 1);
        if (data && data.get_user_profile) {
          setUserPost(data?.get_user_profile[6]);
          setSavedPost(data?.get_user_profile[7]);
        }
        // setReload(prev=>prev+1)
      }, [data,userPost]);
  return (
    <div className="flex flex-col pb-20 overflow-hidden h-max items-center  bg-[url('https://i.imgur.com/n8gBxXu.png')] min-h-screen bg-cover bg-center">
      {/* Buycoin */}
      <div
        className={` top-0 left-0 w-full h-full z-40 backdrop-filter backdrop-blur-sm ${
          buyCoinModal ? "fixed" : "hidden"
        } `}
      >
        <BuyCoin run={setBuyCoinModal} />
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center min-h-[70vh] "></div>
      </div>
      {/* Buycoin end */}
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
      <div className="flex justify-between max-h-[200px]  ">
        <img
          loading="lazy"
          src={logoImage}
          className="object-contain max-w-full h-max aspect-[1.31] mb-[98px] shadow-[0px_4px_4px_rgba(255,255,255,0.01)] w-[117px] mx-auto"
        />
        <div>
          <div className=" w-[60%] mt-[30px] h-max  my-auto ml-auto">
            <DynamicWidget height={"300"} />
          </div>
        </div>
      </div>

      <div className=" max-w-[100%] -mt-20">
              <ProfileCard coinModal={setBuyCoinModal} d={data?.get_user_profile} />
      </div>

      <div className=" mt-8 w-[90%] flex justify-center items-center gap-4 ">
        <div
          onClick={() => {
            handleActiveButton("public");
          }}
          className="w-max  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 relative text-[0.91rem] font-medium font-inter text-white text-left inline-block"
        >
          Public Memes
          {activeButton == "public" && (
            <div className=" mt-2 w-full h-0.5 bg-white"></div>
          )}
        </div>
        <div
          onClick={() => {
            handleActiveButton("private");
          }}
          className="w-max  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 relative text-[0.91rem] font-medium font-inter text-white text-left inline-block"
        >
          Private Memes
          {activeButton == "private" && (
            <div className=" mt-2  h-0.5 bg-white"></div>
          )}
        </div>
        <div
          onClick={() => {
            handleActiveButton("saved");
          }}
          className="w-max  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 relative text-[0.91rem] font-medium font-inter text-white text-left inline-block"
        >
          Saved Memes
          {activeButton == "saved" && (
            <div className=" mt-2 w-full h-0.5 bg-white"></div>
          )}
        </div>
      </div>

      {/* posts */}
      <div className="grid px-[34px] grid-cols-12 gap-2 gap-y-7 my-6">
        {activeButton == "public" && userPost &&
          userPost?.map((post, _index) => {
            let _num = Number(post) - 1;
            console.log(data?.view_all_posts[_num], _num);
            return (
              <div key={_index} className=" col-span-12">
                <div className="flex flex-col gap-5">
                  <img
                    draggable={`false`}
                    className=" w-[410px] object-cover"
                    src={data?.view_all_posts[_num][2]}
                    alt=""
                  />
                  <div className=" flex gap-6 px-7 justify-end">
                    <img
                      draggable={`false`}
                      onClick={async () => {
                        setLoader(true);
                        await savePost(_index);
                        setLoader(false);
                      }}
                      className=" cursor-pointer h-[26px] object-cover"
                      src="https://i.imgur.com/Yr9KWwO.png"
                      alt=""
                    />
                    <img
                      draggable={`false`}
                      onClick={async () => {
                        setLoader(true);
                        await likePost(_index);
                        setLoader(false);
                      }}
                      className=" cursor-pointer h-[26px] object-cover"
                      src="https://i.imgur.com/32UBNkm.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            );
          })}

        {activeButton == "saved" && savedPost &&
          savedPost?.map((post, _index) => {
            let _num = Number(post);
            console.log(data?.view_all_posts[_num], _num);
            return (
              <div key={_index + post} className=" col-span-12">
                <div className="flex flex-col gap-5">
                  <img
                    draggable={`false`}
                    className=" w-[410px] object-cover"
                    src={data?.view_all_posts[_num][2]}
                    alt=""
                  />
                  <div className=" flex gap-6 px-7 justify-end">
                    <img
                      draggable={`false`}
                      onClick={async () => {
                        setLoader(true);
                        await savePost(_index);
                        setLoader(false);
                      }}
                      className=" cursor-pointer h-[26px] object-cover"
                      src="https://i.imgur.com/Yr9KWwO.png"
                      alt=""
                    />
                    <img
                      draggable={`false`}
                      onClick={async () => {
                        setLoader(true);
                        await likePost(_index);
                        setLoader(false);
                      }}
                      className=" cursor-pointer h-[26px] object-cover"
                      src="https://i.imgur.com/32UBNkm.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Profile;
