export default function Location({ width, height }: { width?: string; height?: string }) {
    return (
        <svg
            width={width ? width : '13'}
            height={height ? height : '17'}
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 7.22727C12 11.6818 6.5 15.5 6.5 15.5C6.5 15.5 1 11.6818 1 7.22727C1 4.06419 3.46243 1.5 6.5 1.5C9.53757 1.5 12 4.06419 12 7.22727Z"
                fill="#F76D67"
                stroke="#F76D67"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <ellipse
                cx="6.50008"
                cy="7.22733"
                rx="1.83333"
                ry="1.90909"
                fill="white"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
