import React from 'react';
import styles from './index.module.css';
import Tree from '../Tree';
import { useState, useEffect } from 'react';
import Dropdown from './../../../Configurable/DropDown';
import Button from './../../../Configurable/Button';
import { EditIcon } from './../../../../icons';
import MutliInput from '../../../Configurable/MultiInput';
import RadioButton from '../../../Configurable/RadioButton';
import axios from 'axios';

export default function FormResponse({ treeData, setTreeData }) {

    const [nodeId, setNodeId] = useState("0");
    const [isFormEditable, toggleFormEditable] = useState(false);


    return (
        <div className={styles.mainContainer}>
            <div className={styles.splitScreen}>
                <div className={styles.leftPane}>
                    <Tree
                        treeData={treeData}
                        setTreeData={setTreeData}
                        nodeId={nodeId}
                        setNodeId={setNodeId}
                    />
                </div>
                <div className={styles.middlePane} />
                <div className={styles.rightPane}>
                    <div className={styles.formPane}>
                        <MyFrom
                            treeData={treeData}
                            setTreeData={setTreeData}
                            nodeId={nodeId}
                            setNodeId={setNodeId}
                            isFormEditable={isFormEditable}
                            toggleFormEditable={toggleFormEditable}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}


function MyFrom({ treeData, setTreeData, nodeId, setNodeId, isFormEditable, toggleFormEditable }) {

    const htmlTypeOptions = ['DropDown', 'Input', 'RadioButton', 'TextArea', 'MultiSelect-CheckBox'];
    const [dynamicValueOptions, setDynamicValueOptions] = useState([]);
    const [name, setName] = useState("");
    const [dynamickey, setDynamicKey] = useState(null);
    const [isMandatory, setIsMandatory] = useState('no');

    const [htmlType, setHtmlType] = useState(null);
    const [values, setValues] = useState([]);
    const [valueType, setValueType] = useState("static");
    const [selectType, setSelectType] = useState("single");
    const [description, setDescription] = useState("");

    const findNode = (data, targetNodeId) => {
        for (const node of data) {
            if (node.id === targetNodeId) {
                return node;
            } else if (node.children && node.children.length > 0) {
                const foundNode = findNode(node.children, targetNodeId);
                if (foundNode) {
                    return foundNode;
                }
            }
        }
        return null;
    };

    const handleFormLoad = (selectedNode) => {

        if (!selectedNode)
            return;

        setName(selectedNode.name);

        if (!selectedNode.data) {
            return;
        }

        console.log("loding data ", selectedNode.data)
        const { htmlType, isMandatory, values, valueType, description, selectType } = selectedNode.data;

        console.log("select Type ", selectType)
        console.log("selectedNode ", selectedNode)
        setHtmlType(htmlType);
        setIsMandatory(isMandatory);
        setValueType(valueType);
        setSelectType(selectType);
        setDescription(description);
        if (valueType === "static") {
            setValues(values);
        }
        else {
            setDynamicKey(values);
        }
    }

    const handleFetchDropDownList = async () => {
        try {
            const response = await axios.get('/api/services/getDropDownList', { timeout: 5000 });
            // console.log("dropdown data is ", response)
            if (response.status === 200) {
                const options = response.data["listApis"];
                setDynamicValueOptions(options);
            } else {
                setDynamicValueOptions([]);
            }
        } catch (error) {
            setDynamicValueOptions([]);
        }
    }

    useEffect(() => {
        // Load form data when the nodeId changes
        if (nodeId !== "0") {
            console.log("Loading form data ", nodeId);
            const selectedNode = findNode(treeData, nodeId);
            // Use setTimeout to ensure the DOM has been updated
            setTimeout(() => {
                handleFormLoad(selectedNode);
            }, 0);
        }

        const fetchData = async () => {
            await handleFetchDropDownList();
        };

        fetchData();

    }, [treeData, nodeId, setNodeId]);

    const handleEditForm = (event) => {
        event.preventDefault();
        console.log("Editing form...");
        toggleFormEditable(false);
    }

    const handleSaveForm = (event) => {

        event.preventDefault();
        console.log("Saving form...");

        if (!name || name.trim().length <= 0) {
            console.log("Ended")
            return;
        }

        let finalValues = values;
        if (valueType === "dynamic") {
            finalValues = dynamickey;
        }
        const formData = {
            htmlType,
            isMandatory,
            values: finalValues,
            valueType,
            description,
            selectType: selectType
        };

        console.log("formData", formData)
        const updatedTreeData = updateTreeData(treeData, nodeId, formData);

        setTreeData(updatedTreeData);
        toggleFormEditable(true);
    };

    // Helper function to update treeData based on nodeId
    const updateTreeData = (treeData, targetNodeId, formData) => {
        return treeData.map((node) => {
            if (node.id === targetNodeId) {
                // Update data section of the node with form data
                return {
                    ...node,
                    name: name,
                    data: formData,
                };
            } else if (node.children && node.children.length > 0) {
                // Recursively update children
                return {
                    ...node,
                    children: updateTreeData(node.children, targetNodeId, formData),
                };
            }
            return node;
        });
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const checkMaxLength = () => {
        var textarea = document.getElementById("description");
        var maxLength = 60;

        if (textarea.value.length > maxLength) {
            var alertSpan = document.getElementById("description_alert");
            alertSpan.innerHTML = "( Maximum 60 characters allowed. )";
            //textarea.value = textarea.value.substring(0, maxLength);
        } else {
            var alertSpan = document.getElementById("description_alert");
            alertSpan.innerHTML = "";
        }

        setDescription(textarea.value);
    }


    return (
        nodeId !== "0" && (
            <form className={styles.myFrom}>
                <div className={styles.header}>
                    <label id="headerLabel">{name}</label>
                    <div className={styles.editButtons}>
                        <Button label="Save" onClick={(event) => handleSaveForm(event)} />
                        <span onClick={(event) => handleEditForm(event)} >
                            <EditIcon />
                        </span>
                    </div>
                </div>
                <div className={styles.row}>
                    <input
                        minLength="1"
                        name="nameInput"
                        id="nameInput"
                        type="text"
                        onChange={handleNameChange}
                        value={name}
                        placeholder="Display Name"
                        disabled={isFormEditable}
                    />
                </div>
                <div className={styles.row}>
                    <Dropdown
                        backgroundColor={"#FFF"}
                        options={htmlTypeOptions}
                        selectedOption={htmlType}
                        defaultValue="Select Input Type"
                        onSelect={(selectedType) => setHtmlType(selectedType)}
                        disabled={isFormEditable}
                    />
                </div>
                {
                    htmlType === "MultiSelect-CheckBox" &&
                    <>
                        <div className={styles.row} style={{ width: '100%' }}>
                            <MutliInput values={values} setValues={setValues} />
                        </div>
                        <div className={styles.row}>
                            <label style={{ display: 'block', whiteSpace: "nowrap" }}>Type</label>
                            <div className={styles.checkbox}>
                                <label>Single</label>
                                <span style={selectType === "single" ? { backgroundColor: "#159E1B" } : {}} onClick={() => { setSelectType("single") }} />
                            </div>
                            <div className={styles.checkbox}>
                                <label>Multi</label>
                                <span style={selectType === "multi" ? { backgroundColor: "#159E1B" } : {}} onClick={() => { setSelectType("multi") }} />
                            </div>
                        </div>
                    </>
                }
                {
                    (htmlType === "DropDown") &&
                    <>
                        <div className={styles.row}>
                            <label style={{ display: 'block', whiteSpace: "nowrap" }}>Value</label>
                            <div className={styles.checkbox}>
                                <label>Static</label>
                                <span style={valueType === "static" ? { backgroundColor: "#159E1B" } : {}} onClick={() => { setValueType("static") }} />
                            </div>
                            <div className={styles.checkbox}>
                                <label>Dynamic</label>
                                <span style={valueType === "dynamic" ? { backgroundColor: "#159E1B" } : {}} onClick={() => { setValueType("dynamic") }} />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <label style={{ display: 'block', whiteSpace: "nowrap" }}>Type</label>
                            <div className={styles.checkbox}>
                                <label>Single</label>
                                <span style={selectType === "single" ? { backgroundColor: "#159E1B" } : {}} onClick={() => { setSelectType("single") }} />
                            </div>
                            <div className={styles.checkbox}>
                                <label>Multi</label>
                                <span style={selectType === "multi" ? { backgroundColor: "#159E1B" } : {}} onClick={() => { setSelectType("multi") }} />
                            </div>
                        </div>
                        {
                            valueType === "static" ?
                                (
                                    <div className={styles.row} style={{ width: '100%' }}>
                                        <MutliInput values={values} setValues={setValues} />
                                    </div>
                                )
                                :
                                (
                                    <div className={styles.row}>
                                        <Dropdown
                                            backgroundColor={"#FFF"}
                                            options={dynamicValueOptions}
                                            selectedOption={dynamickey}
                                            defaultValue="Select Value Type"
                                            onSelect={(selectedKey) => setDynamicKey(selectedKey)}
                                            disabled={isFormEditable}
                                        />
                                    </div>
                                )
                        }
                    </>
                }
                <div className={styles.row} style={{ paddingRight: '40%' }}>
                    <label>Mandatory</label>
                    <div className={styles.checkbox} onClick={() => { !isFormEditable && setIsMandatory("yes") }}>
                        <label>Yes</label>
                        <span style={isMandatory === "yes" ? { backgroundColor: "#159E1B" } : {}} />
                    </div>
                    <div className={styles.checkbox} onClick={() => { !isFormEditable && setIsMandatory("no") }}>
                        <label>No</label>
                        <span style={isMandatory === "no" ? { backgroundColor: "#159E1B" } : {}} />
                    </div>
                </div>
                {
                    htmlType === 'Input' &&
                    <div className={styles.rowValidation}>
                        <label>Validation Check Box</label>
                        <div>
                            <RadioButton text={"isNumber"} />
                        </div>
                        <div>
                            <RadioButton text={"isString"} />
                        </div>
                    </div>
                }
                <div className={styles.row} style={{ flexDirection: "column", alignItems: "flex-start" }}>
                    <label style={{ marginBottom: "8px" }}>Description
                        <span id="description_alert" />
                    </label>
                    <textarea
                        id="description"
                        maxlength="500"
                        rows={2}
                        className={styles.description}
                        onInput={checkMaxLength}
                        placeholder='Enter Some Description for Parameter!'
                        value={description}
                    />
                </div >
            </form >
        )
    );

}
