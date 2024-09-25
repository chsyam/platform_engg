import React from 'react';
import { useState, useEffect } from 'react';
import styles from "./index.module.css";
import TemplateTable from "./List/TemplateTable";
import EditPage from './EditPage';
import axios from 'axios';
import ViewItem from './List/ViewItem/ViewItem';

const DynamicTable = React.memo(({ requests, setRequests, status, reqId }) => {

  const [selectedId, setSelectedId] = useState(0);
  const [responseId, setResponseId] = useState(0);
  const [responses, setResponses] = useState([]);
  const [resp, setResp] = useState([]);

  const getRequestData = (id) => {
    return(requests.find((req) => req.id === id));
  }

  const isReqSuccess = (item, name) => {
    if (item.requestName !== name) {
      return false;
    }
    if (item.status.toLowerCase() !== "success" && item.status.toLowerCase() !== "provisioned") {
      return false;
    }
    return true;
  };

  const isReqFailed = (item, name) => {
    if (item.requestName !== name) {
      return false;
    }
    if (item.status.toLowerCase() !== "failed") {
      return false;
    }
    return true;
  };
  
  const fetchResponse = async () => {
    try {
        const response = await axios.post('/api/deployments/view', { "id": reqId });
        const details = response.data.message;
        setResponses(details);
        if(details.length > 0){
        setRequests((prevRequests) => 
          prevRequests.map((req) => {
              try{
                const successCount = details.filter((item) => isReqSuccess(item,req.name)).length;
                const failedCount = details.filter((item) => isReqFailed(item,req.name)).length;
                return { ...req, success: successCount, failed: failedCount };
              }catch(error){
                return {...req, success: 0, failed: req.count}
              }
            })
          );
        }        
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
      const fetchData = async () => {
          await fetchResponse();
      };
      fetchData();
  }, [status]);

  useEffect(() =>{
    if(responses.length > 0 && responseId !== 0){
      try{
      const req = requests.filter((item)=>item.id === responseId)[0];
      const response = responses.filter((item)=> item.requestName === req.name);
      setResp(response);
      }
      catch(error){
        console.error(error);
      }
    }
  },[responseId]);

  return (
    <div className={styles.container}>
      {
        selectedId != 0 && 
          <EditPage
            request={getRequestData(selectedId)}
            setSelectedId={setSelectedId}
          />
      }
      {
        responseId != 0 && 
          <ViewItem
            setResponseId={setResponseId}
            reqName={getRequestData(responseId).name}
            popUpData={resp}
          />
      }
      <TemplateTable
        requests={requests}
        status={status}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        setResponseId={setResponseId}
      />
    </div>
  );
});

export default DynamicTable;