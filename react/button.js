import Loader from "./loader.js";
import SvgIcon from "./svg-icon.js";

export function Button({ children, icon, loading, disabled, cls, inCls = "max-w-5", ...p }) {
  let c = `inline-flex justify-center items-center px-4 py-2 md:text-lg bg-pc text-t font-medium rounded-md shadow-md disabled:opacity-60 disabled:cursor-no-drop transition-all transition select-none `;
  if (!disabled && !loading) c += "hover:bg-gradient-to-tl hover:from-bg9 ";
  if (loading) c += "cursor-progress ";
  c += cls || "";

  return (
    <button disabled={disabled || loading} className={c} {...p}>
      {children}

      <span className={inCls}> {loading ? <Loader size="18" /> : <SvgIcon name={icon} /> || icon}</span>
    </button>
  );
}
