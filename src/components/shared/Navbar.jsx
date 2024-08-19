import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  console.log(pathname);

   const logoImage =
     "https://cdn.builder.io/api/v1/image/assets/TEMP/e3ee107b406cfa4d85e602cf317db9b31c57c7ef1f7062354cd44e8deed63b1d?apiKey=b93734ecdcb94378af862d5b2ec71620&&apiKey=b93734ecdcb94378af862d5b2ec71620";


  return (
    <nav className="">
      <div className="flex items-end">
        <img
          loading="lazy"
          src={logoImage}
          width={82.8}
          height={21.6}
          className="  shadow-[0px_4px_4px_rgba(255,255,255,0.01)] "
        />
        {/* <img src="/rabble.svg" alt="Rabble" width={82.8} height={21.6} /> */}
        <div className="ml-auto flex items-center">
          <ConnectButton accountStatus={"avatar"} chainStatus={"icon"} />
        </div>
      </div>
      <hr className="bg-black my-2" />
      <div className="flex space-x-4">
        <Link
          to="/"
          className={`${
            pathname === "/" ? "text-rabble" : "text-color hover:text-color/90"
          }`}
        >
          {/* Home */}
        </Link>
        <Link
          to="/choose"
          className={`${
            pathname === "/choose"
              ? "text-rabble"
              : "text-color hover:text-color/90"
          }`}
        >
          {/* Contract */}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
