
<template>
	<ccv-line-chart :data='data' :options='options'></ccv-line-chart>
</template>

<script>
export default {
	name: "Chart",
	components: {},
	data() {
		return {
			data: [
		{
				"group": "Dataset 4",
				"date": "2019-01-02T06:00:00.000Z",
				"value": 20000,
				"surplus": 105699592.92908604
		},
		{
				"group": "Dataset 4",
				"date": "2019-01-06T06:00:00.000Z",
				"value": 37312,
				"surplus": 514788966.2435796
		},
		{
				"group": "Dataset 4",
				"date": "2019-01-08T06:00:00.000Z",
				"value": 51432,
				"surplus": 889756326.1905266
		},
		{
				"group": "Dataset 4",
				"date": "2019-01-15T06:00:00.000Z",
				"value": 25332,
				"surplus": 443082378.85683817
		},
		{
				"group": "Dataset 4",
				"date": "2019-01-19T06:00:00.000Z",
				"value": null,
				"surplus": 23098.92455477287
		}
],
			options: {
		"title": "Line (time series)",
		"axes": {
				"bottom": {
						"title": "2019 Annual Sales Figures",
						"mapsTo": "date",
						"scaleType": "time"
				},
				"left": {
						"mapsTo": "value",
						"title": "Conversion rate",
						"scaleType": "linear"
				}
		},
		"curve": "curveMonotoneX",
		"height": "400px"
}
		};
	},
};
</script>
  