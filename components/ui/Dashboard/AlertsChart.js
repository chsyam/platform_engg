import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import styles from "./DashboardStyles.module.css"
import { useEffect, useState } from 'react';
import { getAlerts } from "../../../pages/api/DashBoard/getAlerts"

function AlertsChart() {
    const [alertsData, setAlertsData] = useState([]);

    useEffect(() => {
        // const fetchData = async () => {
        //     const response = await getAlerts();
        //     const alerts = response?.alerts;
        //     if (response?.totalAlerts === 0) {
        //         setAlertsData([])
        //     } else {
        //         var temp = [];
        //         for (var key in alerts) {
        //             temp.push({
        //                 name: key,
        //                 y: alerts[key]
        //             })
        //         }
        //         setAlertsData(temp.sort((a, b) => a.y - b.y));
        //     }
        // };
        // fetchData();
        var temp = [
            { name: "Pod Using Max Memory", y: 34 },
            { name: "Pod Using Max CPU", y: 28 },
            { name: "Kubernetes Pod CrashLooping", y: 46 },
            { name: "Deployment Replica Mismatch", y: 12 },
            { name: "Kubernetes Pod Not Healthy", y: 19 },
        ];
        setAlertsData(temp);
    }, [])

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
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
        },

        series: [
            {
                name: 'alerts',
                colorByPoint: true,
                data: alertsData,
            }
        ],
    };

    return (
        <div>
            <div className={styles.piechart}>
                <div className={styles.cardHeader}>
                    <div className={styles.chartHead}>Alerts</div>
                </div>
                {
                    alertsData.length === 0 ?
                        (
                            <div style={{ color: "#0C2132", fontSize: "16px", display: "flex", alignItems: "middle", justifyContent: "center" }}>
                                Currently we don't have any Alerts to Show.
                            </div>
                        ) :
                        (
                            <HighchartsReact highcharts={Highcharts} options={options} />
                        )
                }
            </div>
        </div>
    );
};

export default AlertsChart;


export async function getServerSideProps(context) {

    const req = context.req
    const res = context.res


    try {
        let alerts = getAlerts(req, res);
        if (!alerts || alerts instanceof Error) {
            alerts = []
        }
        return {
            props: {
                alerts
            }
        };
    } catch (error) {
        console.error('Error fetching alerts:', error);
        return {
            props: {
                alert: []
            },
        };
    }
};