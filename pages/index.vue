<template>
     <v-app-bar flat>
                <v-text-field
                    placeholder="Buscar medicinas"
                    prepend-inner-icon="mdi-filter-menu"
                    append-inner-icon="mdi-magnify"
                    single-line
                    hide-details
                    dense
                    class="mx-5"
                />
            </v-app-bar>
    <div class="mx-10">
      <h1>Lista de Medicinas</h1>
      <ul style= "list-style: none;">
        <li v-for="medicine in medicines" :key="medicine.id" class="my-5">
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
  </template>
  
  <script>
  export default {
    data() {
      return {
        medicines: []
      };
    },
    async mounted() {
      try {
        const response = await fetch('http://localhost:3000/api/users/medicine');
        if (!response.ok) throw new Error('Failed to fetch');
        this.medicines = await response.json();
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    }
  }
  </script>
  