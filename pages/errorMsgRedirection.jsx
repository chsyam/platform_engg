import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./../styles/Login.module.css"

export default function ErrorMsgRedirection() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const errorMessage = router.query.message;

        if (errorMessage) {
            router.push({
                pathname: '/login',
                query: {
                    message: errorMessage
                }
            },"/login");
        } else {
            setLoading(false); // Set loading to false when the message is not available
        }
    }, [router.query.message]);

    return (
        <>
            {loading ? (
                <div style={{ display: "flex", flexWrap: "nowrap", justifyContent: "center", color: "black", margin: "10% 0 0 0", fontSize: "1.5rem", fontWeight: "bold" }}>
                    <div style={{ paddingTop: "5px" }}>Loading....</div>
                    <div className={styles.loader}></div>
                </div>
            ) : null}
        </>
    );
}
