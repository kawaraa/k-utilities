"use client";
import { useEffect, useState } from "react";
import SvgIcon from "./svg-icon";
import { inputCls } from "./tw/input";
import { cardCls } from "./tw/layout";
import Transition from "./transition";

export default function ComboBox({ items = [], selected = [], onSearch, onSelect, multiple, key, name }) {
  const [options, setOptions] = useState(items);
  const [showList, setShowList] = useState();
  const [value, setValue] = useState("");
  const [selectedItems, setSelectedItems] = useState(selected);

  const handleSelect = (index) => {
    const clickItem = options[index][key] || options[index];
    setSelectedItems((vs) =>
      !vs.includes(clickItem) ? [...vs, clickItem] : vs.filter((v) => v != clickItem)
    );
    !multiple && setShowList(false);
  };

  const handleSearch = async (text = "") => {
    setValue(text);
    setShowList(true);
    if (onSearch) return onSearch(text);
    setOptions(items.filter((item) => (item[key] || item).toLowerCase().includes(text)));
  };

  useEffect(() => {
    if (onSelect) onSelect(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    if (onSearch) {
      setOptions(items);
      setShowList(!!items[0]);
    }
  }, [items]);

  return (
    <div className={`relative w-48 `}>
      <input
        // w-full border-none py-2 pl-3 pr-10 text-sm leading-9 text-gray-900 focus:ring-0
        onFocus={() => handleSearch()}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={selectedItems.length > 1 ? `( ${selectedItems.length} )` : selectedItems[0] || ""}
        value={value}
        name={name}
        type="text"
        className={`${inputCls}`}
        role="combobox"
        aria-controls="combobox-list"
        aria-expanded="false"
      />
      <button
        onClick={() => setShowList(!showList)}
        type="button"
        className="w-6 absolute inset-y-0 right-0 flex items-center cursor-pointer"
        tabIndex="-1"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <SvgIcon name="arrowsUpAndDown" />
      </button>

      <Transition
        Tag="ul"
        open={showList && !!options?.[0]}
        base={`${cardCls} absolute z-[2] mt-1 max-h-60 w-full overflow-auto rounded-md !p-1 focus:outline-none `}
        exit="opacity-0"
        time="100"
        role="listbox"
      >
        {options.map((item, i) => {
          const checked = item.checked || selectedItems.includes(item[key] || item);
          return (
            <li className="flex items-center select-none text-gray-900" key={i}>
              <button
                onClick={() => handleSelect(i)}
                className="flex items-center w-full cursor-pointer select-none py-2 px-3"
                role="option"
                aria-selected={checked}
              >
                <span className=" h-5 w-5 min-w-5 inset-y-0 left-0 flex items-center text-teal-600">
                  {checked && <SvgIcon name="checkMark" />}
                </span>
                <span className="w-1"></span>
                {item}
              </button>
            </li>
          );
        })}
      </Transition>
    </div>
  );
}
/** Usage
<ComboBox items={["Wade Cooper", "Devon Webb", "Tom Cook", "Tanya Fox", "Hellen Schmidt"]} multiple />;
 */
