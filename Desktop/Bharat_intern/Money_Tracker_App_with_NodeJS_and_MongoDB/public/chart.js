document.addEventListener('DOMContentLoaded', function () {
    fetch('/getTransactions')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('transaction-chart').getContext('2d');
            const labels = data.map(transaction => transaction.date.split('T')[0]);
            const amounts = data.map(transaction => transaction.type === 'Income' ? transaction.amount : -transaction.amount);
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Net Amount',
                        data: amounts,
                        backgroundColor: amounts.map(amount => amount > 0 ? 'green' : 'red')
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error:', error));
});
