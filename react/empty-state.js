export default function EmptyState({ lang = "en", type = "no", children, cls = "" }) {
  return (
    <div
      className={`w-full max-w-[600px] mx-auto py-2 text-center text-neutral-200/80 dark:text-neutral-700 select-none ${cls}`}
    >
      <svg className="block w-[30%] max-w-30 mx-auto" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0 1)" fill="none" fillRule="evenodd">
          <ellipse fill="currentColor" cx="32" cy="33" rx="32" ry="7"></ellipse>
          <g fillRule="nonzero" stroke="currentColor">
            <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
            <path
              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
              fill="currentColor"
            ></path>
          </g>
        </g>
      </svg>
      <div className="text-sm mt-5 text-slate-500 dark:text-gray-400">
        {children || <p>{content[type][lang]}</p>}
      </div>
    </div>
  );
}

const content = {
  no: { en: "No data", ar: "لايوجد بيانات" },
  notFound: { en: "Data Not Found", ar: "لم يتم العثور على بيانات" },
  notification: { en: "You don't have any notifications", ar: "ليس لديك أي إشعارات" },
};
