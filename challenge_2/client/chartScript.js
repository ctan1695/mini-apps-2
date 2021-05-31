
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
};

const dateRange = getDateLabels(new Date(2021, 00, 1), new Date(2021, 00, 31));

const getClosingPrices = async (dates) => {
    let data = [];
    let response = await fetch('https://api.coindesk.com/v1/bpi/historical/close.json?start=2021-01-01&end=2021-01-31');
    let responseData = await response.json();

    for (let key in responseData.bpi) {
        await data.push(responseData.bpi[key]);
    }

    return data;
};

getClosingPrices(dateRange)
    .then((res) => {
        const ctx = document.getElementById('myChart').getContext('2d');

        const data = {
            labels: dateRange,
            datasets: [{
                fill: false,
                label: 'Closing Prices',
                data: res,
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
                    y: {
                        ticks: {
                            callback: (value, index, values) => {
                                return `${value} (BTC)`;
                            }
                        }
                    }
                }
            }
        }
        const chart = new Chart(ctx, options);
    })


