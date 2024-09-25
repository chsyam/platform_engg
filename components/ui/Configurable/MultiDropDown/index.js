import React, { useState, useRef, useEffect } from 'react';
import style from './index.module.css';
import { ArrowIcon } from "../../../icons";
import { CorrectIcon } from '../../../icons';

const Item = ({ name, id, text, onclickFunc, showIcon, isOpen, disabled, isSelected }) => {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`${style.dropdown_item} ${isHovered ? style.hover : ''}`}
      name={name}
      onClick={disabled ? null : onclickFunc}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <label>{text}</label>
      <div className={style.dropdown_icon}>
        {
          showIcon && <ArrowIcon direction={isOpen ? "up" : "down"} />
        }
        {
          isSelected && <CorrectIcon stroke={isHovered ? "white": "#0C2132"} />
        }
      </div>
    </div>
  );
};

const DropDown = ({ id, options, selectedOption, defaultValue, onSelect, disabled = false, backgroundColor, height, zIndex }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  
  const handleListMouseEnter = () => {
    setIsOpen(true);
  };

  const handleListMouseLeave = () => {
    setIsOpen(false);
  };

  const handleDropdownMouseLeave = () => {
    setIsOpen(false);
  };

  const handleOnSelect = (option) => {
    // Check if the option already exists in the selectedOption array
    if (!selectedOption?.includes(option)) {
      // If it doesn't exist, add it to the array
      if(selectedOption)
        onSelect([...selectedOption, option]);
      else
        onSelect([option]);
    }
    else{
      // If it exists, remove it from the array
      onSelect(selectedOption?.filter(item => item !== option));
    }
  }
  

  const newstyle = {
    height: height || "50px",
    backgroundColor: backgroundColor || "#F5F5F5",
    zIndex: isOpen ? zIndex || 999 : 1,
  };

  const newstyleSelected = {
    height: height || "50px",
    backgroundColor: backgroundColor || "#F5F5F5",
    zIndex: isOpen ? zIndex || 999 : 1,
  }

  return (
    <div
      name="MultiDropDown"
      className={`${style.dropdown} custom-MultiDropDown`}
      style={newstyle}
      onMouseLeave={handleDropdownMouseLeave}
      ref={dropdownRef}
    >
      {
        <Item name="parent" id={id} text={defaultValue} onclickFunc={toggleDropdown} showIcon disabled={disabled} isOpen={isOpen} isSelected={false} />
      }
      {
        <label id={`dropdown-multi-${id}`}  style={{ display: "none" }}>{JSON.stringify(selectedOption)}</label>
      }
      {isOpen && (
        <div className={style.dropdown_list} onMouseEnter={handleListMouseEnter} onMouseLeave={handleListMouseLeave}>
          <ul>
            {options && options.map((option, index) => (

              selectedOption?.includes(option) ?
              (
                <li style={newstyleSelected} key={index} onClick={() => {handleOnSelect(option)}}>
                  <Item id={id} name="child" text={option} isOpen={isOpen} disabled={disabled} isSelected={true} />
                </li>
              )
              :
              (
                <li style={newstyle} key={index} onClick={() => {handleOnSelect(option)}}>
                  <Item id={id} name="child" text={option} isOpen={isOpen} disabled={disabled} isSelected={false} />
                </li>
              )
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default function MultiDropDown({id, options,values,setValues,defaultValue}){

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
    <div className={style.mainContainer}>
          <div className={style.lastdiv}>
            <DropDown id={id} options={options} defaultValue={defaultValue} selectedOption={values} onSelect={setValues}/>
          </div>
    </div>
  );
};
