export default function  SearchLogo({width="16",height="16",color="gray"}){
    return (
        <svg width={width} height={height} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="8" stroke={color} strokeWidth="2"/>
            <path d="M15 15L20 20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        </svg>
    );
}