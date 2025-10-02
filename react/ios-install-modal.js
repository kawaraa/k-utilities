"use client";
import { useEffect, useState } from "react";
import Modal from "./modal";

export default function IosInstallModal({ lang, iconSrc = "/apple-touch-icon.png", name }) {
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    localStorage.setItem("shownIosInstallModal", "true");
    setOpen(false);
  };

  const shouldShowIosInstallModal = () => {
    const isIos = /iphone|ipad|ipod/gim.test(window.navigator.userAgent); // detect if the device is on iOS
    const isInstalled = window.navigator.standalone; // check if the device is in standalone mode
    return isIos && !isInstalled && !JSON.parse(localStorage.getItem("shownIosInstallModal"));
  };

  useEffect(() => {
    if (shouldShowIosInstallModal()) setTimeout(() => setOpen(true), 1000);
  }, [lang]);

  return (
    <Modal lang={lang} title={content.title[lang]} open={open} onCancel={() => handleCancel(false)}>
      <div className="h-12 w-12 mx-auto rounded-full">
        <img src={iconSrc} width="100" height="100" alt={content.imgAlt[lang]} />
      </div>
      <div className="mb-4 mt-1 text-medium font-semibold text-center">{name || ""}</div>
      <p dir="auto" className="text-center">
        {content.p[lang][0]}
      </p>

      <p dir="auto" className="mt-5 flex justify-center items-center flex-wrap">
        {content.p[lang][1]}
        <span className="pb-2 w-10 min-w-[40px] text-blue cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3.5 0 19 19" fill="currentColor">
            <path d="M11.182 6.771v9.364a.497.497 0 0 1-.496.495H1.314a.497.497 0 0 1-.496-.495V6.771a.497.497 0 0 1 .496-.495h3.259v1.108H1.927v8.138h8.146V7.384h-2.65V6.276h3.263a.497.497 0 0 1 .496.495zM8.91 4.97a.554.554 0 0 1-.783 0L6.552 3.394v7.36a.554.554 0 0 1-1.109 0v-7.36L3.87 4.97a.554.554 0 0 1-.784-.783l2.52-2.521a.554.554 0 0 1 .784 0l2.521 2.52a.554.554 0 0 1 0 .784z" />
          </svg>
        </span>
        {content.p[lang][2]} <span className="w-1 max-w-[2px]"></span>
        <span className="font-semibold">{content.p[lang][3]}</span>
      </p>
    </Modal>
  );
}

const content = {
  title: { en: "", ar: "" },
  p: {
    en: [
      "install this application on your home screen for quick and easy access when you're on the go",
      "Just tap",
      "then",
      "'Add to Home Screen'",
    ],
    ar: [
      "قم بتثبيت هذا التطبيق على شاشتك الرئيسية للوصول السريع والسهل أثناء التنقل",
      "فقط اضغط",
      "ثم",
      "'إضافة إلى الصفحة الرئيسية'",
    ],
  },
  imgAlt: { en: "ArabLocalMarket Logo", ar: "شعار السوق المحلي العربي" },
};

/** Usage
 <IosInstallModal lang="en" iconSrc="/apple-touch-icon.png" name = "The App Name"/>
*/
