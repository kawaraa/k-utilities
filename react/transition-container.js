"use client";
import { renderToString } from "react-dom/server";
import React, { useEffect, useState } from "react";

export default function TransitionContainer({ Tag, children, base, enter, update, exit, time, ...p }) {
  const [elements, setElements] = useState(null);
  const [shallowElements, setShallowElements] = useState(null);
  const [activeElement, setActiveElement] = useState({ index: -1, class: "" });

  const prepareChildren = (children) => {
    let newChildren = children;

    if (typeof children === "function") newChildren = [children()];
    else if (!Array.isArray(children)) newChildren = [children];

    return newChildren.filter((child) => child);
  };
  const getClasses = (cls1 = "", cls2 = "") => ({ className: `${cls1} ${base} ${cls2}` });

  const compareComponents = (component1, component2) => {
    if (component1 === component2) return true;
    else if (component1?.props && component2?.props) {
      if (component1.props === component2.props) return true;
      else if (component1.props.children === component2.props.children) return true;
    }

    return renderToString(component1) === renderToString(component2);
  };

  useEffect(() => {
    const newChildren = prepareChildren(children);

    if (!elements) setElements(newChildren);
    else {
      if (elements.length < newChildren.length) {
        // Then there are a new element.
        setActiveElement({ index: elements.length, class: enter });
        setElements(newChildren);
        setTimeout(() => setActiveElement({ index: -1, class: "" }), 20);
      } else {
        const index = elements.findIndex((el) => !newChildren.find((c) => compareComponents(el, c)));
        // If index, then there is an element is updated.
        // Else an element is removed.

        if (elements.length > newChildren.length) setActiveElement({ index, class: exit });
        else setActiveElement({ index, class: update });

        setTimeout(() => {
          setActiveElement({ index: -1, class: "" });
          setShallowElements(
            React.Children.map(newChildren, (ch, i) => React.cloneElement(ch, getClasses(ch.props.className)))
          );
          setTimeout(() => {
            setElements(newChildren);
            setShallowElements(null);
          }, 20);
        }, +time);
      }
    }
  }, [children]);

  return (
    <Tag {...p}>
      {!shallowElements &&
        React.Children.map(elements, (ch, i) =>
          React.cloneElement(
            ch,
            getClasses(ch.props.className, i === activeElement.index ? activeElement.class : "")
          )
        )}

      {shallowElements || null}
    </Tag>
  );
}
/* *** usages ***
<TransitionContainer
  Tag="div"
  className="z-10 fixed top-0 left-1/2 max-w-[80%] md:max-w-[50%] -translate-x-1/2 flex flex-col justify-center select-none"
  base="flex items-start card bg-bg dark:bg-dcbg mt-3 py-2 px-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg duration-300 "
  enter="-translate-y-12 opacity-0"
  exit="-translate-y-12 opacity-0"
  time="300"
>
  {["item "].map((item, i) => (
    <div key={i}>{item}</div>
  ))}
</TransitionContainer>
 */
