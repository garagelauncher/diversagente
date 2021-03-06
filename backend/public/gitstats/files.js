const dataset = {"data": [{"key": "Files", "color": "#9400d3", "type": "line", "yAxis": 1, "values": [{"x": 1648339200000, "y": 5.25}, {"x": 1648944000000, "y": 15.0}, {"x": 1649548800000, "y": 15.0}, {"x": 1650153600000, "y": 15.0}, {"x": 1650758400000, "y": 34.0}, {"x": 1651363200000, "y": 133.5}, {"x": 1651968000000, "y": 245.1}, {"x": 1652572800000, "y": 307.77777777777777}, {"x": 1653177600000, "y": 342.6190476190476}, {"x": 1653782400000, "y": 411.25}, {"x": 1654387200000, "y": 417.0}, {"x": 1654992000000, "y": 417.0}, {"x": 1655596800000, "y": 446.6666666666667}]}, {"key": "Lines", "color": "#d30094", "type": "line", "yAxis": 2, "values": [{"x": 1648339200000, "y": 386}, {"x": 1648944000000, "y": 3531}, {"x": 1649548800000, "y": 3531}, {"x": 1650153600000, "y": 3531}, {"x": 1650758400000, "y": 3642}, {"x": 1651363200000, "y": 36632}, {"x": 1651968000000, "y": 76461}, {"x": 1652572800000, "y": 82332}, {"x": 1653177600000, "y": 95827}, {"x": 1653782400000, "y": 88296}, {"x": 1654387200000, "y": 89397}, {"x": 1654992000000, "y": 89397}, {"x": 1655596800000, "y": 99728}]}], "maxFiles": 446, "maxLines": 99728}
// Setup the chart
nv.addGraph(function() {
	var chart = nv.models.multiChart()
		.margin({left: 60, right: 60});
	chart.yAxis1.options({axisLabel: "Files"});
	chart.yAxis2.options({axisLabel: "Lines"});
	chart.yDomain1([0, dataset.maxFiles]);
	chart.yDomain2([0, dataset.maxLines]);
	chart.xAxis
		.tickFormat(function(d) { return d3.time.format('%Y-%m')(new Date(d)); })
		.options({rotateLabels: -45})

	d3.select('#chart_files svg').datum(dataset.data).call(chart);
	return chart;
});