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
                <v-btn type="submit" class="my-2" color="green" style="width: 100%;">
                    Iniciar Sesión
                </v-btn>

                <!-- Botón reiniciar formulario -->
                <v-btn @click="handleReset" class="my-2" style="width: 100%;" color="red">
                    Borrar Formulario
                </v-btn>

                <!-- Botón para ir al Registro -->
                <NuxtLink to="/UsuarioOFarmacia">
                    <v-btn color="#10A8BF" style="width: 100%;" class="my-2">
                        ¿No tienes cuenta? Regístrate
                    </v-btn>
                </NuxtLink>
            </form>
        </v-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import model from '../server/models/user';
import { useRouter } from 'vue-router'; 

definePageMeta({
    layout: false,
});

const router = useRouter(); 

console.log('Model:', model);

const mostrarContrasena = ref(false);

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        email(value) {
            if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value)) return true;
            return 'El correo debe ser válido';
        },
    },
});

const email = useField('email');
const contrasena = useField('contrasena');

const usuarioBaseDatos = {
    correo: 'david@hotmail.com',
    contrasena: '1111111111',
};

const submit = handleSubmit(values => {
    console.log('Valor ingresado de la contraseña:', values.contrasena);
    console.log('Contraseña almacenada en la base de datos:', usuarioBaseDatos.contrasena);

    if (
        values.email === usuarioBaseDatos.correo && values.contrasena === usuarioBaseDatos.contrasena
    ) {
        router.push('/');
    } else {
        alert('No se puede iniciar sesión, el correo o contraseña es incorrecta.');
    }
});

definePageMeta({
    layout: false,
});
</script>


<style scoped>

</style>
