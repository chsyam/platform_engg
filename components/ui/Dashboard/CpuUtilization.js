import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import axios from "axios";
import styles from "./DashboardStyles.module.css"
import ExpandIcon from "../../icons/ExpandIcon";
import CloseXIcon from "../../icons/CloseXIcon";

const CpuUtilization = ({ setEnlarge, enlarge }) => {

    const [array, setArray] = new useState([]);

    useEffect(() => {
        const preProcessedData = (data) => {
            let temp = [];
            data.map((item) => {
                return temp.push(
                    [new Date(item[0]).getTime(), parseFloat(item[1])]
                )
            })
            return temp;
        }
        const fetchMetrics = async () => {
            var processedData = [];
            try {
                const response = await axios.get(
                    "http://10.63.17.1:31463/get-consolidated-cpu-metrics"
                );
                response.data.map((item) => {
                    return processedData.push(
                        {
                            name: item.name,
                            data: preProcessedData(item.data)
                        }
                    )
                })
                setArray(processedData);
            } catch (error) {
                if (error.response) {
                    console.error("Server Error:", error.response.status, error.response.data);
                } else if (error.request) {
                    console.error("Request Error:", error.request);
                } else {
                    console.error("Error:", error.message);
                }
            }
        }
        fetchMetrics();
        const interval = setInterval(() => { fetchMetrics(); }, 60000);
    }, []);

    const options = {
        chart: {
            type: 'line',
            height: enlarge ? 400 : 270,
        },
        title: {
            text: null,
            align: 'left',
        },
        credits: {
            enabled: false
        },
        accessibility: {
            enabled: false,
        },
        legend: {
            enabled: enlarge,
        },
        xAxis: {
            type: 'datetime',
            labels: {
                enabled: true
            },
            title: {
                text: "time"
            },
        },
        yAxis: {
            labels: {
                enabled: true
            },
            title: {
                text: "% of Utilization"
            }
        },
        plotOptions: {
            area: {
                fillColor: 'none'
            },
        },
        tooltip: {
            enabled: true,
        },
        series: array,
    };


    return (
        <div>
            {
                enlarge ?
                    <div>
                        <div className={styles.chartHead} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                CPU Utilization
                            </div>
                            <div style={{ paddingTop: "7px", cursor: "pointer" }} onClick={() => { setEnlarge(!enlarge) }}>
                                <CloseXIcon />
                            </div>
                        </div>
                        <HighchartsReact highcharts={Highcharts} options={options} />
                    </div>
                    :
                    <div className={styles.liveDataChart}>
                        <div className={styles.chartHead} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                CPU Utilization
                            </div>
                            <div style={{ paddingTop: "7px", cursor: "pointer" }} onClick={() => { setEnlarge(!enlarge) }}>
                                <ExpandIcon />
                            </div>
                        </div>
                        {
                            array.length === 0 ?
                                (
                                    <div style={{ color: "#0C2132", fontSize: "16px", display: "flex", alignItems: "middle", justifyContent: "center" }}>
                                        No data is available
                                    </div>
                                ) :
                                (
                                    <HighchartsReact highcharts={Highcharts} options={options} />
                                )
                        }
                    </div>
            }
        </div>
    );
};

export default CpuUtilization;

