function drawGoogleChart(data) {
  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(() => {
    const chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Time');
    chartData.addColumn('number', 'Temperature (\u00B0C)');
    chartData.addColumn({ type: 'string', role: 'tooltip' });

    const sorted = data.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    sorted.forEach(item => {
      const d = new Date(item.created_at);
      const dateStr = d.toLocaleDateString('fi-FI');
      const timeStr = d.toLocaleTimeString('fi-FI');
      const tooltipText = `${dateStr} ${timeStr}\n${item.temp} °C`;
      chartData.addRow([`${dateStr} ${timeStr}`, item.temp, tooltipText]);
    });

    const options = {
      title: 'Temperature',
      legend: { position: 'bottom' },
      curveType: 'function',
      colors: ['red'],
      pointSize: 6,
      tooltip: { isHtml: true },
      hAxis: {
        textPosition: 'none',
        gridlines: { count: 0 },
        baselineColor: 'transparent'
      },
      chartArea: { left: 60, top: 50, width: '85%', height: '65%' }
    };

    const chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(chartData, options);
  });
}
