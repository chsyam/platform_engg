import * as React from "react";

export function DeleteLogo({width="14" ,height="14",color="#0C2132"}){
    return (
        <span>
            <svg width={width} height={height} viewBox="0 0 15 16" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.64746 16C2.16621 16 1.75423 15.8259 1.41152 15.4778C1.06882 15.1296 0.897461 14.7111 0.897461 14.2222V2.66667H0.0224609V0.888889H4.39746V0H9.64746V0.888889H14.0225V2.66667H13.1475V14.2222C13.1475 14.7111 12.9761 15.1296 12.6334 15.4778C12.2907 15.8259 11.8787 16 11.3975 16H2.64746ZM11.3975 2.66667H2.64746V14.2222H11.3975V2.66667ZM4.39746 12.4444H6.14746V4.44444H4.39746V12.4444ZM7.89746 12.4444H9.64746V4.44444H7.89746V12.4444Z"
                fill={color}/>
            </svg>
        </span>
    );
}
export default DeleteLogo;