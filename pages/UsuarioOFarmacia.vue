<template>
    <div>
        <div class="mx-8">
            <div class="d-flex text-center mt-15">
                <h1>¿Desea registrarse como usuario o farmacia?</h1>
            </div>
            <div class="d-flex flex-column align-center justify-center">
                <NuxtLink style="width: 100%;" to="/Registro">
                    <v-btn color="#10A8BF" style="width: 100%;" class="my-2">
                        Usuario
                    </v-btn>
                </NuxtLink>
                <NuxtLink style="width: 100%;" to="/RegistroFarmacia">
                    <v-btn color="#10A8BF" style="width: 100%;" class="my-2">
                        Farmacia
                    </v-btn>
                </NuxtLink>
            </div>
        </div>
        
    </div>
</template>

<script setup>
    definePageMeta({
        layout: false,
    });
</script>

<style lang="scss" scoped>

</style>