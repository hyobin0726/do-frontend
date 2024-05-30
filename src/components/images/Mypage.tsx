const Mypage: React.FC<{ isActive: boolean }> = ({ isActive }) => {
    return (
        <>
            {isActive ? (
                <svg width="100%" height="100%" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.0598 7.6201C9.99832 7.6201 11.5698 6.04862 11.5698 4.1101C11.5698 2.17158 9.99832 0.600098 8.0598 0.600098C6.12129 0.600098 4.5498 2.17158 4.5498 4.1101C4.5498 6.04862 6.12129 7.6201 8.0598 7.6201Z"
                        fill="#F76D67"
                        stroke="#F76D67"
                        strokeWidth="1.2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M14.51 16.4002C15.17 16.4002 15.68 15.7602 15.47 15.1202C14.46 11.9902 11.53 9.72021 8.06005 9.72021C4.59005 9.72021 1.66005 11.9902 0.650047 15.1202C0.450047 15.7502 0.950047 16.4002 1.61005 16.4002H14.51Z"
                        fill="#F76D67"
                        stroke="#F76D67"
                        strokeWidth="1.2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : (
                <svg width="100%" height="100%" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.0598 7.6201C9.99832 7.6201 11.5698 6.04862 11.5698 4.1101C11.5698 2.17158 9.99832 0.600098 8.0598 0.600098C6.12129 0.600098 4.5498 2.17158 4.5498 4.1101C4.5498 6.04862 6.12129 7.6201 8.0598 7.6201Z"
                        stroke="#869AA9"
                        strokeWidth="1.2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M14.51 16.4002C15.17 16.4002 15.68 15.7602 15.47 15.1202C14.46 11.9902 11.53 9.72021 8.06005 9.72021C4.59005 9.72021 1.66005 11.9902 0.650047 15.1202C0.450047 15.7502 0.950047 16.4002 1.61005 16.4002H14.51Z"
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
export default Mypage
