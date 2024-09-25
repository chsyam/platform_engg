import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from "./DashboardStyles.module.css"
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function BudgetbyGrpChart() {
    const [totalBudgetData, setTotalBudgetData] = useState({
        totalConsumed: 0,
        totalRemaining: 0,
        totalBudget: 0,
    });

    useEffect(() => {
        async function fetchBudgetDetails() {
            var remaining = 0;
            var consumed = 0;
            var budgetAllocated = 0;

            try {
                // const response = await axios.get("http://10.63.17.1:32244/getGroupBudget/");
                // response?.data?.map(grpBudget => {
                //     remaining += grpBudget.budget;
                //     consumed += (1000 - grpBudget.budget);
                //     budgetAllocated += 1000;
                // })
                remaining += 3138;
                consumed = 862;
                budgetAllocated = 3000;
                setTotalBudgetData({ totalConsumed: consumed, totalRemaining: remaining, totalBudget: budgetAllocated });
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
                    format: '${point.y} K',
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
            pointFormat: `<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}$</b> of ${totalBudgetData.totalBudget}$<br/>`
        },

        series: [
            {
                name: 'Budget',
                colorByPoint: true,
                data: [
                    { name: 'Remaining Budget', y: totalBudgetData.totalRemaining },
                    { name: 'Consumed Budget', y: totalBudgetData.totalConsumed },
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
                (totalBudgetData.totalBudget === 0) ? (
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