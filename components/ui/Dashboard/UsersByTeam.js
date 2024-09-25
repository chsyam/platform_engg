import HighchartsReact from "highcharts-react-official";
import Highcharts, { chart } from "highcharts";
import styles from "./DashboardStyles.module.css"
import { useEffect, useState } from 'react';

function UsersByTeamChart({ usersData }) {
    var groups_users_dict = {};

    useEffect(()=>{
        if(!usersData || usersData instanceof Error){
            console.error("users data not found ",usersData);
        } else {
            usersData.map((user) => {
                for (var i = 0; i < user.groups.length; i++) {
                    if (groups_users_dict[user.groups[i]] === undefined) {
                        groups_users_dict[user.groups[i]] = [user.id];
                    } else {
                        groups_users_dict[user.groups[i]].push(user.id);
                    }
                }
            })
        }
    },[])

    var chartData = [];
    for (var key in groups_users_dict) {
        chartData.push(
            {
                name: key,
                y: groups_users_dict[key].length
            }
        );
    }
    console.log("groups_users_dict", chartData);

    const pet = [
        [
            'developers',
            3
        ],
        [
            'Project Admin',
            1
        ],
    ];

    const sre = [
        [
            'developers',
            4
        ],
        [
            'Project Admin',
            1
        ],

    ];

    const dev = [
        [
            'developers',
            5
        ],
        [
            'Project Admin',
            1
        ],


    ];

    const graphData = [
        {
            name: 'Platform Engineering Team',
            y: 4,
            drilldown: 'pet'
        },
        {
            name: 'SRE Team',
            y: 5,
            drilldown: 'sre'
        },
        {
            name: 'Development Team',
            y: 6,
            drilldown: 'dev'
        }
    ];

    const [showdata, setShowData] = useState(graphData);
    const [categoryName, setCategoryName] = useState("");

    const handleClick = (name) => {
        name === "Platform Engineering Team" && setShowData(pet);
        name === "SRE Team" && setShowData(sre);
        name === "Development Team" && setShowData(dev);
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
                data: chartData,
                point: {
                    events: {
                        click: function () {
                            categoryName === "" && setCategoryName(this.name)
                            handleClick(this.name)
                        },
                    },
                },
            }
        ],
    };
    return (
        <div>
            <div className={styles.piechart}>
                <div className={styles.cardHeader}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {categoryName !== "" &&
                            <div className={styles.breadCrumb} onClick={() => {
                                setCategoryName("");
                                setShowData(graphData);
                            }}>
                                user Management
                            </div>
                        }
                        <div className={styles.chartHead}>
                            {
                                categoryName === "" ? "User Management" : `> ${categoryName}`
                            }
                        </div>
                    </div>
                </div>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </div>
    );
};

export default UsersByTeamChart;