import { useRouter } from "next/router";
import getRequestById from "../api/deployments/getbyid";
import Layout from "./../../components/ui/Layout/Layout"
import style from "../../styles/deployments/view.module.css"
import { useEffect, useState } from "react";
import DynamicTable from "./DynamicTable";
import { getCookie } from "cookies-next";
import React from 'react';
import ConnectionPropertiers from "../../components/ui/Template/Service/connectionProps";


const Popup = React.memo(({requestDetails,roles,username}) => {

    const [apiRes, setApiRes] = useState({ type: 0, msg: '' });
    const router = useRouter();
    const [editTemplate,toggleEditTemplate] = useState(false);
    const [metaData, setMetaData] = useState(null);
    const [requests, setRequests] = useState([]);
    const [paramData, setParamsData] = useState([]);
    const [connProperties,setConnProperties] = useState(false);
	const [connPropOpen, setConnPropOpen] = useState(false);
    useEffect(() => {
        if (requestDetails !== null && 
            typeof requestDetails === 'object' &&
            'deployment_params' in requestDetails &&
            'id' in requestDetails){

            const { deployment_params, ...restDetails } = requestDetails;
            setRequests(deployment_params.map((req) => ({
                ...req,
                success: 0, // Add the success value to each request
                failed: 0,
            })));
            setMetaData(restDetails);
            if(requestDetails?.type == "Single"){
                const paramList = Object.entries(deployment_params[0]["params"]);
                setParamsData(paramList);
            }
        }
    }, [])

    return (
        <Layout username={username} roles={roles}>
            <div  className={`${(connPropOpen) && "opacity-10 pointer-events-none"} ${style.container} `}>
            {/* {
                apiRes.type !== 0 && <ApiResponse apiRes={apiRes} setApiRes={setApiRes} onContinue={handleContinue} />
            } */}
            <div className={`${style.mainContainer} ${(apiRes.type !== 0) ? 'opacity-10 pointer-events-none' : ''}`}>
                <form  className={style.form}>
                    <div className={style.headings} style={{marginTop: "24px"}}>
                        <div id="label">
                            <label>Request Details</label>
                        </div>
                        <div className={style.iconSection}>
                            <div className={style.icon}
                                style={editTemplate ? {border: "1px solid white"}: {}}
                                onClick={()=>{router.back()}}
                            >
                                <label style={{color: "white"}}>X</label>
                            </div>
                        </div>
                    </div>
                    {/* First row */}
                    <div className={style.row}>
                        <div className={style.cell}>
                            <label>Request Name</label>
                            <input
                                minLength="3"
                                name="name"
                                id="metadata"
                                type="text"
                                defaultValue={metaData?.name}
                                placeholder="Enter Request Name"
                                disabled={true}
                            />
                        </div>
                        <div className={style.cell}>
                            <label>Request ID</label>
                            <input
                                minLength="3"
                                name="id"
                                id="metadata"
                                type="text"
                                defaultValue={metaData?.id}
                                placeholder="Enter Request Id"
                                disabled={true}
                            />
                        </div>
                    </div>

                    {/* Second row */}
                    <div className={style.row}>
                        <div className={style.cell}>
                            <label>Template Id</label>
                            <input
                                minLength="3"
                                name="template"
                                id="metadata"
                                type="text"
                                defaultValue={metaData?.template}
                                placeholder="Enter Template ID"
                                disabled={true}
                            />
                        </div>
                        <div className={style.cell}>
                            <label>Request Status</label>
                            <input
                                minLength="3"
                                name="createdOn"
                                id="wait"
                                type="text"
                                defaultValue={metaData?.status}
                                placeholder="Created On"
                                disabled={true}
                            />
                        </div>
                    </div>

                    {/* Third Row */}
                    <div className={style.row}>
                        <div className={style.cell}>
                            <label>Created By</label>
                            <input
                                minLength="3"
                                name="created_by"
                                id="metadata"
                                type="text"
                                defaultValue={metaData?.created_by}
                                placeholder="Created By"
                                readOnly={true}
                            />
                        </div>
                        <div className={style.cell}>
                            <label>Role</label>
                            <input
                                minLength="3"
                                name="role"
                                id="metadata"
                                type="text"
                                defaultValue={metaData?.role?.slice(2,-2)}
                                placeholder="Role"
                                readOnly={true}
                            />
                        </div>
                    </div>

                    {/* Forth Row */}
                    <div className={style.row}>
                        <div className={style.cell}>
                            <label>Associated Service</label>
                            <input
                                minLength="3"
                                name="service"
                                id="metadata"
                                type="text"
                                defaultValue={metaData?.service}
                                placeholder="service"
                                readOnly={true}
                            />
                        </div>
                        <div className={style.cell}>
                            <label>Team</label>
                            <input
                                minLength="3"
                                name="group"
                                id="metadata"
                                type="text"
                                defaultValue={metaData?.group?.slice(2,-2)}
                                placeholder="group"
                                readOnly={true}
                            />
                        </div>
                    </div>

                    {/* Fifth Row */}
                    <div className={style.row}>
                        <div className={style.cell}>
                            <label>Request Type</label>
                            <input
                                minLength="3"
                                name="type"
                                id="metadata"
                                type="text"
                                defaultValue={metaData?.type}
                                placeholder="Single"
                                readOnly={true}
                            />
                        </div>
                        <div className={style.cell} />
                    </div>

                    {/* Request Properties */}
                    <div className={style.headings} style={{marginTop: "16px"}}>
                        <div id="label">
                            <label>Request Paramteres</label>
                        </div>
                    </div>

                    {
                        (metaData?.type === "Bulk") ?
                        (
                        <div className={style.tableRow}>
                            <div className={style.tableCell}>
                                <DynamicTable requests={requests} setRequests={setRequests} reqId={metaData?.id} status={metaData?.status} />
                            </div>
                        </div>
                        ) :
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
                                            <div className={style.cell} id={index+"_child1"}>
                                                <label id={index+"_label1"}>{item1[0]}</label>
                                                <input
                                                    minLength="3"
                                                    name="role"
                                                    id={index+"_input1"}
                                                    type="text"
                                                    defaultValue={item1[1]}
                                                    placeholder={`Enter ${item1[0]}`}
                                                    readOnly={!editTemplate}
                                                />
                                            </div>
                                            {
                                                item2 !== null ? (
                                                    <div className={style.cell} id={index+"_child2"}>
                                                        <label id={index+"_label2"}>{item2[0]}</label>
                                                        <input
                                                            minLength="3"
                                                            name="role"
                                                            id={index+"_input2"}
                                                            type="text"
                                                            defaultValue={item2[1]}
                                                            placeholder={`Enter ${item2[0]}`}
                                                            readOnly={!editTemplate}
                                                        />
                                                    </div>
                                                ):(<div className={style.cell} />)
                                            }
                                        </div>
                                    )
                                }
                            }
                        return elements;
                        })()
                    }

                    {
                        <div className={style.buttonsSection}>
                        </div>
                    }
                </form> 
            </div>
            </div>
            {
				(connPropOpen) && (
					<ConnectionPropertiers setConnPropOpen={setConnPropOpen} connProperties={connProperties}/>
				)
			}
        </Layout>
    );
})

export default Popup;

export async function getServerSideProps(context) {
    const { req, res, query } = context;
    const { id } = query;

    req.body = {
        id: id,
    }
    const requestDetails = await getRequestById(req,res);
    console.log("request details ",requestDetails)
    var roles = getCookie('roles', { req, res });
    var username = getCookie('username', { req, res });

  if (!username) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
    if(roles === undefined) {
        roles = false;
    }
    if(username === undefined) {
        username = false;
    }
    return {
        props: {
            requestDetails: requestDetails,
            roles,username
        },
    };
};