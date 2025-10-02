"use client";
import { borderCls } from "./tw/layout";

export default function ToggleSwitch({ children, label, size = 50, cls, ...p }) {
  const h = Math.round(+size / 2);

  return (
    <div className={`inline-flex items-center ${cls} has-disabled:text-gray-500 "`}>
      {children}

      <label
        htmlFor={cls}
        dir="ltr"
        style={{ width: `${size}px`, height: `${h}px` }}
        className={`overflow-hidden relative inline-flex items-center rounded-full cursor-pointer`}
      >
        <input
          type="checkbox"
          id={cls}
          className={`appearance-none ${borderCls} peer absolute top-0 left-0 w-full h-full cursor-pointer dark:bg-neutral-900 rounded-full checked:bg-blue-300 transition !border-blue-400 focus:border-2 disabled:bg-gray-50 disabled:!border-gray-200 dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20`}
          {...p}
        />

        <span
          style={{ width: `${h - 2}px`, height: `${h - 2}px` }}
          className={`${borderCls} inline-block absolute ml-[2px] peer-checked:translate-x-full rounded-full transition-all duration-200`}
        ></span>
      </label>
      <span className="w-2 h-2"></span>
      {label && <span className="text-sm font-medium">{label}</span>}
    </div>
  );
}
