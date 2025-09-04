"use client";
import { useEffect, useState } from "react";
import { IconButton } from "./button.js";

export default function ScrollToTopBtn({ cls = "" }) {
  let [visible, setVisible] = useState(false);

  const handleScrollEvent = () => {
    if (document.documentElement.scrollTop > 2000) setVisible(true);
    else setVisible(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return !visible ? null : (
    <IconButton
      icon="chevronDown"
      onClick={() => window.scroll(0, 0) + setTimeout(() => setVisible(false), 400)}
      cls={`w-16 rotate-180 fixed bottom-5 right-1/2 translate-x-1/2 !p-0 rounded-full border-2 
        ${cls || "hover:border-blue-400"}`}
    />
  );
}
