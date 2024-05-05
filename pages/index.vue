<template>
    <div class="mb-10">
        <div flat class="mx-10">
            <v-text-field
                label="Buscar medicinas"
                :prepend-inner-icon="prependIcon"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                variant="solo"
                v-model="search"
                density="compact"
                :loading="loading"
                @click:append-inner="buscar"
                @click:prepend-inner="onClickFilters"
            />
            <v-card v-if="showFilters">
                <v-card-title>
                    Elegir filtros  
                </v-card-title>
                <v-card-text class="d-flex flex-column">
                <!-- Filtro para precio -->
                <v-row class="d-flex flex-row align-center justify-center text-center ma-0">
                    <v-col cols="4">
                        <label for="precio" style="font-weight: 600;">Precio:</label>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field
                            append-inner-icon="mdi-currency-usd"
                            id="precio"
                            v-model="filtroPrecio"
                            type="number"
                            variant="underlined"
                            placeholder="50"
                        />
                    </v-col>
                    </v-row>
                    <!-- Filtro para dosis -->
                    <v-row class="d-flex flex-row align-center justify-center text-center ma-0">
                        <v-col cols="4">
                            <label for="precio" style="font-weight: 600;">Dosis:</label>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field
                                append-inner-icon="mdi-pill-multiple"
                                id="dosis"
                                v-model="filtroDosis"
                                type="text"
                                variant="underlined"
                                placeholder="30mg"
                            />
                        </v-col>
                    </v-row>
                    <!-- Botón para aplicar filtros -->
                    <v-btn
                        @click="aplicarFiltros"
                        class="mb-10"
                    >
                        Aplicar filtros
                    </v-btn>
                    <div v-if="medicinasFiltradas.length > 0">
                        <h2>Medicinas filtradas</h2>
                        <ul style="list-style: none;">
                            <li v-for="medicine in medicinasFiltradas" :key="medicine.id" class="my-5">
                                <v-card>
                                    <v-card-title>
                                        {{ medicine.name }} ${{ medicine.price }}
                                    </v-card-title>
                                    <div v-for="subtitle in medicine.type" class="d-inline-flex flex-row">
                                        <v-card-subtitle>
                                            {{ subtitle }}
                                        </v-card-subtitle>
                                    </div>
                                    <v-card-text>
                                        {{ medicine.description }}
                                        <br>
                                        <br>
                                        Dosis: {{ medicine.dosage }}
                                        <br>
                                        <br>
                                        Cantidad de medicamento en farmacia: {{ medicine.cuantity }}
                                    </v-card-text>
                                </v-card>
                            </li>
                        </ul>
                    </div>
                    <div v-else-if="filtrosAplicados" class="d-flex text-center">
                        <h4>No hay medicinas que coincidan con los filtros seleccionados.</h4>
                    </div>
                </v-card-text>
            </v-card>
        </div>
        <div class="ma-10">
            <h3>Medicamentos disponibles</h3>
            <ul style= "list-style: none;">
                <li v-for="medicine in medicines" :key="medicine.id" class="my-5" v-if="showMedicinas">
                    <v-card>
    <v-card-title>
        <div class="d-flex justify-space-between align-center">
            <div>{{ medicine.name }} ${{ medicine.price }}</div>
            <v-icon :color="iconColor" @click="toggleLike(medicine)">{{ medicine.favorite ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
        </div>
    </v-card-title>
    <div v-for="subtitle in medicine.type" class="d-inline-flex flex-row">
        <v-card-subtitle>
            {{ subtitle }}
        </v-card-subtitle>
    </div>
    <v-card-text>
        {{ medicine.description }}
        <br><br>
        Dosis: {{ medicine.dosage }}
        <br><br>
        Cantidad de medicamento en farmacia: {{ medicine.quantity }}
    </v-card-text>
</v-card>
                </li>
                <li v-for="medicine in medicinasFiltradas" :key="medicine.id" class="my-5" v-if="showMedicinesFiltradas">
                    <v-card>
                        <v-card-title>
                            {{ medicine.name }} ${{ medicine.price }}
                        </v-card-title>
                        <div v-for="subtitle in medicine.type" class="d-inline-flex flex-row">
                            <v-card-subtitle>
                                {{ subtitle }}
                            </v-card-subtitle>
                        </div>
                        <v-card-text>
                            {{ medicine.description }}
                            <br>
                            <br>
                            Dosis: {{ medicine.dosage }}
                            <br>
                            <br>
                            Cantidad de medicamento en farmacia: {{ medicine.cuantity }}
                        </v-card-text>
                    </v-card>
                </li>
            </ul>
        </div>  
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // Append Icon loading Status
                loaded: false,
                loading: false,

                // Prepend Icon Show Filters
                prependIcon: 'mdi-filter-plus',
                showFilters: false,

                // Variables para que funcionen los filtros
                filtroPrecio: null,
                filtroDosis: '',
                medicinasFiltradas: [],
                filtrosAplicados: false,
                search: '',
                showMedicinesFiltradas: false,
                showMedicinas : true,
                isLiked: false,

                // Variable que almacena los medicamentos que vienen de la base de datos
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
        },
        methods: {
            onClickSearch () {
                this.loading = true
                setTimeout(() => {
                    this.loading = false
                    this.loaded = true
                }, 2000)
            },
            onClickFilters () {
                this.prependIcon = this.prependIcon === 'mdi-filter-plus' ? 'mdi-filter-minus' : 'mdi-filter-plus';
                this.showFilters = !this.showFilters;
            },
            toggleLike(medicine) {
                console.log('Toggling like:', medicine);
                medicine.favorite = !medicine.favorite;
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
            async aplicarFiltros() {
                try {
                  // Filtrar datos localmente
                    if (this.medicinasFiltradas.length === 0) {
                        this.medicinasFiltradas = this.medicines.filter(medicine => {
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
                    } else {
                        this.medicinasFiltradas = this.medicinasFiltradas.filter(medicine => {
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
                    }
                    console.log('Medicinas filtradas:', this.medicinasFiltradas);
                } catch (error) {
                    console.error('Error en fetch:', error);
                }
            },
            async buscar() {
                if(this.search === '') {
                    this.showMedicinas = true;
                    this.showMedicinesFiltradas = false;
                    this.medicinasFiltradas = [];
                }
               
                    if(this.medicinasFiltradas.length === 0) {
                        this.medicinasFiltradas = this.medicines.filter(medicine => {
                            //Filtrar por nombre
                            return medicine.name.toLowerCase().includes(this.search.toLowerCase());
                        });  
                        this.showMedicinesFiltradas = true;
                        this.showMedicinas = false;
                }else {
                    this.medicinasFiltradas = this.medicinasFiltradas.filter(medicine => {
                        //Filtrar por nombre
                        return medicine.name.toLowerCase().includes(this.search.toLowerCase());
                    });
                } 
                console.log('Buscando:', this.search);
                console.log('Medicinas:', this.medicines);
                console.log('Medicinas filtradas:', this.medicinasFiltradas);
            }
        },
    }
</script>