import React, { useState, useRef } from 'react';
import style from './index.module.css';
import { ArrowIcon } from "../../../icons";

const Item = ({ name, id, text, onclickFunc, showIcon, isOpen, disabled }) => {

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
			<label id={`dropdown-${id}`}>{text}</label>
			{showIcon && <div className={style.dropdown_icon}><ArrowIcon direction={isOpen ? "up" : "down"} /></div>}
		</div>
	);
};

export default function Dropdown({ id, options, selectedOption, defaultValue, onSelect, disabled = false, backgroundColor, height, zIndex }) {
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
		setTimeout(() => { setIsOpen(false); }, 1000);
	};

	const handleDropdownMouseLeave = () => {
		setTimeout(() => { setIsOpen(false); }, 1000);
	};

	const newStyles = {
		height: height || "50px",
		backgroundColor: backgroundColor || "#F5F5F5",
		zIndex: isOpen ? zIndex || 999 : 1,
	};

	const handleOnSelect = (option) => {
		onSelect(option);
	}

	return (
		<div
			name="dropdown"
			className={`${style.dropdown} custom-dropdown`}
			style={newStyles}
			onMouseLeave={handleDropdownMouseLeave}
			ref={dropdownRef}
		>
			{
				selectedOption === null ?
					<Item name="parent" id={id} text={defaultValue} onclickFunc={toggleDropdown} showIcon disabled={disabled} isOpen={isOpen} />
					: <Item name="absolute" id={id} text={selectedOption} onclickFunc={toggleDropdown} showIcon disabled={disabled} isOpen={isOpen} />
			}
			{isOpen && (
				<div className={style.dropdown_list} onMouseEnter={handleListMouseEnter} onMouseLeave={handleListMouseLeave}>
					<ul>
						{options && options.map((option, index) => (
							<li style={newStyles} key={index} onClick={() => { handleOnSelect(option); setIsOpen(false); }}>
								<Item name="child" text={option} isOpen={isOpen} disabled={disabled} />
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};
