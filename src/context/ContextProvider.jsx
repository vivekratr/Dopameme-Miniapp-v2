import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  contractABI,
  // contractABI2,
  contractAddress,
  // contractAddress2,
} from "../utils/Constants";

export const Context = React.createContext();

export const Provider = ({ children }) => {
  const { primaryWallet } = useDynamicContext();
  const [account, setAccount] = useState(null);
  const [connected, setConnected] = useState(false);
  const [reload, setReload] = useState(0);
  const [navActiveBar, setNavActiveBar] = useState("Home");
  const [read, setRead] = useState(false);
  const [memeType, setMemeType] = useState(0);
  const [regenerate, setRegenerate] = useState("");
  const [isRegistered, setIsRegistered] = useState(false)
  const [data, setData] = useState({
    view_all_posts: null,
    get_user_profile: null,
  });
 
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [result, setResult] = useState("");
  const [downloadLink, setDownloadLink] = useState(null);
  const [imgView, setImgView] = useState(null);
  const [context, setContext] = useState("");
  const [resultVideo, setResultVideo] = useState(null);
  const [animePrompt, setAnimePrompt] = useState(false)

  const fetchList = async () => {
    if (!account) return [];

    try {
      const signer = await primaryWallet?.connector?.ethers?.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const initialPromises = [contract.view_all_posts()];
      const isUserRegisteredResult = await contract.is_user_registered(account);

      let allPromises = [];
      allPromises.push(...initialPromises);

      if (isUserRegisteredResult) {
        const userSpecificPromises = [contract.get_user_profile(account)];
        allPromises.push(...userSpecificPromises);
      }

      const promiseResults = await Promise.all(allPromises);
      console.log("promises", promiseResults, isUserRegisteredResult);

      const d0 = promiseResults[0];
      const d1 = promiseResults[1];
      console.log("d0", d0);
      console.log("d1", d1);

      setData((prevData) => ({
        ...prevData,
        view_all_posts: d0,
        ...(isUserRegisteredResult && { get_user_profile: d1 }),
      }));

      console.log(data);

      setRead(true);
      setConnected(true);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

   useEffect(() => {
     console.log("ddd", data);
   }, [data]);
 async function isUserExist(_address) {
   if (!account) {
     alert("Connect Wallet");
     return [];
   }
   const signer = await primaryWallet?.connector?.ethers?.getSigner();

   const contract = new ethers.Contract(contractAddress, contractABI, signer);

   try {
     const userExists = await contract.is_user_registered(_address);
     // console.log("User exists:", userExists);
     return userExists;
   } catch (error) {
     console.log(error);
     return;
   }
 }

 async function genAi() {
   if (!account) {
     alert("Connect Wallet");
     return [];
   }
   // \end{code}
   const signer = await primaryWallet?.connector?.ethers?.getSigner();
   // const account2 = await signer.getAddress();
   // console.log("Account address:", account2);

   const contract = new ethers.Contract(contractAddress, contractABI, signer);

   try {
     const userExists = await contract.gen_image();
     userExists.wait();
     // console.log("User exists:", userExists);
     // spinner(false);
     return true;
   } catch (error) {
     // spinner(false);
     console.log(error);
     return false;
   }
 }

 async function savePost(index) {
   // spinner(true);
   // console.log("tip", _tip);
   if (!account) {
     alert("Connect Wallet");
     return [];
   }
   const signer = await primaryWallet?.connector?.ethers?.getSigner();

   // const account = await signer.getAddress();
   // console.log("Account address:", account);

   const contract = new ethers.Contract(contractAddress, contractABI, signer);

   try {
     const userExists = await contract.save_post(index);
     userExists.wait();
     // console.log("User exists:", userExists);
   } catch (error) {
     // spinner(false);

     console.log(error);
   }
 }

 async function PostMeme(caption, _img_url, spin) {
   spin(true);
   // console.log("caption", caption);
   // console.log("imgurl", _img_url);
   if (!account) {
     alert("Connect Wallet");
     return [];
   }
   await window.ethereum.request({ method: "eth_requestAccounts" });

   const signer = await primaryWallet?.connector?.ethers?.getSigner();

   // const account = await signer.getAddress();
   // console.log("Account address:", account);

   const contract = new ethers.Contract(contractAddress, contractABI, signer);

   try {
     const userExists = await contract.create_post(_img_url, caption);
     userExists.wait();
     // console.log("User exists:", userExists);
     spin(false);
   } catch (error) {
     spin(false);

     console.log(error);
   }
 }

 async function getUserDataFromAddress(addr) {
   if (!account) {
     alert("Connect Wallet");
     return [];
   }

   try {
     const signer = await primaryWallet?.connector?.ethers?.getSigner();

     // const account = await signer.getAddress();
     // console.log("Account address:", account);

     const contract = new ethers.Contract(contractAddress, contractABI, signer);

     const response = await contract.get_user_profile(addr);

     // console.log("getUserDataFromAddress", response);
     return response;
   } catch (e) {
     console.log(e);
   }
 }

 async function likePost(index) {
   if (!account) {
     alert("Connect Wallet");
     return [];
   }
   const signer = await primaryWallet?.connector?.ethers?.getSigner();

   const contract = new ethers.Contract(contractAddress, contractABI, signer);

   try {
     const userExists = await contract.like_post(index);
     userExists.wait();
   } catch (error) {
     console.log(error);
   }
 }

  useEffect(() => {
   console.log("reload",reload)
   fetchList();
   // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [account, reload]);
useEffect(() => {
  const intervalId = setInterval(() => {
    setReload((prevReload) => prevReload + 1);
  }, 5000); // Update every 5 seconds

  // Cleanup the interval on component unmount
  return () => clearInterval(intervalId);
}, []);
 useEffect(() => {
   const fetchAccount = async () => {
     if (primaryWallet?.connector?.ethers) {
       try {
         const signer = await primaryWallet.connector.ethers.getSigner();
         const accountAddress = await signer.getAddress();
         setAccount(accountAddress);
         console.log("Account address:", accountAddress);
       } catch (error) {
         console.error("Error fetching account address:", error);
       }
     }
   };

   fetchAccount();
 }, [primaryWallet]);
  return (
    <Context.Provider
      value={{
        image,
        loader,
        result,
        downloadLink,
        imgView,
        context,
        resultVideo,
        animePrompt,
        account,
        connected,
        navActiveBar,
      
        data,
        read,
        memeType,
        regenerate,
        isRegistered, setIsRegistered,
        setRegenerate,
        setMemeType,
        setRead,
        likePost,
        getUserDataFromAddress,
        PostMeme,
        savePost,
        genAi,
        isUserExist,
        setResultVideo,
        setContext,
        setImgView,
        setDownloadLink,
        setResult,
        setLoader,
        setImage,
        setNavActiveBar,
        setReload,
        setAnimePrompt,
      
      }}
    >
      {children}
    </Context.Provider>
  );
};
