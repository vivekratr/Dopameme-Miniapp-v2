import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/ContextProvider";
import Footer from "@/components/Footer";
// import { useNavigate } from "react-router-dom";

const ImageUploader = () => {
  // const navigate = useNavigate();
  const { image, setImage, imgView, setImgView } = useContext(Context);

  //   const [image, setImage] = useState(null);
  const cameraRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setImage(reader.result);
        setImgView(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDivClick = () => {
    inputRef.current.click();
  };
  const handleCameraClick = () => {
    cameraRef.current.click();
  };

  useEffect(() => {
    // navigate('gen');
  }, [image]);

  return (
    <div className="w-full ">
      <div className="w-[90%] mt-40 mx-auto bg-[#82828285] relative rounded-[15px]  box-border h-[17.563rem] overflow-hidden text-center text-[1.438rem] text-black font-inter border-[1px] border-dashed border-white">
        <div className="flex flex-col h-full w-full items-center justify-evenly">
          <div id="fromDevice" onClick={handleCameraClick}>
            <img
              className="w-[190px] h-[60px] object-cover bg-none"
              alt=""
              src="https://i.imgur.com/y47Uf9w.png"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              ref={cameraRef}
            />
          </div>

          <div className="fromCamera" onClick={handleDivClick}>
            <img
              className="w-[190px] h-[60px] object-cover"
              src="https://i.imgur.com/Spe9MLs.png"
              alt=""
            />
            <input
              type="file"
              accept="image/*"
              capture="camera"
              onChange={handleImageChange}
              ref={inputRef}
              className="hidden"
            />
          </div>
          {/* 
        {image && (
            <img
            src={image}
            alt="Selected"
            className="w-64 h-64 object-cover border border-gray-300"
            />
        )} */}
        </div>
      </div>
      <div className=" place-items-end self-end  justify-self-end end mt-40">
        <Footer />
      </div>
    </div>
  );
};

export default ImageUploader;
