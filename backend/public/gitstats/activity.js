const recent_activity = {"config": {"noData": "No recent activity.", "padData": true, "showXAxis": true, "xDomain": [31, 0]}, "data": [{"key": "Commits", "color": "#9400D3", "values": [{"x": 31, "y": 0}, {"x": 30, "y": 0}, {"x": 29, "y": 0}, {"x": 28, "y": 0}, {"x": 27, "y": 0}, {"x": 26, "y": 0}, {"x": 25, "y": 8}, {"x": 24, "y": 5}, {"x": 23, "y": 0}, {"x": 22, "y": 14}, {"x": 21, "y": 27}, {"x": 20, "y": 4}, {"x": 19, "y": 1}, {"x": 18, "y": 54}, {"x": 17, "y": 91}, {"x": 16, "y": 52}, {"x": 15, "y": 69}, {"x": 14, "y": 0}, {"x": 13, "y": 7}, {"x": 12, "y": 28}, {"x": 11, "y": 0}, {"x": 10, "y": 0}, {"x": 9, "y": 0}, {"x": 8, "y": 0}, {"x": 7, "y": 0}, {"x": 6, "y": 3}, {"x": 5, "y": 0}, {"x": 4, "y": 0}, {"x": 3, "y": 15}, {"x": 2, "y": 65}, {"x": 1, "y": 57}, {"x": 0, "y": 1}]}]}

// Setup the chart
nv.addGraph(function() {
	var chart = nv.models.historicalBarChart().options(recent_activity.config);
	chart.yAxis.options({axisLabel: "Commits"});
	chart.xAxis.options({axisLabel: "Weeks ago"});
	d3.select('#chart_activity svg').datum(recent_activity.data).call(chart);
	return chart;
});

const commits_by_year = {"xAxis": {"rotateLabels": -90, "ticks": 1}, "yAxis": {"axisLabel": "Commits"}, "data": [{"key": "Commits", "color": "#9400D3", "values": [{"x": 2022, "y": 501}]}]}
// Setup the chart
nv.addGraph(function() {
	var chart = nv.models.historicalBarChart().options({"padData": true, "showXAxis": true});
	chart.xAxis.options(commits_by_year.xAxis);
	chart.yAxis.options(commits_by_year.yAxis);
	d3.select('#chart_commits_year svg').datum(commits_by_year.data).call(chart);
	return chart;
});

const commits_by_month = {"yAxis": {"axisLabel": "Commits in 2022"}, "xAxis": {"rotateLabels": -90, "ticks": 12}, "data": [{"key": "Commits", "color": "#9400D3", "values": [{"x": 0, "y": 0}, {"x": 1, "y": 0}, {"x": 2, "y": 13}, {"x": 3, "y": 45}, {"x": 4, "y": 267}, {"x": 5, "y": 35}, {"x": 6, "y": 3}, {"x": 7, "y": 22}, {"x": 8, "y": 116}, {"x": 9, "y": 0}, {"x": 10, "y": 0}, {"x": 11, "y": 0}]}]}
// Setup the chart
nv.addGraph(function() {
	var chart = nv.models.historicalBarChart().options({"padData": true, "showXAxis": true});
	chart.yAxis.options(commits_by_month.yAxis);
	chart.xAxis.options(commits_by_month.xAxis);
	chart.xAxis
		.tickFormat(function(x) {
			const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
			return month[x];
		});

	d3.select('#chart_commits_month svg').datum(commits_by_month.data).call(chart);
	return chart;
});

nv.addGraph(function() {
  var chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label })    //Specify the data accessors.
      .y(function(d) { return d.value })
      .color(["#9400D3"])
      .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
      .showValues(true)       //...instead, show the bar value right on top of each bar.
      ;
  chart.yAxis.options({"axisLabel": "Commits count"})

  d3.select('#review_time_chart svg')
      .datum([{
        key: "Cumulative Return",
        color: "#9400D3",
        values: [{"label": "= 0s", "value": 497}, {"label": "< 1hour", "value": 4}, {"label": "< 1day", "value": 0}, {"label": "< 2days", "value": 0}, {"label": "< 1week", "value": 0}, {"label": "< 2weeks", "value": 0}, {"label": "< 1month", "value": 0}, {"label": "< 6 months", "value": 0}, {"label": "< 3 years", "value": 0}]
       }
  ]).call(chart);

  nv.utils.windowResize(chart.update);

  return chart;
});

