<template>
    <div>
        <v-layout>
            <v-app-bar>
                <v-app-bar-title style="text-align: left;">Dejando Huella</v-app-bar-title>
                <template v-slot:append>
                    <NuxtLink icon to="/">
                        <v-btn style="color: #000;" variant="outlined" class="mx-2">
                            Inicio
                        </v-btn>
                    </NuxtLink>
                    <NuxtLink icon to="/Registro">
                        <v-btn style="color: #000;" variant="outlined" class="mx-2">
                            Registro
                        </v-btn>
                    </NuxtLink>
                    <NuxtLink icon to="/IniciarSesion">
                        <v-btn style="color: #000;" variant="outlined" class="mx-2">
                            Iniciar Sesión
                        </v-btn>
                    </NuxtLink>
                    <NuxtLink icon to="/UsuarioOFarmacia">
                        <v-btn style="color: #000;" variant="outlined" class="mx-2">
                            Usuario o Farmacia
                        </v-btn>
                    </NuxtLink>
                </template>
            </v-app-bar>      

            <v-main>
                <slot />
            </v-main>
        </v-layout>
    </div>
</template>


<script>
   
</script>


<style scoped>
</style>