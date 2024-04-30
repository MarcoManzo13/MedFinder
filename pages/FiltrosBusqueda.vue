<template>
  <div>
    <h2>Filtros de búsqueda</h2>
    <div class="d-flex">
      <label for="precio">Precio:</label>
      <input type="number" id="precio" v-model="filtroPrecio" />

      <!-- Filtro por dosis -->
      <label for="dosis">Dosis:</label>
      <input type="text" id="dosis" v-model="filtroDosis" />

      <!-- Botón para aplicar filtros -->
      <button @click="aplicarFiltros">Aplicar filtros</button>
    </div>

    <!-- Lista de medicinas filtradas -->
    <h2>Medicinas filtradas</h2>
    <div v-if="medicinasFiltradas.length > 0">
      <ul style="list-style: none;">
        <li v-for="medicine in medicinasFiltradas" :key="medicine._id" class="my-5">
          <v-card>
            <v-card-title>{{ medicine.name }}</v-card-title>
            <div v-for="subtitle in medicine.type" class="d-inline-flex flex-row">
                <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
            </div>
            <v-card-text>{{ medicine.description }}</v-card-text>
            <v-btn class="ma-5" :to="'/medicines/' + medicine.name"> Ver más</v-btn>
          </v-card>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No hay medicinas que coincidan con los filtros seleccionados.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filtroPrecio: null,
      filtroDosis: '',
      medicinas: [], // Aquí almacenaremos todas las medicinas
      medicinasFiltradas: [] // Aquí almacenaremos las medicinas filtradas
    };
  },
  methods: {
    async aplicarFiltros() {
  console.log('El botón fue presionado');
  try {
    // Filtrar datos localmente
    this.medicinasFiltradas = this.medicinas.filter(medicine => {
      let precioValido = true;
      let dosisValida = true;
      
      // Verificar si se aplicaron filtros de precio y dosis
      if (this.filtroPrecio) {
        precioValido = medicine.price === parseInt(this.filtroPrecio);
      }
      if (this.filtroDosis) {
        dosisValida = medicine.dosage === this.filtroDosis;
      }
      
      // Retornar true solo si tanto el precio como la dosis son válidos
      return precioValido && dosisValida;
    });
    console.log('Medicinas filtradas:', this.medicinasFiltradas);
  } catch (error) {
    console.error('Error en fetch:', error);
  }
}

  },
  async mounted() {
    try {
      const response = await fetch('http://localhost:3000/api/users/medicine');
      console.log(response);
      if (!response.ok) throw new Error('Failed to fetch');
      this.medicinas = await response.json();
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  }
};
</script>

<style scoped>
/* Estilos responsivos */
@media (max-width: 768px) {
  .d-flex {
    flex-direction: column;
  }
  label, input, button {
    margin: 0.5rem 0;
  }
}
@media (min-width: 769px) {
  .d-flex {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  label {
    margin-right: 1rem;
  }
}
</style>
