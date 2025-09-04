"use client";
import Transition from "./transition.js";
import { Button, IconButton } from "./button.js";
import SvgIcon from "./svg-icon.js";

export default function Modal({ Tag, lang = "en", title, open, loading, icon, ...props }) {
  const cls = open ? "!h-full p-4 opacity-100" : "";
  const c = props.center ? "top-1/2 -translate-y-1/2" : "bottom-10 md:bottom-1/2 md:translate-y-1/2";

  return (
    <>
      <div
        className={`z-[9] fixed inset-0 h-0 p-0 bg-blur opacity-0 transition-opacity duration-200 ${cls}`}
        onClick={props.onCancel}
      ></div>

      <Transition
        Tag={Tag || "div"}
        base={`z-[9] fixed left-5 ${c} right-5 p-4 pt-10 overflow-hidden rounded-lg bg-bg dark:bg-dcbg md:min-w-[550px] md:max-w-xl mx-auto print:overflow-auto print:static print:top-0 print:text-t`}
        enter="opacity-100 md:scale-100"
        exit="opacity-0 translate-y-4 md:scale-75"
        time="300"
        open={open}
        aria-label={`${title} ${content.label[lang]}`}
        role="dialog"
        aria-modal="true"
      >
        {props.onCancel && (
          <IconButton
            icon="crossMark"
            onClick={props.onCancel}
            disabled={!!loading}
            title={content.cancel[lang]}
            cls="w-8 absolute top-3 right-3 hover:text-red print:hidden"
          />
        )}
        <div dir="ltr" className="block pb-4 md:flex justify-start">
          {icon && (
            <div
              className={`h-12 w-12 shrink-0 p-2 mx-auto mt-1 mb-3 md:mr-2 rounded-full ${
                icon === "warning" ? "bg-bg1 text-red" : "bg-pc text-t"
              }`}
            >
              {typeof icon === "string" ? <SvgIcon name={icon} /> : icon}
            </div>
          )}

          <div dir="auto" className="flex-auto">
            <h2 className="mb-1 mx-8 text-lg text-center print:text-3xl font-semibold">{title}</h2>
            <div className="max-h-[70vh] overflow-scroll no-srl-bar print:max-h-none print:overflow-auto">
              {props.children}
            </div>
          </div>
        </div>

        {props.onApprove && (
          <div className="text-right">
            <Button
              type={tag == "form" ? "submit" : ""}
              onClick={props.onApprove}
              loading={loading}
              cls="print:hidden w-full md:w-auto justify-center py-2"
            >
              {props.okBtn}
            </Button>
          </div>
        )}
      </Transition>
    </>
  );
}

const content = {
  cancel: { en: "Cancel and close the modal window", ar: "إلغاء وإغلاق النافذة" },
  label: { en: "modal window", ar: "نافذة مشروطة" },
};
