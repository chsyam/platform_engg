import LayoutLogin from '../../components/ui/Layout/Layout_login'
import Layout from '../../components/ui/Layout/Layout'
import LoginPage from '../login';
import { getCookie } from 'cookies-next';
import templateStyle from '../../styles/templates/index.module.css'
import Dropdown from '../../components/ui/Configurable/DropDown/index';
import React, { useState, useEffect, useRef, version } from 'react';
import axios from 'axios';
import FormResponse from '../../components/ui/Template/Create/FormResponse';
import PreViewPage from '../../components/ui/Template/Create/PreViewNewPage';
import Button from '../../components/ui/Configurable/Button';
import ApiResponse from './../../components/ui/Configurable/ApiResponse';
import { getAllServices } from '../api/services';
import { useRouter } from 'next/router';
import defaultTemplateList from "../../public/data/template.json";
import paramsDefaultData from "../../public/data/paramsDefaultData.json"
import { CustomItem } from '../../components/ui/Template/utils/CustomItem';
import { Opacity } from '@mui/icons-material';

export default function createTemplate({ username, roles, groups, serviceOption }) {

    const [apiRes, setApiRes] = useState({ type: 0, msg: '' });
    const router = useRouter();

    const initData = [
        {
            id: "0",
            name: "template",
            data: {},
            children: [
                {
                    id: "1",
                    name: "param-1",
                    data: paramsDefaultData,
                    children: []
                },
                {
                    id: "2",
                    name: "param-2",
                    data: paramsDefaultData,
                    children: [],
                }
            ]
        }
    ]
    const treeData = useRef(initData);
    const service = useRef(null);
    const version = useRef(null);
    const templateName = useRef(null);

    const handleFormSubmit = async (event) => {

        event.preventDefault();
        // Ensure that the form is obtained correctly
        const form = event.target.closest('form');
        if (!form) {
            console.error('form not found');
            return;
        }

        const metaData = new FormData(form);
        const body = {};
        metaData.forEach((value, key) => {
            body[key] = value;
        });

        const paramsData = [];

        const extractData = (node, parentId) => {
            const processedNode = {
                id: node.id,
                name: node.name,
                data: node.data,
                parentId: parentId,
            };
            paramsData.push(processedNode);

            if (node.children && node.children.length > 0) {
                node.children.forEach((child) => extractData(child, node.id));
            }
        };

        treeData.current.at(0).children?.forEach((child) => extractData(child, 0));

        const { displayName, createdBy } = body;

        const apiData = {
            name: displayName,
            version: version.current,
            tag: 'latest',
            associated_service: service.current,
            created_by: createdBy,
            groups: groups,
            template_json: paramsData,
            roles: roles
        }

        console.log("final body ", apiData);

        try {
            const response = await axios.post('/api/templates/create', apiData);
            if (response.status === 200) {
                const message = response.data.message;
                setApiRes({ type: 1, msg: message });
            } else {
                const message = response.data.message;
                setApiRes({ type: -1, msg: message });
            }
        } catch (error) {
            const errorMessage = error.response.data.message || 'Internal Server Error';
            setApiRes({ type: -1, msg: errorMessage });
        }

    };

    const handleContinue = () => {
        router.push("/templates");
    }


    const PageSuccess = () => {
        return (
            <LayoutLogin pageTitle="Create Template">
                {username ? (
                    <>
                        <Layout username={username} roles={roles}>
                            <div className={templateStyle.container}>
                                {apiRes.type !== 0 && <ApiResponse apiRes={apiRes} setApiRes={setApiRes} onContinue={handleContinue} />}
                                <div className={`${(apiRes.type !== 0) && "opacity-0 pointer-events-none"} `}>
                                    <div className={templateStyle.mainContainer}>
                                        <form className={templateStyle.form} onSubmit={handleFormSubmit}>
                                            <FormCreationPage
                                                username={username}
                                                groups={groups}
                                                templateName={templateName}
                                                treeData={treeData}
                                                service={service}
                                                version={version}
                                                serviceOption={serviceOption}
                                            />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Layout>
                    </>
                ) : (
                    <>
                        <LoginPage />
                    </>
                )}
            </LayoutLogin>
        );
    }

    return (
        serviceOption.error ? (
            <div>Error: {serviceOption.message}</div>
        ) : (
            <PageSuccess />
        )
    );
}

const FormCreationPage = React.memo(({ username, groups, templateName, treeData,
    service, version, serviceOption
}) => {

    const [showPreview, togglePreview] = useState(false);
    const [formData, setFormData] = useState({
        displayName: "",
        version: null,
        groups: null,
        service: null,
        createdBy: null,
        paramsData: [],
        // ... other properties
    });

    const handlePreView = (event) => {

        event.preventDefault();
        if (showPreview) {
            togglePreview(false);
        }

        // Ensure that the form is obtained correctly
        const form = event.target.closest('form');
        if (!form) {
            console.error('form not found');
            return;
        }

        const metaData = new FormData(form);
        const body = {};
        metaData.forEach((value, key) => {
            body[key] = value;
        });

        const paramsData = [];

        const extractData = (node, parentId) => {
            const processedNode = {
                id: node.id,
                name: node.name,
                data: node.data,
                parentId: parentId,
            };
            paramsData.push(processedNode);

            if (node.children && node.children.length > 0) {
                node.children.forEach((child) => extractData(child, node.id));
            }
        };

        treeData.current.at(0).children?.forEach((child) => extractData(child, 0));

        const { displayName, createdBy } = body;

        // Use the functional update form of setFormData        
        setFormData((prevData) => {
            return {
                ...prevData,
                displayName,
                createdBy,
                service: service.current,
                version: version.current,
                groups,
                paramsData: paramsData,
            };
        });

        togglePreview(true);
    };

    return (
        <div style={showPreview ? { Opacity: 0, PointerEvent: "none" } : {}}>
            {showPreview && <PreViewPage formData={formData} togglePreview={togglePreview} />}
            <ChangingFormComponent
                username={username}
                groups={groups}
                templateName={templateName}
                treeDataParent={treeData}
                serviceParent={service}
                versionParent={version}
                serviceOption={serviceOption}
            />

            <div className={templateStyle.bottomPane}>
                <div name={"white"}>
                    <Button label={"Cancel"} />
                </div>
                <div name={"white"}>
                    <Button label={"Save Draft"} />
                </div>
                <div name={"colored"}>
                    <Button label={"Preview"} onClick={(event) => handlePreView(event)} />
                </div>
                <div name={"colored"}>
                    <Button label={"Submit"} type="submit" />
                </div>
            </div>
        </div>
    );
});

const ChangingFormComponent = React.memo(({ username, groups, templateName, treeDataParent
    , serviceParent, versionParent, serviceOption }) => {

    const versionOptions = ['0.1', '0.2', '0.3'];
    const [version, setVersion] = useState(versionParent.current);
    const [service, setService] = useState(serviceParent.current);
    const [treeData, setTreeData] = useState(treeDataParent.current);

    useEffect(() => {
        if (defaultTemplateList !== null && service !== null && defaultTemplateList[service] !== null) {
            const templateData = [
                {
                    id: "0",
                    name: "template",
                    data: {},
                    children: defaultTemplateList[service],
                }
            ]
            setTreeData(templateData);
            treeDataParent.current = templateData;
        }
    }, [service, serviceOption]);

    useEffect(() => {
        versionParent.current = version;
    }, [version])

    useEffect(() => {
        serviceParent.current = service;
    }, [service])

    useEffect(() => {
        treeDataParent.current = treeData;
    }, [treeData])

    return (
        <>
            {/* First row */}
            <div className={templateStyle.row}>
                <div className={templateStyle.cell}>
                    <label name="formLabel">Template Name</label>
                    {(() => {
                        const [displayName, setDisplayName] = useState(templateName.current);
                        const handleChange = (event) => {
                            const val = event.target.value;
                            setDisplayName(val);
                            templateName.current = val;
                        }
                        return (
                            <input
                                minLength="3"
                                name="displayName"
                                id="displayName"
                                type="text"
                                placeholder="Enter Template Name"
                                value={displayName}
                                onChange={(event) => { handleChange(event) }}
                                required
                            />
                        )
                    })()
                    }
                </div>
                <div className={templateStyle.cell}>
                    <label name="formLabel">Created By</label>
                    <input
                        minLength="3"
                        name="createdBy"
                        id="createdBy"
                        type="text"
                        value={username.charAt(0).toUpperCase() + username.slice(1)}
                        readOnly
                    />
                </div>
            </div>

            {/* Second row */}
            <div className={templateStyle.row}>
                <div className={templateStyle.cell}>
                    <label name="formLabel">Version</label>
                    <div className={templateStyle.dropdown}>
                        <Dropdown
                            options={versionOptions}
                            selectedOption={version}
                            defaultValue="Select Version"
                            onSelect={setVersion}
                            zindex={'99'}
                        />
                    </div>
                </div>
                <div className={templateStyle.cell}>
                    <label name="formLabel">Associated Service</label>
                    <div className={templateStyle.dropdown}>
                        <Dropdown
                            options={serviceOption}
                            selectedOption={service}
                            defaultValue="Select Service"
                            onSelect={setService}
                        />
                    </div>
                </div>
            </div>

            {/* Third row */}
            <div className={templateStyle.row}>
                <div className={templateStyle.cell}>
                    <label name="formLabel">Groups</label>
                    <input
                        minLength="3"
                        name="Groups"
                        id="Groups"
                        type="text"
                        value={groups?.slice(2, -2)}
                        readOnly
                    />
                </div>
                <div className={templateStyle.cell}>
                </div>
            </div>
            <div className={templateStyle.formResponse}>
                <FormResponse
                    treeData={treeData}
                    setTreeData={setTreeData}
                />
            </div>
        </>
    )
});

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });

    if (!username) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    var roles = getCookie('roles', { req, res });
    var groups = getCookie('groups', { req, res });

    try {
        var serviceOptionData = await getAllServices(req, res);
        if (!serviceOptionData || serviceOptionData instanceof Error) {
            serviceOptionData = []
        }
        return {
            props: {
                username,
                roles,
                groups,
                serviceOption: serviceOptionData,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error)
        return {
            props: {
                username,
                roles,
                groups,
                serviceOption: { error: true, message: 'Error fetching service options' },
            },
        };
    }
};
