import React from 'react';
import { ErrorIcon, SuccessIcon } from '../../../icons';
import { useRouter } from 'next/router';
import styles from "./index.module.css";

function ApiResponse({ apiRes, setApiRes, onContinue=null }) {

    const deleteHandler = (templateId) => {
        return deleteById(templateId);
    }

    const router = useRouter();
    const handleBackClick = ()  =>{
        setApiRes({ type:0, msg:""});
        router.reload();
    }
    const handleContinueClick = async()  =>{
        setApiRes({ type:0, msg:""});

        if(onContinue){
            onContinue();
        }
        else{
            router.reload();
        }
    }

    return (
        <div className={styles.popup}>
            <div className={styles.icon}>
                <div className={apiRes.type !== 1 ? styles.delete : styles.success}>{ apiRes.type === 1 ? "Success":"Error" }</div>
                <div className={styles.deleteIcon}>
                    { apiRes.type === 1 ? 
                        <SuccessIcon width="20" height="20" /> : 
                        <ErrorIcon width="20" height="20" /> 
                    }
                </div>
            </div>
            <div className={styles.deleteText}>
                { apiRes.msg }
            </div>
            <div className={styles.buttons}>
                <button onClick={() => { handleBackClick(); }}>Cancel</button>
                <button onClick={() => { handleContinueClick(); }}>Continue</button>
            </div>
        </div>
    );
}

export default ApiResponse;