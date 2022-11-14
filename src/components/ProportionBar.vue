
<template>
	<ccv-meter-chart :data='info' :options='options'></ccv-meter-chart>
</template>

<script>
export default {
	name: "ProportionBar",
	props: ["config"],
	components: {},
	data() {
		return {
			info: [
		{
				"group": "Null",
				"value": 0
		}
	],
			options: {
		"title": "Proportional Meter Chart",
		"height": "130px",
		"meter": {
				"proportional": {
						"total": 0,
						"unit": "Transacciones"
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
  