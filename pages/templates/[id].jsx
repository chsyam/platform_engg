import { useRouter } from "next/router";
import getTemplateById from "../api/templates/getbyid";
import Layout from "../../components/ui/Layout/Layout"
import style from "./../../styles/templates/view.module.css"
import { EditIcon } from "../../components/icons";
import { useEffect, useState, useRef, useCallback } from "react";
import DeployButton from "../../components/icons/DeployLogo";
import ApiResponse from "../../components/ui/Configurable/ApiResponse";
import { CustomItem } from "../../components/ui/Template/utils/CustomItem";
import { getCookie } from "cookies-next";
import DynamicTable from "../../components/ui/Template/DynamicTable";
import { ExtractParams } from "../../components/ui/Template/utils/ExtractParams";
import { ExtractMetaData } from "../../components/ui/Template/utils/ExtractMetaData";
import axios from "axios";
import React from "react";
import FormComponents from "./FormComponents";
import getEnvName from "../api/templates/getEnvName";

export default function Popup({templateDetails,envName, roles,username,groups}){

    const [apiRes, setApiRes] = useState({ type: 0, msg: '' });
    const router = useRouter();
    const [isDeployable,toggleIsDeplyable] = useState(false);
    const [editTemplate,toggleEditTemplate] = useState(false);
    const [templateData, setTemplateData] = useState(null);
    const [paramData, setParamData] = useState(null);

    const isBulkReq = useRef(false);
    const finalReqs = useRef([{ id: 1, name: "req1", count: 1,params: {} }]);

    function camelCaseToTitleCase(str) {
        if(str === undefined){
            return str;
        }
        // Convert camelCase to a space-separated string
        const result = str.replace(/([A-Z])/g, ' $1');
        
        // Capitalize the first letter of each word and make other letters lowercase
        const titleCase = result
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        
        return titleCase;
    }
      

    useEffect(() => {
        if (templateDetails !== null && 
            typeof templateDetails === 'object' &&
            'template_json' in templateDetails &&
            'id' in templateDetails){

            const { template_json, ...restDetails } = templateDetails;
            setTemplateData(restDetails);
            setParamData(template_json);
            if(router.query?.deploy === "true"){
                toggleIsDeplyable(true);
            }
            if(router.query?.edit === "true"){
                toggleEditTemplate(true);
            }
        }
    }, []);

    const handleSubmit = async(event) => {

        event.preventDefault();
        const metaData = ExtractMetaData();
        let body = {
            ...metaData,
            roles: roles,
            username: username,
            group: groups
        }

        if(isBulkReq.current){
            body["type"] = "Bulk";
            body["paramsList"] = finalReqs.current;
        }else{

            body["type"] = "Single";
            const params = ExtractParams(paramData);
            const deployParamsList = [{
                id: 1,
                name: "default",
                count: 1,
                params: params
            }]
            body["paramsList"] = deployParamsList;
        }

        console.log("body is ",body)
        try {

            const response = await axios.post('/api/templates/deploy', body);
            if (response.status === 200) {
                const data = response.data;
                setApiRes({ type: 1, msg: data.message });
            } else {
                const data = response.data;
                setApiRes({ type: -1, msg: data.message });
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Internal Server Error';
            setApiRes({ type: -1, msg: errorMessage });
        }
    };

    const handleContinue = () => {
        router.push("/deployments");
    }

    const PageSuccess = () => {
    return (
        <Layout username = {username} roles={roles}>
            <div className={style.container}>
            {
                apiRes.type !== 0 && <ApiResponse apiRes={apiRes} setApiRes={setApiRes} onContinue={handleContinue} />
            }
            <div className={`${style.mainContainer} ${(apiRes.type !== 0) ? 'opacity-0 pointer-events-none' : ''}`}>
                <form  className={style.form} onSubmit={handleSubmit}>
                    <div className={style.headings} style={{marginTop: "24px"}}>
                        <div id="label">
                            <label>Template Details</label>
                        </div>
                        <div className={style.iconSection}>
                            {
                                (!isDeployable)?(
                                    <div className={style.icon} 
                                        onClick={()=>{toggleIsDeplyable(true);
                                    }}>
                                        <DeployButton height={"32"} width={"32"}/>
                                    </div>
                                ):""
                            }
                            <div className={style.icon}
                                style={editTemplate ? {border: "1px solid white"}: {}}
                                onClick={() => {toggleEditTemplate(true)}}
                            >
                                <EditIcon width={"20"} height={"20"} />
                            </div>
                        </div>
                    </div>
                    {/* First row */}
                    <div className={style.row}>
                        <div className={style.cell}>
                            <label>Template Name</label>
                            <input
                                minLength="3"
                                name="templateName"
                                id="wait"
                                type="text"
                                defaultValue={templateData?.name}
                                placeholder="Template Name"
                                disabled={!editTemplate}
                            />
                        </div>
                        <div className={style.cell}>
                            <label>Template ID</label>
                            <input
                                minLength="3"
                                name="template_id"
                                id="request"
                                type="text"
                                defaultValue={templateData?.id}
                                placeholder="Template Id"
                                disabled={!editTemplate}
                            />
                        </div>
                    </div>

                    {/* Second row */}
                    <div className={style.row}>
                        <div className={style.cell}>
                            <label>Template Type</label>
                            <input
                                minLength="3"
                                name="templateType"
                                id="wait"
                                type="text"
                                defaultValue={templateData?.associated_service}
                                placeholder="Template Type"
                                disabled={!editTemplate}
                            />
                        </div>
                        <div className={style.cell}>
                            <label>Created On</label>
                            <input
                                minLength="3"
                                name="createdOn"
                                id="wait"
                                type="text"
                                defaultValue={templateData?.date}
                                placeholder="Created On"
                                disabled={!editTemplate}
                            />
                        </div>
                    </div>

                    {/* Third Row */}
                    <div className={style.row}>
                        <div className={style.cell}>
                            <label>Team</label>
                            <input
                                minLength="3"
                                name="group"
                                id="wait"
                                type="text"
                                defaultValue={templateData?.group?.slice(2,-2)}
                                placeholder="Group"
                                readOnly={!editTemplate}
                            />
                        </div>
                        <div className={style.cell}></div>
                    </div>

                    <FormComponents paramData={paramData} envName={camelCaseToTitleCase(envName)} finalReqs={finalReqs} isBulkReq={isBulkReq} isDeployable={isDeployable} />

                    {
                        (isDeployable == true)?(
                            <div className={style.buttonsSection}>
                                <button className={style.button} onClick={()=>{
                                    router.back();
                                }}>Cancel</button>
                                <button type="submit" className={style.deployButton}>Deploy</button>
                            </div>
                        ):(
                            <div className={style.buttonsSection}>
                            </div>
                        )
                    }
                </form> 
            </div>
            </div>
        </Layout>
    );
    }

    return (
        templateDetails.error ? (
            <div>Error: {templateDetails.message}</div>
        ) : (
            <PageSuccess />
        )
    );
}

export async function getServerSideProps(context) {
    const { req, res, query } = context;
    const { id } = query;

    req.body = {
        id: id,
    }

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
    var groups = getCookie('groups', { req, res });
    if(roles === undefined) {
        roles = false;
    }
    if(username === undefined) {
        username = false;
    }
    if(groups === undefined) {
        groups = "";
    }

    try {
        var templateDetails = await getTemplateById(req,res);
        if(!templateDetails || templateDetails instanceof Error){
            templateDetails = []
        }
        var envName = await getEnvName(req,res,templateDetails?.associated_service);
        if(!envName || envName instanceof Error){
            return {
                props: {
                templateDetails,
                roles,
                username,
                groups
                },
            };
        }else{
            return {
                props: {
                templateDetails,
                roles,
                envName,
                username,
                groups
                },
            };
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        return {
          props: {
            username,
            templateDetails: { error: true, message: 'Error fetching template details' },
            roles: [],
            groups
          },
        };
    }
};