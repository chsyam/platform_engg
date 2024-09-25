import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from "./DashboardStyles.module.css"
import { useEffect } from 'react';
import { getBudget } from '../../../pages/api/DashBoard/getBudget';
import { useState } from 'react';
import axios from 'axios';

export default function BudgetbyGrpChart() {
    const [chartData, setChartData] = useState({
        grpNames: [],
        grpBudget: [],
        grpRemaining: []
    });

    useEffect(() => {
        async function fetchBudgetDetails() {
            var arr1 = [];
            var arr2 = [];
            var arr3 = [];
            try {
                // const response = await axios.get("http://10.63.17.1:32244/getGroupBudget/");
                // response?.data?.map(grpBudget => {
                //     arr1.push(grpBudget.name)
                //     arr2.push(grpBudget.budget)
                //     arr3.push((1000 - grpBudget.budget))
                // })
                arr1 = ["Orion", "Sirius", "Vega"]
                arr2 = [500, 838, 800]
                arr3 = [500, 162, 200]
                setChartData({ ...chartData, grpNames: arr1, grpRemaining: arr2, grpBudget: arr3 });
            } catch (error) {
                console.error("failed to fetch budget ", error);
            }
        };
        fetchBudgetDetails();
    }, []);

    const options = {
        chart: {
            type: 'column',
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
        xAxis: {
            categories: chartData.grpNames,
        },
        yAxis: {
            title: {
                text: 'Units in Dollars ($)'
            },
            max: 1000,
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.2f}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    format: '${point.y} K',
                    style: {
                        textOutline: 'none'
                    },

                }
            }
        },
        series: [{
            name: 'Consumed',
            data: chartData.grpBudget,
        }, {
            name: 'Available',
            data: chartData.grpRemaining,

        }]
    };

    return (
        <div className={styles.servicesChart}>
            <div className={styles.cardHeader}>
                <div className={styles.chartHead} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    Budget Details By Team
                </div>
            </div>
            {
                (chartData.grpNames.length === 0) ? (
                    <div style={{ color: "#0C2132", fontSize: "16px", display: "flex", alignItems: "middle", justifyContent: "center" }}>
                        No data is available
                    </div>
                ) : (
                    <HighchartsReact highcharts={Highcharts} options={options} />
                )
            }
        </div>
    );
}


export async function getServerSideProps(context) {

    const req = context.req
    const res = context.res

    try {
        let budget = getBudget(req, res);
        if (!budget || budget instanceof Error) {
            budget = []
        }
        return {
            props: {
                budget
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                budget: []
            },
        };
    }
};