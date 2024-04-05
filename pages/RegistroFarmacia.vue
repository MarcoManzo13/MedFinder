<template>
    <div>
        <h1 style="width: 100%; text-align: center;">Registro Farmacia</h1>
        <v-card style="width: 100%; align-items: center;" class="ma-2 pa-10" density="compact">
            <form @submit.prevent="submit">
            
            <!-- Nombre -->
            <v-text-field
                v-model="name.value.value"
                :counter="20"
                :error-messages="name.errorMessage.value"
                label="Nombre(s)"
                clearable
            ></v-text-field>
    
            <!-- Appelido -->
            <v-text-field
                v-model="lastName.value.value"
                :counter="20"
                :error-messages="lastName.errorMessage.value"
                label="Apellido(s)"
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
                label="Celular"
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
                label="Contraseña"
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
                label="Confirmar Contraseña"
                clearable
            ></v-text-field>
    
            <!-- Nombre de Farmacia -->
            <v-select
                v-model="nombreFarmacia.value.value"
                :error-messages="nombreFarmacia.errorMessage.value"
                :items="nombreFarmaciaItems"
                label="Nombre de la Farmacia"
                clearable
            ></v-select>

            <!-- Número de Sucursal -->
            <v-text-field
                v-model="numSucursal.value.value"
                :counter="20"
                :error-messages="numSucursal.errorMessage.value"
                label="Branch ID"
                clearable
            ></v-text-field>

            <!-- Dirección -->
            <v-text-field
                v-model="direccion.value.value"
                :error-messages="direccion.errorMessage.value"
                label="Address"
                clearable
            ></v-text-field>

            <!-- Código Postal -->
            <v-text-field
                v-model="codigoPostal.value.value"
                :counter="10"
                :error-messages="codigoPostal.errorMessage.value"
                label="CP"
                clearable
            ></v-text-field>
    
            <!-- Términos y condiciones -->
            <v-checkbox
                v-model="terminos.value.value"
                :error-messages="terminos.errorMessage.value"
                label="¿Aceptas los términos y condiciones?"
                type="checkbox"
                value="1"
            ></v-checkbox>
    
            <!-- Botón Registrarse -->
            <v-btn class="me-4" type="submit">
                Registrarse
            </v-btn>
    
            <!-- Botón reiniciar formulario -->
            <v-btn @click="handleReset">
                Borrar Formulario
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
                nombreFarmacia (value) {
                    if (value) return true
                    return 'Este campo es obligatorio'
                },
                numSucursal (value) {
                    if (value) return true
                    return 'Este campo es obligatorio'
                },
                direccion (value) {
                    if (value) return true
                    return 'Este campo es obligatorio'
                },
                codigoPostal (value) {
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
        const email = useField('email')
        const celular = useField('celular')
        const contrasena = useField('contrasena')
        const confirmarContrasena = useField('confirmarContrasena')
        const nombreFarmacia = useField('nombreFarmacia')
        const nombreFarmaciaItems = ref([
            'Benavides',
            'Guadalajara',
            'Otro',
        ])
        const numSucursal = useField('numSucursal')
        const direccion = useField('direccion')
        const codigoPostal = useField('codigoPostal')
        const terminos = useField('terminos')
        
        const submit = handleSubmit(async values => {
            const {data: db, error, status} = await useFetch('/api/users/pharmacy', {
            method: 'POST',
            timeout: 15000,
            body: {
                name: name.value,
                lastName: lastName.value,
                email: email.value,
                contrasena: contrasena.value,
                celular: celular.value,
                nombreFarmacia: nombreFarmacia.value,
                numSucursal: numSucursal.value,
                direccion: direccion.value,
                codigoPostal: codigoPostal.value,
                terminos: terminos.value,
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
            email,
            celular,
            contrasena,
            confirmarContrasena,
            nombreFarmacia,
            nombreFarmaciaItems,
            numSucursal,
            direccion,
            codigoPostal,
            terminos,
            submit
        }
    }
    }
    </script>
    
    <style scoped>
    
    </style>