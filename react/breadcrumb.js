"use client";
import SvgIcon from "./svg-icon";
const itemCls = "text-sm md:text-base";

// item: { name: "Home", path: "/" };
export default function Breadcrumb({ items = [], current, separator, cls = "" }) {
  const isCurrent = (item) => current && [item.name, item.path, item].includes(current);

  return (
    <ol className={`h-5 md:h-7 flex items-center px-2 md:px-4 opacity-60 ${cls}`}>
      <li className="h-full aspect-square ">{separator || <SvgIcon name="house" />}</li>
      {items.map((item, i) => (
        <li className="flex items-center h-full" key={i}>
          <span className="aspect-square h-full p-1 opacity-50">
            <SvgIcon name="forwardSlash" />
          </span>

          {item.path ? (
            <a
              href={item.path}
              alt={item.name}
              className={`${itemCls} ${isCurrent(item) && "font-semibold"}`}
            >
              {item.name || item}
            </a>
          ) : (
            <span className={`${itemCls}  ${isCurrent(item) && "font-semibold"}`}>{item.name || item}</span>
          )}
        </li>
      ))}
    </ol>
  );
}

/**
<Breadcrumb
  current="path-1"
  items={[
    { path: "path-1", name: "Path 1" },
    { path: "path-2", name: "Path-2" },
    { path: "path-3", name: "Path-2" },
  ]}
/>
*/
