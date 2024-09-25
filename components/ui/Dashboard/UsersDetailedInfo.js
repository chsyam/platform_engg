import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import styles from "./DashboardStyles.module.css"
import { useEffect, useState } from 'react';

function UsersDetailedInfo({ usersList }) {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        var groups_users_dict = {};
        function calculateRationOfUsers() {
            usersList && usersList?.map(user => {
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
            setChartData(userByroles);
        }
        if(!usersList || usersList instanceof Error){
            console.error("user list is empty ",usersList);  
        } else{
            calculateRationOfUsers();
        }
    }, []);

    const [teamName, setTeamName] = useState("Orion");
    const handleClick = (name) => {
        setTeamName(name);
    }

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
                data: chartData[teamName]
            }
        ],
    };
    return (
        <div>
            <div className={styles.piechart}>
                <div className={styles.cardHeader}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className={styles.breadCrumb}>
                            Users ratio in Groups
                        </div>
                        <div className={styles.chartHead}>
                            {`> ${teamName}`}
                        </div>
                    </div>
                    {
                        <div>
                            <select className={styles.selectBox} onChange={(e) => { handleClick(e.target.value) }}>
                                <option value="Orion">Orion</option>
                                <option value="Sirius">Sirius</option>
                                <option value="Vega">Vega</option>
                            </select>
                        </div>
                    }
                </div>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </div>
    );
};

export default UsersDetailedInfo;