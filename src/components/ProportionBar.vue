
<template>
  <ccv-meter-chart
    :data="info"
    :options="options"
  />
</template>

<script>
export default {
	name: "ProportionBar",
	components: {},
	props: ["config"],
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
  