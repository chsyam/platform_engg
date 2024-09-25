import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function ServicesPieChart({ graphData, setTeamName, teamName }) {
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
                data: graphData,
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
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
}