"use client";
import { useEffect, useRef, useState } from "react";
import SvgIcon from "./svg-icon";
import Transition from "./transition";
import { cardCls } from "./tw/layout";
const itemCls =
  "w-full px-4 py-2 mb-1 odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900/50 dark:even:bg-gray-950";

export default function Dropdown({ btn, icon, items, children, event, alt, url, key, onSelect, ...props }) {
  const wrapper = useRef(null);
  const [active, setActive] = useState(false);
  const rect = wrapper.current?.getBoundingClientRect();
  const btnProps = {};

  if (event !== "click") {
    btnProps.onMouseEnter = () => setActive(true);
    btnProps.onMouseLeave = () => setActive(false);
  }

  const getPosition = () => {
    if (!rect) return "";
    const right = window.innerWidth - rect.x;
    return right < rect.x && right < 200 ? "left" : rect.x < right && rect.x < 200 ? "right" : "left";
  };

  const positionBaseClass = () => {
    const position = getPosition();
    switch (position) {
      case "left":
        return "right-0";
      default:
        return "left-0";
    }
  };
  useEffect(() => {
    setActive(false);
  }, [url]);

  useEffect(() => {
    if (event === "click") {
      const clickHandler = (e) => !wrapper.current?.contains(e.target) && setActive(false);
      window.document.addEventListener("click", clickHandler);
      return () => window.document.removeEventListener("click", clickHandler);
    }
  }, [event]);

  const mt = event == "click" ? "mt-[10px]" : "";
  return (
    <div ref={wrapper} {...btnProps} className={`relative inline-block select-none ${props.cls || ""}`}>
      <button
        type="button"
        onClick={() => setActive(!active)}
        className={`overflow-hidden flex flex-col w-full items-center justify-center rounded-md hover:text-blue-400 ${
          props.btnCls || ""
        }`}
        title={alt || "menu"}
        aria-label={alt}
        aria-expanded={active}
        aria-haspopup="menu"
      >
        {icon && <span className="w-8">{typeof icon === "string" ? <SvgIcon name={icon} /> : icon}</span>}
        {btn && <span className="px-1">{btn}</span>}
      </button>

      <Transition
        Tag="ul"
        open={active}
        // onClick={() => setActive(false)}
        base={`${cardCls} px-0 z-[7] absolute ${positionBaseClass()} max-h-[85vh] w-max max-w-64 flex flex-col overflow-scroll no-srl-bar !rounded-md`}
        enter={`opacity-100 scale-100 ${mt} mr-0 translate-x-0 translate-y-0`}
        exit={`border-none opacity-0 scale-90 translate-x-4 translate-y-2`}
        time="100"
      >
        {items &&
          items.map((item, i) => (
            <li role="menuitem" className="flex" key={i}>
              {item.path ? (
                <a
                  onClick={() => onSelect && onSelect(item[key] || item)}
                  href={item.path}
                  className={itemCls}
                >
                  {item[key] || item}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelect && onSelect(item[key] || item)}
                  className={itemCls}
                >
                  {item[key] || item}
                </button>
              )}
            </li>
          ))}

        {children}
      </Transition>
    </div>
  );
}

/** Usage:
<Dropdown btn="xxx" items={["Account settings", "Support"]} event="click" onSelect={console.log}>
  <li className="min-w-64">
    item 1 item 1 item 1 item 1 item 1 item 1 item 1 item 1 item 1 item 1 item 1 item 1
  </li>
</Dropdown>
*/
