import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from "./DashboardStyles.module.css";
import ServicesPieChart from './ServicesPieChart';

const ServicesChart = (props) => {

    const [teamName, setTeamName] = useState("");
    // const countFilteredData = (status) => {
    //     if (!props.services || !Array.isArray(props.services) || props.services.length === 0)
    //         return 0;
    //     const filteredServices = props.services?.filter(ser => ser.status === status && ser.group?.includes(teamName))
    //     return filteredServices.length
    // }

    // const filteredData = [
    //     [
    //         'provisoned', countFilteredData("Provisioned")
    //     ],
    //     [
    //         'Approved', countFilteredData("Approved")
    //     ],
    //     [
    //         'Failed', countFilteredData("Failed")
    //     ],
    //     [
    //         'Initiated', countFilteredData("Initiated")
    //     ],
    //     [
    //         'Pending', countFilteredData("Pending")
    //     ]
    // ];

    const staticData = {
        "Sirius": [
            ["provisoned", 83],
            ["Approved", 150],
            ["Failed", 70],
            ["Initiated", 5],
            ["Pending", 8]
        ],
        "Orion": [
            ["provisoned", 60],
            ["Approved", 90],
            ["Failed", 29],
            ["Initiated", 8],
            ["Pending", 7]
        ],
        "Vega": [
            ["provisoned", 41],
            ["Approved", 99],
            ["Failed", 7],
            ["Initiated", 12],
            ["Pending", 24]
        ]
    };

    // const countGraphData = (group) => {
    //     if (!props.services || !Array.isArray(props.services) || props.services.length === 0)
    //         return 0;

    //     const filteredServices = props.services?.filter(ser => ser.group?.includes(group));
    //     return filteredServices.length;
    // }

    const graphData = [
        {
            name: 'Sirius',
            y: 158 //countGraphData("Sirius"),
        },
        {
            name: 'Orion',
            y: 123 //countGraphData("Orion"),
        },
        {
            name: 'Vega',
            y: 97 //countGraphData("Vega"),
        }
    ];

    const options = {
        chart: {
            type: 'column',
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
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: null
            }
        },
        legend: {
            enabled: false
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> services<br/>'
        },

        series: [
            {
                name: 'Deployed Services',
                colorByPoint: true,
                data: staticData[teamName],
                dataLabels: {
                    enabled: true,
                    format: '{point.y}',
                },
                point: {
                    events: {
                        click: function () {
                            teamName === "" && setTeamName(this.name)
                        },
                    },
                },
            }
        ],
    };

    return (
        <div className={styles.servicesChart}>
            <div className={styles.cardHeader}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {teamName !== "" &&
                        <div className={styles.breadCrumb} onClick={() => {
                            setTeamName("");
                        }}>
                            Deployed Services
                        </div>
                    }
                    <div className={styles.chartHead}>
                        {teamName === "" ? "Deployed Services" : `> ${teamName}`}
                    </div>
                </div>
            </div>
            {
                // (props.services?.length === 0) ? (
                //     <div style={{ color: "#0C2132", fontSize: "16px", display: "flex", alignItems: "middle", justifyContent: "center" }}>
                //         No data is available
                //     </div>
                // ) : (
                teamName === "" ?
                    <ServicesPieChart graphData={graphData} teamName={teamName} setTeamName={setTeamName} />
                    :
                    <HighchartsReact highcharts={Highcharts} options={options} />
                // )
            }
        </div>
    );
};

export default ServicesChart;