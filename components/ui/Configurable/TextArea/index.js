import React from "react";
import { useState, useEffect } from "react";
import styles from "./index.module.css";
import { SuccessIcon, ErrorIcon } from "../../../icons";

export default function TextArea({id, jsonInput, setJsonInput, onClose, disabled}){

    const [isValidJson, setIsValidJson] = useState(true);
  
    const handleJsonChange = (event) => {
      const input = event.target.value;
  
      try {
        // Attempt to parse the input as JSON
        JSON.parse(input);
        setJsonInput(input);
        setIsValidJson(true);
      } catch (error) {
        setJsonInput(input);
        setIsValidJson(false);
      }
    };

    const handleClose = () =>{
        onClose();
    }
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <div className={isValidJson ? styles.success: styles.delete}>{ isValidJson ? "JSON is Valid":"JSON is invalid" }</div>
                <div className={styles.deleteIcon}>
                    { isValidJson ? 
                        <SuccessIcon width="20" height="20" /> : 
                        <ErrorIcon width="20" height="20" /> 
                    }
                </div>
            </div>
            <div className={styles.deleteText}>
                <textarea
                    id={`textarea-${id}`}
                    value={jsonInput}
                    onChange={handleJsonChange}
                    disabled={disabled}
                />
            </div>
            <div className={styles.buttons}>
                {
                    disabled ?
                        <button type="button" onClick={handleClose}>Close</button>
                        :
                        <>
                            <button type="button" onClick={handleClose}>Cancel</button>
                            <button type="button" onClick={handleClose}>Save</button>
                        </>
                }
            </div>
        </div>
    );
};