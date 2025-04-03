import React from "react";

const UserIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 37, height = 37, className = "" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask
        id="mask0_224_1818"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="37"
        height="37"
      >
        <circle cx="18.5" cy="18.5" r="18.2812" fill="#737373" />
      </mask>
      <g mask="url(#mask0_224_1818)">
        <circle cx="18.5" cy="15.6875" r="9.84375" fill="white" />
        <circle cx="18.5" cy="39.5938" r="16.875" fill="white" />
      </g>
    </svg>
  );
};

const SearchIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
  color?:string
}> = ({ width = 32, height = 32, className = "",color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 42 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1.23405 35.701L10.6767 26.0485L12.1455 27.5174L15.2931 24.3698C13.6144 21.8518 12.5653 18.914 12.5653 15.5567C12.5653 8.42223 18.2309 2.12712 25.3653 1.0779C35.2277 -0.181123 43.6211 8.42223 41.7326 18.4944C40.6834 24.3698 35.8572 28.9863 29.9817 30.0354C25.5751 30.8747 21.5882 29.6157 18.4407 27.3076L15.2931 30.4551L16.7619 32.1339L7.31926 41.7863C5.64053 43.4651 2.91268 43.4651 1.44385 41.7863C-0.444679 39.8977 -0.444679 37.3797 1.23405 35.701ZM27.2538 26.0485C33.1292 26.0485 37.7457 21.4321 37.7457 15.5566C37.7457 9.68106 33.1293 5.06477 27.2538 5.06477C21.3783 5.06477 16.7619 9.68116 16.7619 15.5567C16.7619 21.4322 21.3784 26.0485 27.2538 26.0485Z"
        fill={color}
      />
    </svg>
  );
};

const SearchTwoIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}> = ({ width = 24, height = 24, className = "", color = "currentColor" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
};

const BookIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 48, height = 48, className = "" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M46.5 15V33C46.5 33.7956 46.1839 34.5587 45.6213 35.1213C45.0587 35.6839 44.2957 36 43.5 36H26.25C26.0511 36 25.8603 35.921 25.7197 35.7803C25.579 35.6397 25.5 35.4489 25.5 35.25V12.75C25.5 12.5511 25.579 12.3603 25.7197 12.2197C25.8603 12.079 26.0511 12 26.25 12H43.5C44.2957 12 45.0587 12.3161 45.6213 12.8787C46.1839 13.4413 46.5 14.2044 46.5 15ZM22.5 9V39C22.5 39.3978 22.342 39.7794 22.0607 40.0607C21.7794 40.342 21.3978 40.5 21 40.5C20.6022 40.5 20.2206 40.342 19.9393 40.0607C19.658 39.7794 19.5 39.3978 19.5 39V36H4.5C3.70435 36 2.94129 35.6839 2.37868 35.1213C1.81607 34.5587 1.5 33.7956 1.5 33V15C1.5 14.2044 1.81607 13.4413 2.37868 12.8787C2.94129 12.3161 3.70435 12 4.5 12H19.5V9C19.5 8.60218 19.658 8.22064 19.9393 7.93934C20.2206 7.65804 20.6022 7.5 21 7.5C21.3978 7.5 21.7794 7.65804 22.0607 7.93934C22.342 8.22064 22.5 8.60218 22.5 9ZM16.5 21C16.5 20.6022 16.342 20.2206 16.0607 19.9393C15.7794 19.658 15.3978 19.5 15 19.5H9C8.60218 19.5 8.22064 19.658 7.93934 19.9393C7.65804 20.2206 7.5 20.6022 7.5 21C7.5 21.3978 7.65804 21.7794 7.93934 22.0607C8.22064 22.342 8.60218 22.5 9 22.5H10.5V27C10.5 27.3978 10.658 27.7794 10.9393 28.0607C11.2206 28.342 11.6022 28.5 12 28.5C12.3978 28.5 12.7794 28.342 13.0607 28.0607C13.342 27.7794 13.5 27.3978 13.5 27V22.5H15C15.3978 22.5 15.7794 22.342 16.0607 22.0607C16.342 21.7794 16.5 21.3978 16.5 21Z"
        fill="#189BA3"
      />
    </svg>
  );
};

const ComputerIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
  color?:string
}> = ({ width = 32, height = 32, className = "" ,color}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M35 0.5H5C3.80653 0.5 2.66193 0.974106 1.81802 1.81802C0.974106 2.66193 0.5 3.80653 0.5 5V26C0.5 27.1935 0.974106 28.3381 1.81802 29.182C2.66193 30.0259 3.80653 30.5 5 30.5H18.5V33.5H14C13.6022 33.5 13.2206 33.658 12.9393 33.9393C12.658 34.2206 12.5 34.6022 12.5 35C12.5 35.3978 12.658 35.7794 12.9393 36.0607C13.2206 36.342 13.6022 36.5 14 36.5H26C26.3978 36.5 26.7794 36.342 27.0607 36.0607C27.342 35.7794 27.5 35.3978 27.5 35C27.5 34.6022 27.342 34.2206 27.0607 33.9393C26.7794 33.658 26.3978 33.5 26 33.5H21.5V30.5H35C36.1935 30.5 37.3381 30.0259 38.182 29.182C39.0259 28.3381 39.5 27.1935 39.5 26V5C39.5 3.80653 39.0259 2.66193 38.182 1.81802C37.3381 0.974106 36.1935 0.5 35 0.5ZM35 27.5H5C4.60218 27.5 4.22064 27.342 3.93934 27.0607C3.65804 26.7794 3.5 26.3978 3.5 26V23H36.5V26C36.5 26.3978 36.342 26.7794 36.0607 27.0607C35.7794 27.342 35.3978 27.5 35 27.5Z"
        fill={color}
      />
    </svg>
  );
};

const VerifyIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
  color?:string
}> = ({ width = 32, height = 32, className = "" ,color}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 38 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M33.0943 4.98423L22.0523 0.840227C20.0683 0.0962266 17.9083 0.0962266 15.9483 0.840227L4.88228 4.98423C2.40028 5.92623 0.738281 8.33423 0.738281 10.9882V22.2042C0.738281 27.0922 2.97228 31.3102 5.89828 34.7602C8.80228 38.1842 12.3743 40.8402 15.0543 42.5522C16.2703 43.3222 17.6343 43.7182 19.0003 43.7182C20.3663 43.7182 21.7303 43.3222 22.9463 42.5522C28.2803 39.1282 37.2643 31.9562 37.2643 22.2042V10.9882C37.2643 8.33423 35.5743 5.92623 33.0943 4.98423ZM27.9823 17.8622L19.7943 26.0262C18.9503 26.8702 17.8343 27.2922 16.7423 27.2922C15.6263 27.2922 14.5083 26.8702 13.6663 26.0262L10.4643 22.8242C9.72028 22.1042 9.72028 20.9142 10.4643 20.1942C11.1843 19.4502 12.3503 19.4502 13.0943 20.1942L16.2943 23.3962C16.5423 23.6442 16.9143 23.6442 17.1623 23.3962L25.3503 15.2322C26.0703 14.4882 27.2363 14.4882 27.9803 15.2322C28.7003 15.9522 28.7023 17.1422 27.9823 17.8622Z"
        fill={color}
      />
    </svg>
  );
};

const AccessibilityIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 48, height = 48, className = "" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M24 4.5C20.1433 4.5 16.3731 5.64366 13.1664 7.78634C9.95963 9.92903 7.46027 12.9745 5.98436 16.5377C4.50845 20.1008 4.12228 24.0216 4.8747 27.8043C5.62711 31.5869 7.4843 35.0615 10.2114 37.7886C12.9386 40.5157 16.4131 42.3729 20.1957 43.1253C23.9784 43.8777 27.8992 43.4916 31.4623 42.0156C35.0255 40.5397 38.071 38.0404 40.2137 34.8336C42.3564 31.6269 43.5 27.8567 43.5 24C43.4945 18.83 41.4383 13.8732 37.7826 10.2174C34.1268 6.56167 29.1701 4.50546 24 4.5ZM24 12C24.5934 12 25.1734 12.1759 25.6667 12.5056C26.1601 12.8352 26.5446 13.3038 26.7716 13.8519C26.9987 14.4001 27.0581 15.0033 26.9424 15.5853C26.8266 16.1672 26.5409 16.7018 26.1213 17.1213C25.7018 17.5409 25.1672 17.8266 24.5853 17.9424C24.0033 18.0581 23.4001 17.9987 22.852 17.7716C22.3038 17.5446 21.8352 17.1601 21.5056 16.6667C21.176 16.1734 21 15.5933 21 15C21 14.2044 21.3161 13.4413 21.8787 12.8787C22.4413 12.3161 23.2044 12 24 12ZM33 22.5H25.5V25.0462L31.2488 33.6712C31.4696 34.0024 31.5497 34.4078 31.4717 34.7981C31.3936 35.1884 31.1637 35.5317 30.8325 35.7525C30.5013 35.9733 30.096 36.0535 29.7057 35.9754C29.3154 35.8974 28.972 35.6674 28.7513 35.3363L24 28.2113L19.2488 35.3363C19.1394 35.5002 18.9989 35.6411 18.8351 35.7508C18.6714 35.8604 18.4876 35.9368 18.2943 35.9754C17.904 36.0535 17.4987 35.9733 17.1675 35.7525C16.8363 35.5317 16.6064 35.1884 16.5283 34.7981C16.4503 34.4078 16.5305 34.0024 16.7513 33.6712L22.5 25.0462V22.5H15C14.6022 22.5 14.2207 22.342 13.9393 22.0607C13.658 21.7794 13.5 21.3978 13.5 21C13.5 20.6022 13.658 20.2206 13.9393 19.9393C14.2207 19.658 14.6022 19.5 15 19.5H33C33.3978 19.5 33.7794 19.658 34.0607 19.9393C34.342 20.2206 34.5 20.6022 34.5 21C34.5 21.3978 34.342 21.7794 34.0607 22.0607C33.7794 22.342 33.3978 22.5 33 22.5Z"
        fill="#189BA3"
      />
    </svg>
  );
};

const InnovationIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 48, height = 48, className = "" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M36.7722 23.9997C41.3941 17.5103 43.751 10.8035 40.4735 7.52597C37.196 4.24847 30.4891 6.60535 23.9997 11.2272C17.5103 6.60535 10.8035 4.24847 7.52597 7.52597C4.24847 10.8035 6.60535 17.5103 11.2272 23.9997C6.60535 30.4891 4.24847 37.196 7.52597 40.4735C8.5816 41.5291 9.9916 41.9997 11.6341 41.9997C15.0972 41.9997 19.5991 39.9053 24.0091 36.7722C28.4003 39.9053 32.9003 41.9997 36.3747 41.9997C38.0172 41.9997 39.4291 41.5272 40.4828 40.4735C43.751 37.196 41.3941 30.4891 36.7722 23.9997ZM38.3528 9.6466C39.7853 11.0791 38.8178 15.7216 34.8803 21.5116C33.6347 19.9696 32.3085 18.4944 30.9072 17.0922C29.5044 15.6934 28.0293 14.3691 26.4878 13.1247C32.2778 9.18722 36.9203 8.2141 38.3528 9.6466ZM9.6466 9.6466C10.0591 9.23222 10.7397 9.01847 11.6378 9.01847C13.8541 9.01847 17.3922 10.3122 21.5097 13.1247C19.9693 14.3696 18.4948 15.6939 17.0922 17.0922C15.6929 18.4945 14.3686 19.9697 13.1247 21.5116C9.18722 15.7216 8.2141 11.0791 9.6466 9.6466ZM9.6466 38.3528C8.2141 36.9203 9.18722 32.2778 13.1247 26.4878C14.3704 28.0299 15.6966 29.5051 17.0978 30.9072C18.4992 32.3054 19.9725 33.6297 21.5116 34.8747C15.7216 38.8122 11.0791 39.7853 9.6466 38.3528V38.3547Z"
        fill="#189BA3"
      />
    </svg>
  );
};

const TransparencyIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 48, height = 48, className = "" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M39 7.5H9C8.20435 7.5 7.44129 7.81607 6.87868 8.37868C6.31607 8.94129 6 9.70435 6 10.5V21C6 30.885 10.785 36.8756 14.7994 40.1606C19.1231 43.6969 23.4244 44.8988 23.6119 44.9475C23.8697 45.0176 24.1416 45.0176 24.3994 44.9475C24.5869 44.8988 28.8825 43.6969 33.2119 40.1606C37.215 36.8756 42 30.885 42 21V10.5C42 9.70435 41.6839 8.94129 41.1213 8.37868C40.5587 7.81607 39.7957 7.5 39 7.5ZM32.0625 23.8931L26.3794 26.1656L29.7 30.6C29.9387 30.9183 30.0412 31.3183 29.9849 31.7121C29.9287 32.106 29.7183 32.4613 29.4 32.7C29.0817 32.9387 28.6817 33.0412 28.2879 32.9849C27.894 32.9287 27.5387 32.7183 27.3 32.4L24 27.9994L20.7 32.4C20.5818 32.5576 20.4337 32.6903 20.2642 32.7907C20.0947 32.8911 19.9071 32.9571 19.7121 32.9849C19.5171 33.0128 19.3185 33.002 19.1277 32.9531C18.9369 32.9042 18.7576 32.8182 18.6 32.7C18.4424 32.5818 18.3096 32.4337 18.2093 32.2642C18.1089 32.0947 18.0429 31.9071 18.0151 31.7121C17.9872 31.5171 17.998 31.3186 18.0469 31.1277C18.0958 30.9369 18.1818 30.7576 18.3 30.6L21.6262 26.1656L15.9375 23.8931C15.568 23.7439 15.2729 23.4541 15.1172 23.0873C15.04 22.9057 14.9994 22.7107 14.9977 22.5134C14.9959 22.3162 15.033 22.1204 15.1069 21.9375C15.1807 21.7546 15.2899 21.5879 15.4282 21.4472C15.5664 21.3064 15.7311 21.1943 15.9127 21.1172C16.2794 20.9614 16.693 20.9577 17.0625 21.1069L22.5 23.2838V18C22.5 17.6022 22.658 17.2206 22.9393 16.9393C23.2206 16.658 23.6022 16.5 24 16.5C24.3978 16.5 24.7794 16.658 25.0607 16.9393C25.342 17.2206 25.5 17.6022 25.5 18V23.2838L30.9375 21.1069C31.1204 21.033 31.3162 20.9959 31.5134 20.9977C31.7107 20.9994 31.9057 21.04 32.0873 21.1172C32.2689 21.1943 32.4336 21.3064 32.5718 21.4472C32.7101 21.5879 32.8193 21.7546 32.8931 21.9375C32.967 22.1204 33.0041 22.3162 33.0023 22.5134C33.0006 22.7107 32.96 22.9057 32.8828 23.0873C32.8057 23.2689 32.6936 23.4336 32.5528 23.5718C32.4121 23.7101 32.2454 23.8193 32.0625 23.8931Z"
        fill="#189BA3"
      />
    </svg>
  );
};

const TrustIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 48, height = 33, className = "" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M47.6817 11.2327L42.8967 1.65892C42.7204 1.30654 42.4764 0.992344 42.1787 0.734261C41.881 0.476178 41.5354 0.279269 41.1615 0.154777C40.7877 0.0302859 40.393 -0.0193489 40 0.00870774C39.607 0.0367643 39.2234 0.141963 38.871 0.318295L34.2079 2.64892L24.3848 0.0501704C24.1327 -0.0154214 23.8681 -0.0154214 23.616 0.0501704L13.7929 2.64892L9.12978 0.318295C8.77743 0.141963 8.3938 0.0367643 8.0008 0.00870774C7.60779 -0.0193489 7.21311 0.0302859 6.83928 0.154777C6.46546 0.279269 6.11982 0.476178 5.82211 0.734261C5.52439 0.992344 5.28043 1.30654 5.10416 1.65892L0.319156 11.2308C0.142824 11.5831 0.0376255 11.9668 0.00956894 12.3598C-0.0184877 12.7528 0.031147 13.1475 0.155638 13.5213C0.28013 13.8951 0.477039 14.2408 0.735122 14.5385C0.993205 14.8362 1.30741 15.0801 1.65978 15.2564L6.72228 17.7895L17.1267 25.2202C17.28 25.3292 17.4523 25.4087 17.6348 25.4545L29.6348 28.4545C29.8861 28.5176 30.1494 28.5144 30.3992 28.4454C30.6489 28.3764 30.8765 28.2439 31.0598 28.0608L38.5598 20.5608L41.3873 17.7333L46.341 15.2564C47.0522 14.9004 47.5929 14.2766 47.8443 13.5221C48.0957 12.7675 48.0372 11.9441 47.6817 11.2327ZM37.3898 17.4895L30.9379 12.322C30.6489 12.0906 30.2844 11.9742 29.9147 11.9953C29.545 12.0164 29.1962 12.1735 28.9354 12.4364C25.596 15.8002 21.8742 15.3745 19.5004 13.8745L27.6079 5.99955H33.5723L38.6742 16.2014L37.3898 17.4895ZM29.5392 25.3383L18.6417 22.6139L9.41666 16.0252L14.6667 5.52517L24.0004 3.05205L25.8379 3.53767L17.4004 11.7277L17.3854 11.7445C17.0678 12.0622 16.8256 12.447 16.6766 12.8708C16.5276 13.2945 16.4756 13.7463 16.5246 14.1928C16.5735 14.6393 16.7221 15.0691 16.9594 15.4505C17.1966 15.8319 17.5165 16.1552 17.8954 16.3964C21.7504 18.8583 26.4023 18.4589 30.066 15.4589L35.2504 19.6233L29.5392 25.3383ZM24.7167 31.8633C24.6356 32.1875 24.4486 32.4753 24.1854 32.6812C23.9221 32.887 23.5977 32.9991 23.2635 32.9995C23.1403 32.9994 23.0175 32.9843 22.8979 32.9545L15.0773 30.9989C14.8945 30.9538 14.7221 30.8743 14.5692 30.7645L9.62853 27.2358C9.32475 26.9973 9.12467 26.6508 9.06998 26.2684C9.01528 25.8861 9.11017 25.4974 9.33489 25.1833C9.55961 24.8691 9.89685 24.6538 10.2764 24.5821C10.6559 24.5104 11.0484 24.5878 11.3723 24.7983L16.0804 28.162L23.6254 30.0445C24.0113 30.1411 24.343 30.3869 24.5476 30.728C24.7523 31.069 24.8131 31.4774 24.7167 31.8633Z"
        fill="#189BA3"
      />
    </svg>
  );
};
const CommunityIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 46, height = 33, className = "" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 46 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.0225 18.7128C11.0276 18.8144 11.012 18.916 10.9766 19.0113C10.9412 19.1067 10.8867 19.1939 10.8166 19.2675C10.7464 19.3412 10.662 19.3998 10.5685 19.4398C10.4749 19.4798 10.3742 19.5004 10.2725 19.5003H2.00002C1.66146 19.5008 1.33269 19.3868 1.06716 19.1767C0.801629 18.9667 0.614966 18.673 0.537521 18.3434C0.489297 18.1178 0.491521 17.8844 0.544031 17.6597C0.596541 17.4351 0.698041 17.2249 0.841271 17.044C2.16466 15.289 3.92056 13.9071 5.93752 13.0334C5.05201 12.226 4.37284 11.2182 3.95691 10.0944C3.54098 8.97059 3.40039 7.76346 3.54692 6.57413C3.69345 5.3848 4.12283 4.24789 4.79909 3.25863C5.47536 2.26937 6.37883 1.45655 7.43382 0.888252C8.48882 0.319956 9.66463 0.0127292 10.8628 -0.00769902C12.0609 -0.0281272 13.2465 0.238838 14.3203 0.770839C15.3941 1.30284 16.3247 2.08439 17.0343 3.05002C17.7439 4.01566 18.2118 5.13727 18.3988 6.32091C18.4229 6.48008 18.3944 6.64278 18.3176 6.78426C18.2407 6.92574 18.1198 7.03824 17.9731 7.10466C15.8926 8.06649 14.1306 9.60336 12.8951 11.5339C11.6595 13.4645 11.002 15.7082 11 18.0003C11 18.2403 11 18.4765 11.0225 18.7128ZM45.1475 17.0422C43.8272 15.2892 42.0753 13.9081 40.0625 13.0334C40.948 12.226 41.6272 11.2182 42.0431 10.0944C42.4591 8.97059 42.5996 7.76346 42.4531 6.57413C42.3066 5.3848 41.8772 4.24789 41.2009 3.25863C40.5247 2.26937 39.6212 1.45655 38.5662 0.888252C37.5112 0.319956 36.3354 0.0127292 35.1373 -0.00769902C33.9391 -0.0281272 32.7535 0.238838 31.6797 0.770839C30.606 1.30284 29.6753 2.08439 28.9657 3.05002C28.2561 4.01566 27.7883 5.13727 27.6013 6.32091C27.5771 6.48008 27.6056 6.64278 27.6825 6.78426C27.7593 6.92574 27.8802 7.03824 28.0269 7.10466C30.1074 8.06649 31.8694 9.60336 33.1049 11.5339C34.3405 13.4645 34.998 15.7082 35 18.0003C35 18.2403 35 18.4765 34.9775 18.7128C34.9724 18.8144 34.9881 18.916 35.0235 19.0113C35.0589 19.1067 35.1133 19.1939 35.1835 19.2675C35.2536 19.3412 35.338 19.3998 35.4316 19.4398C35.5251 19.4798 35.6258 19.5004 35.7275 19.5003H44C44.3386 19.5008 44.6674 19.3868 44.9329 19.1767C45.1984 18.9667 45.3851 18.673 45.4625 18.3434C45.511 18.1174 45.5088 17.8835 45.4559 17.6584C45.4031 17.4334 45.3009 17.2229 45.1569 17.0422H45.1475ZM28.46 25.1384C29.9535 23.9946 31.0511 22.4115 31.5985 20.6117C32.1458 18.8119 32.1154 16.8858 31.5115 15.1041C30.9077 13.3225 29.7607 11.7748 28.2318 10.6787C26.703 9.58261 24.869 8.99312 22.9878 8.99312C21.1066 8.99312 19.2727 9.58261 17.7438 10.6787C16.2149 11.7748 15.068 13.3225 14.4641 15.1041C13.8602 16.8858 13.8299 18.8119 14.3772 20.6117C14.9245 22.4115 16.0221 23.9946 17.5156 25.1384C14.8654 26.2867 12.6524 28.2533 11.2006 30.7503C11.069 30.9783 10.9997 31.237 10.9997 31.5004C10.9997 31.7637 11.069 32.0224 11.2007 32.2504C11.3324 32.4785 11.5218 32.6678 11.7499 32.7994C11.978 32.9311 12.2367 33.0003 12.5 33.0003H33.5C33.7634 33.0003 34.0221 32.9311 34.2501 32.7994C34.4782 32.6678 34.6676 32.4785 34.7993 32.2504C34.931 32.0224 35.0003 31.7637 35.0004 31.5004C35.0004 31.237 34.9311 30.9783 34.7994 30.7503C33.3445 28.2517 31.1274 26.2849 28.4731 25.1384H28.46Z"
        fill="#189BA3"
      />
    </svg>
  );
};

// ... existing code ...

const ConvinenceIcon: React.FC<{ width?: number; height?: number; className?: string ,color?:string}> = ({
  width = 48,
  height = 48,
  className = "",
  color
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15.5348 8.98837C15.5525 8.72887 15.6999 8.51531 15.9363 8.40693L22.8907 5.21812C23.1099 5.11752 23.3454 5.13355 23.5492 5.26284C23.753 5.39212 23.8676 5.59846 23.8699 5.83977L23.9424 13.4901C23.945 13.75 23.8144 13.9744 23.587 14.1007C23.3598 14.227 23.1003 14.2195 22.8807 14.0801L20.9945 12.8826C20.8591 13.5568 20.788 14.2543 20.788 14.9685C20.788 20.7955 25.5118 25.5193 31.3388 25.5193C37.1659 25.5193 41.8897 20.7955 41.8897 14.9685C41.8897 9.14146 37.1659 4.41768 31.3388 4.41768C29.0433 4.41768 26.9192 5.15099 25.1875 6.3959L25.1822 5.82721C25.1756 5.14115 24.8318 4.5223 24.2524 4.15462C23.8462 3.8968 23.3757 3.7963 22.916 3.85837C25.2558 2.08134 28.1739 1.02637 31.3388 1.02637C39.0388 1.02637 45.2809 7.26843 45.2809 14.9684C45.2809 22.6684 39.0388 28.9104 31.3388 28.9104C23.6389 28.9104 17.3968 22.6683 17.3968 14.9684C17.3968 13.5781 17.6003 12.2352 17.9792 10.9682L15.8537 9.61865C15.6341 9.47934 15.5169 9.24768 15.5346 8.98827L15.5348 8.98837ZM29.6591 19.8856C30.1047 19.9443 30.513 19.8056 30.8308 19.4878L38.0303 12.2883C38.5433 11.7754 38.5433 10.936 38.0303 10.4231C37.5174 9.91021 36.6781 9.91021 36.1652 10.4231L30.1073 16.481L28.4177 13.5545C28.0555 12.9272 27.2435 12.7095 26.6161 13.0717C25.9879 13.4345 25.7707 14.2451 26.1334 14.8733L28.6303 19.1981C28.855 19.5874 29.2135 19.8269 29.6591 19.8856ZM43.9219 29.736C40.1675 31.9035 34.2352 36.2516 29.261 36.4063C26.7147 36.4686 23.7264 35.8407 22.5127 35.209C21.9888 34.9367 21.9015 34.4259 22.0941 34.0557C22.2865 33.6854 22.8073 33.5359 23.1776 33.7283C24.2281 34.275 26.8845 34.8167 29.1933 34.7602C30.0773 34.7386 30.8907 34.6349 31.4944 34.4152C33.2901 33.7619 32.761 31.191 30.6027 31.2726C17.9117 31.2726 17.1955 21.5219 6.54394 34.1046C6.55106 34.1116 6.55837 34.1184 6.5655 34.1256L13.8788 41.4388C13.9083 41.4682 13.9368 41.4982 13.9648 41.5286C16.2818 40.4384 18.851 40.4166 21.6023 40.5812C23.7188 40.7077 26.2448 41.0134 28.5623 40.9622C31.8004 40.8906 33.7849 40.0117 36.6283 38.5055C39.8655 36.7907 45.4919 33.3752 46.4735 32.085C47.8781 30.2383 46.0646 28.4991 43.922 29.736H43.9219ZM5.4315 35.2596C4.82766 34.6558 3.83953 34.6558 3.23559 35.2596L1.03125 37.4639L10.5404 46.9731L12.7447 44.7688C13.3485 44.165 13.3485 43.1767 12.7447 42.5729L5.43131 35.2596H5.4315Z"
        fill={color}
      />
    </svg>
  );
};

const FilterIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}> = ({ width = 32, height = 32, className = "", color = "#000000" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 256 256"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M200,136a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H192A8,8,0,0,1,200,136Zm32-56H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm-80,96H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Z"
        fill={color}
      />
    </svg>
  );
};

const TextBoxIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}> = ({ width = 32, height = 32, className = "", color = "#000000" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 256 256"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M248,80v96a16,16,0,0,1-16,16H140a4,4,0,0,1-4-4V68a4,4,0,0,1,4-4h92A16,16,0,0,1,248,80ZM120,48V208a8,8,0,0,1-16,0V192H24A16,16,0,0,1,8,176V80A16,16,0,0,1,24,64h80V48a8,8,0,0,1,16,0ZM88,112a8,8,0,0,0-8-8H48a8,8,0,0,0,0,16h8v24a8,8,0,0,0,16,0V120h8A8,8,0,0,0,88,112Z"
        fill={color}
      />
    </svg>
  );
};

const EmailIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 32, height = 32, className = "" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"  width={width} height={height} className={className}>
      <rect width="256" height="256" fill="none" />
      <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z" fill="#189BA3" />
    </svg>
  );
};

const SupportIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}> = ({ width = 32, height = 32, className = "", color = "#189BA3" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={color} viewBox="0 0 256 256">
      <path d="M232,128v80a40,40,0,0,1-40,40H136a8,8,0,0,1,0-16h56a24,24,0,0,0,24-24H192a24,24,0,0,1-24-24V144a24,24,0,0,1,24-24h23.65A88,88,0,0,0,66,65.54,87.29,87.29,0,0,0,40.36,120H64a24,24,0,0,1,24,24v40a24,24,0,0,1-24,24H48a24,24,0,0,1-24-24V128A104.11,104.11,0,0,1,201.89,54.66,103.41,103.41,0,0,1,232,128Z"></path>
    </svg>
  );
};

const LocationIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}> = ({ width = 32, height = 32, className = "", color = "#189BA3" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={color} viewBox="0 0 256 256">
      <path d="M200,224H150.54A266.56,266.56,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25a88,88,0,0,0-176,0c0,31.4,14.51,64.68,42,96.25A266.56,266.56,0,0,0,105.46,224H56a8,8,0,0,0,0,16H200a8,8,0,0,0,0-16ZM128,72a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"></path>
    </svg>
  );
};

const ClockIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}> = ({ width = 32, height = 32, className = "", color = "#189BA3" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={color} viewBox="0 0 256 256">
      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm56,112H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z"></path>
    </svg>
  );
};


const FacebookIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}> = ({ width = 24, height = 24, className = "", color = "#189BA3" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 256 256"
      className={className}
    >
      <path d="M232,128a104.16,104.16,0,0,1-91.55,103.26,4,4,0,0,1-4.45-4V152h24a8,8,0,0,0,8-8.53,8.17,8.17,0,0,0-8.25-7.47H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,8-8.53A8.17,8.17,0,0,0,167.73,80H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0-8,8.53A8.17,8.17,0,0,0,96.27,152H120v75.28a4,4,0,0,1-4.44,4A104.15,104.15,0,0,1,24.07,124.09c2-54,45.74-97.9,99.78-100A104.12,104.12,0,0,1,232,128Z" />
    </svg>
  );
};

const InstagramIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 24, height = 24, className = "" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="#189BA3" viewBox="0 0 256 256">
      <path d="M176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24ZM128,176a48,48,0,1,1,48-48A48.05,48.05,0,0,1,128,176Zm60-96a12,12,0,1,1,12-12A12,12,0,0,1,188,80Zm-28,48a32,32,0,1,1-32-32A32,32,0,0,1,160,128Z"></path>
    </svg>
  );
};
const XIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 24, height = 24, className = "" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="#189BA3" viewBox="0 0 256 256">
      <path d="M215,219.85a8,8,0,0,1-7,4.15H160a8,8,0,0,1-6.75-3.71l-40.49-40.49L53.92,221.38a8,8,0,0,1-11.84-10.76l61.77-61.77L41.25,44.3A8,8,0,0,1,48,32H96a8,8,0,0,1,6.75,3.71l40.49,40.49,58.84-58.84a8,8,0,0,1,11.84,10.76l-61.77,61.77,62.6,62.6A8,8,0,0,1,215,219.85Z"></path>
    </svg>
  );
};

const LinkedInIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 24, height = 24, className = "" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="#189BA3" viewBox="0 0 256 256">
      <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm96,80a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z"></path>
    </svg>
  );
};

const CheckIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 24, height = 24, className = "" }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM16.2806 10.2806L11.0306 15.5306C10.961 15.6004 10.8783 15.6557 10.7872 15.6934C10.6962 15.7312 10.5986 15.7506 10.5 15.7506C10.4014 15.7506 10.3038 15.7312 10.2128 15.6934C10.1218 15.6557 10.039 15.6004 9.96938 15.5306L7.71938 13.2806C7.57865 13.1399 7.49959 12.949 7.49959 12.75C7.49959 12.551 7.57865 12.3601 7.71938 12.2194C7.86011 12.0786 8.05098 11.9996 8.25 11.9996C8.44903 11.9996 8.6399 12.0786 8.78063 12.2194L10.5 13.9397L15.2194 9.21937C15.2891 9.14969 15.3718 9.09442 15.4628 9.0567C15.5539 9.01899 15.6515 8.99958 15.75 8.99958C15.8486 8.99958 15.9461 9.01899 16.0372 9.0567C16.1282 9.09442 16.2109 9.14969 16.2806 9.21937C16.3503 9.28906 16.4056 9.37178 16.4433 9.46283C16.481 9.55387 16.5004 9.65145 16.5004 9.75C16.5004 9.84855 16.481 9.94613 16.4433 10.0372C16.4056 10.1282 16.3503 10.2109 16.2806 10.2806Z" fill="#189BA3"/>
    </svg>
  );
};

export {
  UserIcon,
  SearchIcon,
  SearchTwoIcon,
  BookIcon,
  ComputerIcon,
  VerifyIcon,
  AccessibilityIcon,
  InnovationIcon,
  TransparencyIcon,
  TrustIcon,
  CommunityIcon,
  ConvinenceIcon,
  TextBoxIcon,
  FilterIcon,
  EmailIcon,
  SupportIcon,
  LocationIcon,
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  XIcon,
  LinkedInIcon,
  CheckIcon
};
