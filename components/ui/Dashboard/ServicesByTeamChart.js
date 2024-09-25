import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from "./DashboardStyles.module.css";

const ServicesByTeamChart = (props) => {
    const [grpName, setGrpName] = useState("")

    useEffect(() => {
        setGrpName(props.groups.slice(2, -2))
    }, [props.groups])

    // const filteredData = [
    //     [
    //         'provisoned',
    //         props.services?.filter(ser => ser.status === "Provisioned" && (ser?.group.includes(grpName))).length
    //     ],
    //     [
    //         'Approved',
    //         props.services?.filter(ser => ser.status === "Approved" && (ser?.group.includes(grpName))).length
    //     ],
    //     [
    //         'Failed',
    //         props.services?.filter(ser => ser.status === "Failed" && (ser?.group.includes(grpName))).length
    //     ],
    //     [
    //         'Initiated',
    //         props.services?.filter(ser => ser.status === "Initiated" && (ser?.group.includes(grpName))).length
    //     ],
    //     [
    //         'Pending',
    //         props.services?.filter(ser => ser.status === "Pending" && (ser?.group.includes(grpName))).length
    //     ]
    // ];

    // const countGraphData = (name) => {
    //     if (!props.services || !Array.isArray(props.services) || props.services.length === 0)
    //         return 0;
    //     return props.services?.filter(ser => ser.role === name).length
    // }
    console.log(props)

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
        accessibility: {
            announceNewData: {
                enabled: true
            }
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
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> services<br/>'
        },

        series: [
            {
                name: 'Deployed Services',
                colorByPoint: true,
                data: grpName ? staticData[grpName] : staticData["Sirius"],
            }
        ],
    };

    return (
        <div className={styles.servicesChart}>
            <div className={styles.cardHeader}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={styles.breadCrumb}>
                        Deployed Services
                    </div>
                    <div className={styles.chartHead}>
                        {"> " + grpName}
                    </div>
                </div>
            </div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div >
    );
};

export default ServicesByTeamChart;