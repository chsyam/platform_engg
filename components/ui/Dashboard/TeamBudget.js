import axios from "axios";
import { useEffect, useState } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from "./DashboardStyles.module.css"

export default function TeamBudget({ groups }) {

    const [chartData, setChartData] = useState({
        totalBudget: 0,
        grpName: 0,
        grpBudget: 0,
        grpRemaining: 0
    });

    useEffect(() => {
        async function fetchBudgetDetails() {
            var group_name = "";
            var consumedBudget = 0;
            var remainingBudget = 0;

            try {
                // const response = await axios.get("http://10.63.17.1:32244/getGroupBudget/");
                // response?.data?.map(grpBudget => {
                //     console.log(grpBudget)
                //     if (grpBudget.name == groups) {
                //         group_name = grpBudget.name;
                //         consumedBudget = 1000 - grpBudget.budget;
                //         remainingBudget = grpBudget.budget;
                //     }
                // })
                group_name = groups;
                consumedBudget = 200;
                remainingBudget = 800;
                setChartData({ grpName: group_name, grpRemaining: remainingBudget, grpBudget: consumedBudget, totalBudget: 1000 });
            } catch (error) {
                console.error("failed to fetch budget ", error);
            }
        };
        fetchBudgetDetails();
    }, []);

    const options = {
        chart: {
            type: 'pie',
            height: 240
        },
        title: {
            text: null,
            align: 'left'
        },
        subtitle: {
            text: null,
            align: 'left'
        },
        credits: {
            enabled: false
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
                    format: '{point.y:.2f}$',
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
            pointFormat: `<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}$</b> of ${chartData.totalBudget}$<br/>`
        },

        series: [
            {
                name: 'Budget',
                colorByPoint: true,
                data: [
                    { name: 'Remaining Budget', y: chartData.grpRemaining },
                    { name: 'Consumed Budget', y: chartData.grpBudget },
                ],
            }
        ],
    };

    return (
        <div className={styles.servicesChart}>
            <div className={styles.cardHeader}>
                <div className={styles.chartHead} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    Budget Details
                </div>
            </div>
            {
                (chartData.totalBudget === 0) ? (
                    <div style={{ color: "#0C2132", fontSize: "16px", display: "flex", alignItems: "middle", justifyContent: "center" }}>
                        No data is available
                    </div>
                ) : (
                    <HighchartsReact highcharts={Highcharts} options={options} />
                )
            }
        </div >
    );
}