"use client";
import SvgIcon from "./svg-icon";

export default function Avatar({ initial, cls, ...p }) {
  let avatar = !p.src ? (
    <span className="p-3">
      <SvgIcon name="avatar" />
    </span>
  ) : (
    <img className="block w-full" {...p} />
  );

  return (
    <div
      className={`bg-white dark:bg-neutral-900 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.08)] my-1 aspect-square w-10 flex justify-center items-center dark:border-1 dark:border-neutral-200 dark:border-neutral-700 transition ${
        cls || ""
      }`}
    >
      {p.src || !initial ? avatar : <span className="uppercase font-semibold">{initial}</span>}
    </div>
  );
}

/* *** Usage ***
<Avatar src="/image.png" initial="ab" cls=""/>
*/
