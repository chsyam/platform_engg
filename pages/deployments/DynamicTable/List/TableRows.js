import React from "react";
import EyeLogo from '@mui/icons-material/Visibility';

function TableRows({ requests,
    startingItem, itemsPerPage, setSelectedId, setResponseId
}) {
    const handleViewClick = (id) => {
        setSelectedId(id);
    }

    const handleViewResp = (id) => {
        setResponseId(id);
    }

    const giveStatus = (success, failed, total) => {
        if (success === total) {
            return "Provisioned"
        }
        else if (failed === total) {
            return "Failed"
        }
        else if (success + failed === total) {
            return "Partially-Provisioned"
        }
        else if (success + failed < total && success + failed > 0) {
            return "Executing";
        }
        else {
            return "Pending"
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <table>
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Request Name</th>
                        <th>Status</th>
                        <th>Status Check</th>
                        <th>View Response</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (requests?.length > 0) && requests.sort((a, b) => a.id - b.id).slice(startingItem, startingItem + itemsPerPage).map((request, index) => {
                            return (
                                <tr key={index} onClick={() => { handleViewClick(request.id) }}>
                                    <td>{request.id}</td>
                                    <td>{request.name}</td>
                                    <td>{giveStatus(request.success, request.failed, request.count)}</td>
                                    <td>{request.success}/{request.count}</td>
                                    <td
                                        onClick={(e) => { e.stopPropagation(); handleViewResp(request.id) }}>
                                        <EyeLogo style={{ fontSize: 18, color: '#000' }} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                    <tr className="h-[30px]"></tr>
                </tbody>
            </table>
        </div>
    );
}

export default TableRows;