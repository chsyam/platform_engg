import { useEffect, useState } from "react";
import RadioButton from "../../Configurable/RadioButton";
import DropDown from "../../Configurable/DropDown";
import style from "./index.module.css";
import TextArea from "../../Configurable/TextArea";
import Popup from 'reactjs-popup';
import { handleFetchUrlByKey, handleFetchListByUrl } from "./handler";
import { Checkbox } from "@mui/material";
import MultiDropDown from "../../Configurable/MultiDropDown";

export const CustomItem = ({ item, isPopUp, setIsPopUp, disabled = false, value = null, envName = null }) => {

    const data = item?.data;
    const id = item?.id;
    const [dropdownList, setDropDownList] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            if (data.htmlType === "DropDown") {
                if (data.valueType === "static") {
                    setDropDownList(data.values);
                } else {
                    const url = await handleFetchUrlByKey(data.values);
                    const dpList = await handleFetchListByUrl(url);
                    setDropDownList(dpList);
                }
            }
            else if(data.htmlType === "MultiSelect-CheckBox"){
                setDropDownList(data.values);
            }
        };
        fetchData();
    }, [id]);

    const getDescription = () => {
        return `Description for ${item.data.description}`;
    };

    if (data.htmlType === "Input") {
        return (
            <div className={style.Input}>
                <input
                    minLength="1"
                    name={"custom"+item.name}
                    id={item.id}
                    type="text"
                    placeholder={`Enter ${item.name}`}
                    defaultValue={value}
                    disabled={envName === item.name ? true: disabled} />
            </div>
        );
    }
    else if (data.htmlType === "RadioButton") {
        return (
            <div className={style.radioButton} title={getDescription()}>
                <RadioButton id={id} text={item.name} disabled={disabled} value={value} />
            </div>
        );
    }
    else if (data.htmlType === "DropDown") {
        const [dropVal, setDropVal] = useState(value);
        if (data.selectType === "multi") {
            return (
                <div className={style.dropdown} title={getDescription()}>
                    <MultiDropDown //this should be a multi select dropdown
                        id={id}
                        options={dropdownList}
                        values={dropVal}
                        setValues={setDropVal}
                        defaultValue={`Select ${item.name}`}
                        disabled={disabled}
                    />
                </div>
            );
        }
        else {
            return (
                <div className={style.dropdown} title={getDescription()}>
                    <DropDown
                        id={id}
                        options={dropdownList}
                        selectedOption={dropVal}
                        defaultValue={`Select ${item.name}`}
                        onSelect={(value) => setDropVal(value)}
                        disabled={disabled} />
                </div>
            );
        }
    }
    else if (data.htmlType === "TextArea") {
        const [jsonInput, setJsonInput] = useState(value);
        return (
            <div className={style.textAreaDiv} title={getDescription()} >
                <textarea
                    style={{ display: "none" }}
                    id={`textarea-${id}`}
                    value={jsonInput}
                    />
                <Popup className={style.textAreaDiv}
                    trigger={<label>Click here to View/Edit TextArea</label>}
                    modal nested>
                    {
                        close => (
                            <TextArea id={id} jsonInput={jsonInput} setJsonInput={setJsonInput} onClose={() => close()} disabled={disabled} />
                        )}
                </Popup>
            </div>
        );
    }
    else if (data.htmlType === "MultiSelect-CheckBox") {
        if (!dropdownList) {
            return <div>Loading...</div>; // Or some other loading indicator
        }
    
        return (
            <div className={style.multiCheck} id={`multicheckbox-${id}`}>
                {dropdownList.map((item, index) => (
                    <div className={style.checkItem} id={index}>
                        <label id={index}>{item}</label>
                        <Checkbox id={index} value={value} />
                    </div>
                ))}
            </div>
        );
    }        
    else {
        return (
            <div className={style.Input} title={getDescription()}>
                <input
                    minLength="1"
                    name={item.name}
                    id={item.id}
                    type="text"
                    defaultValue={value}
                    placeholder={`Enter ${item.name}`}
                    disabled={disabled} />
            </div>

        );
    }
};
