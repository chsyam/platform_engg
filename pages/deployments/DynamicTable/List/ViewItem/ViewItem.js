import React, { useEffect } from "react";
import style from "./index.module.css";
import Button from "../../../../../components/ui/Configurable/Button";

const ViewItem = React.memo(({ setResponseId, popUpData, reqName }) => {

    const closePage = () => {
        setResponseId(0);
    }

    const MyForm = () => {
        return(
            <form className={style.form}>
            {
                (() => {
                    const len = popUpData?.length;
                    const elements = [];
                    let index = 0;
                    while(index < len){

                        const item = popUpData[index];
                        elements.push(
                            <div className={style.headings} style={{marginTop: "24px"}}>
                                <label>Request {index+1}</label>
                            </div>
                        );
                        
                        if(item.status.toLowerCase() === "failed"){
                            elements.push(
                                <div className={style.row}>
                                    <label name="key">message</label>
                                    <label name="value">{item?.message}</label>
                                </div>
                            )
                        }
                        const data = Object.entries(item.data);
                        data.forEach((temp)=>{
                            elements.push(
                                <div className={style.row}>
                                    <label name="key">{temp[0]}</label>
                                    <label name="value">{JSON.stringify(temp[1])}</label>
                                </div>
                            );
                        });

                        index += 1;
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
                    <label>Request : {reqName}</label>
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

export default ViewItem;