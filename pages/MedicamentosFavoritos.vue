<template>
    <div class="ma-10">
        <h2 class="mb-5 text-center">Medicamentos Favoritos</h2>
        <ul style="list-style: none;" v-if="favoriteMedicines.length > 0">
            <li v-for="medicine in favoriteMedicines" :key="medicine._id">
                <v-card class="my-5">
                    <v-card-title>
                        <div class="d-flex justify-space-between align-center">
                            <div>{{ medicine.name }} ${{ medicine.price }}</div>
                            <v-icon :color="iconColor" @click="toggleLike(medicine)">
                                {{ medicine.favorite ? 'mdi-star' : 'mdi-star-outline' }}
                            </v-icon>
                        </div>
                    </v-card-title>
                    <div v-for="subtitle in medicine.type" class="d-inline-flex flex-row">
                        <v-card-subtitle>
                            {{ subtitle }}
                        </v-card-subtitle>
                    </div>
                    <v-card-text>
                        <p class="d-flex text-justify">{{ medicine.description }}</p> 
                        <br><br>
                        Dosis: {{ medicine.dosage }}
                        <br><br>
                        Cantidad de medicamento en farmacia: {{ medicine.cuantity }}
                    </v-card-text>
                </v-card>
            </li>
        </ul>
        <div v-else class="d-flex text-center">
            <h3>No hay medicamentos favoritos por ahora. Favor the agregarlos en la página de Inicio.</h3>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                favoriteMedicines: [],
                isLiked: true,
            };
        },
        async mounted() {
            try {
                const response = await fetch('http://localhost:3000/api/users/medicine');
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const medicines = await response.json();
                // Filter out only the favorite medicines
                this.favoriteMedicines = medicines.filter(medicine => medicine.favorite);
            } catch (error) {
                console.error('Error fetching favorite medicines:', error);
            }
        },
        methods: {
            toggleLike(medicine) {
                // Update isLiked property when the user clicks on the star icon
                medicine.favorite = !medicine.favorite;
                this.favoriteMedicines = this.favoriteMedicines.filter(m => m.favorite);
                try {
                    const response = fetch(`http://localhost:3000/api/users/medicine`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(medicine)
                    });
                } catch (error) {
                    console.error('Error updating medicine:', error);
                }
            },
        },
    };
</script>
