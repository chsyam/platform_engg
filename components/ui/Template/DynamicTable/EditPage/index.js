import React, { useEffect } from "react";
import style from "./index.module.css";
import Button from "../../../Configurable/Button";
import { CustomItem } from "../../utils/CustomItem";
import { useState } from "react";
import { ExtractParams } from "../../utils/ExtractParams";
import { ExtractMetaData } from "../../utils/ExtractMetaData";

const EditPage = React.memo(({ requests,envName , setRequests, selectedId, setSelectedId, paramsData }) => {
    const getRequestById = (id) => {
        return requests.find((req) => req.id === id);
    }

    const [isEditable, setEdit] = useState(selectedId.isEdit);
    const [id, setId] = useState(selectedId.id);
    const [request, setRequest] = useState(getRequestById(id));

    const closePage = () => {
        setSelectedId({id: 0, isEdit: false});
    }
    const handleSubmit = (event) => {

        event.preventDefault();
        const params = ExtractParams(paramsData);
        const restReqList = requests.filter((req) => req.id !== id);
        const selectedReq = requests.find((req) => req.id === id);
        setRequests([...restReqList, {...selectedReq, params: params}]);
        setSelectedId({id: 0, isEdit: false});
    };

    useEffect(()=>{
        const name = "custom"+envName
        try{
            const inputWithGivenName = document.querySelectorAll(`input[name="${name}"]`)[0];
            inputWithGivenName.value = request.name;
        }catch(error){
            console.error("component not found "+name)
        }
    },[])
    
    const MyForm = () => {
        return(
            <form  className={style.form}>
            <div className={style.headings} style={{marginTop: "24px"}}>
                <label>Request Details</label>
            </div>
            {/* First row */}
            <div className={style.row}>
                <div className={style.cell}>
                    <label>Request Id</label>
                    <input
                        minLength="3"
                        name="id"
                        id="request"
                        type="text"
                        value={request.id}
                        placeholder="Request Id"
                        readOnly
                    />
                </div>
                <div className={style.cell}>
                    <label>Request Name</label>
                    <input
                        minLength="3"
                        name="name"
                        type="text"
                        id="request"
                        defaultValue={request.name}
                        placeholder="Request Name"
                        disabled={!isEditable}
                        readOnly
                    />
                </div>
            </div>

            {/* Second row */}
            <div className={style.row}>
                <div className={style.cell}>
                    <label>Request Count</label>
                    <input
                        name="count"
                        type="text"
                        id="request"
                        defaultValue={request.count}
                        placeholder="Request Count"
                        disabled={!isEditable}
                        readOnly
                    />
                </div>
                <div className={style.cell} />
            </div>

            <div className={style.headings} style={{marginTop: "12px"}}>
                <label>Request Parameters</label>
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
                                        const name1 = item1?.name;
                                        const name2 = item2?.name;

                                        if(item1.data.htmlType !== "MultiSelect-CheckBox"){
                                            rowEle.push(
                                                <div className={style.cell} id={item1.id + "_child1"} style={item1.data.htmlType === "TextArea" ? {height: "100%"}:{}}>
                                                    <label id={item1.id} style={item1.data.htmlType === "RadioButton"? { color: "transparent" }: {}}>
                                                        {item1.name}
                                                    </label>
                                                    <CustomItem item={item1} disabled={!isEditable} value={request?.params[name1]} envName={envName} />
                                                </div>
                                            );

                                            if(item2 !== null){
                                                rowEle.push(
                                                    <div className={style.cell} id={item2.id + "_child2"} style={item2.data.htmlType === "TextArea" ? {height: "100%"}:{}}>
                                                        <label id={item2.id} style={item2.data.htmlType === "RadioButton"? { color: "transparent" }: {}}>
                                                            {item2.name}
                                                        </label>
                                                        <CustomItem item={item2} disabled={!isEditable} value={request?.params[name2]} envName={envName} />
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
                                                    <CustomItem item={item1} disabled={!isEditable} value={request?.params[name1]} envName={envName} />
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
                    <label>Request : {request.name}</label>
                </div>
            <div className={style.body}>
                <MyForm />
            </div>
            <div className={style.footer}>
                {
                    selectedId.isEdit ?
                <span>
                    <Button id={"white"} label={"Cancel"} onClick={() => closePage()} />
                    <Button id={"colored"} label={"Save"} onClick={(event) => handleSubmit(event)} />
                </span>
                :
                <span>
                    <Button id={selectedId.isEdit ? "white" : "colored" } label={"Close"} onClick={() => closePage()} />
                </span>
                }
            </div>
        </div>
    </div>
    );
})

export default EditPage;