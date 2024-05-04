<template>
    <div>
        <div class="text-h4 text-center my-10"> Registro Usuarios</div>
        <v-card style="width: 100%; align-items: center;" class="px-8" density="compact">
            <form @submit.prevent="submit">
            
            <!-- Nombre -->
            <v-text-field
                v-model="name.value.value"
                :counter="20"
                :error-messages="name.errorMessage.value"
                label="Nombre(s)"
                clearable
                variant="outlined"
            ></v-text-field>
    
            <!-- Appelido -->
            <v-text-field
                v-model="lastName.value.value"
                :counter="20"
                :error-messages="lastName.errorMessage.value"
                label="Apellido(s)"
                clearable
                variant="outlined"
            ></v-text-field>
    
            <!-- Correo -->
            <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                label="Correo"
                clearable
                variant="outlined"
            ></v-text-field>

            <!-- Celular -->
            <v-text-field
                v-model="celular.value.value"
                :counter="10"
                :error-messages="celular.errorMessage.value"
                label="Celular"
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
    
            <!-- Confirmar Contraseña -->
            <v-text-field
                v-model="confirmarContrasena.value.value"
                :type="mostrarConfirmarContrasena ? 'text' : 'password'"
                :prepend-inner-icon="mostrarConfirmarContrasena ? 'mdi-eye-off' : 'mdi-eye'"
                @click:prepend-inner="mostrarConfirmarContrasena = !mostrarConfirmarContrasena"
                :counter="20"
                :error-messages="confirmarContrasena.errorMessage.value"
                label="Confirmar Contraseña"
                clearable
                variant="outlined"
            ></v-text-field>
    
            <!-- Género -->
            <v-select
                v-model="genero.value.value"
                :error-messages="genero.errorMessage.value"
                :items="generoItems"
                label="Género"
                clearable
                variant="outlined"
            ></v-select>
            
            <!-- Altura -->
            <v-text-field
                v-model="altura.value.value"
                :counter="10"
                label="Altura"
                clearable
                variant="outlined"
            ></v-text-field>

            <!-- Peso -->
            <v-text-field
                v-model="peso.value.value"
                :counter="10"
                label="Peso"
                clearable
                variant="outlined"
            ></v-text-field>

            <!-- Ansiedad -->
            <v-checkbox
                v-model="ansiedad.value.value"
                label="Anciedad"
                type="checkbox"
                value="1"
            ></v-checkbox>

            <!-- Diabetes -->
            <v-select
                v-model="diabetes.value.value"
                :items="diabetesItems"
                label="Diabetes"
                clearable
                variant="outlined"
            ></v-select>
    
            <!-- Problemas de Presión -->
            <v-checkbox
                v-model="presion.value.value"
                label="Hipertensión Alterial"
                type="checkbox"
                value="1"
            ></v-checkbox>

            <!-- Depresión -->
            <v-checkbox
                v-model="depresion.value.value"
                label="Depresión Diagnosticada"
                type="checkbox"
                value="1"
            ></v-checkbox>

            <!-- Cancer -->
            <v-select
                v-model="cancer.value.value"
                :items="cancerItems"
                label="Cáncer"
                clearable
                variant="outlined"
            ></v-select>

            <!-- Términos y condiciones -->
            <v-checkbox
                v-model="terminos.value.value"
                :error-messages="terminos.errorMessage.value"
                label="Acepto los términos y condiciones."
                type="checkbox"
                value="1"
            ></v-checkbox>
    
            <div class="d-flex align-center text-center justify-space-between flex-column mb-10">
                <!-- Botón Registrarse -->
                <v-btn class="my-2" type="submit" color="green" style="width: 100%;">
                    Registrarse
                </v-btn>
                <!-- Botón reiniciar formulario -->
                <v-btn @click="handleReset" color="red" class="my-2" style="width: 100%;">
                    Borrar Formulario
                </v-btn>
                <!-- Botón para ir al inicio de sesión -->
                <NuxtLink to="/IniciarSesion" class="my-2" style="width: 100%;">
                    <v-btn color="#10A8BF" style="width: 100%;">
                        ¿Ya tienes cuenta? Inicia Sesión
                    </v-btn>
                </NuxtLink>
            </div>
            
            </form>
        </v-card>
    </div>
    </template>
    
    <script>
    import { ref } from 'vue'
    import { useField, useForm } from 'vee-validate'
    import { useFetch } from 'nuxt/app'
    import { useRouter } from 'vue-router'; 
    
    export default {
        setup() {
            definePageMeta({
                layout: false,
            });
        const mostrarContrasena = ref(false);
        const mostrarConfirmarContrasena = ref(false);
        const router = useRouter(); 
    
        const { handleSubmit, handleReset } = useForm({
            validationSchema: {
                name (value) {
                    if (value?.length >= 2) return true
                    return 'El nombre debe contener al menos 2 caracteres.'
                },
                lastName (value) {
                    if (value?.length >= 2) return true
                    return 'El apellido debe contener al menos 2 caracteres.'
                },
                celular (value) {
                    if (value?.length > 9 && /[0-9-]+/.test(value)) return true
                    return 'El celular debe tener al menos 10 dígitos.'
                },
                email (value) {
                    if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
                    return 'El correo debe ser válido'
                },
                contrasena (value) {
                    if (value?.length >= 10) return true
                    return 'La contraseña debe contener al menos 10 caracteres.'
                },
                confirmarContrasena (value) {
                    if (value !== contrasena.value.value) return 'Las contraseñas no coinciden.'
                    return true
                },
                genero (value) {
                    if (value) return true
                    return 'Este campo es obligatorio'
                },
                terminos (value) {
                    if (value === '1') return true
                    return 'Debes aceptar los términos y condiciones.'
                },
            },
        })
        const name = useField('name')
        const lastName = useField('lastName')
        const celular = useField('celular')
        const email = useField('email')
        const contrasena = useField('contrasena')
        const confirmarContrasena = useField('confirmarContrasena')
        const genero = useField('genero')
        const altura = useField('altura')
        const peso = useField('peso')
        const ansiedad = useField('ansiedad')
        const diabetes = useField('diabetes')
        const presion = useField('presion')
        const depresion = useField('depresion')
        const cancer = useField('cancer')
        const terminos = useField('terminos')
        const generoItems = ref([
            'Femenino',
            'Masculino',
            'Prefiero no decir',
        ])
        const diabetesItems = ref([
            'Type 1',
            'Type 2',
        ])
        const cancerItems = ref([
            'Leukemia',
            'Melanoma',
        ])
        const submit = handleSubmit(async values => {
            const {data: db, error, status} = await useFetch('/api/users/usuarios/', {
            method: 'POST',
            timeout: 20000,
            body: {
                name: name.value,
                lastName: lastName.value,
                email: email.value,
                contrasena: contrasena.value,
                celular: celular.value,
                genero: genero.value,
                altura: altura.value,
                peso: peso.value,
                ansiedad: ansiedad.value,
                diabetes: diabetes.value,
                presion: presion.value,
                depresion: depresion.value,
                cancer: cancer.value,
            },
        })
            router.push('/IniciarSesion');
        })
    
        return {
            mostrarContrasena,
            mostrarConfirmarContrasena,
            handleSubmit,
            handleReset,
            name,
            lastName,
            celular,
            email,
            contrasena,
            confirmarContrasena,
            genero,
            generoItems,
            altura,
            peso,
            ansiedad,
            diabetes,
            diabetesItems,
            presion,
            depresion,
            cancer,
            cancerItems,
            terminos,
            submit
        }
    }
    }
    </script>
    
    <style scoped>
    
    </style>