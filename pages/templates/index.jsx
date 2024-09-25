import React, { useEffect, useContext, useState } from 'react';
import Layout from '../../components/ui/Layout/Layout.js';
import TemplateTable from '../../components/ui/Template/List/TemplateTable.js';
import { getAllTemplates } from '../api/templates';
import styles from './../../styles/templates/index.module.css';
import { WebsocketContext } from '../../components/ui/Layout/WebSocket/WebsocketProvider.js';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import ApiResponse from '../../components/ui/Configurable/ApiResponse/index.js';
const ListTemplate = React.memo(({ templates, roles, username }) => {
  const router = useRouter();
  const currentURL = router.asPath;
  const { isReady, message } = useContext(WebsocketContext);
  const [templateList, setTemplateList] = useState(templates);
  const [popUp, setPopUp] = useState({ type: 0, msg: '' });
  
  useEffect(() => {
    if (!isReady || !message) return;

    const msg = JSON.parse(message);
    const id = parseInt(msg.id, 10);

    if (msg.pageId.includes(currentURL) || msg.pageId.includes('*')) {
      setTemplateList((prevTemplateList) => {
        let updatedList;

        if (msg.type === 'create' || msg.type === 'update') {
          // Remove the existing item with the same id, if it exists
          updatedList = prevTemplateList.filter((item) => item.id !== id);
          // update the list
          updatedList = [...updatedList, msg?.data];
        } else if (msg.type === 'delete') {
          // remove the item with the specified id
          updatedList = prevTemplateList.filter((item) => item.id !== id);
        } else {
          // it is a connect/disconnect msg
          return prevTemplateList; // no update needed
        }

        return updatedList;
      });
    }
  }, [isReady, message]);

  const PageSuccess = () => {
  return (
    <Layout username={username} roles={roles}>
		{
			popUp.type !== 0 && <ApiResponse apiRes={popUp} setApiRes={setPopUp} onContinue={()=>{}} />
		}
        <div style={{width: "100%", height:"100%"}} className={`${popUp.type !== 0 && "opacity-0 pointer-events-none"}`}>
          <div className={styles.ListContainer}>
            <TemplateTable templates={templateList} roles={roles} setPopUp={setPopUp}></TemplateTable>
          </div>
        </div>
    </Layout>
  );
  }

  return (
    templates.error ? (
        <div>Error: {templates.message}</div>
    ) : (
        <PageSuccess />
    )
);

});

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
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

  if (username == undefined){
        username = false;
    }
	if(roles == undefined){
		roles = []
	}
	if(groups == undefined){
		groups = []
	}

  try {
    console.log("going to fetch templates")
    let templates = await getAllTemplates(req, res,username,roles,groups);
    if(!templates || templates instanceof Error){
      templates = []
    }
    return {
      props: {
        templates,
        roles: roles,
        username: username,
        groups
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        templates: { error: true, message: 'Error fetching templates' },
        roles: roles,
        username: username,
        groups
      },
    };
  }
}

export default ListTemplate;
