import React, { useState, useEffect} from 'react';
import style from "./index.module.css";
import { EditIcon } from '../../../icons';

const EditableLabel = ({ initialValue , reqName, onValueChange }) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (errorMessage !== null) {
          const timer = setTimeout(() => {
            setErrorMessage("");
          }, 2000);
    
          // Clear the timeout if the component is unmounted or temporaryValue changes
          return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleClick = (e) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        onValueChange(value); // Notify parent about the change
    };

    const isAlphaNumeric = (val) =>{
        // Regular expression to allow only alphanumeric characters
        const alphanumericRegex = /^[a-zA-Z0-9]*$/;
        return alphanumericRegex.test(val);
    }

    const handleChange = (e,setValue) => {
        e.stopPropagation();
        const newValue = e.target.value;
        if(reqName === "" || reqName === null || reqName === undefined){
            if(isAlphaNumeric(newValue)){
                setValue(newValue);
            }else{
                setErrorMessage("Only alpha numberic values are accepted !!!")
            }
        }
        else if (newValue.startsWith(`${reqName}-`)) {
            const subStr = newValue.split("-");
            if(isAlphaNumeric(subStr[1])){
                setValue(newValue);
            }else{
                setErrorMessage("Only alpha numberic values are accepted !!!")    
            }
        } else {
          setValue(`${reqName}-`);
        }
    };

    const handleKeyDown = (e) => {
        e.stopPropagation();
        if (e.key === 'Enter') {
            handleBlur();
        }
    };

    return (
        <div className={style.container}>
            {isEditing ? (
                <input
                    type="text"
                    maxLength={25}
                    value={value}
                    onChange={(e)=>{handleChange(e,setValue)}}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                <div className={style.labelContainer}>
                    <label style={{ cursor: 'pointer' }}>
                        {value}
                    </label>
                    <div className={style.icon} onClick={handleClick}>
                        {<EditIcon color="#000137" width="20" height="20" />}
                    </div>
                </div>
            )}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default EditableLabel;
