import { useEffect, useState } from "react";
import styles from "./ServiceTable.module.css";
import workFlow from "./../../../../public/data/workFlow.json"

function ActionItem(props) {

    const [actionList, setActionList] = useState([]);
    const actionsForAdmins = ["Approve", "Provision"];
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        if (props.status) {
            setActionList(workFlow[props.status])
        }
    }, [props.status])

    const handleActionButton = (item) => {
        console.log('Item clicked:', item);
        props.setVisibility(props.id,false);
        setVisible(false)
        props.triggerAction(item, props.id);
    }


    return (
        <div className={styles.actionItem} id={props.id}
            onMouseLeave={() => { props.setVisibility(props.id,false) }}
            style={visible ? {} : { display: "none" }}>
            {
                (() => {
                    const elements = [];
                    let index = 0;
                    const len = actionList?.length;
                    while (index < len) {
                        const item = actionList[index++];
                        elements.push(
                            <label key={index} onClick={() => { handleActionButton(item) }}>
                                {item}
                            </label>
                        )
                    }
                    return elements;
                })()
            }
        </div>
    );
}

export default ActionItem;