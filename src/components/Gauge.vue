
<template>
  <ccv-gauge-chart
    :data="data"
    :options="options"
  />
</template>

<script>
export default {
	name: "Gauge",
	components: {},
	data() {
		return {
			data: [
		{
				"group": "value",
				"value": 42
		},
		{
				"group": "delta",
				"value": -13.37
		}
],
			options: {
		"title": "Gauge semicircular -- danger status",
		"resizable": true,
		"height": "250px",
		"width": "100%",
		"gauge": {
				"type": "semi",
				"status": "danger"
		}
}
		};
	},
};
</script>
  