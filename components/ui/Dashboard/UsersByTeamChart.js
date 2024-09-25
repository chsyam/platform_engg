import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import styles from "./DashboardStyles.module.css"
import { use, useEffect, useState } from 'react';

function UsersByTeamChart({ usersList, groups }) {
    const [chartData, setChartData] = useState({});
    const [usersByRoles, setUsersByRoles] = useState({});
    const rolesAvailable = {
        'project-admin': 'Project Admin',
        'developer': 'Developers'
    }
    const [grpName, setGrpName] = useState("")

    useEffect(() => {
        setGrpName(groups.slice(2, -2))
    }, [groups])

    const staticData = {
        "Orion": [
            ['project Admin', 2],
            ['Developers', 30]
        ],
        "Sirius": [
            ['project Admin', 2],
            ['Developers', 19]
        ],
        "Vega": [
            ['project Admin', 2],
            ['Developers', 16]
        ],
    }

    // useEffect(() => {
    //     try {
    //         if (!usersList || usersList instanceof Error) {
    //             console.error("userList is not available ", usersList);
    //         }
    //         else {
    //             var grp_users = [];
    //             const processUsersList = () => {
    //                 const temp = usersList?.filter(user => user?.groups.includes(grpName));
    //                 var userRolesAssociated = {};
    //                 temp.map(user => {
    //                     if (userRolesAssociated[user.rolesAssociated[0]] === undefined) {
    //                         userRolesAssociated[user.rolesAssociated[0]] = [user];
    //                     } else {
    //                         userRolesAssociated[user.rolesAssociated[0]].push(user);
    //                     }
    //                 })
    //                 setUsersByRoles(userRolesAssociated);
    //             }
    //             processUsersList();
    //         }
    //     } catch (e) {
    //         console.log("error processing userList", usersList, e);
    //     }
    // }, [usersList])

    // useEffect(() => {
    //     var graphData = [];
    //     for (var key in usersByRoles) {
    //         graphData.push({
    //             name: rolesAvailable[key] !== undefined ? rolesAvailable[key] : key,
    //             y: usersByRoles[key].length,
    //         });
    //     }
    //     setChartData(graphData)
    // }, [usersByRoles])

    const options = {
        chart: {
            type: 'pie',
            height: 240
        },
        credits: {
            enabled: false
        },
        title: {
            align: 'left',
            text: null
        },
        subtitle: {
            align: 'left',
            text: null
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category',
        },
        yAxis: {
            title: {
                text: null
            }

        },
        plotOptions: {
            series: {
                borderRadius: 2,
                dataLabels: [{
                    enabled: true,
                    distance: 15,
                    format: '{point.name}'
                }, {
                    enabled: true,
                    distance: '-30%',
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 5
                    },
                    format: '{point.y}',
                    style: {
                        fontSize: '0.9em',
                        textOutline: 'none'
                    }
                }]
            },
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                },
                showInLegend: false,
            },
        },

        tooltip: {
            enabled: false,
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [
            {
                name: 'User Management',
                colorByPoint: true,
                data: grpName ? staticData[grpName] : staticData["Orion"],
            }
        ],
    };
    return (
        <div>
            <div className={styles.piechart}>
                <div className={styles.cardHeader}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className={styles.breadCrumb}>
                            User Management
                        </div>
                        <div className={styles.chartHead}>
                            {"> " + grpName}
                        </div>
                    </div>
                </div>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </div>
    );
};

export default UsersByTeamChart;