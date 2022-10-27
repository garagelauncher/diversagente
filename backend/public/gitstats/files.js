const dataset = {"data": [{"key": "Files", "color": "#9400d3", "type": "line", "yAxis": 1, "values": [{"x": 1648339200000, "y": 5.25}, {"x": 1648944000000, "y": 15.0}, {"x": 1649548800000, "y": 15.0}, {"x": 1650153600000, "y": 15.0}, {"x": 1650758400000, "y": 34.0}, {"x": 1651363200000, "y": 133.5}, {"x": 1651968000000, "y": 245.1}, {"x": 1652572800000, "y": 307.77777777777777}, {"x": 1653177600000, "y": 342.6190476190476}, {"x": 1653782400000, "y": 411.25}, {"x": 1654387200000, "y": 417.0}, {"x": 1654992000000, "y": 417.0}, {"x": 1655596800000, "y": 510.5217391304348}, {"x": 1656201600000, "y": 510.5217391304348}, {"x": 1656806400000, "y": 510.5217391304348}, {"x": 1657411200000, "y": 510.5217391304348}, {"x": 1658016000000, "y": 510.5217391304348}, {"x": 1658620800000, "y": 510.5217391304348}, {"x": 1659225600000, "y": 527.0}, {"x": 1659830400000, "y": 527.0}, {"x": 1660435200000, "y": 527.0}, {"x": 1661040000000, "y": 527.0}, {"x": 1661644800000, "y": 526.0}, {"x": 1662249600000, "y": 532.3333333333334}, {"x": 1662854400000, "y": 549.75}, {"x": 1663459200000, "y": 556.0}, {"x": 1664064000000, "y": 556.0}, {"x": 1664668800000, "y": 561.9375}, {"x": 1665273600000, "y": 581.2413793103449}, {"x": 1665878400000, "y": 587.5}, {"x": 1666483200000, "y": 601.3846153846154}, {"x": 1667088000000, "y": 656.0}]}, {"key": "Lines", "color": "#d30094", "type": "line", "yAxis": 2, "values": [{"x": 1648339200000, "y": 386}, {"x": 1648944000000, "y": 3531}, {"x": 1649548800000, "y": 3531}, {"x": 1650153600000, "y": 3531}, {"x": 1650758400000, "y": 3642}, {"x": 1651363200000, "y": 36632}, {"x": 1651968000000, "y": 76461}, {"x": 1652572800000, "y": 82332}, {"x": 1653177600000, "y": 95827}, {"x": 1653782400000, "y": 88296}, {"x": 1654387200000, "y": 89397}, {"x": 1654992000000, "y": 89397}, {"x": 1655596800000, "y": 102802}, {"x": 1656201600000, "y": 102802}, {"x": 1656806400000, "y": 102802}, {"x": 1657411200000, "y": 102802}, {"x": 1658016000000, "y": 102802}, {"x": 1658620800000, "y": 102802}, {"x": 1659225600000, "y": 102919}, {"x": 1659830400000, "y": 102919}, {"x": 1660435200000, "y": 102919}, {"x": 1661040000000, "y": 102919}, {"x": 1661644800000, "y": 103117}, {"x": 1662249600000, "y": 103696}, {"x": 1662854400000, "y": 104409}, {"x": 1663459200000, "y": 104611}, {"x": 1664064000000, "y": 104611}, {"x": 1664668800000, "y": 105619}, {"x": 1665273600000, "y": 107439}, {"x": 1665878400000, "y": 107617}, {"x": 1666483200000, "y": 111274}, {"x": 1667088000000, "y": 117228}]}]}
// Setup the chart
nv.addGraph(function() {
	var chart = nv.models.multiChart()
		.margin({left: 60, right: 60});
	chart.yAxis1.options({axisLabel: "Files"});
	chart.yAxis2.options({axisLabel: "Lines"});
	chart.xAxis
		.tickFormat(function(d) { return d3.time.format('%Y-%m')(new Date(d)); })
		.options({rotateLabels: -45})

	d3.select('#chart_files svg').datum(dataset.data).call(chart);
	return chart;
});