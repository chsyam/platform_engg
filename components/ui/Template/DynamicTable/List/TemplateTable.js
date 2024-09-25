import styles from "./TemplateTable.module.css";
import { useState, useCallback } from "react";
import React from "react";
import TableRows from "./TableRows.js";
import PaginationRounded from "./Pagenation.js";
import { makeEnvFormate } from "../../../../../pages/templates/FormComponents.js";

const TemplateTable = React.memo(({id , setId, requests,envName, reqName, setRequests, selectedId, setSelectedId}) => {

    const [itemsPerPage, _] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [startingItem, setStartingItem] = useState((currentPage - 1) * itemsPerPage);

    const handleAddReq = useCallback(() => {
      setRequests((prevRequests) => [
          ...prevRequests,
          { id: id, name: makeEnvFormate(reqName,`req${id}`), count: 1, params: {} },
        ]);
        setId(1+id);
    }, [requests,reqName]);
  
    const handleRemoveReq = useCallback(
      (id) => {
        if(requests.length > 1){
          setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
        }
      },
      [requests,reqName]
    );
  
    const replicaLimits = useCallback(
      (val) => {
          const number = Number(val);
          if(number < 1)
            return 1;
          else if(number > 5)
            return 5;
          else
            return number;
      }
    ,[]);

    const handleChange = useCallback(
      (id, key, value) => {
        if(key === "name"){
          const newName = makeEnvFormate(reqName, value);
          setRequests((prevRequests) =>
            prevRequests.map((request) =>
              request.id === id ? { ...request, [key]: newName, params: {...request.params, [envName]: newName} } : request
            )
          );
        }else{
          setRequests((prevRequests) =>
            prevRequests.map((request) =>
              request.id === id ? { ...request, [key]: replicaLimits(value) } : request
            )
          );
        }
      },
      [setRequests,reqName]
    );

    return (
        <div className={styles.templates}>
            <div className={styles.addButton}  onClick={()=>{handleAddReq()}}>
              Add New Row
            </div>
            <div className={styles.templateSection}>
                <TableRows
                    requests={requests}
                    reqName={reqName}
                    handleRemoveReq={handleRemoveReq}
                    handleChange={handleChange}
                    startingItem={startingItem}
                    itemsPerPage={itemsPerPage}
                    setSelectedId={setSelectedId}
                />
            </div>
            <div className={styles.pagenation}>
                <PaginationRounded
                    selectedId={selectedId}
                    setCurrentPage={setCurrentPage} totalPages={Math.ceil(requests.length / itemsPerPage)}
                    itemsPerPage={itemsPerPage} startingItem={startingItem} setStartingItem={setStartingItem}
                />
            </div>
        </div>
    );
});
export default TemplateTable;