<template>
    <div>
        <v-layout>
            <v-app-bar flat>
                
                <v-app-bar-title style="text-align: left;">MedFinder</v-app-bar-title>
                <v-img src="../assets/logo.png" style="width: 0px; margin-left: 5px;" />
                <template v-slot:prepend>
                    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                </template>
                <template v-slot:append>
                    <v-btn
                        target="_blank" 
                        rel="noopener"
                        href="https://www.linkedin.com/in/marcomanzoruiz/"
                    >
                        <Icon name="mdi:linkedin" size="2em" />
                    </v-btn>
                    <v-btn
                        target="_blank" 
                        rel="noopener"
                        href="https://github.com/MarcoManzo13"
                    >
                        <Icon name="mdi:github" size="2em" />
                    </v-btn>
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
                    { to: "/Registro", title: 'Registro', icon: 'mdi-account-multiple-plus-outline', value: 'registro' },
                    { to: "/RegistroFarmacia", title: 'Registro Farmacia', icon: 'mdi-account-multiple-plus-outline', value: 'registroFarmacia' },
                    { to: "/IniciarSesion", title: 'Iniciar Sesión', icon: 'mdi-account-multiple-check-outline', value: 'iniciarSesion' },
                    { to: "/UsuarioOFarmacia", title: 'Usuario O Farmacia', icon: 'mdi-account-hard-hat-outline', value: 'usuarioFarmacia' },
                    { to: "/FiltrosBusqueda", title: 'Filtros de búsqueda', icon: 'mdi-filter-menu', value: 'FiltrosBusqueda'},
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
