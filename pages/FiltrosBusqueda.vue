<template>
  <div>
    <!-- Título de Filtros de búsqueda -->
    <h2>Filtros de búsqueda</h2>

    <!-- Encabezado con enlaces -->
    <div class="d-flex flex-row align-center justify-center" style="width: 50vw;">
    </div>

    <!-- Filtros de búsqueda -->
    <div>
      <!-- Filtro por precio -->
      <label for="precio">Precio:</label>
      <input type="number" id="precio" v-model="filtroPrecio" />

      <!-- Filtros adicionales (laboratorios, medicamento genérico, etc.) -->
      <!-- Por ejemplo, filtro por laboratorios -->
      <label for="laboratorio">Laboratorio:</label>
      <select id="laboratorio" v-model="filtroLaboratorio">
        <option value="">Todos</option>
        <option value="laboratorio1">Laboratorio 1</option>
        <option value="laboratorio2">Laboratorio 2</option>
        <!-- Agregar más opciones según sea necesario -->
      </select>

      <!-- Otros filtros adicionales pueden seguir aquí -->
    </div>

    <!-- Resultados de la búsqueda -->
    <!-- Aquí se mostrarían los resultados de la búsqueda basados en los filtros aplicados -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      filtroPrecio: null,
      filtroLaboratorio: ""
      // Agregar más propiedades de datos para otros filtros si es necesario
    };
  }
};
</script>

<style lang="scss" scoped>
/* Estilos opcionales */
/* Puedes agregar estilos personalizados según sea necesario */
</style>
