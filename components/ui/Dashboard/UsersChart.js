import HighchartsReact from "highcharts-react-official";
import Highcharts, { chart } from "highcharts";
import styles from "./DashboardStyles.module.css"
import { useEffect, useState } from 'react';

function UsersChart({ usersList }) {
    const [chartData, setChartData] = useState({});
    const [usersByGrp, setUsersByGrp] = useState({});

    useEffect(() => {
        try {
            if (!usersList || usersList instanceof Error) {
                console.error("userList is not available ", usersList);
            }
            else {
                var groups_users_dict = {};
                const processUsersList = () => {
                    usersList?.forEach(user => {
                        if (user.groups.length === 0) {
                            if (groups_users_dict["Platform Admins"] === undefined) {
                                groups_users_dict["Platform Admins"] = [user];
                            } else {
                                groups_users_dict["Platform Admins"].push(user);
                            }
                        } else {
                            user.groups.forEach(group => {
                                if (groups_users_dict[group] === undefined) {
                                    groups_users_dict[group] = [user];
                                } else {
                                    groups_users_dict[group].push(user)
                                }
                            })
                        }
                    })
                    setUsersByGrp(groups_users_dict);
                    var temp = [
                        { name: "Orion", y: 32 },
                        { name: "Sirius", y: 21 },
                        { name: "Vega", y: 18 }
                    ];
                    // for (var key in usersByGrp) {
                    //     temp.push({ name: key, y: usersByGrp[key].length })
                    // }
                    setChartData(temp);

                    var userByroles = {};
                    for (const group in groups_users_dict) {
                        const users = groups_users_dict[group];
                        var temp = {};
                        users.map(user => {
                            user.rolesAssociated.map(role => {
                                temp[role] = temp[role] ? temp[role] + 1 : 1;
                            })
                        })
                        var final_temp = [];
                        for (const role in temp) {
                            final_temp.push({ name: role, y: temp[role] });
                        }
                        userByroles[group] = final_temp;
                    }
                }
                processUsersList();
            }
        } catch (e) {
            console.log("error processing userList", usersList, e);
        }
    }, [usersList])

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
                data: chartData
            }
        ],
    };
    return (
        <div>
            <div className={styles.piechart}>
                <div className={styles.cardHeader}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className={styles.chartHead}>
                            Users By Team
                        </div>
                    </div>
                </div>
                {
                    (chartData.length === 0) ? (
                        <div style={{ color: "#0C2132", fontSize: "16px", display: "flex", alignItems: "middle", justifyContent: "center" }}>
                            No data is available
                        </div>
                    ) : (
                        <HighchartsReact highcharts={Highcharts} options={options} />
                    )
                }
            </div>
        </div>
    );
};

export default UsersChart;