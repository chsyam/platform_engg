import React, { useEffect, useState } from "react";
import DynamicTable from "../../components/ui/Template/DynamicTable";
import { CustomItem } from "../../components/ui/Template/utils/CustomItem";
import style from "./../../styles/templates/view.module.css"
import bulkServices from "../../public/data/bulkServices.json";

const makeEnvFormate = (reqName, name) => {
    if (!reqName) {
        if (name.includes("-")) {
            const subStr = name.split("-");
            return subStr[1];
        } else {
            return name;
        }
    }
    else if (name.includes("-") === false) {
        const newName = reqName + "-" + name;
        return newName;
    }
    else {
        const subStr = name.split("-");
        const newName = reqName + "-" + subStr[1];
        return newName;
    }
};

const FormComponent = React.memo(({ paramData, envName, finalReqs, isBulkReq, isDeployable }) => {

    const [isBulk, setIsBulk] = useState(isBulkReq?.current);
    const [reqName, setReqName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    // Initialize requests as an array
    const [requests, setRequests] = useState(finalReqs?.current.map(req => ({
        ...req,
        name: makeEnvFormate(reqName, req.name)
    })));

    useEffect(() => {
        finalReqs.current = requests;
    }, [requests, setRequests])

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
        setRequests((prevRequests) =>
            prevRequests.map((req) => {
                const newName = makeEnvFormate(reqName, req.name);
                return { ...req, name: newName, params: { ...req.params, [envName]: newName } };
            })
        );
    }, [reqName]);

    const handleReqName = (val) => {
        // Regular expression to allow only alphanumeric characters
        const alphanumericRegex = /^[a-zA-Z0-9]*$/;

        if (alphanumericRegex.test(val)) {
            setReqName(val);
            setErrorMessage("");
        } else {
            setErrorMessage("Only alpha numberic values are accepted !!!")
        }
    }

    useEffect(() => {
        isBulkReq.current = isBulk
    }, [isBulk, setIsBulk])

    return (
        <>
            {/* Request Properties */}
            <div className={style.headings} style={{ marginTop: "16px" }}>
                <div id="label">
                    <label>Request Properties</label>
                </div>
            </div>

            {/* First Row */}
            <div className={style.row}>
                <div className={style.cell}>
                    <label>Name</label>
                    <input
                        minLength="3"
                        name="name"
                        id="request"
                        type="text"
                        placeholder="Enter Request Name"
                        readOnly={!isDeployable}
                        maxLength={20}
                        value={reqName}
                        onChange={(e) => handleReqName(e.target.value)}
                        required
                    />
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </div>
                <CheckBoxForType
                    isBulk={isBulk}
                    setIsBulk={setIsBulk}
                    envName={envName}
                    isDeployable={isDeployable}
                />
            </div>
            {/* Template Properties */}
            <div className={style.headings} style={{ marginTop: "16px" }}>
                <div id="label">
                    <label>Template Properties</label>
                </div>
            </div>
            <CreateRequestForm
                requests={requests}
                setRequests={setRequests}
                reqName={reqName}
                envName={envName}
                paramData={paramData}
                isBulk={isBulk}
                isDeployable={isDeployable}
            />
        </>
    )
});

const CreateRequestForm = React.memo(({ requests, setRequests, reqName, envName, paramData, isBulk, isDeployable }) => {

    useEffect(() => {
        if (isBulk === false && envName !== undefined) {
            const name = "custom" + envName
            try {
                const inputWithGivenName = document.querySelectorAll(`input[name="${name}"]`)[0];
                inputWithGivenName.value = reqName;
            } catch (error) {
                console.error("component not found " + name)
            }
        }
    }, [reqName])

    return (
        (isBulk && envName !== undefined) ?
            (
                <div className={style.tableRow}>
                    <div className={style.tableCell}>
                        <DynamicTable
                            requests={requests}
                            setRequests={setRequests}
                            reqName={reqName}
                            envName={envName}
                            paramData={paramData}
                        />
                    </div>
                </div>
            )
            :
            (() => {
                const elements = [];
                let index = 0;
                const len = paramData?.length;

                while (index < len) {

                    let item1 = paramData[index++];
                    let item2 = null;
                    if (item1.data.htmlType !== "MultiSelect-CheckBox" && index < len && paramData[index].data.htmlType !== "MultiSelect-CheckBox") {
                        item2 = paramData[index++];
                    }

                    {
                        elements.push(
                            <div className={style.row} id={index}>
                                {(() => {
                                    const rowEle = [];
                                    if (item1.data.htmlType !== "MultiSelect-CheckBox") {
                                        rowEle.push(
                                            <div className={style.cell} id={item1.id + "_child1"} style={item1.data.htmlType === "TextArea" ? { height: "100%" } : {}}>
                                                <label id={item1.id} style={item1.data.htmlType === "RadioButton" ? { color: "transparent" } : {}}>
                                                    {item1.name}
                                                </label>
                                                <CustomItem item={item1} disabled={!isDeployable} envName={envName} />
                                            </div>
                                        );

                                        if (item2 !== null) {
                                            rowEle.push(
                                                <div className={style.cell} id={item2.id + "_child2"} style={item2.data.htmlType === "TextArea" ? { height: "100%" } : {}}>
                                                    <label id={item2.id} style={item2.data.htmlType === "RadioButton" ? { color: "transparent" } : {}}>
                                                        {item2.name}
                                                    </label>
                                                    <CustomItem item={item2} disabled={!isDeployable} envName={envName} />
                                                </div>
                                            );
                                        }
                                        else {
                                            rowEle.push(<div className={style.cell} id={"X_child2"} />);
                                        }
                                    }
                                    else {
                                        rowEle.push(
                                            <div className={style.closeRow} id={item1.id + "_child1"}>
                                                <label className={style.closeRowLabel} id={item1.id}>
                                                    {item1.name}
                                                </label>
                                                <CustomItem item={item1} disabled={!isDeployable} envName={envName} />
                                            </div>
                                        );
                                    }
                                    return rowEle;
                                })()}
                            </div>
                        );
                    }
                }
                return elements;
            })()
    )
})

const CheckBoxForType = React.memo(({ isBulk, setIsBulk, envName, isDeployable }) => {

    const changeIsBulk = (val) => {
        setIsBulk(val)
    }

    return (
        <div className={style.cell}>
            <label>Type</label>
            <div name="typeCheckbox">
                <div className={style.checkbox} style={{ marginLeft: "20px" }} onClick={() => { isDeployable && changeIsBulk(false) }}>
                    <label>Single</label>
                    <span style={isBulk === false ? { backgroundColor: "#159E1B" } : {}} />
                </div>
                {
                    (envName !== undefined) &&
                    (<div className={style.checkbox} style={{ marginLeft: "60px" }} onClick={() => { isDeployable && changeIsBulk(true) }}>
                        <label>Bulk</label>
                        <span style={isBulk === true ? { backgroundColor: "#159E1B" } : {}} />
                    </div>)
                }
            </div>
        </div>
    );
});

export { makeEnvFormate };
export default FormComponent;
