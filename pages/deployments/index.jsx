import Layout from '../../components/ui/Layout/Layout'
import { getAllServices } from '../api/deployments';
import styles from "./../../styles/deployments/index.module.css";
import ServiceTable from '../../components/ui/Template/Service/ServiceTable';
import { useState,useEffect } from 'react';
import ApiResponse from '../../components/ui/Configurable/ApiResponse';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { WebsocketContext } from '../../components/ui/Layout/WebSocket/WebsocketProvider';
import { getCookie } from 'cookies-next';

export default function Deployments( props ) {

  const [id,setId] = useState(null);
  const [approve, setApprove] = useState({ type: 0, msg: '' });
  const [res, setRes] = useState({type: 0, msg: ''});
  const [provision, setProvision] = useState({ type: 0, msg: '' });
  const [listServices, setListServices] = useState(props.services);

  const router = useRouter();
  const currentURL = router.asPath;
  const { isReady, message } = useContext(WebsocketContext);

  useEffect(() => {
    if (!isReady || !message) return;

    const msg = JSON.parse(message);
    console.log("new notification ",msg)
    const id = parseInt(msg.id, 10);
    if (msg.pageId.includes(currentURL) || msg.pageId.includes('*')) {
      setListServices((prevServiceList) => {
        let updatedList;

        if (msg.type === 'create' || msg.type === 'update') {
          // Remove the existing item with the same id, if it exists
          updatedList = prevServiceList?.filter((item) => item?.id !== id);
          // update the list
          updatedList = [...updatedList, msg?.data];
        } else if (msg.type === 'delete') {
          // remove the item with the specified id
          updatedList = prevServiceList?.filter((item) => item?.id !== id);
        } else {
          // it is a connect/disconnect msg
          console.log('socket msg is ', msg);
          return prevServiceList; // no update needed
        }

        return updatedList;
      });
    }
  }, [isReady, message]);

    return (
        <Layout username={props.username} roles={props.roles}>
            {
              approve.type !== 0 && <ApiResponse apiRes={approve} setApiRes={setApprove} onContinue={handleApproved} />
            }
            {
              provision.type !== 0 && <ApiResponse apiRes={provision} setApiRes={setProvision} onContinue={handleProvision} />
            }
            {
              res.type !== 0 && <ApiResponse apiRes={res} setApiRes={setRes} />
            }
          <div style={{width: "100%",marginTop: "10px"}} className={`${(approve.type !== 0 || provision.type !== 0 || res.type !== 0) && "opacity-0 pointer-events-none"} ${styles.container}`}>
            <div className={`${styles.mainContainer} items-start justify-center`}>
              <ServiceTable services={listServices} setApprove={setApprove} setProvision={setProvision} setRes={setRes} setId={setId} roles={props.roles}></ServiceTable>
            </div>
           </div>
        </Layout>
    );
}

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
		roles = '[]'
	}
	if(groups == undefined){
		groups = '[]'
	}

	// groups = JSON.parse(groups);
  
  try{
    roles = JSON.parse(roles);
    let services = await getAllServices(username, roles, groups);
    if(!services || services instanceof Error){
      services = []
    }
    return {
      props: {
        services: services,username, roles, groups
      }
    }
  }catch(error){
    return {
      props: {
        services: [],username, roles, groups
      }
    }
  }
};