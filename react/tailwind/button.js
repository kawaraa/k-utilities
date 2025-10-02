// Button variants

// A Button
export const baseBtnCls =
  "relative inline-flex items-center justify-center py-2 px-3 rounded-md cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl transition-all duration-300 ";
// Primary Button
export const btnCls = `${baseBtnCls} bg-black text-gray-200 dark:bg-white dark:text-slate-700 `;
export const btnCls1 = `${baseBtnCls} text-white bg-blue-500 `;
// Secondary Button
export const btnCls2 = `${baseBtnCls} text-white bg-orange-300 `;
// Danger Button
export const btnCls3 = `${baseBtnCls} text-white bg-red-400 `;
// Normal
export const btnCls4 = `${baseBtnCls} border-1 border-natural-100 `;

// Links
export const linkCls = "text-blue-500 hover:opacity-80 visited:opacity-60 ";
export const linkCls1 = `${linkCls} underline underline-offset-6 `;
export const disabledLinkCls = "cursor-not-allowed disabled:opacity-60 ";
