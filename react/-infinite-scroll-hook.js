"use client";
import { useEffect, useRef } from "react";

export default function useInfiniteScroll({ onLoadContent, setLoading, ready }) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const doneRef = useRef(false);

  const removeItem = (args) => {
    let copy = [...data];
    if (!Array.isArray(args) && !isNaN(+args)) copy.splice(args, 1);
    else if (Array.isArray(args)) copy = copy.filter((item) => !args.includes(item.id + ""));
    setData(copy);
  };

  const fetchContent = async (params) => {
    setLoading(true);
    const response = await onLoadContent(params);
    if (params) {
      setData(response.data || response || []);
      setTotal(response.total || response.length || 0);
    } else if (response && (response.data.length || response.length)) {
      setData(data.concat(response.data));
      setTotal(response.total || response.length || 0);
    } else {
      doneRef.current = true;
    }
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

  return { data, total, updateData: setData, updateTotal: setTotal, removeItem, refresh: fetchContent };
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
