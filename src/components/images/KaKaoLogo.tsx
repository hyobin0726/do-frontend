export default function KaKaoLogo({ onClick }: { onClick: () => void }) {
    return (
        <svg
            onClick={onClick}
            width="50"
            height="50"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="30" height="30" rx="15" fill="#FEE500" />
            <g clipPath="url(#clip0_519_527)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15 9.40002C11.6861 9.40002 9 11.4753 9 14.0349C9 15.6267 10.0389 17.03 11.621 17.8647L10.9554 20.2964C10.8965 20.5112 11.1423 20.6825 11.331 20.558L14.2489 18.6322C14.4951 18.6559 14.7454 18.6698 15 18.6698C18.3136 18.6698 21 16.5946 21 14.0349C21 11.4753 18.3136 9.40002 15 9.40002Z"
                    fill="black"
                />
            </g>
            <defs>
                <clipPath id="clip0_519_527">
                    <rect width="12" height="12" fill="white" transform="translate(9 9)" />
                </clipPath>
            </defs>
        </svg>
    )
}
