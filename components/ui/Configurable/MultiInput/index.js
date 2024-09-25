import React, { useState } from 'react';
import styles from './index.module.css';

export default function TagsInput({values, setValues}){

  const [inputValue, setInputValue] = useState('');

  const removeTags = (indexToRemove) => {
    setValues((prevTags) => prevTags.filter((_, index) => index !== indexToRemove));
  };

  const addTags = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default behavior for the Enter key
      if (inputValue.trim() !== '') {
        // Check if the tag is not already present
        if (!values.includes(inputValue.trim())) {
          setValues((prevTags) => [...prevTags, inputValue.trim()]);
        }
        setInputValue('');
      }
    }
  };
  
  
  return (
    <div className={styles.mainContainer}>
        {values.map((tag, index) => (
          <div key={index} className={styles.item}>
            <span id="text">{tag}</span>
            <span id="icon" onClick={() => removeTags(index)} style={{ marginLeft: 5,marginRight: 5, cursor: 'pointer',
        }}>
              x
            </span>
          </div>
        ))}
          <div className={styles.lastdiv}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Press enter to add"
                onKeyDown={(event) => addTags(event)}
            />
          </div>
    </div>
  );
};

