
<template>
  <div>
    <cv-checkbox label="Descripción general(ingresos, egresos) " :checked="false" value="check-2"/>
    <cv-checkbox label="Mapa de horas de uso por día(heatmap)" :checked="false" value="check-3"/>
    <cv-checkbox label="distribución por tipo de transacción(pie, circular)" :checked="false" value="check-3"/>
    <cv-checkbox label="Calcular el balance de fin de mes" :checked="false" value="check-1"/>
    <cv-checkbox label="Calcular Frecuencia de operacion" :checked="false" value="check-2"/>
  </div>
</template>

<script>
  export default {
    name: 'Todos',
    data() {
      return {
      };
    },
    mounted(){
    },
    methods: {
    },
  };
</script>

<style>
  .sample {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 960px;
    margin: 5% auto;
  }

  .cv-text-input {
    margin: 30px 0;
  }
</style>