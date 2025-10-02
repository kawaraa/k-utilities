"use client";
import { useRef, useState } from "react";
import Transition from "./transition";
import SvgIcon from "./svg-icon";
import { cardCls } from "./tw/layout";

export default function Tooltip({ children, description, size, cls }) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const descRef = useRef();
  const rect = descRef.current?.getBoundingClientRect();

  const getPosition = () => {
    if (!rect) return "";
    // window.innerWidth, window.innerHeight
    const bottom = window.innerHeight - rect.y;
    const right = window.innerWidth - rect.x;
    const topBottom =
      rect.y > bottom && bottom < 200 ? "top" : rect.y < bottom && rect.y < 200 ? "bottom" : "top";
    const leftRight = right < rect.x && right < 200 ? "left" : rect.x < right && rect.x < 200 ? "right" : "";
    return topBottom && leftRight ? `${topBottom}-${leftRight}` : topBottom || leftRight;
  };

  const positionBaseClasses = () => {
    const position = getPosition();
    switch (position) {
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2";
      case "left":
        return "right-full top-1/2 -translate-y-1/2";
      case "right":
        return "left-full top-1/2 -translate-y-1/2";
      case "top-left":
        return "bottom-full right-0";
      case "top-right":
        return "bottom-full left-0";
      case "bottom-left":
        return "top-full right-0";
      case "bottom-right":
        return "top-full left-0";
      default:
        return "bottom-full left-1/2 -translate-x-1/2";
    }
  };

  const sizeClasses = (size) => {
    switch (size) {
      case "lg":
        return "min-w-82 p-3";
      case "md":
        return "min-w-56 p-3";
      case "sm":
        return "min-w-44 p-2";
      default:
        return "p-2";
    }
  };

  const positionInterClasses = () => {
    const position = getPosition();
    switch (position) {
      case "top":
        return "mb-2";
      case "bottom":
        return "mt-2";
      case "left":
        return "mr-2";
      case "right":
        return "ml-2";
      case "top-left":
        return "mb-2";
      case "top-right":
        return "mb-2";
      default:
        return "mt-2";
    }
  };

  return (
    <div
      className={`relative inline-flex select-none ${cls || ""}`}
      onClick={() => setTooltipOpen(!tooltipOpen)}
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
    >
      <button
        ref={descRef}
        type="button"
        // title={description}
        role="tooltip"
        aria-label={"Tooltip. " + (description || "")}
        className="inline-block w-4 h-4 mx-1 cursor-help"
      >
        <SvgIcon name="exclamationMark" />
      </button>

      <Transition
        Tag="span"
        open={tooltipOpen}
        base={`z-[7] block absolute rounded-md ${cardCls} border border-bc dark:border-t shadow-lg 
          ${positionBaseClasses()} 
          ${sizeClasses(size)}`}
        enter={`opacity-100 ${positionInterClasses()}`}
        exit="m-0 opacity-0 translate-y-0"
        time="100"
      >
        {description || children}
      </Transition>
    </div>
  );
}

/**
  <Tooltip >nibcwirb ni vpjwnvp vpwbvpiw vpwjvnpw vpwijvn</Tooltip>
  <Tooltip description="nibcwirb ni vpjwnvp vpwbvpiw vpwjvnpw vpwijvn"/>
*/
