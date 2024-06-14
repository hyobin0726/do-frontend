export default function LoadingMark({ width, height }: { width?: string; height?: string }) {
    return (
        <svg
            className="animate-spin"
            width={width ? width : '24'}
            height={height ? height : '24'}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
                stroke="#F76D67"
                strokeOpacity="0.3"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path d="M12 3C16.9706 3 21 7.02944 21 12" stroke="#F76D67" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}
