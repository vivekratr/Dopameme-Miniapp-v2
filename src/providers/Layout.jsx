import React, { useEffect } from "react";
import Navbar from "../components/shared/Navbar";
import { Toaster } from "../components/ui/sonner";
import {
  useBackButton,
  useClosingBehavior,
  useViewport,
} from "@telegram-apps/sdk-react";
import { useNavigate, useLocation } from "react-router-dom";


function Layout({ children }) {
  const bb = useBackButton();
  const close = useClosingBehavior(); // will be undefined or ClosingBehavior.
  const viewport = useViewport(); // will be undefined or InitData.
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function goBack() {
      if (location.pathname !== "/") {
        navigate(-1); // Go back in history
      } else {
        // navigate(-1); // Go back in history

        bb?.hide(); // Hide back button if at the root
      }
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
      } else {
        bb.show();
        console.log(bb);
        bb.on("click", goBack);
      }
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (bb) {
        bb.off("change:isVisible", goBack);
      }
    };
  }, [bb, navigate, location, close, viewport]);

  return (
    <main className="bg-background">
      {/* <Navbar /> */}
      <main className="">{children}</main>
      <Toaster richColors />
    </main>
  );
}

export default Layout;
