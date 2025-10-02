"use client";
import { useRef } from "react";
import SvgIcon from "./svg-icon";
import { cardCls } from "./tw/layout";

export default function SearchBox({ onSearch, onFinish, cls = "", inCls = "", ...p }) {
  const inputRef = useRef();

  const handleFinish = (e) => {
    e.preventDefault();
    const text = inputRef.current?.value.toLowerCase().trim();
    if (onFinish) return onFinish(text);
  };

  return (
    <form onSubmit={handleFinish} dir="ltr" className={`${cardCls} !p-0 relative flex items-center ${cls}`}>
      <input
        ref={inputRef}
        type="search"
        name="search"
        onChange={(e) => onSearch && onSearch(e.target.value.toLowerCase().trim())}
        autoComplete="search"
        className={`w-full !p-1 !pl-3 !pr-10 bg-[transparent] leading-9 rounded-xl peer ${inCls}`}
        {...p}
      />

      <button type="submit" className="absolute right-4 w-5 cursor-pointer hover:text-blue-400">
        <SvgIcon name="search" />
      </button>
    </form>
  );
}
