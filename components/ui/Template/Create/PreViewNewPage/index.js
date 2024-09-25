import React from "react";
import style from "./index.module.css";
import Button from "../../../Configurable/Button";
import { CustomItem } from "../../utils/CustomItem";

export default function PreViewNew({ formData, togglePreview }){
	
    const {
        displayName,
        createdBy,
        service,
        version,
        groups,
        paramsData,
      } = formData;

    const MyForm = () => {
        return(
            <form  className={style.form}>
            <div className={style.headings} style={{marginTop: "24px"}}>
                <label>Template Details</label>
            </div>
            {/* First row */}
            <div className={style.row}>
                <div className={style.cell}>
                    <label>Template Name</label>
                    <input
                        minLength="3"
                        name="templateName"
                        id="metadata"
                        type="text"
                        value={displayName}
                        placeholder="Template Name"
                        readOnly
                    />
                </div>
                <div className={style.cell}>
                    <label>Template Version</label>
                    <input
                        minLength="3"
                        name="version"
                        type="text"
                        defaultValue={version}
                        placeholder="Template Version"
                        readOnly
                    />
                </div>
            </div>

            {/* Second row */}
            <div className={style.row}>
                <div className={style.cell}>
                    <label>Associated Service</label>
                    <input
                        minLength="3"
                        name="service"
                        type="text"
                        defaultValue={service}
                        placeholder="Associated Service"
                        readOnly
                    />
                </div>
                <div className={style.cell}>
                    <label>Created By</label>
                    <input
                        minLength="3"
                        name="createdBy"
                        type="text"
                        defaultValue={createdBy}
                        placeholder="Created By"
                        readOnly
                    />
                </div>
            </div>

            {/* Third Row */}
            <div className={style.row}>
                <div className={style.cell}>
                    <label>Group</label>
                    <input
                        minLength="3"
                        name="group"
                        type="text"
                        defaultValue={groups.slice(1,-1)}
                        placeholder="Group"
                        readOnly
                    />
                </div>
                <div className={style.cell}></div>
            </div>

            {/* Template Properties */}
            <div className={style.headings} style={{marginTop: "16px"}}>
                <label>Template Properties</label>
            </div>

            {(() => {
                        const elements = [];
                        let index = 0;
                        const len = paramsData?.length;

                        while (index < len) {

                            let item1 = paramsData[index++];
                            let item2 = null;
                            if (item1.data.htmlType !== "MultiSelect-CheckBox" && index < len && paramsData[index].data.htmlType !== "MultiSelect-CheckBox") {
                                item2 = paramsData[index++];
                            }

                            {
                                elements.push(
                                    <div className={style.row} id={index}>
                                    {(() => {
                                        const rowEle = [];
                                        if(item1.data.htmlType !== "MultiSelect-CheckBox"){
                                            rowEle.push(
                                                <div className={style.cell} id={item1.id + "_child1"} style={item1.data.htmlType === "TextArea" ? {height: "100%"}:{}}>
                                                    <label id={item1.id} style={item1.data.htmlType === "RadioButton"? { color: "transparent" }: {}}>
                                                        {item1.name}
                                                    </label>
                                                    <CustomItem item={item1} disabled={false} />
                                                </div>
                                            );

                                            if(item2 !== null){
                                                rowEle.push(
                                                    <div className={style.cell} id={item2.id + "_child2"} style={item2.data.htmlType === "TextArea" ? {height: "100%"}:{}}>
                                                        <label id={item2.id} style={item2.data.htmlType === "RadioButton"? { color: "transparent" }: {}}>
                                                            {item2.name}
                                                        </label>
                                                        <CustomItem item={item2} disabled={false} />
                                                    </div>
                                                );
                                            }
                                            else{
                                                rowEle.push(<div className={style.cell} />);
                                            }
                                        }
                                        else{
                                            rowEle.push(
                                                <div className={style.closeRow}>
                                                    <label className={style.closeRowLabel} id={item1.id}>
                                                        {item1.name}
                                                    </label>
                                                    <CustomItem item={item1} disabled={false} />
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
                    })()}
        </form> 
        )
    }

    return (
        <div className={style.previewContainer}>
            <div className={style.previewContent}>
                <div className={style.header}>
                    <label>{displayName} template</label>
                </div>
            <div className={style.body}>
                <MyForm />
            </div>
            <div className={style.footer}>
                <span>
                    <Button id="white" label={"Cancel"} onClick={() => togglePreview(false)} />
                    <Button id="colored" label={"OK"} onClick={() => togglePreview(false)} />
                </span>
            </div>
        </div>
    </div>
    );
}
