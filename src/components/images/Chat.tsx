const Chat: React.FC<{ isActive: boolean }> = ({ isActive }) => {
    return (
        <>
            {isActive ? (
                <svg width="100%" height="100%" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15.43 14.94C19.1 11.27 18.66 5.05002 14.12 1.99002C11.29 0.0800211 7.47 0.140021 4.69 2.11002C0.849999 4.83002 0.0899993 9.87002 2.41 13.51L1.33 16.19C1.08 16.8 1.69 17.41 2.31 17.17L4.99 16.09C8.23 18.16 12.59 17.78 15.43 14.94Z"
                        fill="#F76D67"
                        stroke="#F76D67"
                        strokeWidth="1.2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M10.56 7.41992H5.78"
                        stroke="white"
                        strokeWidth="1.2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M13.07 10.71H7.78"
                        stroke="white"
                        strokeWidth="1.2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : (
                <svg width="100%" height="100%" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.56 7.41992H5.78"
                        stroke="#869AA9"
                        strokeWidth="1.2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M13.07 10.71H7.78"
                        stroke="#869AA9"
                        strokeWidth="1.2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M15.43 14.94C19.1 11.27 18.66 5.05002 14.12 1.99002C11.29 0.0800211 7.47 0.140021 4.69 2.11002C0.849999 4.83002 0.0899993 9.87002 2.41 13.51L1.33 16.19C1.08 16.8 1.69 17.41 2.31 17.17L4.99 16.09C8.23 18.16 12.59 17.78 15.43 14.94Z"
                        stroke="#869AA9"
                        strokeWidth="1.2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </>
    )
}
export default Chat
