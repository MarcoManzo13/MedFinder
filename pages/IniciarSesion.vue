<template>
    <div>
        <v-card style="width: 100%; align-items: center;" class="px-8 d-flex justify-center align-center flex-column" density="compact" >
            <v-img src="../assets/logo.png" style="width: 80%;" class="mt-7"/>
            <h1 style="width: 100%; text-align: center;">Iniciar Sesión</h1>
            <form @submit.prevent="submit">
        
                <!-- Campo de ingreso -->

                <v-text-field
                    v-model="email.value.value"
                    :error-messages="email.errorMessage.value"
                    label="E-mail"
                    clearable
                    variant="outlined"
                ></v-text-field>

                <!-- Contraseña -->
                <v-text-field
                    v-model="contrasena.value.value"
                    :type="mostrarContrasena ? 'text' : 'password'"
                    :prepend-inner-icon="mostrarContrasena ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:prepend-inner="mostrarContrasena = !mostrarContrasena"
                    :counter="20"
                    :error-messages="contrasena.errorMessage.value"
                    label="Contraseña"
                    clearable
                    variant="outlined"
                ></v-text-field>

                <!-- Botón Iniciar Sesión -->
                <v-btn type="submit" class="my-2" style="width: 100%;">
                    Iniciar Sesión
                </v-btn>

                <!-- Botón reiniciar formulario -->
                <v-btn @click="handleReset" class="my-2" style="width: 100%;">
                    Borrar Formulario
                </v-btn>

                <NuxtLink to="/UsuarioOFarmacia">
                    <v-btn class="my-2" style="width: 100%;">
                        Registrame
                    </v-btn>
                </NuxtLink>
            </form>
        </v-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import model from '../server/models/user'

console.log('Model:', model);

const mostrarContrasena = ref(false); 

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        email(value) {
            if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value)) return true
            return 'El correo debe ser válido'
        },
    },
})

const email = useField('email')
const contrasena = useField('contrasena')

const usuarioBaseDatos = {
    correo: 'usuario@dominio.com',
    contrasena: 'Abcdef123!'
}

const submit = handleSubmit(values => {
    console.log('Valor ingresado de la contraseña:', values.contrasena);
    console.log('Contraseña almacenada en la base de datos:', usuarioBaseDatos.contrasena);
    
    if (
        values.email === usuarioBaseDatos.correo && values.contrasena === usuarioBaseDatos.contrasena
    ) {
        alert('Inicio de sesión exitoso.');
    } else {
        alert('No se puede iniciar sesión, el correo o contraseña es incorrecta.');
    }
})

definePageMeta({
    layout: false,
});
</script>

<style scoped>

</style>
