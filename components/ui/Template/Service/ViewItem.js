import { useEffect, useState } from "react";
import styles from "./ServiceTable.module.css";
import workFlow from "../../../../public/data/workFlow.json"
import { ErrorIcon, SuccessIcon } from "../../../icons";

function ViewItem(props) {

    const handleClose = () => {
        props.setViewPopUp(false);
    }

    const isJSONArray = (arr) => {
        try {
          return Array.isArray(arr);
        } catch (e) {
          return false;
        }
      }

    const printJSONArrayWithSpaces = (arr) => {
        try {
          if (Array.isArray(arr)) {
            return arr.join(', ');
          } else {
            throw new Error('Input is not a JSON array.');
          }
        } catch (e) {
          console.error(e.message);
          return null;
        }
      }
    return (
        <div className={styles.popup}>
            <div className={styles.viewHeader}>
                {
                    (() => {
                        if (props.popUpData["status"]?.toLowerCase() === "success" || props.popUpData["status"]?.toLowerCase() === "provisioned") {
                            return (
                                <div>
                                    <label>{props.popUpData["msg"]}</label>
                                    <SuccessIcon />
                                </div>
                            )
                        } else {
                            return (
                                <div>
                                    <label>{"Request Failed Due some error"}</label>
                                    <ErrorIcon />
                                </div>
                            )
                        }
                    })()
                }
                <span onClick={() => { handleClose() }}>Close</span>
            </div>
            <div className={styles.viewBody}>
                <ul>
                    {props.popUpData["data"] && Object.entries(props.popUpData["data"]).map(([key, value]) => (
                        <li key={key}>
                            <label>
                                <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                                <p>:</p>
                            </label>
                            {
                                isJSONArray(value) ?
                                    printJSONArrayWithSpaces(value) :
                                    JSON.parse(JSON.stringify(value))
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ViewItem;
