interface RightArrowProps {
    width?: number
    height?: number
    rotate?: number
    color?: string
}

export default function RightArrow({ width, height, rotate, color }: RightArrowProps) {
    return (
        <svg
            width={width ? width : 5}
            height={height ? height : 9}
            viewBox="0 0 5 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
        >
            <path
                d="M1 1.5L4 4.5L1 7.5"
                stroke={color ? color : '#ffffff'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
