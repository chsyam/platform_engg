import React, { useState } from 'react';
import styles from './index.module.css';

export default function RadioButton({ id="check",text, disabled=false, value=false }){

  const [isSelected, toggleSelected] = useState(value);
  return (
    <div className={styles.radioButtonWrapper} onClick={()=>{!disabled && toggleSelected((prev)=>(!prev))}}>
      <span id={`radioButton-${id}`} data-value={isSelected} style={isSelected ? {backgroundColor: "#159E1B"} : {backgroundColor: "#FFF"}}/>
      <label>{text}</label>
    </div>
  );
};
