import { useState, useEffect } from 'react';
import React from 'react';
import styles from "./index.module.css";
import TemplateTable from "./List/TemplateTable";
import EditPage from './EditPage';

const DynamicTable = React.memo(({requests, setRequests,envName,reqName , paramData}) => {

  const [selectedId, setSelectedId] = useState({id: 0, isEdit: false});
  const [id, setId] = useState(2);

  return (
    <div className={styles.container}>
      {
        selectedId.id != 0 && 
          <EditPage
            requests={requests}
            envName={envName}
            setRequests={setRequests}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            paramsData={paramData}
          />
      }
      <TemplateTable
        id={id}
        setId={setId}
        requests={requests}
        reqName={reqName}
        envName={envName}
        setRequests={setRequests}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
});

export default DynamicTable;