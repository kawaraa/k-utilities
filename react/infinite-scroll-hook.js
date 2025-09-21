"use client";
import { useEffect, useRef } from "react";

export default function useInfiniteScroll({ onLoadContent, setLoading, ready }) {
  const itemsRef = useRef([]);
  const doneRef = useRef(false);

  const updateData = (data) => {
    itemsRef.current = data;
  };

  const removeItem = (items) => {
    if (!Array.isArray(items)) itemsRef.current.splice(items, 1);
    else itemsRef.current = itemsRef.current.map((item) => !items.includes(item.id));
  };

  const fetchContent = async (params) => {
    setLoading(true);
    const data = await onLoadContent(params);
    if (params) itemsRef.current = data || [];
    else if (data && data[0]) itemsRef.current = itemsRef.current.concat(data);
    else doneRef.current = true;
    setLoading(false);
  };

  const handleScrollEvent = async () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    if (window.innerHeight + scrollTop !== offsetHeight || doneRef.current) return;
    await fetchContent();
  };

  useEffect(() => {
    if (ready) fetchContent();
  }, [ready]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return { data: itemsRef.current, updateData, removeItem, refresh: fetchContent };
}

/* *** Usage ***
const { data, refresh } = useInfiniteScroll({
  ready: !!storeId.current,
  onLoadContent: fetchProducts,
  setLoading,
});

// ready: When this is true, it calls "setLoading" then "onLoadContent" functions, then update "data"
// refresh: is used to "refresh" the data by calling "fetchContent" and pass args passed to "refresh"
 */
