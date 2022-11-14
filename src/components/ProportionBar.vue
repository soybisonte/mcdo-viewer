
<template>
	<ccv-meter-chart :data='data' :options='options'></ccv-meter-chart>
</template>

<script>
export default {
	name: "ProportionBar",
	components: {},
	data() {
		return {
			data: [
		{
				"group": "emails",
				"value": 202
		},
		{
				"group": "photos",
				"value": 654
		},
		{
				"group": "text messages",
				"value": 723
		},
		{
				"group": "other",
				"value": 120
		}
],
			options: {
		"title": "Proportional Meter Chart",
		"height": "130px",
		"meter": {
				"proportional": {
						"total": 2000,
						"unit": "GB"
				}
		},
		"color": {
				"pairing": {
						"option": 2
				}
		}
}
		};
	},
};
</script>
  