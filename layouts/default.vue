<template>
    <div>
        <v-layout>
            <v-app-bar flat>
                <template v-slot:prepend>
                    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"/>
                </template>
                
                <template v-slot:append>
                    <NuxtLink to="/MedicamentosFavoritos" class="my-2" style="width: 100%;">
                        <v-btn color="#000" style="width: 100%;">
                            <Icon name="mdi:star" size="2em" />
                        </v-btn>
                    </NuxtLink>
                    <v-img
                        src="../assets/logo.png"
                        :width="30"
                        cover
                    />
                </template>
            </v-app-bar>

            <v-navigation-drawer
                v-model="drawer"
                temporary
            >
            <template class="d-flex justify-space-between align-center pa-4" elevation="0">
                    <v-btn 
                        variant="text"
                        @click="closeMenu">
                        <Icon name="mdi:close" size="2em"/>
                    </v-btn>
                </template>
                <v-list dense nav>
                    <template v-for="item in menuItems" :key="item.title">
                        <NuxtLink :to="item.to" style="text-decoration: none; color: #000;">
                            <v-list-item :prepend-icon="item.icon" :title="item.title" :value="item.value" active-class="activeLink"/>
                        </NuxtLink>
                    </template>
                </v-list>
            </v-navigation-drawer>

            <v-main>
                <slot />
            </v-main>
        </v-layout>
    </div>
</template>


<script>
    export default {
        data () {
            return {
                drawer: false,
                menuItems: [
                    { to: "/", title: 'Inicio', icon: 'mdi-home-variant', value: 'inicio' },
                    { to: "/Registro", title: 'Registro Usuario', icon: 'mdi-account-multiple-plus-outline', value: 'registro' },
                    { to: "/RegistroFarmacia", title: 'Registro Farmacia', icon: 'mdi-account-multiple-plus-outline', value: 'registroFarmacia' },
                    { to: "/IniciarSesion", title: 'Iniciar Sesión', icon: 'mdi-account-multiple-check-outline', value: 'iniciarSesion' },
                    { to: "/UsuarioOFarmacia", title: 'Usuario O Farmacia', icon: 'mdi-account-hard-hat-outline', value: 'usuarioFarmacia' },
                    { to: "/CrearMedicamento", title: 'Añadir Medicamento', icon: 'mdi-medication', value: 'crearMedicamento' },
                    { to: "/ControlArduino", title: 'Control Arduino', icon: 'mdi-robot', value: 'ControlArduino'},
                ],
            }
        },
        beforeMount() {
            this.drawer = false;
        },
        onMount() {
            this.drawer = false;
        },
        methods: {
            openSettings() {
            },
            closeMenu() {
                this.drawer = !this.drawer
            },
        },
    }
</script>


<style scoped>
</style>
