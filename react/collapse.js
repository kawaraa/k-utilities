"use client";
import { useEffect, useState } from "react";
import Transition from "./transition";
import ToggleSwitch from "./toggle-switch";
import SvgIcon from "./svg-icon";
import { borderCls } from "./tw/layout";

export default function Collapse({ children, title, checked, onCheck, name, cls, hCls = "justify-between" }) {
  // if (accordion) console.log("This a accordion, means only one panel can be expanded at a time.");
  const [active, setActive] = useState(checked || false);
  const activeCls = active ? "border-b-1 border-b-neutral-200 dark:border-b-neutral-700 rounded-b-none" : "";
  const headerClass = `flex w-full px-3 py-2 rounded-lg ${activeCls} ${hCls}`;

  useEffect(() => {
    setActive(checked ? true : false);
  }, [checked]);

  return (
    <div className={`${borderCls} rounded-lg !p-0 dark:border-bf ${onCheck && "rounded-lg"} ${cls || ""}`}>
      {onCheck ? (
        <div className={`${headerClass} ${hCls}`}>
          <span className="mx-1">{title}</span>
          <ToggleSwitch name={name} cls={cls?.replace(" ", "") || ""} checked={checked} onChange={onCheck} />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => !onCheck && setActive(!active)}
          aria-expanded={active}
          className={`${headerClass} ${hCls}`}
        >
          <span className="mx-1">{title}</span>
          <span className={`h-6 w-6 ${!active && "-rotate-90"} duration-300`}>
            <SvgIcon name="chevronDown" />
          </span>
        </button>
      )}

      <Transition
        Tag="div"
        base="overflow-hidden p-2"
        enter="max-h-[1000px]"
        exit="max-h-[0px]"
        time="300"
        open={active}
      >
        {children}
      </Transition>
    </div>
  );
}
