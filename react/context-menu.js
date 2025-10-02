"use client";
import { useEffect, useRef, useState } from "react";
import { cardCls } from "./tw/layout";
const defaultClass = "hidden h-0 w-0 border-none";

// Note: the parent should have position="relative" so this menu appears on mouse right click within the parent
export default function ContextMenu({ children }) {
  const menu = useRef(null);
  const [cls, setCls] = useState(defaultClass);

  useEffect(() => {
    const list = menu.current;
    if (list) {
      const clickHandler = () => setCls(defaultClass);

      const rightClickHandler = (e) => {
        if (list.contains(e.target)) return;
        e.preventDefault();
        console.log(e.offsetX, e.offsetY);
        const c = `block top-[${e.offsetY}px] right-[${e.offsetX}px] w-auto`;

        setCls(c + " opacity-0 scale-0 -mt-10 -mr-10");

        setTimeout(() => setCls(c), 120);
      };

      // Todo: contextmenu event is not supported in IOS, need to implement one using touchstart, touched and pointer event
      // list.parentElement.addEventListener("touchstart", clickHandler);
      list.parentElement.addEventListener("click", clickHandler);
      list.parentElement.addEventListener("contextmenu", rightClickHandler);
      return () => {
        list.parentElement.removeEventListener("click", clickHandler);
        list.parentElement.removeEventListener("contextmenu", rightClickHandler);
      };
    }
  }, [menu]);

  return (
    <ul
      ref={menu}
      role="menu"
      tabIndex="0"
      className={`${cardCls} z-15 fixed overflow-hidden py-1 mt-2 !rounded-md select-none duration-300 ${cls}`}
    >
      {cls && children}
    </ul>
  );
}

/** Usage: (Not finished yet)
//  <div className="text-center w-full relative">
//    <p>kfjbwhrvfwefvweljl</p>
//    <p>kfjbwhrvfwefvweljl</p>
//    <p>kfjbwhrvfwefvweljl</p>
//    <p>kfjbwhrvfwefvweljl</p>
//    <ContextMenu>
//      <li className="min-w-64">item item 1</li>
//      <li className="min-w-64">item item 1</li> <li className="min-w-64">item item 1</li>{" "}
//      <li className="min-w-64">item item 1</li> <li className="min-w-64">item item 1</li>
//    </ContextMenu>
//  </div>;
*/
