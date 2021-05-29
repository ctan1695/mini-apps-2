const getDateLabels = (begin, end) => {

    let currentDate = begin;
    let result = [];
    let oneDay = 1000 * 60 * 60 * 24;
    let numberOfDays = Math.round(end - begin)/oneDay;

    while (numberOfDays >= 0) {
        result.push(new Date(currentDate).toDateString());
        currentDate.setDate(currentDate.getDate() + 1);
        numberOfDays--;
    }
    return result;
  }

const ctx = document.getElementById('myChart').getContext('2d');

const data = {
    labels: getDateLabels(new Date(2021, 00, 1), new Date(2021, 00, 31)),
    datasets: [{
        fill: false,
        label: 'Closing Prices',
        data: [280, 250, 340],
        borderColor: 'purple',
        backgroundColor: 'purple',
        lineTension: 0,
    }]
}
const options = {
    type: 'line',
    data: data,
    options: {
        fill: false,
        responsive: true,
        scales: {
            xAxes: [{
                type: 'time',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Date",
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Page Views",
                }
            }]
        }
    }
}
const chart = new Chart(ctx, options);

