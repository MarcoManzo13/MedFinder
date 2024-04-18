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
                label="Name(s)"
                clearable
            ></v-text-field>
    
            <!-- Appelido -->
            <v-text-field
                v-model="lastName.value.value"
                :counter="20"
                :error-messages="lastName.errorMessage.value"
                label="Last Name(s)"
                clearable
            ></v-text-field>
    
            <!-- Correo -->
            <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                label="E-mail"
                clearable
            ></v-text-field>

            <!-- Celular -->
            <v-text-field
                v-model="celular.value.value"
                :counter="10"
                :error-messages="celular.errorMessage.value"
                label="Cellphone"
                clearable
            ></v-text-field>
    
            <!-- Contraseña -->
            <v-text-field
                v-model="contrasena.value.value"
                :type="mostrarContrasena ? 'text' : 'password'"
                :prepend-inner-icon="mostrarContrasena ? 'mdi-eye-off' : 'mdi-eye'"
                @click:prepend-inner="mostrarContrasena = !mostrarContrasena"
                :counter="20"
                :error-messages="contrasena.errorMessage.value"
                label="Password"
                clearable
            ></v-text-field>
    
            <!-- Confirmar Contraseña -->
            <v-text-field
                v-model="confirmarContrasena.value.value"
                :type="mostrarConfirmarContrasena ? 'text' : 'password'"
                :prepend-inner-icon="mostrarConfirmarContrasena ? 'mdi-eye-off' : 'mdi-eye'"
                @click:prepend-inner="mostrarConfirmarContrasena = !mostrarConfirmarContrasena"
                :counter="20"
                :error-messages="confirmarContrasena.errorMessage.value"
                label="Confirm Password"
                clearable
            ></v-text-field>
    
            <!-- Género -->
            <v-select
                v-model="genero.value.value"
                :error-messages="genero.errorMessage.value"
                :items="generoItems"
                label="Gender"
                clearable
            ></v-select>
            
            <!-- Altura -->
            <v-text-field
                v-model="altura.value.value"
                :counter="10"
                label="Height"
                clearable
            ></v-text-field>

            <!-- Peso -->
            <v-text-field
                v-model="peso.value.value"
                :counter="10"
                label="Weight"
                clearable
            ></v-text-field>

            <!-- Ansiedad -->
            <v-checkbox
                v-model="ansiedad.value.value"
                label="Anciety"
                type="checkbox"
                value="1"
            ></v-checkbox>

            <!-- Diabetes -->
            <v-select
                v-model="diabetes.value.value"
                :items="diabetesItems"
                label="Diabetes"
                clearable
            ></v-select>
    
            <!-- Problemas de Presión -->
            <v-checkbox
                v-model="presion.value.value"
                label="Arterial Hypertension"
                type="checkbox"
                value="1"
            ></v-checkbox>

            <!-- Depresión -->
            <v-checkbox
                v-model="depresion.value.value"
                label="Diagnosed Depression"
                type="checkbox"
                value="1"
            ></v-checkbox>

            <!-- Cancer -->
            <v-select
                v-model="cancer.value.value"
                :items="cancerItems"
                label="Cancer"
                clearable
            ></v-select>

            <!-- Términos y condiciones -->
            <v-checkbox
                v-model="terminos.value.value"
                :error-messages="terminos.errorMessage.value"
                label="I accept terms and conditions."
                type="checkbox"
                value="1"
            ></v-checkbox>
    
            <!-- Botón Registrarse -->
            <v-btn class="me-4" type="submit">
                Register
            </v-btn>
    
            <!-- Botón reiniciar formulario -->
            <v-btn @click="handleReset">
                Erase Formulary
            </v-btn>
            </form>
        </v-card>
    </div>
    </template>
    
    <script>
    import { ref } from 'vue'
    import { useField, useForm } from 'vee-validate'
    import { useFetch } from 'nuxt/app'
    
    export default {
    setup() {
        definePageMeta({
  layout: false,
});
        const mostrarContrasena = ref(false);
        const mostrarConfirmarContrasena = ref(false);
    
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
            }
    
        })
            //alert(JSON.stringify(values, null, 2))
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