import React, { useEffect } from "react";
import style from "./index.module.css";
import Button from "../../../../components/ui/Configurable/Button";
import { useState } from "react";

const EditPage = React.memo(({ request, setSelectedId }) => {

    const [paramData, setParamsData] = useState([]);

    const closePage = () => {
        setSelectedId(0);
    }

    useEffect(() => {
        let params = Object.entries(request["params"]);
        setParamsData(params);
    }, []);

    const MyForm = () => {
        return (
            <form className={style.form}>
                <div className={style.headings} style={{ marginTop: "24px" }}>
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
                            value={request?.id}
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
                            defaultValue={request?.name}
                            placeholder="Request Name"
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
                            defaultValue={request?.count}
                            placeholder="Request Count"
                            readOnly
                        />
                    </div>
                    <div className={style.cell} />
                </div>

                <div className={style.headings} style={{ marginTop: "12px" }}>
                    <label>Request Parameters</label>
                </div>
                {
                    (() => {
                        const elements = [];
                        let index = 0;
                        const len = paramData?.length;

                        while (index < len) {

                            let item1 = paramData[index++];
                            let item2 = null;
                            if (index < len) {
                                item2 = paramData[index++];
                            }

                            {
                                elements.push(
                                    <div className={style.row} id={index}>
                                        <div className={style.cell} id={index + "_child1"}>
                                            <label id={index + "_label1"}>{item1[0]}</label>
                                            <input
                                                minLength="3"
                                                name="role"
                                                id={index + "_input1"}
                                                type="text"
                                                defaultValue={item1[1]}
                                                placeholder={`Enter ${item1[0]}`}
                                                readOnly={true}
                                            />
                                        </div>
                                        {
                                            item2 !== null ? (
                                                <div className={style.cell} id={index + "_child2"}>
                                                    <label id={index + "_label2"}>{item2[0]}</label>
                                                    <input
                                                        minLength="3"
                                                        name="role"
                                                        id={index + "_input2"}
                                                        type="text"
                                                        defaultValue={item2[1]}
                                                        placeholder={`Enter ${item2[0]}`}
                                                        readOnly={true}
                                                    />
                                                </div>
                                            ) : (<div className={style.cell} />)
                                        }
                                    </div>
                                )
                            }
                        }
                        return elements;
                    })()
                }
            </form>
        )
    }

    return (
        <div className={style.previewContainer}>
            <div className={style.previewContent}>
                <div className={style.header}>
                    <label>Request : {request?.name}</label>
                </div>
                <div className={style.body}>
                    <MyForm />
                </div>
                <div className={style.footer}>
                    <span>
                        <Button id={"colored"} label={"Close"} onClick={() => closePage()} />
                    </span>
                </div>
            </div>
        </div>
    );
});

export default EditPage;