export default function SvgIcon({ name, ...props }) {
  return icons[name];
}

const icons = {
  avatar: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="m95.84,81.49a49.61,46.87 0 0 0 -10.69,-15.1a49.83,47.07 0 0 0 -15.85,-10.01c-0.05,0 -0.11,0 -0.16,-0.18c8.26,-5.62 13.64,-14.75 13.64,-25.11c0,-17.21 -14.72,-31.08 -32.9,-31.08s-32.9,13.87 -32.9,31.08c0,10.36 5.37,19.49 13.64,25.11c-0.05,0.18 -0.11,0.18 -0.16,0.18c-5.94,2.28 -11.28,5.8 -15.85,10.01a49.83,47.07 0 0 0 -10.69,15.1a49.31,46.58 0 0 0 -3.91,17.21a1.06,1 0 0 0 1.06,1.05l7.96,0c0.58,0 1.05,-0.53 1.06,-1.05c0.27,-9.66 4.38,-18.62 11.65,-25.46c7.52,-7.2 17.51,-11.06 28.15,-11.06s20.63,3.86 28.15,11.06c7.27,6.85 11.38,15.81 11.65,25.46c0.01,0.7 0.48,1.05 1.06,1.05l7.96,0a1.06,1 0 0 0 1.06,-1.05c-0.13,-5.97 -1.45,-11.77 -3.91,-17.21zm-45.96,-28.8c-6.09,0 -11.82,-2.28 -16.13,-6.32s-6.69,-9.48 -6.69,-15.28c0,-5.8 2.37,-11.24 6.69,-15.28s10.04,-6.32 16.13,-6.32s11.82,2.28 16.13,6.32s6.69,9.48 6.69,15.28c0,5.8 -2.37,11.24 -6.69,15.28s-10.04,6.32 -16.13,6.32z" />
    </svg>
  ),
  search: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      className="pointer-events-none w-full"
      fill="currentColor"
      strokeWidth="100"
      aria-hidden="true"
    >
      <path d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z" />
    </svg>
  ),
  eye: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="64 64 896 896"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path>
    </svg>
  ),
  copy: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"></path>
      <path d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"></path>
    </svg>
  ),
  threeBars: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className="pointer-events-none w-full"
      viewBox="0 0 100 100"
      strokeWidth="10"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path d="m5,5l89.35,0m-89.35,44.82l89.35,0m-89.35,44.82l89.35,0" strokeLinecap="round" />
    </svg>
  ),
  threeDots: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="64 64 896 896"
      className="pointer-events-none w-full"
      fill="currentColor"
      strokeWidth="30"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z" />
    </svg>
  ),
  crossMark: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="pointer-events-none w-full"
      fill="none"
      strokeWidth="1"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path d="m10.88,89.06l78.5,-77.94m-78.5,0l78.5,77.94" strokeLinecap="round" strokeWidth="15" />
    </svg>
  ),
  checkMark: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  ),
  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   viewBox="0 0 20 20"
  //   fill="currentColor"
  //   aria-hidden="true"
  // >
  //   <path
  //     fill-rule="evenodd"
  //     d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
  //     clipRule="evenodd"
  //   ></path>
  // </svg >
  plus: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none w-full"
      strokeWidth="2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 6v12m6-6H6" />
    </svg>
  ),
  minus: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none w-full"
      strokeWidth="2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 12H6" />
    </svg>
  ),
  download: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="64 64 896 896"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
    </svg>
  ),
  exclamationMark: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
    </svg>
  ),
  warning: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none w-full"
      fill="none"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  ),
  chevronDown: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  ),
  arrowDownInCircle: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 17L12 7M12 17L8 13M12 17L16 13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
    </svg>
  ),
  arrowDown: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 17L12 7M12 17L8 13M12 17L16 13" />
    </svg>
  ),
  arrowsUp: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 6L12 2L16 6" />
      <path d="M12 2V22" />
    </svg>
  ),
  arrowsUpAndDown: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="pointer-events-none w-full"
    >
      <path
        fillRule="evenodd"
        d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  share: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none w-full"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="7" cy="12" r="3" />
      <circle cx="17" cy="6" r="3" />
      <circle cx="17" cy="18" r="3" />
      <line x1="9.5" y1="10.5" x2="14.5" y2="7.5" id="Path" />
      <line x1="14.5" y1="16.5" x2="9.5" y2="13.5" id="Path" />
    </svg>
  ),
  house: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  ),
  forwardSlash: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
    </svg>
  ),
};
